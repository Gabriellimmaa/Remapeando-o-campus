import { Router } from "express";
import multer from 'multer';

import uploadConfig from './config/upload';
import AuthController from "./controllers/AuthController";
import RoomController from "./controllers/RoomController";
import UserController from "./controllers/UserController";

import authMiddlewares from "./middlewares/authMiddleware";

const routes = Router();
const upload = multer(uploadConfig);

// Criação de sala
routes.post('/room', upload.array('images'), RoomController.create);

// Busca de salas
routes.get('/room', RoomController.index);

// Busca de sala pelo Id
routes.get('/room/:id', RoomController.show);

// Busca de salas por campus
routes.get('/roomList/:campus/:name', RoomController.showListRoom);

// Deletar sala
routes.delete('/room/:campus/:name', RoomController.delete);

// Atualizar sala
routes.put('/room/:id', RoomController.update);

/******* ROTAS PARA O USUÁRIO */
routes.post('/user/create', UserController.create);
routes.post('/user/authenticate', AuthController.authenticate);
export default routes;