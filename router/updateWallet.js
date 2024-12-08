const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middlewares/authMiddlewares');
const { walletUpdate } = require('../controller/WalletController');



router.post('/update', authMiddlewares,walletUpdate );

module.exports = router;
