const crypto = require("crypto");
const base58 = require("bs58");
const bcrypt = require("bcrypt");

class TokenService {
  static async getToken() {
    return base58.encode(crypto.randomBytes(16));
  }

  static async hashToken(token) {
    return await bcrypt.hash(token, 10);
  }
}
module.exports = TokenService;
