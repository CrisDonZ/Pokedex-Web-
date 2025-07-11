import { Router } from "express";
import { register, login, logout, profile, verifyTokenRequest} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register',validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)
router.get('/verify', verifyTokenRequest);



export default router;