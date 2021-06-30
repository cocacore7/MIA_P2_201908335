const { Router } = require('express')
const { registrar,login,crear_solicitud,elim_solicitud,acep_solicitud,crear_publicacion,
    cargar_publicacion,cargar_amigo,cargar_chat,cargar_usrs,cargar_solicitudes,crear_publicacion_tag,
    cargar_publicacion_tag
} = require('../controllers/prueba.controller')
const router = Router()
router.post('/login',login)
router.post('/registrar',registrar)
router.post('/crear/solicitud',crear_solicitud)
router.post('/elim/solicitud',elim_solicitud)
router.post('/acept/solicitud',acep_solicitud)
router.post('/crear/publicacion',crear_publicacion)
router.post('/crear/publicacion/tag',crear_publicacion_tag)
router.post('/cargar/publicacion',cargar_publicacion)
router.post('/cargar/publicacion/tag',cargar_publicacion_tag)
router.post('/cargar/amigo',cargar_amigo)
router.post('/cargar/chat',cargar_chat)

router.get('/cargar/usrs',cargar_usrs)
router.get('/cargar/solicitudes',cargar_solicitudes)

module.exports = router