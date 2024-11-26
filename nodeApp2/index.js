let fs = require('fs/promises');


async function writeToFile(fileName, data) {
    try {
        await fs.writeFile(fileName, data);
        console.log(`Wrote data to ${fileName}`);
    } catch (error) {
        console.error(`Got an error ${error.message}`);
    }
}
writeToFile("command.txt", "my name is Vitor Pio");
async function appendToFile(fileName, data) {
    try {
        await fs.appendFile(fileName, data, { flag: 'w' });
        console.log(`Appended data to file ${fileName}`)
    } catch (error) {
        console.log(`Got an error trying to append the file`)
    }
}
appendToFile('command.txt', 'Skiing');


async function openFile(fileName, data) {
    try {
        const file = await fs.open(fileName, 'w');
        await file.write(data);
        console.log(`Opened file ${fileName}`);
    } catch (error) {
        console.error(`Got an error trying to open the file: {error.message}`);
    }
}
openFile('command.txt', 'Do homework');