const fs = require('fs/promises');
const path = require('path');

const EXCLUSIONS = [];

async function getFilesFromDirectory(directoryPath) {

    const filesInDirectory = await fs.readdir(directoryPath);
    const files = await Promise.all(
        filesInDirectory.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);
            
            if (stats.isDirectory()) {
                return getFilesFromDirectory(filePath);
            } else {
                return filePath;
            }
        })
    );
    return files.map((file) => file); // return with empty arrays removed
}

module.exports = getFilesFromDirectory;