import { readLeaderBoard, writeToLeaderBoard } from "../db/fileOperations.js";

function mainRoute(req, res, next) {
  res.json("All Backend Systems running OK!");
}

function gameStart(req, res, next) {
  res.json(
    `Game Started ! ${{
      Maverick: process.env.MAVERICK,
      Iceman: process.env.ICEMAN,
      Wizard: process.env.WIZARD,
    }}`
  );
}

function gameRun(req, res, next) {
try{

  
}

catch(err)
{
console.error("Error")
}
  

  res.json("Game Run");
}

function gameOver(req, res, next) {
  // res.json("Game Over");
  const { name, time } = req.body;
  console.log(name, time);
  const data = { name: name, time: time };
  writeToLeaderBoard("../db/leaderBoard.json", data);
  res.json("Game Over");
}

async function leaderBoard(req, res, next) {
  try {
    const data = await readLeaderBoard("../db/leaderBoard.json");
    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    console.error("Error in leaderBoard", err);
    res.status(500).json({ error: "failed to load leaderboard." });
  }
}

export { mainRoute, gameStart, gameRun, gameOver, leaderBoard };
