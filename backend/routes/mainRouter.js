import { Router } from "express";

import { mainRoute } from "../controllers/mainController.js";

const mainRouter = Router();

mainRouter.get("/", mainRoute);

export default mainRouter;
