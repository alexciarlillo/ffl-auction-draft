const bcrypt = require('bcrypt');
const DB = require('./db');

class AuthService {
  static async AuthorizeFranchiseClaim({ franchiseId, claimToken }) {
    const franchise = await DB.getFranchiseById(franchiseId);
    let authed = false;

    if (franchise) {
      authed = await bcrypt.compare(claimToken, franchise.claim_token);
    }

    return { authed, franchise };
  }
}

module.exports = AuthService;
