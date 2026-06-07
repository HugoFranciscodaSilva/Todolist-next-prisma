import { Router } from "express";
import { deleteTarefa, getTarefa, patchTarefa, postTarefa } from "../controllers/tarefaController.js";
import { loginMiddleware } from "../middlewares/loginMiddleware.js";

const router:Router = Router()

router.use(loginMiddleware)

router.get('/',getTarefa)
router.post('/',postTarefa)
router.patch('/:id',patchTarefa)
router.delete('/:id',deleteTarefa)

export default router