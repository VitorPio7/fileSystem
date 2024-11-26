const fs = require('fs/promises');

async function renameFile(from, to) {
    try {
        await fs.rename(from, to);
        console.log(`Renamed ${from} to ${to}`);
    } catch (error) {
        console.error(`Got an error trying to rename the file: ${error.message}`);
    }
}
renameFile("command.txt", "command2.txt")