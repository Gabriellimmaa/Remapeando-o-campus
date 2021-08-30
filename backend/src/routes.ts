import { Router } from "express";
import multer from 'multer';

import uploadConfig from './config/upload';
import RoomController from "./controllers/RoomController";

const routes = Router();
const upload = multer(uploadConfig);

// Criação de sala
routes.post('/room', upload.array('images'), RoomController.create);

// Busca de salas
routes.get('/room', RoomController.index);

// Busca de sala pelo Id
routes.get('/room/:id', RoomController.show);

// Busca de salas por campus
routes.get('/roomList/:campus', RoomController.showListRoom);

// Deletar sala
routes.delete('/room/:id', RoomController.delete);

// Atualizar sala
routes.put('/room/:id', RoomController.update);

export default routes;