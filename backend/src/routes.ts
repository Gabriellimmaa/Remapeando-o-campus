import { Router } from "express";
import multer from 'multer';

import uploadConfig from './config/upload';
import RoomController from "./controllers/RoomController";

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/room', upload.array('images'), RoomController.create);
routes.get('/room', RoomController.index);
routes.get('/room/:id', RoomController.show);
//routes.get('/room/:campus', RoomController.showListRoom);
routes.delete('/room/:id', RoomController.delete);
routes.put('/room/:id', RoomController.update);

export default routes;