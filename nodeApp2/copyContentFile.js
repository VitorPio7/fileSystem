const { copyFile } = require('fs/promises');
const { join } = require('path');

async function copyAFile(from, to) {
    try {
        await copyFile(from, to);
        console.log(`Copied ${from} to ${to}`);
    } catch (err) {
        console.error(`Got an error trying to copy the file: ${err.message}`);
    }
}
copyAFile('command2.txt', 'friends-copy.txt');