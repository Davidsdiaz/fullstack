import Router from 'express'

import validator from 'express-validator';
const {check}=validator

import { categoriaDelete, categoriaGet, categoriaGetByID, categoriaPost, categoriaPut, categoriaPutActivar, categoriaPutDesactivar } from '../controllers/categoria.js';
import { ExisteCategoriaById, ExisteCategoriaByNombre } from '../helpers/categoria.js';
import { validarJWT } from '../Middlewares/validar-token.js';
import { validarRol } from '../Middlewares/validar-rol.js';
import validarCampos from '../Middlewares/validar-campos.js';


const router = Router();


router.get('/', [
    validarJWT,
    validarRol ('ALMACENISTA_ROL'),
    validarCampos
],categoriaGet);
    

router.get('/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    validarCampos
] ,categoriaGetByID);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteCategoriaByNombre),
    validarCampos
],categoriaPost);

router.put('/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    check('nombre').custom(ExisteCategoriaByNombre),
    validarCampos
], categoriaPut);

router.put('/activar/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    validarCampos
] ,categoriaPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    validarCampos
] ,categoriaPutDesactivar);

router.delete('/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    validarCampos
] ,categoriaDelete);

export default router;

