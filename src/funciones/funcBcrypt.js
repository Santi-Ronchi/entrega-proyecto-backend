// token bCrypt

const bCrypt = require('bcrypt')


function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bCrypt.hashSync(
            password,
            bCrypt.genSaltSync(10),
            null);
}

module.exports = {isValidPassword,createHash}