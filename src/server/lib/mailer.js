const nodemailer = require('nodemailer');

class Mailer {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 2525,
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASS // generated ethereal password
      }
    });
  }

  async sendFranchiseToken({
    recipient, token, franchise, lobby
  }) {
    this._transporter.sendMail({
      from: 'test@localhost',
      to: recipient,
      subject: `Access link for ${lobby.name}`,
      text: `Hello!\nAccess your franchise here: http://${
        process.env.HOSTNAME}/franchise/${encodeURIComponent(franchise.id)}/?claim_token=${encodeURIComponent(token)}`,
    });
  }
}

const mailer = new Mailer();

module.exports = mailer;
