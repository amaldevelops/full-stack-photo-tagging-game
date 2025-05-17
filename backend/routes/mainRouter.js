import { Router } from "express";

import {
  mainRoute,
  gameOver,
  leaderBoard,
} from "../controllers/mainController.js";

const mainRouter = Router();

mainRouter.get("/", mainRoute);

mainRouter.get("/leaderboard", leaderBoard);

mainRouter.post("/gameover", gameOver);

export default mainRouter;
