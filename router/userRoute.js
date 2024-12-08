const router = require('express').Router()
const { registerCOntroller, LoginController, userdetailsController } = require('../controller/UserController')
const authMiddleware = require('../middlewares/authMiddlewares')






router.post('/register', registerCOntroller)

router.post('/login', LoginController)

router.get('/details', authMiddleware, userdetailsController);




module.exports = router