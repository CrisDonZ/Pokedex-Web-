import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = Router();
//CRUD routes for tasks
router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTaskById );
router.post('/tasks', authRequired, createTask);
router.delete('/tasks/:id', authRequired, deleteTask);
router.put('/tasks/:id', authRequired, updateTask);

export default router;
// In the code above, we have created a new route for tasks. We have used the authRequired middleware to protect the route. The authRequired middleware will check if the user is authenticated before allowing access to the route. If the user is not authenticated, the middleware will return a 401 status code. If the user is authenticated, the middleware will call the next function to allow access to the route.