const fs = require("fs")
const path = require("path")

const input: string = fs.readFileSync("./7/input.txt", "utf-8").replaceAll('\r', '');
const lines = input.split("\n")

const dirs: {[key: string]: number} = {};

let currentDir = "";
while (lines[0]) {
  const [_, command, arg] = lines.shift()!.split(" ");

  switch (command) {
    case "cd":
      currentDir = path.join(currentDir, arg).replaceAll('\\', '/');
      break;

    case "ls":
      let dirSize = 0;

      while (lines[0] && !lines[0].startsWith("$")) {
        if (lines[0].startsWith("dir ")) {
          lines.shift()
          continue;
        }

        const line = lines.shift()!.split(" ")
        dirSize += parseInt(line[0]);
      }

      dirs[currentDir] = dirSize;

      let passBackDir = currentDir;

      while(passBackDir !== "/") {
        passBackDir = path.join(passBackDir, "..").replaceAll('\\', '/');
        
        dirs[passBackDir] += dirSize //* multiplier;
      }
      break;
  }
}

console.log(dirs)
const requiredToFinish = 30000000- (70000000 - dirs["/"])
console.log(requiredToFinish)
console.log(
  Object.values(dirs).sort((a, b) => a - b)
  .find(v => v >= requiredToFinish)
)