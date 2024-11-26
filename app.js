
const fs = require("fs/promises");

(async () => {

    const CREATE_FILE = "create the file";
    const DELETE_FILE = "delete the file";
    const RENAME_FILE = "rename the file";
    const ADD_TO_FILE = "add to the file"

    const createFile = async (path) => {
        try {
            // we want to check whether or not we already have that file
            const existingFileHandle = await fs.open(path, "r");
            existingFileHandle.close();
            // we already have that file...
            return console.log(`The file ${path} already exists.`);
        } catch (e) {
            // we don't have the file, now we should create it
            const newFileHandle = await fs.open(path, "w");
            console.log("A new file was successfully created.");
            newFileHandle.close();
        }
    };
    const deleteFile = async (path) => {
        try {
            await fs.rm(path);
            return console.log("file delited")
        } catch (e) {
            console.error(`The file in the path ${path} doesn't exist.`);
        }
    }
    const renameFile = async (oldPath, path) => {
        try {
            await fs.rename(oldPath, path);
            return console.log(`renamed file`)
        } catch (e) {
            console.error(`Error, file not found`)
        }
    }
    const addToFile = async (filePath, content) => {
        try {
            await fs.writeFile(filePath, content)
            return console.log(`Adding to ${filePath}. Content: ${content}.`)
        } catch (e) {
            console.error(`It's not possible to change.`)
        }
    }
    // commands aberto e monitorado
    const commandFileHandler = await fs.open("./command.txt", "r");

    commandFileHandler.on("change", async () => {
        // get the size of our file
        const size = (await commandFileHandler.stat()).size;
        // allocate our buffer with the size of the file
        const buff = Buffer.alloc(size);
        // the location at which we want to start filling our buffer
        const offset = 0;
        // how many bytes we want to read
        const length = buff.byteLength;
        // the position that we want to start reading the file from
        const position = 0;

        // we always want to read the whole content (from beginning all the way to the end)
        await commandFileHandler.read(buff, offset, length, position);

        const command = buff.toString("utf-8");

        // create a file:
        // create a file <path>
        if (command.includes(CREATE_FILE)) {
            const filePath = command.substring(CREATE_FILE.length + 1).trim();
            createFile(filePath);
        }
        if (command.includes(DELETE_FILE)) {
            const filePath = command.substring(DELETE_FILE + 1).trim();
            deleteFile(filePath);

        }
        if (command.includes(RENAME_FILE)) {
            const _idx = command.indexOf(" to ");
            const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
            const newFilePath = command.substring(_idx + 4);

            renameFile(oldFilePath, newFilePath)
        }
        if (command.includes(ADD_TO_FILE)) {
            const _idx = command.indexOf(" this content: ");
            const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
            const content = command.substring(_idx + 15);

            addToFile(filePath, content);
        }
    });

    // watcher... detecta alteracao
    const watcher = fs.watch("./command.txt");
    for await (const event of watcher) {
        console.log(event)
        if (event.eventType === "change") {
            commandFileHandler.emit("change");
        }
    }
})();
