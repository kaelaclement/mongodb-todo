const { Router } = require('express');
const router = Router();

const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);
router.post('/', itemController.addItem);
router.post('/delete', itemController.deleteItem);
router.post('/complete', itemController.toggleCompleted);

module.exports = router;