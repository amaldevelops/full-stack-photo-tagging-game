import { promises as fs } from "fs";
import path from "path";

async function readLeaderBoard(fileName) {
  try {
    const filePath = path.resolve("db", fileName);
    const data = await fs.readFile(filePath, "utf-8");
    console.log(data);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function writeToLeaderBoard(fileName, newEntry) {
  try {
    const filePath = path.resolve("db", fileName);
    let existingData = [];

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      existingData = JSON.parse(fileContent);

      if (!Array.isArray(existingData)) {
        throw new Error(
          "Invalid data format:expected leaderboard.json to contain an Array "
        );
      }
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    existingData.push(newEntry);

    existingData.sort((a, b) => a.time - b.time);

    const updatedJson = JSON.stringify(existingData, null, 2);

    await fs.writeFile(filePath, updatedJson, "utf-8");
    console.log("Scores appended successfully");
  } catch (err) {
    console.error("Error writing to Leaderboard:", err);
  }
}

export { readLeaderBoard, writeToLeaderBoard };
