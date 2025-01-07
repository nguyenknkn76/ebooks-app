const express = require('express');
const router = express.Router();
const sagaController = require('../controllers/sagaController');

router.post('/recommend-voice', sagaController.recommendVoice);

module.exports = router;
