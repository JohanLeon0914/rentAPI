const express = require('express')
const router = express.Router()
const personasController = require('../controllers/personasController')
const authController = require('../controllers/auth/authController')

router.get('/personas', personasController.verPersonas)
router.post('/editarPersona/:id', personasController.editarPersona)
router.get('/obtenerPersona/:id', personasController.obtenerPersonaPorID)
router.get('/search/persona/:search', personasController.obtenerPersonaPorNombre)
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router