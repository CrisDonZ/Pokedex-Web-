import { Router } from "express";
import { getUsers, deleteUser} from "../controllers/user.controller.js";

const router = Router();
//CRUD routes for users 

router.get('/users',getUsers);
router.delete('/users/:id', deleteUser);


export default router;