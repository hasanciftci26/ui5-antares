const fs = require("fs");
const path = require("path");

fs.readFile(path.join("dist", "index.d.ts"), "utf8", function (err, data) {
    if (err) {
        return console.log(err);
    }

    const result = data.replaceAll('path="./', 'path="./resources/ui5/antares/');

    fs.writeFile(path.join("dist", "index.d.ts"), result, "utf8", function (err) {
        if (err) return console.log(err);
    });
});

const generatedFilePath = path.join(__dirname, "dist", "resources", "ui5", "antares");

fs.promises.readdir(generatedFilePath, { recursive: true }).then((files) => {
    files.forEach((file) => {
        if (file.endsWith(".d.ts")) {
            const filePath = path.join(generatedFilePath, file);

            fs.readFile(filePath, "utf8", function (err, data) {
                if (err) {
                    return console.log(err);
                }

                const result = data.replace(/\/\/# sourceMappingURL\=[A-Za-z]*\.d\.ts\.map/, "");

                fs.writeFile(filePath, result, "utf8", function (err) {
                    if (err) return console.log(err);
                });
            });
        }
    });
});
