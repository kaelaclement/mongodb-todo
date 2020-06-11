const { Router } = require('express');
const router = Router();

const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);
router.post('/', itemController.addItem);
router.post('/delete', itemController.deleteItem);

module.exports = router;