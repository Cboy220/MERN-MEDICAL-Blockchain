const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.post('/create', user_controller.user_create);
router.post('/verify', user_controller.user_verify);
router.put('/update',user_controller.user_update);

module.exports = router;
// background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(3,235,255,1) 0%, rgba(152,70,242,1) 100.2% );
