const express = require('express');
const router = express.Router();
const UserController = require('../../../controllers/administrativo/user/userController');

// Listar todos os usuários
router.get('/', UserController.getAll);

// Obter um usuário pelo ID
router.get('/:id', UserController.getById);

// Criar um novo usuário
router.post('/', UserController.insert);

// Atualizar um usuário existente
router.put('/:id', UserController.update);

// Excluir (soft delete) um usuário
router.delete('/:id', UserController.delete);

module.exports = router;
