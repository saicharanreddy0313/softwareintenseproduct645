const express = require('express');
const router = express.Router();
const { syncUser } = require('../controllers/UserController');

router.post('/sync', syncUser);

module.exports = router;