const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';

async function loginUser(email, password) {
  const res = await axios.get(`${USER_SERVICE_URL}/users/findByEmail?email=${email}`);
  const user = res.data; // содержит passwordHash ?

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return null;
  }
  const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET);
  return token;
}
async function loginUser(email, password) {
    const res = await axios.post(`${USER_SERVICE_URL}/users/checkPassword`, {
      email,
      password
    });
    // Если 401, ловим ошибку
    if (res.data.valid) {
      const user = res.data.user;
      const token = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET);
      return token;
    } else {
      return null;
    }
  }
  