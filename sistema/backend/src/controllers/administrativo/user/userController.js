const UserModel = require('../../../models/administrativo/user/userModel');
const bcrypt = require('bcrypt');

const UserController = {
  // Lista todos os usuários ativos
  async getAll(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
  },

  // Busca usuário por ID
  async getById(req, res) {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
    }
  },

  // Cria novo usuário
  async insert(req, res) {
    try {
      const user = req.body;
      user.password = await bcrypt.hash(user.password, 10); // Criptografa a senha
      const result = await UserModel.insert(user);
      res.status(201).json({ message: 'Usuário criado com sucesso', id: result.insertId });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
  },

  // Atualiza dados do usuário
  async update(req, res) {
    try {
      const id = req.params.id;
      const user = req.body;
      user.password = await bcrypt.hash(user.password, 10);
      await UserModel.update(id, user);
      res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
  },

  // Exclui (soft delete) o usuário
  async delete(req, res) {
    try {
      const id = req.params.id;
      const { deleted_by, deleted_name } = req.body;
      await UserModel.softDelete(id, deleted_by, deleted_name);
      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
  }
};

module.exports = UserController;
