import { Router } from "express";

import RoomController from "./controllers/RoomController";

const routes = Router();

routes.post('/room', RoomController.create);
routes.get('/room', RoomController.index);
routes.get('/room/:id', RoomController.show);
routes.delete('/room/:id', RoomController.delete);
routes.put('/room/:id', RoomController.update);

export default routes;