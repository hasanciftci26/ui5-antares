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
    - [TypeScript](#typescript)
    - [Approuter](#approuter)
  - [Local Start](#local-start)
    - [Known Issues](#known-issues)
  - [Entry Create](#entry-create)
    - [Use Case](#use-case)
    - [Constructor](#constructor)

## Versioning

UI5 Antares and SAPUI5 versions are directly related. The SAPUI5 version used can be determined by ignoring the last 3 digits of the UI5 Antares version. The last 3 digits of the UI5 Antares version increase sequentially after bug fixes or new features. 

> You should install the version that corresponds to the version of your SAPUI5/Fiori Elements application.

You can see examples of versioning below.

> **Note:** The versions shown in the example below may not exist.

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

> **Note:** In the command below, replace `version` with the UI5 Antares version that corresponds to the version of your SAPUI5/Fiori Elements application. For example, applications running with **SAPUI5 version 1.123.1** should run the following command: **npm install ui5-antares@1.123.1001**

> **Note:** If you are using UI5 Tooling v3, you don't need to add ui5-antares to the `ui5.dependencies` in your application's **package.json** file.

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
    }
  }
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
  }
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

### TypeScript

If you are developing your SAPUI5/Fiori Elements application with TypeScript, you need to add **"./node_modules/ui5-antares"** to the `compilerOptions.typeRoots` array in your application's **tsconfig.json** file. This configuration is required to use UI5 Antares type declarations.

```json
{
  "compilerOptions": {
    "typeRoots": [
      ...
      "./node_modules/ui5-antares"
    ]
  }
}
```

![tsconfig.json](https://github.com/hasanciftci26/ui5-antares/blob/media/installation/tsconfig.png?raw=true)

### Approuter

If you are deploying your application with a Standalone or Managed Approuter, you must add the route below (first route) to your application's **xs-app.json** file.

> **Note:** Standalone Approuter also has a **xs-app.json** file, but this configuration should be done on the SAPUI5/Fiori Elements application's **xs-app.json** file not on the Standalone Approuter's **xs-app.json** file.

This route must be added before the route (automatically added by the application generator) with **"source": "^/resources/(.*)$"** and **"destination": "ui5"** to load the UI5 Antares from the HTML5 Application Repository instead of the UI5 CDN. 

> The reason for this configuration is that both standard UI5 libraries and UI5 Antares use the **/resources** path to load the files.

```json
{
  "welcomeFile": "/index.html",
  "authenticationMethod": "route",
  "routes": [
    ...
    {
      "source": "^/resources/ui5/antares/(.*)$",
      "target": "/resources/ui5/antares/$1",
      "service": "html5-apps-repo-rt",
      "authenticationType": "xsuaa"
    },
    {
      "source": "^/resources/(.*)$",
      "target": "/resources/$1",
      "authenticationType": "none",
      "destination": "ui5"
    },
    {
      "source": "^/test-resources/(.*)$",
      "target": "/test-resources/$1",
      "authenticationType": "none",
      "destination": "ui5"
    },
    {
      "source": "^(.*)$",
      "target": "$1",
      "service": "html5-apps-repo-rt",
      "authenticationType": "xsuaa"
    }    
  ]
}
```

![xs-app.json](https://github.com/hasanciftci26/ui5-antares/blob/media/installation/xs_app_json.png?raw=true)

## Local Start

If you start your application with one of the following commands, UI5 Antares will be loaded automatically, since it's a dependency of your application.

[@ui5/cli](https://www.npmjs.com/package/@ui5/cli)

```sh
ui5 serve
```

[@sap/ux-ui5-tooling](https://www.npmjs.com/package/@sap/ux-ui5-tooling)

```sh
fiori run
```

### Known Issues

If you load the standard UI5 library on the **/resources** path using the `fiori-tools-proxy` middleware of the [@sap/ux-ui5-tooling](https://www.npmjs.com/package/@sap/ux-ui5-tooling) package while starting your application as below, UI5 Antares will not be loaded because it also uses the **/resources** path. 

`fiori-tools-proxy` redirects all requests coming from the **/resources** path to the url defined in the `configuration.ui5.url` property.

#### Solution 1

Remove the `ui5` configuration from the YAML file that is used as the configuration file for the start script (`--config` argument of **ui5 serve** or **fiori run** command).

![Remove fiori-tools-proxy ui5 config](https://github.com/hasanciftci26/ui5-antares/blob/media/local_run/proxy_issue_yaml_remove.png?raw=true)

Modify the `src` attribute of the `sap-ui-bootstrap` script in your application's index.html file and load the standard UI5 library from the CDN.

![Load from the CDN](https://github.com/hasanciftci26/ui5-antares/blob/media/local_run/proxy_issue_index_cdn.png?raw=true)

> **Note:** If you deploy your application to an ABAP repository, don't forget to change the `src` attribute to **"resources/sap-ui-core.js"** because the server may not have internet access. With this change, the standard UI5 library will be loaded directly from the server instead of from the CDN.

#### Solution 2

Don't use the **/resources** path in the `ui5` configuration of `fiori-tools-proxy` on the YAML file that is used as the start script configuration file (`--config` argument of **ui5 serve** or **fiori run** command).

![Different path](https://github.com/hasanciftci26/ui5-antares/blob/media/local_run/proxy_issue_different_path.png?raw=true)

Modify the `src` attribute of the `sap-ui-bootstrap` script in your application's index.html file and load the standard UI5 library from the path which is defined in the YAML file.

![Load from the different path](https://github.com/hasanciftci26/ui5-antares/blob/media/local_run/proxy_issue_index_path.png?raw=true)

> **Note:** Do not forget to change the `src` attribute back to **"resources/sap-ui-core.js"** or **"https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"** before deploying your application.

## Entry Create

Entry Create (EntryCreateCL) is a class that manages the CREATE (POST) operation through the OData V2 model. It basically avoids developers having to deal with fragments, user input validations, Value Help creations while working on custom SAPUI5 applications or Fiori Elements extensions. Below you can see the features that Entry Create has.

**Features:**
- sap.m.Dialog generation with a SmartForm, SimpleForm or Custom content
- User input validation via ValidationLogicCL class
- Value Help Dialog generation via ValueHelpCL class
- Property sorting, readonly properties, UUID generation for the properties with Edm.Guid type
- Label generation for the SmartForm, SimpleForm elements
- createEntry(), submitChanges(), and resetChanges() handling based on the user interaction
- Call a fragment and bind the context in case you do not want to use the auto-generated dialog

### Use Case

Let's say that you have an EntitySet named `Products` and you want to let the end user to create an entity on a pop-up screen using the OData V2 service in your custom SAPUI5 application. Here are the steps you need to follow.

1) You need to create a **.fragment.xml** file that contains a Dialog with a form content (Simple, Smart etc.) and call it from the controller or generate the dialog directly on the controller
2) You have to write tons of Value Help code if you don't use [sap.ui.comp.smartfield.SmartField](https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smartfield.SmartField) with the OData Annotations
3) You need to validate the user input, such as checking mandatory fields and ensuring that the values entered match your business logic
4) You need to create a transient entity (createEntry) and either submit it or reset it based on the user interaction

[EntryCreateCL](#entry-create) class basically handles all of the steps defined above.

### Constructor

[1]: https://sapui5.hana.ondemand.com/#/api/sap.ui.core.mvc.Controller

You must initialize an object from EntryCreateCL in order to use it.

| Parameter  | Type                            | Mandatory | Default Value | Description                                                                                                            | 
| :--------- | :------------------------------ | :-------- | :------------ | :--------------------------------------------------------------------------------------------------------------------- |
| controller | [sap.ui.core.mvc.Controller][1] | Yes       |               | The controller object (usually `this`)                                                                                 |
| entityPath | string                          | Yes       |               | The name of the **EntitySet**. It can start with a **"/"**                                                             |
| modelName? | string                          | No        | undefined     | The name of the OData V2 model which can be found on the manifest.json file. **Do not specify** if the model name = "" |

**TypeScript**

**EntryCreateCL\<EntityT\>** is a generic class and can be initialized with a type that contains the properties of the EntitySet that is used as a parameter on the class constructor. `EntityT` is used as the type of the `data?` parameter of the **createNewEntry(data?: EntityT)** method. 

Also, it is used as the returning type of the **getResponse(): EntityT** method of the `ResponseCL` class whose object is passed as a parameter into the function attached by the **attachSubmitCompleted(submitCompleted: (response: ResponseCL<EntityT>) => void, listener?: object)** method.

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    // Initialize without a type
    const entry = new EntryCreateCL(this, "Products"); 
  }

  public async onCreateCategory() {
    // Initialize with a type
    const entry = new EntryCreateCL<ICategory>(this, "Categories"); 
  }

  public async onCreateCustomer() {
    // Initialize with a model name
    const entry = new EntryCreateCL(this, "Customers", "myODataModelName"); 
  }
}

interface ICategory {
  ID?: string;
  name: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
          // Initialize
          const entry = new EntryCreateCL(this, "Products"); 
        },

        onCreateCategory: async function() {
          // Initialize with a model name
          const entry = new EntryCreateCL(this, "Categories", "myODataModelName");
        }
      });

    });
```