import { Router } from "express";

import RoomController from "./controllers/RoomController";

const routes = Router();

routes.get('/room', RoomController.index);
routes.get('/room/:id', RoomController.show);
routes.post('/room', RoomController.create);


export default routes;