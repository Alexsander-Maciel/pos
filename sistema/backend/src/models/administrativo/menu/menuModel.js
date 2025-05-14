const db = require('../../../config/db');
const { logAction } = require('../log/logModel');

const MenuModel = {
  async getAll() {
    try {
      const [rows] = await db.query("SELECT * FROM menus WHERE deleted_at IS NULL");
      return rows;
    } catch (error) {
      console.error('Erro no getAll menus:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM menus WHERE id = ? AND deleted_at IS NULL", [id]);
      return rows[0];
    } catch (error) {
      console.error('Erro no getById menu:', error);
      throw error;
    }
  },

  async insert(menu) {
    try {
      const [result] = await db.query(
        `INSERT INTO menus (name, parent_id, route, created_by) VALUES (?, ?, ?, ?)`,
        [menu.name, menu.parent_id || null, menu.route, menu.userId]
      );
      await logAction('INSERT', 'menus', result.insertId, menu.userId);
      return result;
    } catch (error) {
      console.error('Erro ao inserir menu:', error);
      throw error;
    }
  },

  async update(id, menu) {
    try {
      const [result] = await db.query(
        `UPDATE menus SET name = ?, parent_id = ?, route = ?, updated_by = ?, updated_at = NOW() WHERE id = ?`,
        [menu.name, menu.parent_id || null, menu.route, menu.userId, id]
      );
      await logAction('UPDATE', 'menus', id, menu.userId);
      return result;
    } catch (error) {
      console.error('Erro ao atualizar menu:', error);
      throw error;
    }
  },

  async softDelete(id, userId) {
    try {
      const [result] = await db.query(
        `UPDATE menus SET deleted_at = NOW(), deleted_by = ? WHERE id = ?`,
        [userId, id]
      );
      await logAction('DELETE', 'menus', id, userId);
      return result;
    } catch (error) {
      console.error('Erro ao deletar menu:', error);
      throw error;
    }
  }
};

module.exports = MenuModel;
