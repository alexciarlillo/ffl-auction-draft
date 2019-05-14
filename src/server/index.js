const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const db = require("./db");
const app = express();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const authJWT = require("./middleware/auth");
const nodemailer = require("nodemailer");
const cookieSession = require('cookie-session')
const passwordless = require('passwordless');
const PostgreStore = require('passwordless-postgrestore');
const bodyparser = require('body-parser');

passwordless.init(new PostgreStore(`postgres://${process.env.FFL_DB_USER}:${process.env.FFL_DB_PASS}@${process.env.FFL_DB_HOST}/${process.env.FFL_DB_NAME}`),{skipForceSessionSave:true});

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 2525,
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS // generated ethereal password
    }
  });

// Set up a delivery service
passwordless.addDelivery(
  function(tokenToSend, uidToSend, recipient, callback, req) {
    const host = 'localhost:3000';
    transporter.sendMail({
      from:    'test@localhost',
      to:      'alex@test.com',
      subject: 'Token for ' + host,
      text:    'Hello!\nAccess your account here: http://'
      + host + '?token=' + tokenToSend + '&uid='
      + encodeURIComponent(uidToSend),
    });
});

app.use(cookieSession({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyparser.json())

app.use(express.static("dist"));

app.use(passwordless.sessionSupport());
app.use(passwordless.acceptToken({ successRedirect: '/'}));

app.post("/api/lobby", passwordless.requestToken(
    // Simply accept every user*
    function( user, delivery, callback ) {
      callback( null, user );
  }),
  function( req, res ) {
    res.status(200).send('success');
});


app.get(
  "/api/franchise/:claimToken",
  asyncHandler(async (req, res, next) => {
    const claimToken = req.params.claimToken;
    let franchise = null;

    try {
      franchise = await db.oneOrNone(
        "SELECT * FROM franchises WHERE claim_token = ${claimToken}",
        { claimToken }
      );
    } catch (e) {
      res.status(404).send("Not found!");
      return next();
    }

    if (!franchise.claimed_at) {
      // claim franchise
    }

    // redirect to lobby with JWT
    const lobby = await db.oneOrNone(
      "SELECT id FROM lobbies WHERE id = ${lobbyId}",
      { lobbyId: franchise.lobby_id }
    );

    // setup JWT
    const token = jwt.sign({ franchise }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 3600000
    });

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
