import { Router } from "express";
import { deleteUsuario, getUsuario, patchUsuario, postUsuario  } from "../controllers/usuarioController.js";


const router:Router = Router()


router.get('/',getUsuario)
router.post('/',postUsuario)
router.patch('/:id',patchUsuario)
router.delete('/:id',deleteUsuario)

export default router