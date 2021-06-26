const { Router } = require('express')
const { registrar,login } = require('../controllers/prueba.controller')
const router = Router()
router.post('/login',login)
router.post('/registrar',registrar)

module.exports = router