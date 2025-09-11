var express = require('express');
var router = express.Router();
const users = require('../controllers/users');
const authMiddleware = require('../middleware/auth');
/* authentication */
router.post('/login', users.login);
router.post('/signup', users.signup);
router.get('/me', authMiddleware, users.getMe);
module.exports = router;
