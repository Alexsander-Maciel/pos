const db = require('../../../config/db');

const logAction = async (action, table, recordId, userId) => {
  try {
    // Converta userId para inteiro se necessário, ou valide aqui
    if (!userId || typeof userId !== 'integer') {
      console.warn('logAction: userId inválido ou ausente:', userId);
    }

    await db.query(
      'INSERT INTO logs (user_by, action, table_name, record_id) VALUES (?, ?, ?, ?)',
      [userId, action, table, recordId]
    );
  } catch (error) {
    console.error('Erro ao inserir log:', error);
    // Opcional: você pode relançar ou apenas logar
    // throw error;
  }
};

module.exports = { logAction };
