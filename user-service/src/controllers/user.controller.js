const bcrypt = require('bcrypt')

const { 
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    findUserByEmail,
    verifyUserPassword
  } = require('../services/user.service');
  
  async function createUserController(req, res) {
    try {
      const { email, password, name } = req.body;

      const user = await createUser(email, password, name);

      return res.status(201).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }
  
  async function getUserController(req, res) {
  }
  
  async function updateUserController(req, res) {
  }
  
  async function deleteUserController(req, res) {
  }
  
  /**
   * GET /users/findByEmail?email=...

   */
  async function findByEmailController(req, res) {
    try {
      const email = req.query.email;
      if (!email) {
        return res.status(400).json({ error: 'Email is required in query param' });
      }
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // сделанно только в пет-проекте,в реальном продакшене не стоит возвращать passwordHash наружу
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  /**
   * POST /users/checkPassword
   * Body: { "email": "...", "password": "..." }
   * Возвращает { valid: true/false, user: { ... } } или 401
   */
  async function checkPasswordController(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      const result = await verifyUserPassword(email, password);
      if (!result.valid) {
        // можно вернуть 401
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      return res.json({ valid: true, user: result.user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  module.exports = {
    createUserController,
    getUserController,
    updateUserController,
    deleteUserController,
    findByEmailController,
    checkPasswordController
  };
  