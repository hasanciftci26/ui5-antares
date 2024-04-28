const replace = require("replace-in-file");

const references = {
    files: "dist/index.d.ts",
    from: /path="\.\/(resources\/ui5\/antares\/)?/g,
    to: 'path="./resources/ui5/antares/'
};

replace(references).then((results) => {
    console.log("Reference replacement results:", results);
}).catch((error) => {
    console.error("Error occurred in reference replacement:", error);
});

const typeMappings = {
    files: "dist/resources/ui5/antares/**/*.d.ts",
    from: new RegExp('//# sourceMappingURL=[A-Za-z]*.d.ts.map', "g"),
    to: ""
};

replace(typeMappings).then((results) => {
    console.log("Type mappings replacement results:", results);
}).catch((error) => {
    console.error("Error occurred in type mappings replacement:", error);
});