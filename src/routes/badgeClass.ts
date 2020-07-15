let express = require('express');
let router = express.Router();
let badgeClass_controller = require('../controllers/badgeClassController');

// GET request for a list of all badgeclasses
router.get('/list', badgeClass_controller.badgeClass_list);

router.get('/:id', badgeClass_controller.badgeClass_detail)

module.exports = router;

