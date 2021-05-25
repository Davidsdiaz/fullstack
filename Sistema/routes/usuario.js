import Router from 'express'
import validator from 'express-validator';
const { check } = validator
import { usuarioGet, usuarioGetById, usuarioPost, usuarioPut, usuarioPutActivar, usuarioPutDesactivar, usuarioDelete, login } from '../controllers/usuario.js';
import { ExisteUsuarioById, ExisteUsuarioByNombre } from '../helpers/usuario.js';
import { validarJWT } from '../Middlewares/validar-token.js';
import { validarRol } from '../Middlewares/validar-rol.js';
import validarCampos from '../Middlewares/validar-campos.js';
const router = Router();

router.get('/', [
    validarJWT,
    validarRol('ALMACENISTA_ROL'),
    validarCampos

], usuarioGet)

router.get('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioById),
    validarCampos
], usuarioGetById)

router.post('/', [

    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteUsuarioByNombre),
    validarCampos
], usuarioPost)

router.post('/login', login)

router.put('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioById),
    check('nombre').custom(ExisteUsuarioByNombre),
    validarCampos
], usuarioPut)

router.put('/activar/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioById),
    check('nombre').custom(ExisteUsuarioByNombre),
    validarCampos
], usuarioPutActivar)

router.put('/desactivar/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioById),
    check('nombre').custom(ExisteUsuarioByNombre),
    validarCampos
], usuarioPutDesactivar)

router.delete('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioById),
    check('nombre').custom(ExisteUsuarioByNombre),
    validarCampos
], usuarioDelete);

export default router;