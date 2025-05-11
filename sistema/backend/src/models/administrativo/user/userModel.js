const db = require('../../../config/db');
const { logAction } = require('../log/logModel');

const UserModel = {
  async getAll() {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE deleted_at IS NULL");
      return rows;
    } catch (error) {
      console.error('Erro no getAll usuários:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ? AND deleted_at IS NULL", [id]);
      return rows[0];
    } catch (error) {
      console.error('Erro no getById usuário:', error);
      throw error;
    }
  },

  async insert(user) {
    try {
      const [result] = await db.query(
        `INSERT INTO users (name, email, password, created_by) VALUES (?, ?, ?, ?)`,
        [user.name, user.email, user.password, user.created_by]
      );
      await logAction('INSERT', 'users', result.insertId, user.created_by);
      return result;
    } catch (error) {
      console.error('Erro ao inserir usuário:', error);
      throw error;
    }
  },

  async update(id, user) {
    try {
      const [result] = await db.query(
        `UPDATE users SET name = ?, email = ?, updated_by = ?, updated_at = NOW() WHERE id = ?`,
        [user.name, user.email, user.updated_by, id]
      );
      await logAction('UPDATE', 'users', id, user.updated_by);
      return result;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  async softDelete(id, deleted_by) {
    try {
      const [result] = await db.query(
        `UPDATE users SET deleted_at = NOW(), deleted_by = ? WHERE id = ?`,
        [deleted_by, id]
      );
      await logAction('DELETE', 'users', id, deleted_by);
      return result;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }
};

module.exports = UserModel;
