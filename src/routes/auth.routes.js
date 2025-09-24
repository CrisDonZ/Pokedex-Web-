import { Router } from "express";
import { register, login, logout, profile, verifyTokenRequest, addFavorite, getFavorites} from "../controllers/auth.controller.js";
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
router.post('/add-favorite', addFavorite);
router.get("/favorites/:userId", getFavorites);
// En auth.routes.js
router.delete('/favorites/:userId/:pokemonId', deleteFavorite);




export default router;