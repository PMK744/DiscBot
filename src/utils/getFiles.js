const { readdirSync, statSync } = require('fs');
const Path = require('path');

module.exports = async function getFiles(path) {
        const entries = readdirSync(path).map((entries) =>
        Path.join(path, entries)
    );
    const dirPath = entries.filter((entry) => statSync(entry).isFile());
    const dirFiles = entries
        .filter((entry) => !dirPath.includes(entry))
        .reduce(
            (entry, entries) => entry.concat(this.getFiles(entries)),
            []
        );
    return [...dirPath, ...dirFiles];
}