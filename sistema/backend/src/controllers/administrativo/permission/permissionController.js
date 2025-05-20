const PermissionModel = require('../../../models/administrativo/permission/permissionModel');

const permissionController = {
  async getAll(req, res) {
    try {
      const permissions = await PermissionModel.getAll();
      res.status(200).json(permissions);
    } catch (error) {
      console.error('Erro ao buscar permissões:', error);
      res.status(500).json({ message: 'Erro ao buscar permissões', error: error.message });
    }
  },

  async getById(req, res) {
    const id = req.params.id;
    try {
      const permission = await PermissionModel.getById(id);
      if (!permission) {
        return res.status(404).json({ message: 'Permissão não encontrada' });
      }
      res.status(200).json(permission);
    } catch (error) {
      console.error('Erro ao buscar permissão por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar permissão por ID', error: error.message });
    }
  },

  async insert(req, res) {
    try {
      const userId = req.user.id; // ID do usuário que está logado
      const permissionData = { ...req.body, userId };

      const result = await PermissionModel.insert(permissionData);
      res.status(201).json({ message: 'Permissão criada com sucesso', insertId: result.insertId });
    } catch (error) {
      console.error('Erro ao inserir permissão:', error);
      res.status(500).json({ message: 'Erro ao inserir permissão', error: error.message });
    }
  },

  async update(req, res) {
    const id = req.params.id;
    try {
      const userId = req.user.id;
      const permissionData = { ...req.body, userId };

      const result = await PermissionModel.update(id, permissionData);
      res.status(200).json({ message: 'Permissão atualizada com sucesso', result });
    } catch (error) {
      console.error('Erro ao atualizar permissão:', error);
      res.status(500).json({ message: 'Erro ao atualizar permissão', error: error.message });
    }
  },

  async softDelete(req, res) {
    const id = req.params.id;
    try {
      const userId = req.user.id;
      await PermissionModel.softDelete(id, userId);
      res.status(200).json({ message: 'Permissão deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar permissão:', error);
      res.status(500).json({ message: 'Erro ao deletar permissão', error: error.message });
    }
  }
};

module.exports = permissionController;
