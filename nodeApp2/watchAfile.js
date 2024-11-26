const fs = require('fs');
function watchAFile(file) {
    fs.watchFile(file, (event, filename) => {
        console.log(`${filename} file Changed`);
    })
}

watchAFile('command2.txt');