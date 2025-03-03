const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');


const { email, password, name } = req.body;
const passwordHash = await bcrypt.hash(password, 10);
await User.create({ email, passwordHash, name });




async function findUserByEmail(email) {
  return User.findOne({ where: { email } });
}

async function verifyUserPassword(email, plainPassword) {
  const user = await findUserByEmail(email)
  if (!user) {
    return { valid: false, user: null };
  }
  const match = await bcrypt.compare(plainPassword, user.passwordHash);
  if (!match) {
    return { valid: false, user: null };
  }
  return { valid: true, user };

  
}

async function createUser({ email, passwordHash, name }) {
    const newUser = await User.create({ email, passwordHash, name });
    return newUser;
  }
  

module.exports = {
  // ... прочие методы
  createUser,
  findUserByEmail,
  verifyUserPassword
};
