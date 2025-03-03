const axios = require('axios');


const { registerUser, loginUser } = require('../controllers/auth.controller');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';


async function registerController(req, res) {
  try {
    const { email, password, name } = req.body;
    
    const response = await axios.post(`${USER_SERVICE_URL}/users`,req.body)

    const createdUser = response.data;
    
    return res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    if (!token) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  registerController,
  loginController
};
