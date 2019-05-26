const {pgp, db} = require("../db");
const TokenService = require('./TokenService');

class DB {

  static async createLobby({name, franchiseCount, franchiseBudget}) {
    let lobby = null;
    try {
      lobby = await db.one("insert into lobbies(name, franchise_count, franchise_budget) values(${name}, ${franchiseCount}, ${franchiseBudget}) RETURNING id", {name, franchiseCount, franchiseBudget});
    } catch (err) {
      console.log(err);
    } finally {
      return lobby && DB.getLobbyById(lobby.id);
    }
  }

  static async getLobbyById(id) {
    let lobby = null;
    try {
      lobby = await db.one("SELECT * FROM lobbies WHERE id = ${id}", { id });
    } catch (err) {
      console.log(err);
    } finally {
      return lobby;
    }
  }

  static async getFranchisesForLobby(lobbyId) {
    let franchises = null;
    try {
      franchises = await db.many("SELECT * FROM franchises WHERE lobby_id = ${lobbyId}", { lobbyId });
    } catch (err) {
      console.log(err);
    } finally {
      return franchises;
    }
  }

  static async createFranchisesFor(lobby) {
    let franchises = [];
    for (let i = 0; i < lobby.franchise_count; i++) {
      const franchiseNum = i + 1;
      franchises.push({lobby_id: lobby.id, name: `Franchise ${franchiseNum}`, remaining_budget: lobby.franchise_budget});
    }

    const query = pgp.helpers.insert(franchises, new pgp.helpers.ColumnSet(['lobby_id', 'name', 'remaining_budget'], {table: 'franchises'}));
    return db.none(query);
  }

  static async createFranchiseClaim({lobbyId, email, token, isAdmin = false, name = null}) {
    let franchise = null;
    const hashedToken = await TokenService.hashToken(token);

    try {
      franchise = await db.one("UPDATE franchises SET claimed_at = now(), is_admin = ${isAdmin}, email = ${email}, claim_token = ${hashedToken}, name = COALESCE(${name}, name) WHERE id IN (SELECT id FROM franchises WHERE claimed_at IS NULL AND lobby_id = ${lobbyId} ORDER BY created_at LIMIT 1) RETURNING id", {lobbyId, email, hashedToken, isAdmin, name});
    } catch (err) {
      console.log(err);
    } finally {
      return franchise && DB.getFranchiseById(franchise.id);
    }
  }

  static async claimFranchise({franchiseId}) {
    return await db.one("UPDATE franchises SET claimed_at = now() WHERE id = ${franchiseId}", {franchiseId});
  }

  static async getFranchiseById(id) {
    let franchise = null;
    try {
      franchise = await db.one("SELECT * FROM franchises WHERE id = ${id}", { id });
    } catch (err) {
      console.log(err);
    } finally {
      return franchise;
    }
  }
}

module.exports = DB;