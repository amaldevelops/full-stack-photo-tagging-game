import {promises as fs} from "fs";
import path from "path";

async function readFile(fileName) {
  try {
    const filePath=path.resolve("db",fileName);
    const data = await fs.readFile(filePath, "utf-8");
    console.log(data);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

export { readFile };
