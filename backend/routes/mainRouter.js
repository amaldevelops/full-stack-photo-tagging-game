import { Router } from "express";

import {
  mainRoute,
  gameStart,
  gameRun,
  gameOver,
  leaderBoard,
} from "../controllers/mainController.js";

const mainRouter = Router();

mainRouter.get("/", mainRoute);

mainRouter.get("/leaderboard", leaderBoard);

mainRouter.post("/gamestart", gameStart);

mainRouter.post("/gamerun", gameRun);

mainRouter.get("/gameover", gameOver);

export default mainRouter;
