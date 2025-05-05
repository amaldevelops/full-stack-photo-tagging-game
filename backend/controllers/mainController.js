function mainRoute(req, res, next) {
  res.json("All Backend Systems running OK!");
}

function gameStart(req, res, next) {
  res.json("Start Game");
}

function gameRun(req, res, next) {
  res.json("Game Run");
}

function gameOver(req, res, next) {
  res.json("Game Over");
}

function leaderBoard(req, res, next) {
  res.json("Leader Board");
}

export { mainRoute, gameStart, gameRun, gameOver, leaderBoard };
