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
    - [Supported SAPUI5 Versions](#supported-sapui5-versions)
  - [Installation](#installation)
  - [Local Start](#local-start)
    - [Known Issues](#known-issues)

## Versioning

UI5 Antares and SAPUI5 versions are directly related. The SAPUI5 version used can be determined by ignoring the last 3 digits of the UI5 Antares version. The last 3 digits of the UI5 Antares version increase sequentially after bug fixes or new features. 

> You should install the version that corresponds to the version of your SAPUI5/Fiori Elements application.

You can see examples of versioning below.

**Note**: The versions shown in the example below may not exist.

| UI5 Antares Version | SAPUI5 Version | Description                               |
| :------------------ | :------------- | :---------------------------------------- |
| 1.123.1002          | 1.123.1        | Latest Version for 1.123.1                |
| 1.123.1001          | 1.123.1        | One before the latest version for 1.123.1 |
| 1.96.32001          | 1.96.32        | Latest Version for 1.96.32                |
| 1.84.001            | 1.84           | Latest Version for 1.84                   |

### Supported SAPUI5 Versions

The table below shows the currently supported and planned SAPUI5 versions. UI5 Antares has initially been released to support version 1.123.1. However, development will also be done for versions with long-term maintenance as specified at [SAPUI5 Version Overview](https://sapui5.hana.ondemand.com/versionoverview.html).

| UI5 Antares Version | SAPUI5 Version | Status    |
| :------------------ | :------------- | :-------- |
| 1.123.1001          | 1.123.1        | Available |
| 1.120.*             | 1.120.*        | Planned   |
| 1.108.*             | 1.108.*        | Planned   |
| 1.96.*              | 1.96.*         | Planned   |
| 1.84.*              | 1.84.*         | Planned   |

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites) and [versioning](#versioning).

To install the library, run the following command in the directory where the **package.json** file of your SAPUI5/Fiori Elements application is located. It is usually located in the root directory of a SAPUI5/Fiori Elements application.

**Note:** In the command below, replace `version` with the UI5 Antares version that corresponds to the version of your SAPUI5/Fiori Elements application. For example, applications running with **SAPUI5 version 1.123.1** should run the following command: **npm install ui5-antares@1.123.1001**

**Note:** If you are using UI5 Tooling v3, you don't need to add ui5-antares to the `ui5.dependencies` in your application's **package.json** file.

```sh
npm install ui5-antares@version
```

![NPM Installation](https://github.com/hasanciftci26/ui5-antares/blob/media/installation/npm_installation.png?raw=true)

Add `"ui5.antares": {}` to the `"sap.ui5"."dependencies"."libs"` section of your application's **manifest.json** file.

```json
{
  ...
  "sap.ui5": {
    ...
    "dependencies": {
      ...
      "libs": {
        "sap.m": {},
        "sap.ui.core": {},
        ...
        "ui5.antares": {}
      }
      ...
    }
    ...
  }
  ...
}
```

Add `"ui5.antares": "./resources/ui5/antares"` to the `"sap.ui5"."resourceRoots"` section of your application's **manifest.json** file.

```json
{
  ...
  "sap.ui5": {
    ...
    "resourceRoots": {
      "ui5.antares": "./resources/ui5/antares"
    }
    ...
  }
  ...
}
```

![manifest.json](https://github.com/hasanciftci26/ui5-antares/blob/media/installation/manifest.png?raw=true)

Add the `--all` argument to the `build` script in your application's **package.json** file. This argument ensures that all dependencies are included when the application is built.

```json
{
  ...
  "scripts": {
    "build": "ui5 build --all --config=ui5.yaml --clean-dest --dest dist"
  }
  ...
}
```

![Build Script](https://github.com/hasanciftci26/ui5-antares/blob/media/installation/build_script.png?raw=true)

You can make sure that UI5 Antares is a dependency of your application by using the following command.

**Locally installed UI5 Tooling:**
```sh
npx ui5 tree
```

**Globally installed UI5 Tooling:**
```sh
ui5 tree
```

![UI5 Tree](https://github.com/hasanciftci26/ui5-antares/blob/media/installation/ui5_tree.png?raw=true)

## Local Start

If you start your application with one of the following commands, UI5 Antares will be loaded automatically, since it's a dependency of your application.

**@ui5/cli**

```sh
ui5 serve
```

**@sap/ux-ui5-tooling**

```sh
fiori run
```

### Known Issues

If you load the standard UI5 library on the **/resources** path using the `fiori-tools-proxy` middleware of the **@sap/ux-ui5-tooling** package while starting your application as below, UI5 Antares will not be loaded because it also uses the **/resources** path. 

`fiori-tools-proxy` redirects all requests coming from the **/resources** path to the url defined in the `configuration.ui5.url` property.

#### Solution 1

Remove the `ui5` configuration from the YAML file that is used as the configuration file for the start script (`--config` argument of **ui5 serve** or **fiori run** command).

![Remove fiori-tools-proxy ui5 config](https://github.com/hasanciftci26/ui5-antares/blob/media/local_run/proxy_issue_yaml_remove.png?raw=true)

Modify the `src` attribute of the `sap-ui-bootstrap` script in your application's index.html file and load the standard UI5 library from the CDN.

![Load from the CDN](https://github.com/hasanciftci26/ui5-antares/blob/media/local_run/proxy_issue_index_cdn.png?raw=true)

**Note:** If you deploy your application to an ABAP repository, don't forget to change the `src` attribute to **"resources/sap-ui-core.js"** because the server may not have internet access. With this change, the standard UI5 library will be loaded directly from the server instead of from the CDN.

#### Solution 2

Don't use the **/resources** path in the `ui5` configuration of `fiori-tools-proxy` on the YAML file that is used as the start script configuration file (`--config` argument of **ui5 serve** or **fiori run** command).

![Different path](https://github.com/hasanciftci26/ui5-antares/blob/media/local_run/proxy_issue_different_path.png?raw=true)

Modify the `src` attribute of the `sap-ui-bootstrap` script in your application's index.html file and load the standard UI5 library from the path which is defined in the YAML file.

![Load from the different path](https://github.com/hasanciftci26/ui5-antares/blob/media/local_run/proxy_issue_index_path.png?raw=true)

**Note:** Do not forget to change the `src` attribute back to **"resources/sap-ui-core.js"** or **"https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"** before deploying your application.