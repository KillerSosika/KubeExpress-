require('dotenv').config();

const bcrypt = require('bcrypt');
const { User } = require('./models/user.model');

const express = require('express');
const app = express();

app.use(express.json()); // Для парсинга JSON-тел запросов

/**
 * Создать нового пользователя
 * @param {string} email — адрес электронной почты
 * @param {string} password — сырой пароль (будет захеширован)
 * @param {string} [name] — имя пользователя (необязательно)
 * @returns {Promise<Object>} — созданный объект пользователя (Sequelize instance)
 */
async function createUser(email, password, name) {
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    passwordHash,
    name
  });
  const userPlain = newUser.toJSON();
  delete userPlain.passwordHash;
  return userPlain;
}

async function getUserById(id) {
  const user = await User.findByPk(id);
  if (!user) return null;
  const userPlain = user.toJSON();
  delete userPlain.passwordHash;
  return userPlain;
}

async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  if (data.password) {
    data.passwordHash = await bcrypt.hash(data.password, 10);
    delete data.password;
  }
  await user.update(data);
  const userPlain = user.toJSON();
  delete userPlain.passwordHash;
  return userPlain;
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) {
    return false;
  }
  await user.destroy();
  return true;
}

async function findUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user ? user.toJSON() : null;
}

async function verifyUserPassword(email, plainPassword) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return { valid: false };
  }
  const match = await bcrypt.compare(plainPassword, user.passwordHash);
  if (!match) {
    return { valid: false };
  }
  const userPlain = user.toJSON();
  delete userPlain.passwordHash;
  return { valid: true, user: userPlain };
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
  verifyUserPassword
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
