import Router from 'express'
import validator from 'express-validator'
const { check } = validator
import {compraGet, compraGetByID, compraPost, compraPut, compraPutActivar,
compraPutDesactivar } from "../controllers/compra.js";
import { ExisteByNumcomprobanteC, ExisteCompraByIdC } from "../helpers/compra.js";
import { validarJWT } from '../Middlewares/validar-token.js';
import { validarRol } from '../Middlewares/validar-rol.js';
import validarCampos from '../Middlewares/validar-campos.js';


const router = Router();

router.get('/', [

    validarJWT,
    validarRol('ALMACENISTA_ROL,ADMIN_ROL'),
    validarCampos

], compraGet)

router.get('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteCompraByIdC),
    validarCampos
], compraGetByID)

router.post('/', [
    validarJWT,
    check('numerocomprobante', 'El numero de comprabante debe ser valido').not().isEmpty(),
    check('numerocomprobante').custom(ExisteByNumcomprobanteC),
    validarCampos
], compraPost)


router.put('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteCompraByIdC),
    check('numerocomprobante').custom(ExisteByNumcomprobanteC),
    validarCampos
], compraPut)

router.put('/activar/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteCompraByIdC),
    check('numerocomprobante').custom(ExisteByNumcomprobanteC),
    validarCampos
], compraPutActivar)

router.put('/desactivar/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteCompraByIdC),
    check('numerocomprobante').custom(ExisteByNumcomprobanteC),
    validarCampos
], compraPutDesactivar)


export default router;

