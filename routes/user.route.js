const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');
const block_interface = require('../interfacing/block.init');
const {check, validationResult, sanitize} = require('express-validator');

const SignupValidator = [
    check('name').not().isEmpty().withMessage('Name must have more than 5 characters'),
    check('email', 'Your email is not valid').not().isEmpty(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty(),
    sanitize('email').normalizeEmail({ remove_dots: false })
];

const ConfirmationValidator = [
  check('email', 'Email is not valid').isEmail(),
  check('email', 'Email cannot be blank').not().isEmpty(),
  check('token', 'Token cannot be blank').not().isEmpty(),
  //sanitize('email').normalizeEmail({ remove_dots: false })
];

const ResendValidator = [
  check('email', 'Email is not valid').isEmail(),
  check('email', 'Email cannot be blank').not().isEmpty(),
];

router.post('/create', user_controller.user_create);
router.post('/verify', user_controller.user_verify);
router.put('/update',user_controller.user_update);
router.post('/valid',SignupValidator,
  user_controller.user_create
);
router.post('/confirmation',ConfirmationValidator,
 user_controller.user_confirmation
);
router.post('/resend', user_controller.user_resend);
router.post('/passwordreset',ResendValidator ,user_controller.user_passwordreset);
router.get('/reset/:token', user_controller.user_resetget);
router.post('/updatepassword/:id',user_controller.user_updatepassword);
router.get('/block',block_interface.setup);

module.exports = router;
