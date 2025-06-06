const db = require('../../../config/db');
const { logAction } = require('../log/logModel');

const PermissionModel = {
  async getAll() {
    try {
      const [rows] = await db.query(`
        SELECT * FROM permissions WHERE deleted_at IS NULL
      `);
      return rows;
    } catch (error) {
      console.error('Erro no getAll permissions:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const [rows] = await db.query(`
        SELECT * FROM permissions WHERE id = ? AND deleted_at IS NULL
      `, [id]);
      return rows[0];
    } catch (error) {
      console.error('Erro no getById permission:', error);
      throw error;
    }
  },

  async insert(permission) {
    try {
      // Verifica duplicidade
      const [existing] = await db.query(
        `SELECT id FROM permissions 
         WHERE menu_id = ? 
           AND (user_id = ? OR group_id = ?) 
           AND deleted_at IS NULL`,
        [
          permission.menu_id,
          permission.user_id || 0, // Se for null, compara com 0
          permission.group_id || 0
        ]
      );
  
      if (existing.length > 0) {
        const error = new Error('Permissão já existente para esse menu e usuário ou grupo');
        error.status = 400;
        throw error;
      }
  
      // Insere se não houver duplicidade
      const [result] = await db.query(
        `INSERT INTO permissions 
        (menu_id, user_id, group_id, can_view, can_insert, can_update, can_delete, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          permission.menu_id,
          permission.user_id || null,
          permission.group_id || null,
          permission.can_view,
          permission.can_insert,
          permission.can_update,
          permission.can_delete,
          permission.userId
        ]
      );
  
      await logAction('INSERT', 'permissions', result.insertId, permission.userId);
      return result;
    } catch (error) {
      console.error('Erro ao inserir permission:', error);
      throw error;
    }
  },

  async update(id, permission) {
    try {
      const [result] = await db.query(
        `UPDATE permissions SET 
          menu_id = ?, user_id = ?, group_id = ?, 
          can_view = ?, can_insert = ?, can_update = ?, can_delete = ?, 
          updated_by = ?, updated_at = NOW()
         WHERE id = ?`,
        [
          permission.menu_id,
          permission.user_id || null,
          permission.group_id || null,
          permission.can_view,
          permission.can_insert,
          permission.can_update,
          permission.can_delete,
          permission.userId,
          id
        ]
      );
      await logAction('UPDATE', 'permissions', id, permission.userId);
      return result;
    } catch (error) {
      console.error('Erro ao atualizar permission:', error);
      throw error;
    }
  },

  async softDelete(id, userId) {
    try {
      const [result] = await db.query(
        `UPDATE permissions SET deleted_at = NOW(), deleted_by = ? WHERE id = ?`,
        [userId, id]
      );
      await logAction('DELETE', 'permissions', id, userId);
      return result;
    } catch (error) {
      console.error('Erro ao deletar permission:', error);
      throw error;
    }
  }
};

module.exports = PermissionModel;