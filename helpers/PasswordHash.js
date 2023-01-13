const crypto = require('crypto');

exports.hash256bits = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
}