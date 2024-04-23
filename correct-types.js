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