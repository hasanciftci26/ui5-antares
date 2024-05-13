# UI5 Antares

UI5 Antares is a custom SAPUI5 library consisting of some useful classes and methods, specially designed to speed up development time when working with OData V2 services.

> UI5 Antares is written in [TypeScript](https://www.typescriptlang.org/). It is compatible with both SAPUI5 JavaScript and SAPUI5 TypeScript applications.

**Features:**
- OData V2 metadata-based dialog and [Simple Form](https://sapui5.hana.ondemand.com/#/api/sap.ui.layout.form.SimpleForm) - [Smart Form](https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smartform.SmartForm) generation for CRUD operations
- Value Help Dialog generation
- User input validation/mandatory checks
- Request handling for OData V2 CRUD operations
- Promisified OData V2 methods based on the [sap.ui.model.odata.v2.ODataModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel) class

## Prerequisites

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [UI5 Tooling](https://sap.github.io/ui5-tooling/v3/) (global or local)

To make sure they are available on your machine, try running the following command.

```sh
npm -v && node -v
10.5.1
v20.11.0
```

**Locally installed UI5 Tooling:**
```sh
npx ui5 -v
3.9.2
```

**Globally installed UI5 Tooling:**
```sh
ui5 -v
3.9.2
```

## Table of contents

- [UI5 Antares](#ui5-antares)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Versioning](#versioning)
  - [Installation](#installation)

## Versioning

UI5 Antares and SAPUI5 versions are directly related. The SAPUI5 version used can be determined by ignoring the last 3 digits of the UI5 Antares version. The last 3 digits of the UI5 Antares version increase sequentially after bug fixes or new features. 

> You should install the version that corresponds to the version of your SAPUI5/Fiori Elements application.

You can see examples of versioning below.

| UI5 Antares Version | SAPUI5 Version | Description                               |
| :------------------ | :------------- | :---------------------------------------- |
| 1.123.1002          | 1.123.1        | Latest Version for 1.123.1                |
| 1.123.1001          | 1.123.1        | One before the latest version for 1.123.1 |
| 1.84.001            | 1.84           | Latest Version for 1.84                   |

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites) and [versioning](#versioning)

To install the library, run the following command in the directory where the **package.json** file of your SAPUI5/Fiori Elements application is located. It is usually located in the root directory of a SAPUI5/Fiori Elements application.

```sh
npm install ui5-antares
```