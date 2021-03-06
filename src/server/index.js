require('dotenv').config();
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redis = require('redis');
const authJWT = require('./middleware/auth');

const client = redis.createClient();

const mailer = require('./lib/mailer');
const DB = require('./lib/DB');
const TokenService = require('./lib/TokenService');
const AuthService = require('./lib/AuthService');
const ClockService = require('./lib/ClockService')(io);
const ScheduleService = require('./lib/ScheduleService');

ScheduleService.Start();

// echo redis errors to the console
client.on('error', err => {
  console.log(`Redis Error ${err}`);
});

client.on('connect', () => {
  console.log('Redis Connected');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    key: 'user_fid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use(express.static('dist'));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_fid && !req.session.franchise) {
    res.clearCookie('user_fid');
  }
  next();
});

// create a new lobby
app.post(
  '/api/lobby',
  asyncHandler(async (req, res) => {
    const {name, email, franchiseCount, franchiseBudget, startAt} = req.body;

    // TODO - assert name and email, franchise count validation
    const lobby = await DB.createLobby({
      name,
      franchiseCount,
      franchiseBudget,
      startAt,
    });
    await DB.createFranchisesFor(lobby);

    const token = await TokenService.getToken();
    const franchise = await DB.createFranchiseClaim({
      lobbyId: lobby.id,
      email,
      isAdmin: true,
      token,
    });
    mailer.sendFranchiseToken({
      recipient: email,
      token,
      franchise,
      lobby,
    });

    res.status(200).json({
      success: true,
      message: 'Lobby created. Check email for access link.',
    });
  })
);

// login to (and claim) franchise
app.post(
  '/api/franchise/:franchiseId/claim',
  asyncHandler(async (req, res) => {
    const claimToken = req.body.claim_token;
    const {franchiseId} = req.params;
    const {authed, franchise} = await AuthService.AuthorizeFranchiseClaim({
      franchiseId,
      claimToken,
    });

    if (!franchise) {
      res.status(404).json({
        success: false,
        message: 'Franchise not found.',
      });
      return;
    }

    if (!authed) {
      res.status(403).json({
        success: false,
        message: 'Invalid claim token.',
      });
      return;
    }

    if (!franchise.claimed_at) {
      await DB.claimFranchise({franchiseId});
    }

    // redirect to lobby with JWT
    const lobby = await DB.getLobbyById(franchise.lobby_id);

    // setup JWT
    const token = jwt.sign({franchise}, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 3600000,
    });

    res.status(200).json({
      franchise,
      lobby,
      token,
    });
  })
);

app.get(
  '/api/lobby/:lobbyId',
  authJWT,
  asyncHandler(async (req, res) => {
    const lobby = await DB.getLobbyById(req.params.lobbyId);
    const franchises = await DB.getFranchisesForLobby(req.params.lobbyId);
    const {franchise} = req.decoded;

    res.status(200).json({
      lobby,
      franchises,
      franchise,
    });
  })
);

app.post(
  '/api/lobby/:lobbyId/join',
  asyncHandler(async (req, res) => {
    const lobby = await DB.getLobbyById(req.params.lobbyId);
    const {franchise_name, email} = req.body;
    const token = await TokenService.getToken();
    const franchise = await DB.createFranchiseClaim({
      lobbyId: lobby.id,
      email,
      token,
      name: franchise_name,
    });
    mailer.sendFranchiseToken({
      recipient: email,
      token,
      franchise,
      lobby,
    });

    res.status(200).json({
      success: true,
      message: 'Lobby joined. Check email for access link.',
    });
  })
);

app.post(
  '/api/lobby/:lobbyId/pause',
  authJWT,
  asyncHandler(async (req, res) => {
    const {lobbyId} = req.params;
    ClockService.stopClock(lobbyId);
    res.status(200).json({success: true});
  })
);

app.post(
  '/api/lobby/:lobbyId/start',
  authJWT,
  asyncHandler(async (req, res) => {
    const {lobbyId} = req.params;
    ClockService.startClock(lobbyId);
    res.status(200).json({success: true});
  })
);

app.post(
  '/api/lobby/:lobbyId/reset',
  authJWT,
  asyncHandler(async (req, res) => {
    const {lobbyId} = req.params;
    ClockService.createClock(lobbyId, 120, true);
    res.status(200).json({success: true});
  })
);

server.listen(8080, () => console.log('Listening on port 8080!'));
