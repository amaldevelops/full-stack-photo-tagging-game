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

async function writeToLeaderBoard(fileName, data) {
  try {
    const filePath = path.resolve("db", fileName);
    const json = JSON.stringify(data, null, 2);

    await fs.writeFile(filePath, json, "utf-8");
    console.log("Scores saved successfully");
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

export { readLeaderBoard, writeToLeaderBoard };
