const db = require('../config/db');

const createUser = async (username, email, password, groupId, createdBy) => {
    const query = `
        INSERT INTO users (username, email, password, group_id, created_by, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;
    const [result] = await db.execute(query, [username, email, password, groupId, createdBy]);
    return result.insertId;
};

const findUserByUsernameOrEmail = async (identifier) => {
    const query = `
        SELECT * FROM users WHERE username = ? OR email = ?
    `;
    const [rows] = await db.execute(query, [identifier, identifier]);
    return rows[0];
};

module.exports = {
    createUser,
    findUserByUsernameOrEmail,
};