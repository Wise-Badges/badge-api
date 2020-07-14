let express = require('express');
let router = express.Router();
let badge_controller = require('../controllers/badgeClassController');

// GET request for a list of all badgeclasses
router.get('/list', badge_controller.badgeClass_list);

module.exports = router;

