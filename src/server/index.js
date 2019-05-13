const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const db = require("./db");
const app = express();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const authJWT = require("./middleware/auth");

app.use(express.static("dist"));

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

// app.get("/*", function(req, res) {
//   res.sendFile(path.join(__dirname, "../../dist/index.html"), function(err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

app.listen(8080, () => console.log("Listening on port 8080!"));
