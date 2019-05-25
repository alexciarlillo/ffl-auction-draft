const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const authJWT = require("./middleware/auth");
const cookieSession = require('cookie-session')
const bodyparser = require('body-parser');
const mailer = require('./lib/mailer');
const DB = require('./lib/DB');
const TokenService = require('./lib/TokenService');
const AuthService = require('./lib/AuthService');

app.use(cookieSession({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(express.static("dist"));

// create a new lobby
app.post(
  "/lobby",
  asyncHandler(async (req, res, next) => {
    const {name, email, franchiseCount} = req.body;

    // TODO - assert name and email
    const lobby = await DB.createLobby({name, franchiseCount});
    await DB.createFranchisesFor(lobby);

    const token = await TokenService.getToken();
    const franchise = await DB.createFranchiseClaim({lobbyId: lobby.id, email, isAdmin: true, token});
    mailer.sendFranchiseToken({recipient: email, token, franchise, lobby});

    res.status(200).send('Lobby created. Check email for access link.');
  })
)

// login to (and claim) franchise
app.get(
  "/franchise/:franchiseId",
  asyncHandler(async (req, res, next) => {
    const claimToken = req.query.claim_token;
    const franchiseId = req.params.franchiseId;
    const {authed, franchise} = await AuthService.AuthorizeFranchiseClaim({franchiseId, claimToken});

    if (! franchise) {
      res.status(404).send('Franchise not found');
      return next();
    }

    if (! authed) {
      res.status(403).send('Unauthorized');
      return next();
    }

    if (! franchise.claimed_at) {
      await DB.claimFranchise({franchiseId});
    }

    // redirect to lobby with JWT
    const lobby = await DB.getLobbyById(franchise.lobby_id);

    // setup JWT
    const token = jwt.sign({ franchise }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 3600000
    });

    res.redirect(`/lobby/${franchise.lobby_id}`);

    res.status(200).json({
      success: true,
      token,
      franchise,
      lobby_id: lobby.id
    });
  })
);

app.get(
  "/api/lobby/:lobbId",
  authJWT,
  asyncHandler(async (req, res, next) => {
    const lobby = await db.oneOrNone(
      "SELECT * FROM lobbies WHERE id = ${lobbyId}",
      { lobbyId: req.decoded.franchise.lobby_id }
    );

    res.status(200).json({
      ...lobby
    });
  })
);

app.listen(8080, () => console.log("Listening on port 8080!"));
