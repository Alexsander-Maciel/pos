const express = require('express');
const router = express.Router();
const MenuController = require('../../../controllers/administrativo/menu/menuController');

router.get('/', MenuController.getAllMenus);

router.get('/:id', MenuController.getMenuById);

router.post('/', MenuController.createMenu);

router.put('/:id', MenuController.updateMenu);

router.delete('/:id', MenuController.deleteMenu);

module.exports = router;
