const MenuModel = require('../../../models/administrativo/menu/menuModel');

const getAllMenus = async (req, res) => {
  try {
    const menus = await MenuModel.getAll();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os menus' });
  }
};

const getMenuById = async (req, res) => {
  try {
    const id = req.params.id;
    const menu = await MenuModel.getById(id);
    if (!menu) return res.status(404).json({ error: 'Menu não encontrado' });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o menu' });
  }
};

const createMenu = async (req, res) => {
  try {
    const data = req.body;
    const result = await MenuModel.insert(data);
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o menu' });
  }
};

const updateMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await MenuModel.update(id, data);
    res.json({ message: 'Menu atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o menu' });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const { deleted_by } = req.body;
    await MenuModel.softDelete(id, deleted_by);
    res.json({ message: 'Menu excluído com sucesso (soft delete)' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o menu' });
  }
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
};
