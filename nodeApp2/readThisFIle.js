const fs = require('fs/promises');

async function readThisFile(filePath) {
    try {
        const data = await fs.readFile(filePath);
        console.log(data);
    } catch (error) {
        console.error("You got an error")
    }
}

readThisFile("command.txt");