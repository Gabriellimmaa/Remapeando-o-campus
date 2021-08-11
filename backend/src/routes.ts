import { Router } from "express";

import Bandeirantes1Controller from "./controllers/Bandeirantes1Controller";

const routes = Router();

routes.get('/bandeirantes1', Bandeirantes1Controller.index);
routes.get('/bandeirantes1/:id', Bandeirantes1Controller.show);
routes.post('/bandeirantes1', Bandeirantes1Controller.create);


export default routes;