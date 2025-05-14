import fs from "fs";

function readFile(fileName) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
}

export { readFile };
