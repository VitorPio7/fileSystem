const fs = require('node:fs/promises');

(async () => {
    let creatFile = async (path, message) => {
        try {
            await fs.writeFile(path, message);
        } catch (e) {
            console.log("Error")
        }
    }
    creatFile("./comands2.txt", "Hi my name is Vitor Pio Vieira");
})();

