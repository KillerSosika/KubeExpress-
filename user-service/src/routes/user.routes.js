const express = require('express');
const {
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
  findByEmailController,
  checkPasswordController
} = require('../controllers/user.controller');

const router = express.Router();

// Существующие CRUD-роуты
router.post('/', createUserController);
router.get('/:id', getUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

// Новые роуты
router.get('/findByEmail', findByEmailController);
router.post('/checkPassword', checkPasswordController);

module.exports = router;
