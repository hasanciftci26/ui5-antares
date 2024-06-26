# UI5 Antares

UI5 Antares is a custom SAPUI5 library consisting of some useful classes and methods, specially designed to speed up development time when working with OData V2 services.

> UI5 Antares is written in [TypeScript](https://www.typescriptlang.org/). It is compatible with both SAPUI5 JavaScript and SAPUI5 TypeScript applications.

## BEFORE YOU CONTINUE

 &#x26A0; This library uses the classes and components of the [SAPUI5](https://sapui5.hana.ondemand.com/) framework without modifying or copying the source code, which is licensed under the [SAP Developer License](https://tools.hana.ondemand.com/developer-license-3_2.txt). Please read the [SAP Developer License](https://tools.hana.ondemand.com/developer-license-3_2.txt) carefully and remember that you must comply with the restrictions of the **SAP Developer License** while using the [UI5 Antares](#ui5-antares) library.

---

**Features:**
- OData V2 metadata-based dialog and [Simple Form](https://sapui5.hana.ondemand.com/#/api/sap.ui.layout.form.SimpleForm) - [Smart Form](https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smartform.SmartForm) generation for CRUD operations
- OData V2 metadata-based object page and [Simple Form](https://sapui5.hana.ondemand.com/#/api/sap.ui.layout.form.SimpleForm) - [Smart Form](https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smartform.SmartForm) generation for CRUD operations
- Value Help Dialog generation
- User input validation/mandatory checks
- Request handling for OData V2 CRUD operations
- Promisified OData V2 methods based on the [sap.ui.model.odata.v2.ODataModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel) class

**Core Classes**

The UI5 Antares library offers a comprehensive set of core classes, as outlined below.

- [Entry Create](#entry-create)
- [Entry Update](#entry-update)
- [Entry Delete](#entry-delete)
- [Entry Read](#entry-read)
- [Promisified OData V2 Classes](#promisified-odata-v2-classes)
- [Fragment Class](#fragment-class)

Please refer to the [Planned Features](#planned-features) section to learn about the features that will be included in the next releases.

## Features GIF

### Auto Generated Dialog

![UI5 Antares Gif](https://github.com/hasanciftci26/ui5-antares/blob/media/antares.gif?raw=true)

### Auto Generated Object Page

![UI5 Antares Object Page Gif](https://github.com/hasanciftci26/ui5-antares/blob/media/antares_object_page.gif?raw=true)

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

## Table of Contents

- [UI5 Antares](#ui5-antares)
  - [BEFORE YOU CONTINUE](#before-you-continue)
  - [Features GIF](#features-gif)
    - [Auto Generated Dialog](#auto-generated-dialog)
    - [Auto Generated Object Page](#auto-generated-object-page)
  - [Prerequisites](#prerequisites)
  - [Table of Contents](#table-of-contents)
  - [Versioning](#versioning)
    - [Supported SAPUI5 Versions](#supported-sapui5-versions)
    - [NPM Package Tags](#npm-package-tags)
  - [Installation](#installation)
    - [TypeScript](#typescript)
    - [Approuter](#approuter)
  - [Local Start](#local-start)
    - [Known Issues](#known-issues)
  - [Entry Create](#entry-create)
    - [Use Case](#use-case)
    - [Constructor](#constructor)
    - [Create New Entry](#create-new-entry)
      - [Method Parameters](#method-parameters)
      - [Default Values](#default-values)
    - [Manual Submit](#manual-submit)
    - [Label Generation](#label-generation)
      - [Resource Model](#resource-model-i18n)
      - [Label Generation From The Technical Names](#label-generation-from-the-technical-names)
      - [Use Metadata Labels](#use-metadata-labels)
    - [Resource Bundle Prefix](#resource-bundle-prefix)
    - [Naming Strategy](#naming-strategy)
      - [NamingStrategies Enum](#namingstrategies-enum)
    - [Form Type](#form-type)
      - [FormTypes Enum](#formtypes-enum)
    - [Form Title](#form-title)
    - [Form Grouping](#form-grouping)
      - [IFormGroups Type Definition](#iformgroups-type-definition)
    - [Begin Button Text](#begin-button-text)
    - [Begin Button Type](#begin-button-type)
    - [End Button Text](#end-button-text)
    - [End Button Type](#end-button-type)
    - [Properties with Edm.Guid Type](#properties-with-edmguid-type)
      - [GuidStrategies Enum](#guidstrategies-enum)
    - [Form Property Order](#form-property-order)
    - [Excluded Properties](#excluded-properties)
    - [Mandatory Properties](#mandatory-properties)
      - [Mandatory Error Message](#mandatory-error-message)
    - [Readonly Properties](#readonly-properties)
    - [Attach Submit Completed](#attach-submit-completed)
    - [Attach Submit Failed](#attach-submit-failed)
    - [Response Class](#response-class)
    - [Value Help](#value-help)
      - [Constructor](#constructor-1)
      - [Label Generation](#label-generation-1)
      - [Standalone Usage](#standalone-usage)
    - [Validation Logic](#validation-logic)
      - [Constructor](#constructor-2)
      - [Validation with Operator](#validation-with-operator)
      - [Validation with Validator Function](#validation-with-validator-function)
      - [ValidationOperator Enum](#validationoperator-enum)
    - [Object Page](#object-page)
      - [Sections](#sections)
      - [Header Title](#header-title)
      - [Header Label](#header-label)
      - [Header Avatar](#header-avatar)
      - [Custom Content Section Title](#custom-content-section-title)
    - [Custom Control](#custom-control)
      - [Constructor](#constructor-3)
      - [Validation](#validation)
      - [Custom Control From Fragment](#custom-control-from-fragment)
        - [Validation](#validation-1)
    - [Custom Content](#custom-content)
      - [Custom Content From Fragment](#custom-content-from-fragment)
    - [Custom Fragment](#custom-fragment)
      - [Auto Mandatory Check](#auto-mandatory-check)
  - [Entry Update](#entry-update)
    - [Use Case](#use-case-1)
    - [Constructor](#constructor-4)
      - [Constructor with a Table ID](#constructor-with-a-table-id)
      - [Constructor with a Context Binding](#constructor-with-a-context-binding)
      - [Constructor with Entity Keys](#constructor-with-entity-keys)
    - [Select Row Message](#select-row-message)
    - [Update Entry](#update-entry)
      - [Method Parameters](#method-parameters-1)
      - [Default Values](#default-values-1)
    - [Available Features](#available-features)
  - [Entry Delete](#entry-delete)
    - [Use Case](#use-case-2)
    - [Constructor](#constructor-5)
      - [Constructor with a Table ID](#constructor-with-a-table-id-1)
      - [Constructor with a Context Binding](#constructor-with-a-context-binding-1)
      - [Constructor with Entity Keys](#constructor-with-entity-keys-1)  
    - [Select Row Message](#select-row-message-1)    
    - [Delete Entry](#delete-entry)
      - [Method Parameters](#method-parameters-2)
      - [Default Values](#default-values-2)
    - [Confirmation Text](#confirmation-text)
    - [Confirmation Title](#confirmation-title)
    - [Attach Delete Completed](#attach-delete-completed)
    - [Attach Delete Failed](#attach-delete-failed)
    - [Available Features](#available-features-1)
  - [Entry Read](#entry-read)
    - [Use Case](#use-case-3)
    - [Constructor](#constructor-6)
      - [Constructor with a Table ID](#constructor-with-a-table-id-2) 
      - [Constructor with a Context Binding](#constructor-with-a-context-binding-2)
      - [Constructor with Entity Keys](#constructor-with-entity-keys-2)        
    - [Select Row Message](#select-row-message-2)
    - [Read Entry](#read-entry)
      - [Method Parameters](#method-parameters-3)
      - [Default Values](#default-values-3)
    - [Available Features](#available-features-2)           
  - [Promisified OData V2 Classes](#promisified-odata-v2-classes)
    - [OData Create](#odata-create)
      - [Constructor](#constructor-7)
      - [Set Data](#set-data)
      - [Create Request](#create-request)
      - [URL Parameters](#url-parameters)
      - [Refresh After Change](#refresh-after-change)
      - [Additional Response Info](#additional-response-info)
      - [Create Entry](#create-entry)
    - [OData Update](#odata-update)
      - [Constructor](#constructor-8)
      - [Set Data](#set-data-1)
      - [Update Request](#update-request)
      - [URL Parameters](#url-parameters-1)
      - [Refresh After Change](#refresh-after-change-1)
      - [Additional Response Info](#additional-response-info-1)    
    - [OData Delete](#odata-delete)
      - [Constructor](#constructor-9)
      - [Delete Request](#delete-request)
      - [URL Parameters](#url-parameters-2)
      - [Refresh After Change](#refresh-after-change-2)
      - [Additional Response Info](#additional-response-info-2)     
    - [OData Read](#odata-read)
      - [Constructor](#constructor-10)
      - [Read Request (GET EntitySet)](#read-request-get-entityset)
      - [Read By Key Request (GET Entity)](#read-by-key-request-get-entity)
      - [URL Parameters](#url-parameters-3)
      - [Filters](#filters)
      - [Sorters](#sorters)
      - [Additional Response Info](#additional-response-info-3)       
  - [Fragment Class](#fragment-class)
    - [Constructor](#constructor-11)
    - [Load Content](#load-content)
    - [Open Dialog or Popover](#open-dialog-or-popover)
      - [Open Sync](#open-sync)
      - [Open Async](#open-async)
    - [Close Dialog or Popover](#close-dialog-or-popover)
    - [Get Fragment Content](#get-fragment-content)
    - [Destroy Fragment Content](#destroy-fragment-content)
  - [Planned Features](#planned-features)
  - [Change Log](#change-log)
  - [License](#license)

## Versioning

UI5 Antares and SAPUI5 versions are directly related. The SAPUI5 version used can be determined by ignoring the last 3 digits of the UI5 Antares version. The last 3 digits of the UI5 Antares version increase sequentially after bug fixes or new features. 

> You should install the version that corresponds to the version of your SAPUI5/Fiori Elements application.

> **IMPORTANT:** When the **patch** part of the SAPUI5 version is **0**, the UI5 Antares patch part begins with **999** because the NPM does not permit leading zeros in the version parts. For instance, if the SAPUI5 version is **1.124.0**, the UI5 Antares version will be **1.124.999001**. The last three digits will increase with each bug fix or new feature.

You can see examples of versioning below.

> **Note:** The versions shown in the example below may not exist.

| UI5 Antares Version | SAPUI5 Version | Description                               |
| :------------------ | :------------- | :---------------------------------------- |
| 1.123.1002          | 1.123.1        | Latest Version for 1.123.1                |
| 1.123.1001          | 1.123.1        | One before the latest version for 1.123.1 |
| 1.96.32001          | 1.96.32        | Latest Version for 1.96.32                |
| 1.84.999001         | 1.84.0         | Latest Version for 1.84.0                 |

### Supported SAPUI5 Versions

The table below shows the currently supported and planned SAPUI5 versions. UI5 Antares has initially been released to support version 1.123.1. However, development will also be done for versions with long-term maintenance as specified at [SAPUI5 Version Overview](https://sapui5.hana.ondemand.com/versionoverview.html).

| UI5 Antares Version | SAPUI5 Version | Status    |
| :------------------ | :------------- | :-------- |
| 1.124.1002          | 1.124.1        | Available |
| 1.124.999002        | 1.124.0        | Available |
| 1.123.2002          | 1.123.2        | Available |
| 1.123.1003          | 1.123.1        | Available |
| 1.120.15002         | 1.120.15       | Available |
| 1.120.14002         | 1.120.14       | Available |
| 1.120.13002         | 1.120.13       | Available |
| 1.120.12002         | 1.120.12       | Available |
| 1.120.11002         | 1.120.11       | Available |
| 1.120.1003          | 1.120.1        | Available |
| 1.108.32002         | 1.108.32       | Available |
| 1.108.31002         | 1.108.31       | Available |
| 1.108.30002         | 1.108.30       | Available |
| 1.108.23002         | 1.108.23       | Available |
| 1.96.33002          | 1.96.33        | Available |
| 1.96.32002          | 1.96.32        | Available |
| 1.96.31002          | 1.96.31        | Available |
| 1.96.30002          | 1.96.30        | Available |
| 1.96.25003          | 1.96.25        | Available |
| 1.120.*             | 1.120.*        | Planned   |
| 1.108.*             | 1.108.*        | Planned   |
| 1.96.*              | > 1.96.25      | Planned   |

### NPM Package Tags

If the versioning is confusing, you can use a special tag when installing the package. The most recent version of UI5 Antares that corresponds to a specific SAPUI5 version will always include a tag as follows.

**Tag Naming Convention:** `ui5-${1}-${2}-${3}-latest`

- **\$\{1\}** = Major part of the SAPUI5 version
- **\$\{2\}** = Minor part of the SAPUI5 version
- **\$\{3\}** = Patch part of the SAPUI5 version

As an example, if your SAPUI5 application is version **1.124.0**, you can utilize the following command.

```sh
npm install --save-exact ui5-antares@ui5-1-124-0-latest
```

> **Hint:** The `--save-exact` argument prevents the addition of a caret or tilda in front of the version in the package.json file.

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
- sap.uxap.ObjectPageLayout generation with a SmartForm, SimpleForm or Custom Content
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
  ID: string;
  name?: string;
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // Initialize
          const entry = new EntryCreateCL(this, "Products"); 
        },

        onCreateCategory: async function () {
          // Initialize with a model name
          const entry = new EntryCreateCL(this, "Categories", "myODataModelName");
        }
      });

    });
```

### Create New Entry

**createNewEntry(data?: EntityT)** method creates an entry  for the `EntitySet` which is specified through the class constructor and binds it to the dialog that is automatically generated or loaded from the fragment that is placed in the application files. [createEntry()](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel%23methods/createEntry) method is used to create an entry. The generated/loaded dialog is opened after the entry is created.

By default, **createNewEntry()** method uses the [ODataMetaModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.ODataMetaModel) to determine the `EntityType` of the `EntitySet` that was set by the [constructor](#constructor) and brings all the properties in the same order as the OData metadata into the generated form. 

All **key** properties are marked as mandatory/required and the labels are generated assuming that the naming convention of the `EntityType` is **camelCase**. Please see [Label Generation](#label-generation)

> **Important:** Please be advised that the **createNewEntry()** method must be called after any configurations have been made through the public method of the [Entry Create](#entry-create) class. Any configurations (form title, mandatory properties, etc.) made after the **createNewEntry()** method will not be reflected. Basically, **createNewEntry()** method should be called at the end of your code block.

By default, random UUID value is generated for the **key** properties with **Edm.Guid** type and these fields are not visible on the generated form. However, this behaviour can be modified using the [setGenerateRandomGuid()](#properties-with-edmguid-type) and [setDisplayGuidProperties()](#properties-with-edmguid-type) methods.

#### Method Parameters

| Parameter  | Type                            | Mandatory | Default Value | Description                     | 
| :--------- | :------------------------------ | :-------- | :------------ | :------------------------------ |
| data?      | EntityT or object               | No        | undefined     | The initial values of the entry |

| Returns         | Description                                                                                                                                                          |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise\<void\> | After the promise is resolved, the created entry can be retrieved by the **getEntryContext()** method using the object instantiated from the **EntryCreateCL** class |

> **createNewEntry()** method uses the default configurations when creating the dialog. However, these configurations can be modified using the public setter methods.

[2]: #naming-strategy
[3]: #form-type
[4]: #form-title
[5]: #begin-button-text
[6]: #begin-button-type
[7]: https://sapui5.hana.ondemand.com/#/api/sap.m.ButtonType
[8]: #end-button-text
[9]: #end-button-type
[10]: #resource-bundle-prefix
[11]: #use-metadata-labels
[12]: #namingstrategies-enum
[13]: #formtypes-enum
[14]: #mandatory-error-message

#### Default Values

| Term                    | Default Value                       | Description                                              | Setter                           | Getter                           |
| :---------------------- | :---------------------------------- | :------------------------------------------------------- | :------------------------------- | :------------------------------- |
| Naming Strategy         | [NamingStrategies.CAMEL_CASE][12]   | The default naming strategy is **CAMEL_CASE**            | [setNamingStrategy()][2]         | [getNamingStrategy()][2]         |
| Resource Bundle Prefix  | antares                             | The default resource bundle prefix is **antares**        | [setResourceBundlePrefix()][10]  | [getResourceBundlePrefix()][10]  |
| Use Metadata Labels     | false                               | The labels are not taken from the metadata but generated | [setUseMetadataLabels()][11]     | [getUseMetadataLabels()][11]     |
| Form Type               | [FormTypes.SMART][13]               | SmartForm with SmartFields is generated by default       | [setFormType()][3]               | [getFormType()][3]               |
| Form Title              | Create New + ${entityPath}          | entityPath from the [constructor](#constructor) is used  | [setFormTitle()][4]              | [getFormTitle()][4]              |
| Begin Button Text       | Create                              | The default begin button text is **Create**              | [setBeginButtonText()][5]        | [getBeginButtonText()][5]        |
| Begin Button Type       | [ButtonType.Success][7]             | The default button type is **Success**                   | [setBeginButtonType()][6]        | [getBeginButtonType()][6]        |
| End Button Text         | Close                               | The default end button text is **Close**                 | [setEndButtonText()][8]          | [getEndButtonText()][8]          |
| End Button Type         | [ButtonType.Negative][7]            | The default button type is **Negative**                  | [setEndButtonType()][9]          | [getEndButtonType()][9]          |
| Mandatory Error Message | Please fill in all required fields. | The displayed message when the mandatory check fails     | [setMandatoryErrorMessage()][14] | [getMandatoryErrorMessage()][14] |

<br/>

**TypeScript**

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

    // Call without the initial values
    entry.createNewEntry(); 
  }

  public async onCreateCategory() {
    // Initialize with a type
    const entry = new EntryCreateCL<ICategory>(this, "Categories"); 

    // Call with the initial values
    entry.createNewEntry({
      ID: "ELEC",
      name: "Electronics"
    });
  }
}

interface ICategory {
  ID: string;
  name?: string;
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // Initialize
          const entry = new EntryCreateCL(this, "Products"); 

          // Call without the initial values
          entry.createNewEntry();
        },

        onCreateCategory: async function () {
          // Initialize
          const entry = new EntryCreateCL(this, "Categories"); 

          // Call with the initial values
          entry.createNewEntry({
            ID: "ELEC",
            name: "Electronics"
          });
        }
      });

    });
```

The generated form with default values will more or less look like the following. It will vary depending on the configurations and the `EntityType` properties of the `EntitySet`.

![Generated Form](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/create_new_entry_default.png?raw=true)

### Manual Submit

By default, any changes that are made by the end user on the auto-generated form are automatically submitted by the [Entry Create](#entry-create) and [Entry Update](#entry-update) classes when the end user presses on the begin button. However, there may be a requirement to run some codes before submitting the changes through the OData V2 model. 

It is possible to register a function that will be called instead of running the automatic submit mechanism when the end user presses the begin button.

> **Important:** Please be advised that the manual submit feature is only available for the [Entry Create](#entry-create) and [Entry Update](#entry-update) classes.

> **Important:** It is not possible to use this feature with the [Object Page](#object-page) feature.

To register a function, **registerManualSubmit()** method can be utilized. The registered function will be called when the end user presses the begin button and an object constructed from the [Entry Create](#entry-create) or [Entry Update](#entry-update) class will be passed as a parameter to the function.

To complete the process after running your own code in the registered function, please call the **submitManually()** method using the object passed as a parameter to the function.

Additionally, the auto-generated dialog (sap.m.Dialog) can be obtained by calling the **getGeneratedDialog()** method with the object passed as a parameter to the function.

**Setter (registerManualSubmit)**

| Parameter | Type                                                                  | Mandatory | Description                                                             | 
| :-------- | :-------------------------------------------------------------------- | :-------- | :---------------------------------------------------------------------- |
| submitter | (entry: EntryCreateCL\<EntityT\> \| EntryUpdateCL\<EntityT\>) => void | Yes       | The function that will be called when the user presses the begin button |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getGeneratedDialog)**

| Returns                                                             | Description                       |
| :------------------------------------------------------------------ | :-------------------------------- |
| [sap.m.Dialog](https://sapui5.hana.ondemand.com/#/api/sap.m.Dialog) | Returns the auto-generated dialog |

**Sample**

Let us consider an `EntitySet` named **Products** and we wish to run some codes before submitting the changes through the OData V2 model.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public onCreateProduct() {
    // initialize
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // register the submitter function
    entry.registerManualSubmit(this.createProductManually, this);

    // call the dialog
    entry.createNewEntry();
  }

  // use the same generic type with the constructor in onCreateProduct method
  private async createProductManually(entry: EntryCreateCL<IProducts>) {
    // obtain the generated dialog
    const dialog = entry.getGeneratedDialog();

    dialog.getContent().forEach((content) => {
      // here you can access each element of the dialog
    });

    // run your own code (can also be async)

    // do not forget to complete the submit process
    entry.submitManually();
  }

  public async onUpdateProduct() {
    // Initialize with a type and use the table id as the initializer
    const entry = new EntryUpdateCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: "tblProducts" // table id
    });

    // register the submitter function
    entry.registerManualSubmit(this.updateProductManually, this);

    // call the dialog
    entry.updateEntry();    
  }

  // use the same generic type with the constructor in onUpdateProduct method
  private async updateProductManually(entry: EntryUpdateCL<IProducts>) {
    // obtain the generated dialog
    const dialog = entry.getGeneratedDialog();

    dialog.getContent().forEach((content) => {
      // here you can access each element of the dialog
    });

    // run your own code (can also be async)

    // do not forget to complete the submit process
    entry.submitManually();    
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/entry/v2/EntryUpdateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, EntryUpdateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // initialize
          const entry = new EntryCreateCL(this, "Products");

          // register the submitter function
          entry.registerManualSubmit(this._createProductManually, this);

          // call the dialog
          entry.createNewEntry(); 
        },

        _createProductManually: async function (entry) {
          // obtain the generated dialog
          const dialog = entry.getGeneratedDialog();
      
          dialog.getContent().forEach((content) => {
            // here you can access each element of the dialog
          });
      
          // run your own code (can also be async)
      
          // do not forget to complete the submit process
          entry.submitManually();          
        },

        onUpdateProduct: async function () {
          // Initialize and use the table id as the initializer
          const entry = new EntryUpdateCL(this, {
            entityPath: "Products",
            initializer: "tblProducts" // table id
          });

          // register the submitter function
          entry.registerManualSubmit(this._updateProductManually, this);

          // call the dialog
          entry.updateEntry();      
        },

        _updateProductManually: async function (entry) {
          // obtain the generated dialog
          const dialog = entry.getGeneratedDialog();
      
          dialog.getContent().forEach((content) => {
            // here you can access each element of the dialog
          });
      
          // run your own code (can also be async)
      
          // do not forget to complete the submit process
          entry.submitManually();    
        }

      });

    });
```

### Label Generation

By default, the [Entry Create](#entry-create) class generates labels for form elements within the auto-generated SmartForm/SimpleForm. Here are the steps that will be followed during the creation of the labels.

> The Resource Model has first priority if the metadata labels are not used when creating the labels.

#### Resource Model (i18n)

If the application has a [Resource Model](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.resource.ResourceModel) named `i18n` in the application's **manifest.json** file, the [Entry Create](#entry-create) class looks for the texts for each property of the `EntityType` by assuming that the **key** of the i18n text is written in the format below.

> **Default format of the i18n keys:** antares + [entityPath](#constructor) + propertyName

Here `antares` is a default prefix and can be modified using the [setResourceBundlePrefix()](#resource-bundle-prefix) method. `entityPath` comes from the class constructor and the `propertyName` is the technical name of an `EntityType` property in the OData V2 metadata.

**manifest.json:**

```json
{
  "_version": "1.59.0",
  "sap.app": {
    ...
    "i18n": "path/to/i18n.properties"
  },
  ...
  "sap.ui5": {
    ...
    "models": {
      "i18n": {
          "type": "sap.ui.model.resource.ResourceModel",
          "settings": {
              "bundleName": "your.apps.namespace.i18n.i18n"
          }
      }      
    }
  }
}
```

**Sample**

Let's say that you have an `EntitySet` named **Products** and its `EntityType` has the properties shown in the metadata below. Your application's `i18n.properties` file will be checked for the following keys.

**i18n.properties**

```properties
antaresProductsID=Label of the ID property
antaresProductsname=Label of the name property
antaresProductsdescription=Label of the description property
...
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="1.0" xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">
    <edmx:DataServices m:DataServiceVersion="2.0">
        <Schema Namespace="OnlineShopping" xmlns="http://schemas.microsoft.com/ado/2008/09/edm">
            <EntityContainer Name="EntityContainer" m:IsDefaultEntityContainer="true">
                <EntitySet Name="Products" EntityType="OnlineShopping.Product"/>
            </EntityContainer>
            <EntityType Name="Product">
                <Key>
                    <PropertyRef Name="ID"/>
                </Key>
                <Property Name="ID" Type="Edm.Guid" Nullable="false"/>
                <Property Name="name" Type="Edm.String" MaxLength="50"/>
                <Property Name="description" Type="Edm.String" MaxLength="255"/>
                <Property Name="brand" Type="Edm.String" MaxLength="50"/>
                <Property Name="price" Type="Edm.Decimal" Precision="13" Scale="2" Nullable="false"/>
                <Property Name="currency" Type="Edm.String" MaxLength="5" Nullable="false"/>
                <Property Name="quantityInStock" Type="Edm.Int32"/>
                <Property Name="categoryID" Type="Edm.Guid" Nullable="false"/>
                <Property Name="supplierID" Type="Edm.Guid" Nullable="false"/>
            </EntityType>
        </Schema>
    </edmx:DataServices>
</edmx:Edmx>
```

> If the [Resource Model](#resource-model-i18n) does not exist or the text cannot be found in the `i18n.properties` file, the [Label Generation From The Technical Names](#label-generation-from-the-technical-names) takes place.

#### Label Generation From The Technical Names

If no label could be generated from the [Resource Model](#resource-model-i18n), the [Entry Create](#entry-create) class tries to split the technical property names of the `Entity Type` into **human-readable** words.

By default, it's assumed that the naming convention for the `EntityType` properties is **camelCase**. However, if you have used a different naming convention when creating the `EntityType` properties, [setNamingStrategy()](#naming-strategy) can be used to change the default naming convention.

**Sample**

Here are some samples of how property names are broken down into **human-readable** words in different naming strategies. 

**camelCase**

| Technical Name | Generated Label |
| :------------- | :-------------- |
| productID      | Product ID      |
| firstName      | First Name      |
| lastName       | Last Name       |

**PascalCase**

> Uid, Id and Url words are accepted as special words and converted to upper case after splitting.

| Technical Name | Generated Label |
| :------------- | :-------------- |
| ProductId      | Product ID      |
| FirstName      | First Name      |
| LastName       | Last Name       |

**kebab-case**

| Technical Name | Generated Label |
| :------------- | :-------------- |
| product-id     | Product Id      |
| first-name     | First Name      |
| last-name      | Last Name       |

**CONSTANT_CASE**

| Technical Name | Generated Label |
| :------------- | :-------------- |
| PRODUCT_ID     | Product Id      |
| FIRST_NAME     | First Name      |
| LAST_NAME      | Last Name       |

**snake_case**

| Technical Name | Generated Label |
| :------------- | :-------------- |
| product_id     | Product Id      |
| first_name     | First Name      |
| last_name      | Last Name       |

#### Use Metadata Labels

If you have **com.sap.vocabularies.Common.v1.Label** annotation or **sap:label** extension for your `EntityType` properties in the OData V2 metadata, you can use them as labels for the auto-generated form elements.

> If you set the value to **true** using the setter method and the labels could not be found in the metadata, [Entry Create](#entry-create) class generates the labels as described in [Label Generation](#label-generation).

**Setter (setUseMetadataLabels)**

| Parameter         | Type    | Mandatory | Description                                                                                                           | 
| :---------------- | :------ | :-------- | :-------------------------------------------------------------------------------------------------------------------- |
| useMetadataLabels | boolean | Yes       | If the value is **true**, OData V2 metadata labels will be used when creating labels for auto-generated form elements |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getUseMetadataLabels)**

| Returns | Description                                                                                        |
| :------ | :------------------------------------------------------------------------------------------------- |
| boolean | Returns the value that was set using **setUseMetadataLabels()** method. Default value is **false** |

**TypeScript**

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
    const entry = new EntryCreateCL(this, "Products");

    // The OData V2 metadata labels will be used for the form elements.
    entry.setUseMetadataLabels(true);

    entry.createNewEntry(); 
  }
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // The OData V2 metadata labels will be used for the form elements.
          entry.setUseMetadataLabels(true);

          entry.createNewEntry(); 
        }
      });

    });
```

### Resource Bundle Prefix

To change the default resource bundle prefix that is used in the text lookup described in [Resource Model (i18n)](#resource-model-i18n), **setResourceBundlePrefix()** method can be used.

> If you don't want to have any prefix, you should pass `""` as a parameter to the **setResourceBundlePrefix()** method.

**Setter (setResourceBundlePrefix)**

| Parameter | Type   | Mandatory | Description                                                                     | 
| :-------- | :----- | :-------- | :------------------------------------------------------------------------------ |
| prefix    | string | Yes       | The prefix that is used for text lookup in the **i18n** file of the application |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getResourceBundlePrefix)**

| Returns | Description                                                                                             |
| :------ | :------------------------------------------------------------------------------------------------------ |
| string  | Returns the value that was set using **setResourceBundlePrefix()** method. Default value is **antares** |

**Sample**

Let's say you have an `EntitySet` named **Products** with the properties `productID`, `productName`, and you set the resource bundle prefix to `myPrefix`,  [Entry Create](#entry-create) class will look for the following texts in the application's **i18n** file.

```properties
myPrefixProductsproductID=Label of the productID property
myPrefixProductsproductName=Label of the productName property
```

**TypeScript**

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
    const entry = new EntryCreateCL(this, "Products");

    // New i18n text lookup format will be => myPrefix + entityPath + propertyName
    entry.setResourceBundlePrefix("myPrefix");

    entry.createNewEntry(); 
  }

  public async onCreateCategory() {
    const entry = new EntryCreateCL(this, "Categories");

    // New i18n text lookup format will be => entityPath + propertyName
    entry.setResourceBundlePrefix("");

    entry.createNewEntry();
  }
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // New i18n text lookup format will be => myPrefix + entityPath + propertyName
          entry.setResourceBundlePrefix("myPrefix");

          entry.createNewEntry(); 
        },

        onCreateCategory: async function () {
          const entry = new EntryCreateCL(this, "Categories");

          // New i18n text lookup format will be => entityPath + propertyName
          entry.setResourceBundlePrefix("");

          entry.createNewEntry();          
        }
      });

    });
```

### Naming Strategy

To change the default naming strategy that is used in the label generation as described in [Label Generation From The Technical Names](#label-generation-from-the-technical-names), **setNamingStrategy()** method can be used.

**Setter (setNamingStrategy)**

| Parameter | Type                                       | Mandatory | Description                                           | 
| :-------- | :----------------------------------------- | :-------- | :---------------------------------------------------- |
| strategy  | [NamingStrategies](#namingstrategies-enum) | Yes       | The naming strategy that is used for label generation |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getNamingStrategy)**

| Returns                                    | Description                                                                                          |
| :----------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| [NamingStrategies](#namingstrategies-enum) | Returns the value that was set using **setNamingStrategy()** method. Default value is **CAMEL_CASE** |

**Sample**

Let's say you have an `EntitySet` named **Products** with the properties `product_id`, `product_name`, and you don't want to use the labels from the metadata or the i18n file, but you want the library to generate the labels. To do this, you can set the naming strategy as follows.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import { NamingStrategies } from "ui5/antares/types/entry/enums"; // Import the enum

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL(this, "Products");

    // Set the naming strategy to snake_case
    entry.setNamingStrategy(NamingStrategies.SNAKE_CASE);

    entry.createNewEntry(); 
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/types/entry/enums" // Import the enums
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, EntryEnums) {
      "use strict";

      // Destructure the object to retrieve the NamingStrategies enum
      const { NamingStrategies } = EntryEnums;

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the naming strategy to snake_case
          entry.setNamingStrategy(NamingStrategies.SNAKE_CASE);

          entry.createNewEntry(); 
        }
      });

    });
```

#### NamingStrategies Enum

| Name                           | Description                                                     |
| :----------------------------- | :-------------------------------------------------------------- |
| NamingStrategies.CAMEL_CASE    | `EntityType` properties use **camelCase** naming convention     |
| NamingStrategies.PASCAL_CASE   | `EntityType` properties use **PascalCase** naming convention    |
| NamingStrategies.KEBAB_CASE    | `EntityType` properties use **kebab-case** naming convention    |
| NamingStrategies.CONSTANT_CASE | `EntityType` properties use **CONSTANT_CASE** naming convention |
| NamingStrategies.SNAKE_CASE    | `EntityType` properties use **snake_case** naming convention    |

### Form Type

[101]: https://sapui5.hana.ondemand.com/#/api/sap.m.Input
[102]: https://sapui5.hana.ondemand.com/#/api/sap.m.DatePicker
[103]: https://sapui5.hana.ondemand.com/#/api/sap.m.DateTimePicker
[104]: https://sapui5.hana.ondemand.com/#/api/sap.m.CheckBox
[105]: https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smartform.SmartForm
[106]: https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smartfield.SmartField
[107]: https://sap.github.io/odata-vocabularies/vocabularies/Common.html#ValueListType
[108]: https://sapui5.hana.ondemand.com/#/api/sap.ui.layout.form.SimpleForm

By default, a [sap.ui.comp.smartform.SmartForm][105] with [sap.ui.comp.smartfield.SmartField][106] content is created when the [createNewEntry()](#create-new-entry) method is called. This form type already has some advantages.

1) The form fields are rendered as Input, DatePicker, DateTimePicker, ComboBox, CheckBox, etc. based on the EDM type of the `EntityType` property.
2) Value Help is automatically added to the Smart Fields, when the `EntityType` property is annotated with [com.sap.vocabularies.Common.v1.ValueList][107]

However, UI5 Antares can also create a [sap.ui.layout.form.SimpleForm][108] with [sap.m.Input][101], [sap.m.DatePicker][102], [sap.m.DateTimePicker][103], and [sap.m.CheckBox][104] content based on the EDM types.

> **Important:** The [Value Help](#value-help) feature is only available when the form type is set to **SIMPLE**.

**Rendered Controls for SIMPLE Form Type**

| EDM Type       | Control                                                | Description                                                                                                                                          |
| :------------- | :----------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Boolean        | [sap.m.CheckBox][104]                                  |                                                                                                                                                      |
| DateTime       | [sap.m.DatePicker][102] or [sap.m.DateTimePicker][103] | If the property has **sap:display-format="Date"** has extension, it is rendered as [sap.m.DatePicker][102], otherwise as [sap.m.DateTimePicker][103] |
| DateTimeOffset | [sap.m.DateTimePicker][103]                            |                                                                                                                                                      |
| Others         | [sap.m.Input][101]                                     | If the EDM type of the property is **Edm.Decimal**, precision and scale constraints are added into the input                                         |

To change the default form type, **setFormType()** method can be used.

**Setter (setFormType)**

| Parameter | Type                         | Mandatory | Description                     | 
| :-------- | :--------------------------- | :-------- | :------------------------------ |
| formType  | [FormTypes](#formtypes-enum) | Yes       | The form type that is generated |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getFormType)**

| Returns                      | Description                                                                               |
| :--------------------------- | :---------------------------------------------------------------------------------------- |
| [FormTypes](#formtypes-enum) | Returns the value that was set using **setFormType()** method. Default value is **SMART** |

**Sample**

Let's say you have an `EntitySet` named **Products** , and you want to have a simple form on the dialog that is created. To do this, you can set the form type as follows.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import { FormTypes } from "ui5/antares/types/entry/enums"; // Import the enum

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL(this, "Products");

    // Set the form type to SIMPLE
    entry.setFormType(FormTypes.SIMPLE);

    entry.createNewEntry(); 
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/types/entry/enums" // Import the enums
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, EntryEnums) {
      "use strict";

      // Destructure the object to retrieve the FormTypes enum
      const { FormTypes } = EntryEnums;

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the form type to SIMPLE
          entry.setFormType(FormTypes.SIMPLE);

          entry.createNewEntry(); 
        }
      });

    });
```

### FormTypes Enum

| Name             | Description                                                                      |
| :--------------- | :------------------------------------------------------------------------------- |
| FormTypes.SMART  | SmartForm with SmartField content is generated                                   |
| FormTypes.SIMPLE | SimpleForm with Input, DatePicker, DateTimePicker, CheckBox content is generated |

### Form Title

By default, the generated form's title is a combination of the words **Create New** and the `entityPath` defined in the [constructor](#constructor). For instance, if the `entityPath` is set to **Products**, the title will be **Create New Products**.

To modify the default form title, please utilize the **setFormTitle()** method.

**Setter (setFormTitle)**

| Parameter | Type   | Mandatory | Description                | 
| :-------- | :----- | :-------- | :------------------------- |
| title     | string | Yes       | The generated form's title |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getFormTitle)**

| Returns | Description                                                                                                   |
| :------ | :------------------------------------------------------------------------------------------------------------ |
| string  | Returns the value that was set using **setFormTitle()** method. Default value is **Create new ${entityPath}** |

**Sample**

Please find the result below after the code blocks.

**TypeScript**

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
    const entry = new EntryCreateCL(this, "Products");

    // Set the form title
    entry.setFormTitle("My Form Title");

    entry.createNewEntry(); 
  }
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the form title
          entry.setFormTitle("My Form Title");

          entry.createNewEntry(); 
        }
      });

    });
```

![Form Title](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/form_title.png?raw=true)

### Form Grouping

By default, all the properties of an `EntitySet` are placed in a single group or section in the auto-generated dialog or object page and the title for that group is hidden (it is visible on the object page). It is possible to categorize the properties into different groups in the auto-generated form.

> **Important:** The form grouping feature creates sections in the object page when the [Object Page](#object-page) feature is activated. 

To create the form groups or object page sections, **setFormGroups()** method can be utilized.

> **Important:** All of the **key** properties of the `EntitySet` are placed into a default group, and this behavior is not open to modification. The title of this group can be modified using the **setDefaultGroupTitle()** method. If you don't use **setDefaultGroupTitle()** method, the default group title will remain hidden in the auto-generated dialog. However, it is always visible in the auto-generated object page and the title is derived from the [Form Title](#form-title) feature for the object page.

> **Important:** Any properties that are not included in the **setFormGroups()** method or the default group are placed in a group designated as the **Unknown Group**. To disable the **Unknown Group** set the second parameter of the **setFormGroups()** method to `false`. This configuration allows only the **key** properties and the other properties specified in the **setFormGroups()** method to be visible in the auto-generated dialog or auto-generated object page.

> **Important:** Should you wish to retain the **Unknown Group** but modify the group title, you may use the **setUnknownGroupTitle()** method.

**Setter (setFormGroups)**

| Parameter            | Type                                            | Mandatory | Description                                                                                    | 
| :------------------- | :---------------------------------------------- | :-------- | :--------------------------------------------------------------------------------------------- |
| groups               | [IFormGroups\[\]](#iformgroups-type-definition) | Yes       | The form groups or sections displayed in the auto-generated dialog or object page              |
| includeAllProperties | boolean                                         | No        | If set to **false** all the other **non-key** properties will not be included. Default is true |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getFormGroups)**

| Returns                                         | Description                                                                                |
| :---------------------------------------------- | :----------------------------------------------------------------------------------------- |
| [IFormGroups\[\]](#iformgroups-type-definition) | Returns the groups that were set using **setFormGroups()** method. Default value is **[]** |

---

**Setter (setDefaultGroupTitle)**

| Parameter | Type   | Mandatory | Description                                                                            | 
| :-------- | :----- | :-------- | :------------------------------------------------------------------------------------- |
| title     | string | Yes       | The title of the default group or section that is generated for the **key** properties |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getDefaultGroupTitle)**

| Returns | Description                                                                                                                                                                                          |
| :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string  | Returns the title that was set using **setDefaultGroupTitle()** method. Default value is **undefined** for the dialog. However, it is derived from the [Form Title](#form-title) for the object page |

---

**Setter (setUnknownGroupTitle)**

| Parameter | Type   | Mandatory | Description                                                                              | 
| :-------- | :----- | :-------- | :--------------------------------------------------------------------------------------- |
| title     | string | Yes       | The title of the unknown group or section that is generated for the **other** properties |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getUnknownGroupTitle)**

| Returns | Description                                                                                                |
| :------ | :--------------------------------------------------------------------------------------------------------- |
| string  | Returns the title that was set using **setUnknownGroupTitle()** method. Default value is **Unknown Group** |

---

**Sample:** 

Let us consider an `EntitySet` named **Products** and we wish to categorize the properties into different groups in the auto-generated form. Please see the results after the code blocks.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public onCreateProduct() {
    // initialize
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // set the form groups and include all the other properties
    entry.setFormGroups([{
      title: "My Group 1",
      properties: ["name", "description"]
    },{
      title: "My Group 2",
      properties: ["brand", "price", "currency"]
    }]);

    // set the default group title
    entry.setDefaultGroupTitle("My Default Group");

    // set the unknown group title
    entry.setUnknownGroupTitle("My Unknown Group");

    // call the dialog
    entry.createNewEntry();
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // initialize
          const entry = new EntryCreateCL(this, "Products");

          // set the form groups and include all the other properties
          entry.setFormGroups([{
            title: "My Group 1",
            properties: ["name", "description"]
          },{
            title: "My Group 2",
            properties: ["brand", "price", "currency"]
          }]);

          // set the default group title
          entry.setDefaultGroupTitle("My Default Group");

          // set the unknown group title
          entry.setUnknownGroupTitle("My Unknown Group");

          // call the dialog
          entry.createNewEntry(); 
        }

      });

    });
```

![Form Grouping](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/form_grouping_1.png?raw=true)

#### IFormGroups Type Definition

| Property          | Type       | Description                                         |
| :---------------- | :--------- | :-------------------------------------------------- |
| IFormGroups       | `object`   |                                                     |
| &emsp; title      | `string`   | The title of the form group or object page section  |
| &emsp; properties | `string[]` | The properties that will be included into the group |

### Begin Button Text

Upon pressing the `Begin Button` by the end user, the [Entry Create](#entry-create) class initiates the validation process and submits the transient entity through the OData V2 Model. The default text displayed on the begin button is **Create**. This text can be modified using the **setBeginButtonText()** method.

**Setter (setBeginButtonText)**

| Parameter | Type   | Mandatory | Description                            | 
| :-------- | :----- | :-------- | :------------------------------------- |
| text      | string | Yes       | The text displayed on the begin button |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getBeginButtonText)**

| Returns | Description                                                                                       |
| :------ | :------------------------------------------------------------------------------------------------ |
| string  | Returns the value that was set using **setBeginButtonText()** method. Default value is **Create** |

**Sample**

Please find the result below after the code blocks.

**TypeScript**

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
    const entry = new EntryCreateCL(this, "Products");

    // Set the begin button text
    entry.setBeginButtonText("My Begin Button Text");

    entry.createNewEntry(); 
  }
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the begin button text
          entry.setBeginButtonText("My Begin Button Text");

          entry.createNewEntry(); 
        }
      });

    });
```

![Begin Button Text](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/begin_button_text.png?raw=true)

### Begin Button Type

The default type used on the `Begin Button` is [ButtonType.Success][7]. To modify the default begin button type, please utilize the **setBeginButtonType()** method.

**Setter (setBeginButtonType)**

| Parameter | Type            | Mandatory | Description                  | 
| :-------- | :-------------- | :-------- | :--------------------------- |
| type      | [ButtonType][7] | Yes       | The type of the begin button |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getBeginButtonType)**

| Returns         | Description                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------- |
| [ButtonType][7] | Returns the value that was set using **setBeginButtonType()** method. Default value is **Success** |

**Sample**

Please find the result below after the code blocks.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import { ButtonType } from "sap/m/library"; // Import the ButtonType enum

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL(this, "Products");

    // Set the begin button type
    entry.setBeginButtonType(ButtonType.Attention);

    entry.createNewEntry(); 
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "sap/m/ButtonType" // Import the ButtonType enum
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, ButtonType) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the begin button type
          entry.setBeginButtonType(ButtonType.Attention);

          entry.createNewEntry(); 
        }
      });

    });
```

![Begin Button Type](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/begin_button_type.png?raw=true)

### End Button Text

Upon pressing the `End Button` by the end user, the [Entry Create](#entry-create) class resets the transient entity through the OData V2 Model and destroys the created dialog. The default text displayed on the end button is **Close**. This text can be modified using the **setEndButtonText()** method.

**Setter (setEndButtonText)**

| Parameter | Type   | Mandatory | Description                          | 
| :-------- | :----- | :-------- | :----------------------------------- |
| text      | string | Yes       | The text displayed on the end button |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getEndButtonText)**

| Returns | Description                                                                                    |
| :------ | :--------------------------------------------------------------------------------------------- |
| string  | Returns the value that was set using **setEndButtonText()** method. Default value is **Close** |

**Sample**

Please find the result below after the code blocks.

**TypeScript**

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
    const entry = new EntryCreateCL(this, "Products");

    // Set the end button text
    entry.setEndButtonText("My End Button Text");

    entry.createNewEntry(); 
  }
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the end button text
          entry.setEndButtonText("My End Button Text");

          entry.createNewEntry(); 
        }
      });

    });
```

![End Button Text](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/end_button_text.png?raw=true)

### End Button Type

The default type used on the `End Button` is [ButtonType.Negative][7]. To modify the default end button type, please utilize the **setEndButtonType()** method.

**Setter (setEndButtonType)**

| Parameter | Type            | Mandatory | Description                | 
| :-------- | :-------------- | :-------- | :------------------------- |
| type      | [ButtonType][7] | Yes       | The type of the end button |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getEndButtonType)**

| Returns         | Description                                                                                       |
| :-------------- | :------------------------------------------------------------------------------------------------ |
| [ButtonType][7] | Returns the value that was set using **setEndButtonType()** method. Default value is **Negative** |

**Sample**

Please find the result below after the code blocks.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import { ButtonType } from "sap/m/library"; // Import the ButtonType enum

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL(this, "Products");

    // Set the end button type
    entry.setEndButtonType(ButtonType.Transparent);

    entry.createNewEntry(); 
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "sap/m/ButtonType" // Import the ButtonType enum
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, ButtonType) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the end button type
          entry.setEndButtonType(ButtonType.Transparent);

          entry.createNewEntry(); 
        }
      });

    });
```

![End Button Type](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/end_button_type.png?raw=true)

### Properties with Edm.Guid Type

By default, [Entry Create](#entry-create) class generates random UUID values for the **key** properties (with `Edm.Guid` type) of the `EntityType` and makes them invisible on the form to the end user.

To modify the default random UUID generation behavior, please utilize the **setGenerateRandomGuid()** method.

**Setter (setGenerateRandomGuid)**

| Parameter | Type                                   | Mandatory | Description                         | 
| :-------- | :------------------------------------- | :-------- | :---------------------------------- |
| strategy  | [GuidStrategies](#guidstrategies-enum) | Yes       | The random UUID generation strategy |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getGenerateRandomGuid)**

| Returns                                | Description                                                                                            |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| [GuidStrategies](#guidstrategies-enum) | Returns the value that was set using **setGenerateRandomGuid()** method. Default value is **ONLY_KEY** |

---

To modify the default visibility behavior of the properties with `Edm.Guid` type, please utilize the **setDisplayGuidProperties()** method.

**Setter (setDisplayGuidProperties)**

| Parameter | Type                                   | Mandatory | Description                                                     | 
| :-------- | :------------------------------------- | :-------- | :-------------------------------------------------------------- |
| strategy  | [GuidStrategies](#guidstrategies-enum) | Yes       | The visibility strategy for the properties with `Edm.Guid` type |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getDisplayGuidProperties)**

| Returns                                | Description                                                                                                   |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| [GuidStrategies](#guidstrategies-enum) | Returns the value that was set using **setDisplayGuidProperties()** method. Default value is **ONLY_NON_KEY** |

**Sample**

Let us consider the following scenario: You have an `EntitySet` named **Products** with `ID`, `categoryID`, and `supplierID`, all of which have the `Edm.Guid` type. You would like to allow the end user to view all `Edm.Guid` properties and have the library generate random UUID values only for the **non-key** properties.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import { GuidStrategies } from "ui5/antares/types/entry/enums"; // Import the GuidStrategies enum

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL(this, "Products");

    // Let the end user to display all the properties with Edm.Guid type
    entry.setDisplayGuidProperties(GuidStrategies.ALL);

    // Have the library generate random UUID values only for the non-key properties
    entry.setGenerateRandomGuid(GuidStrategies.ONLY_NON_KEY);

    entry.createNewEntry(); 
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/types/entry/enums" // Import the enums
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, EntryEnums) {
      "use strict";

      // Destructure the object to retrieve the GuidStrategies enum
      const { GuidStrategies } = EntryEnums;

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Let the end user to display all the properties with Edm.Guid type
          entry.setDisplayGuidProperties(GuidStrategies.ALL);

          // Have the library generate random UUID values only for the non-key properties
          entry.setGenerateRandomGuid(GuidStrategies.ONLY_NON_KEY);

          entry.createNewEntry(); 
        }
      });

    });
```

![Guid Strategy](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/guid_strategy.png?raw=true)

#### GuidStrategies Enum

> **Important:** Please note that if a random UUID is generated for a property and marked as visible, this field **cannot be edited** by the end user.

| Name                        | Description for `setGenerateRandomGuid`                                                           |
| :-------------------------- | :------------------------------------------------------------------------------------------------ |
| GuidStrategies.ALL          | Generate random UUID values for all the properties with `Edm.Guid` type                           |
| GuidStrategies.ONLY_KEY     | Generate random UUID values only for the **key** properties with `Edm.Guid` type                  |
| GuidStrategies.ONLY_NON_KEY | Generate random UUID values only for the properties that are **not key** and have `Edm.Guid` type |
| GuidStrategies.NONE         | No random UUID generation                                                                         |

| Name                        | Description for `setDisplayGuidProperties`                                                 |
| :-------------------------- | :----------------------------------------------------------------------------------------- |
| GuidStrategies.ALL          | The end user can display all the properties with `Edm.Guid` type                           |
| GuidStrategies.ONLY_KEY     | The end user can display only the **key** properties with `Edm.Guid` type                  |
| GuidStrategies.ONLY_NON_KEY | The end user can display only the properties that are **not key** and have `Edm.Guid` type |
| GuidStrategies.NONE         | No property with `Edm.Guid` is visible to the end user                                     |

### Form Property Order

The auto-generated form elements are displayed in the same order as the OData V2 metadata by default. 

> **Important:** It should be noted that the **key** properties always come **first** on the auto-generated form. Please be advised that this behavior is not open to modification.

The order of the **non-key** properties can be modified using **setPropertyOrder()** method.

**Setter (setPropertyOrder)**

| Parameter         | Type     | Mandatory | Description                                                                                                                                           | 
| :---------------- | :------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| order             | string[] | Yes       | The order of the **non-key** properties that will be placed into the auto-generated form will be in the same order as this parameter                  |
| useAllProperties? | boolean  | No        | If the value is set to **false**, only the **key** properties and the properties specified in the **order** parameter will be visible to the end user |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getPropertyOrder)**

| Returns  | Description                                                                                 |
| :------- | :------------------------------------------------------------------------------------------ |
| string[] | Returns the value that was set using **setPropertyOrder()** method. Default value is **[]** |

**Sample**

Please find the result below after the code blocks.

**TypeScript**

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
    const entry = new EntryCreateCL(this, "Products");

    // Set the property order and bring all the properties
    entry.setPropertyOrder(["categoryID", "supplierID", "price", "currency", "name"]);

    entry.createNewEntry(); 
  }

  public async onCreateCustomer() {
    const entry = new EntryCreateCL(this, "Customers");

    // Set the property order and exclude the other properties
    entry.setPropertyOrder(["country", "name"], false);

    entry.createNewEntry();     
  }
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the property order and bring all the properties
          entry.setPropertyOrder(["categoryID", "supplierID", "price", "currency", "name"]);

          entry.createNewEntry(); 
        },

        onCreateCustomer: async function () {
          const entry = new EntryCreateCL(this, "Customers");

          // Set the property order and exclude the other properties
          entry.setPropertyOrder(["country", "name"], false);

          entry.createNewEntry();     
        }
      });

    });
```

[201]: https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/before_property_order.png?raw=true
[202]: https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/after_property_order.png?raw=true

| Before                        | After                        |
| :---------------------------: | :--------------------------: |
| ![Before Property Order][201] | ![After Property Order][202] |

### Excluded Properties

By default, all the `EntityType` properties of the `EntitySet` that is set in the class [constructor](#constructor) are visible to the end user.

To exclude properties from the auto-generated form, please use **setExcludedProperties()** method. Please be advised that it is still possible to set initial values for excluded properties through the [createNewEntry()](#create-new-entry) method's parameter.

> **Important:** It is not possible to exclude any of the **key** properties.

**Setter (setExcludedProperties)**

| Parameter  | Type     | Mandatory | Description                                                       | 
| :--------- | :------- | :-------- | :---------------------------------------------------------------- |
| properties | string[] | Yes       | The properties that will be excluded from the auto-generated form |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getExcludedProperties)**

| Returns  | Description                                                                                      |
| :------- | :----------------------------------------------------------------------------------------------- |
| string[] | Returns the value that was set using **setExcludedProperties()** method. Default value is **[]** |

**Sample**

Please find the result below after the code blocks.

**TypeScript**

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
    const entry = new EntryCreateCL(this, "Products");

    // Set the excluded properties
    entry.setExcludedProperties(["categoryID", "supplierID"]);

    entry.createNewEntry(); 
  }
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the excluded properties
          entry.setExcludedProperties(["categoryID", "supplierID"]);

          entry.createNewEntry(); 
        }
      });

    });
```

[203]: https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/before_excluded_properties.png?raw=true
[204]: https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/after_excluded_properties.png?raw=true

| Before                             | After                             |
| :--------------------------------: | :-------------------------------: |
| ![Before Excluded Properties][203] | ![After Excluded Properties][204] |

### Mandatory Properties

[Entry Create](#entry-create) class includes a built-in validation mechanism that checks the mandatory properties and applies [Validation Logic](#validation-logic) before submitting the transient entity.

> **Important:** By default, all the **key** properties and the properties with the `Nullable=false` attribute are marked as mandatory.

In order to include properties in the mandatory check mechanism, **setMandatoryProperties()** method can be utilized.

**Setter (setMandatoryProperties)**

| Parameter  | Type     | Mandatory | Description                                                             | 
| :--------- | :------- | :-------- | :---------------------------------------------------------------------- |
| properties | string[] | Yes       | The properties that will be included into the mandatory check mechanism |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getMandatoryProperties)**

| Returns  | Description                                                                                       |
| :------- | :------------------------------------------------------------------------------------------------ |
| string[] | Returns the value that was set using **setMandatoryProperties()** method. Default value is **[]** |

**Sample**

Please find the result below after the code blocks.

**TypeScript**

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
    const entry = new EntryCreateCL(this, "Products");

    // Set the mandatory properties
    entry.setMandatoryProperties(["name", "description"]);

    entry.createNewEntry(); 
  }
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the mandatory properties
          entry.setMandatoryProperties(["name", "description"]);

          entry.createNewEntry(); 
        }
      });

    });
```

[205]: https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/before_mandatory_properties.png?raw=true
[206]: https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/after_mandatory_properties.png?raw=true

| Before                              | After                              |
| :---------------------------------: | :--------------------------------: |
| ![Before Mandatory Properties][205] | ![After Mandatory Properties][206] |

#### Mandatory Error Message

If a property fails the mandatory check mechanism, the value state of the UI control (SmartField, Input, etc.) is set to `Error`, and a default message is displayed in the [sap.m.MessageBox.error](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) to the end user.

> **Default Message:** Please fill in all required fields.

To customize the default error message, please utilize the **setMandatoryErrorMessage()** method.

**Setter (setMandatoryErrorMessage)**

| Parameter | Type   | Mandatory | Description                                                    | 
| :-------- | :----- | :-------- | :------------------------------------------------------------- |
| message   | string | Yes       | The displayed message when the mandatory check mechanism fails |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getMandatoryErrorMessage)**

| Returns | Description                                                                                                                          |
| :------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| string  | Returns the value that was set using **setMandatoryErrorMessage()** method. Default value is **Please fill in all required fields.** |

**Sample**

Please find the result below after the code blocks.

**TypeScript**

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
    const entry = new EntryCreateCL(this, "Products");

    // Set the mandatory error message
    entry.setMandatoryErrorMessage("My Mandatory Error Message");

    entry.createNewEntry(); 
  }
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the mandatory error message
          entry.setMandatoryErrorMessage("My Mandatory Error Message");

          entry.createNewEntry(); 
        }
      });

    });
```

![Mandatory Error Message](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/mandatory_error_message.png?raw=true)

### Readonly Properties

By default, if the property's type is `Edm.Guid` and the library generates a random UUID for it, the end user is unable to edit it.

> For further information on properties with an `Edm.Guid` type, please refer to the [Properties with Edm.Guid Type](#properties-with-edmguid-type) section.

In order to prevent end users from editing certain properties, **setReadonlyProperties()** method can be utilized.

> **Important:** It is possible to set the initial values for readonly properties.

**Setter (setReadonlyProperties)**

| Parameter  | Type     | Mandatory | Description              | 
| :--------- | :------- | :-------- | :----------------------- |
| properties | string[] | Yes       | The read-only properties |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getReadonlyProperties)**

| Returns  | Description                                                                                      |
| :------- | :----------------------------------------------------------------------------------------------- |
| string[] | Returns the value that was set using **setReadonlyProperties()** method. Default value is **[]** |

**Sample**

Please find the result below after the code blocks.

**TypeScript**

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
    const entry = new EntryCreateCL(this, "Products");

    // Set the read-only properties
    entry.setReadonlyProperties(["name", "description"]);

    entry.createNewEntry({
      name: "My Product Name",
      description: "My Product Description"
    }); 
  }
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Set the read-only properties
          entry.setReadonlyProperties(["name", "description"]);

          entry.createNewEntry({
            name: "My Product Name",
            description: "My Product Description"
          }); 
        }
      });

    });
```

![Readonly Properties](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/readonly_properties.png?raw=true)

### Attach Submit Completed

Once the transient entity has been successfully submitted, [Entry Create](#entry-create) class can then call a function with a specific signature. The result of the submission is then passed to the attached function.

To attach a function, **attachSubmitCompleted()** method can be utilized.

[301]: #constructor

**Setter (attachSubmitCompleted)**

| Parameter       | Type                                                                    | Mandatory | Description                                                        | 
| :-------------- | :---------------------------------------------------------------------- | :-------- | :----------------------------------------------------------------- |
| submitCompleted | (response: [ResponseCL\<ResponseT = object\>](#response-class)) => void | Yes       | The function that will be called after the successful submit       |
| listener?       | object                                                                  | No        | The default listener is the **controller** from [constructor][301] |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Sample**

Once the submission is successful, you would like to receive a response and take the necessary actions.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import ResponseCL from "ui5/antares/entry/v2/ResponseCL"; // Import the ResponseCL class
/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // Attach the submit completed function
    entry.attachSubmitCompleted(this.productSubmitCompleted, this);

    entry.createNewEntry();
  }

  // Please use the same type for the ResponseCL generic as you did for EntryCreateCL
  private productSubmitCompleted(response: ResponseCL<IProducts>): void {
    // Get the status code. Please be aware, it may also be undefined
    const statusCode = response.getStatusCode();

    // Get the data that was submitted. Please be aware, it may also be undefined
    const submittedData = response.getResponse();

    if (submittedData) {
      // Some operations
      const createdProductID = submittedData.ID;
    }
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Attach the submit completed function
          entry.attachSubmitCompleted(this._productSubmitCompleted, this);

          entry.createNewEntry();
        },

        _productSubmitCompleted: function (response) {
          // Get the status code. Please be aware, it may also be undefined
          const statusCode = response.getStatusCode();

          // Get the data that was submitted. Please be aware, it may also be undefined
          const submittedData = response.getResponse();

          if (submittedData) {
            // Some operations
            const createdProductID = submittedData.ID;
          }          
        }
      });

    });
```

### Attach Submit Failed

In the event that the submission of the transient entity is unsuccessful, [Entry Create](#entry-create) class can then call a function with a specific signature. The result of the submission will then be passed to the attached function.

To attach a function, **attachSubmitFailed()** method can be utilized.

**Setter (attachSubmitFailed)**

| Parameter    | Type                                                                 | Mandatory | Description                                                        | 
| :----------- | :------------------------------------------------------------------- | :-------- | :----------------------------------------------------------------- |
| submitFailed | (response: [ResponseCL\<ISubmitResponse\>](#response-class)) => void | Yes       | The function that will be called after the submission fail         |
| listener?    | object                                                               | No        | The default listener is the **controller** from [constructor][301] |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import MessageBox from "sap/m/MessageBox";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import ResponseCL from "ui5/antares/entry/v2/ResponseCL"; // Import the ResponseCL class
import { ISubmitResponse } from "ui5/antares/types/entry/submit"; // Import the error type
/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // Attach the submit failed function
    entry.attachSubmitFailed(this.productSubmitFailed, this);

    entry.createNewEntry();
  }

  // Please use the ISubmitResponse type for the ResponseCL generic
  private productSubmitFailed(response: ResponseCL<ISubmitResponse>): void {
    // Get the status code. Please be aware, it may also be undefined
    const statusCode = response.getStatusCode();

    // Get the response. Please be aware, it may also be undefined
    const reason = response.getResponse();

    // Get the statusText
    if (reason) {
      MessageBox.error(reason.statusText || "The product was not created!");
    }
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "ui5/antares/entry/v2/EntryCreateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Attach the submit failed function
          entry.attachSubmitFailed(this._productSubmitFailed, this);
      
          entry.createNewEntry();
        },

        _productSubmitFailed: function (response) {
          // Get the status code. Please be aware, it may also be undefined
          const statusCode = response.getStatusCode();

          // Get the response. Please be aware, it may also be undefined
          const reason = response.getResponse();

          // Get the statusText
          if (reason) {
            MessageBox.error(reason.statusText || "The product was not created!");
          }     
        }
      });

    });
```

### Response Class

Once the transient entity has been submitted, the generic **ResponseCL\<ResponseT = object\>** object is instantiated and passed to the functions attached using the [attachSubmitCompleted()](#attach-submit-completed) or [attachSubmitFailed()](#attach-submit-failed) methods.

The class has 2 public methods that can be used to retrieve information once the submit has been completed. The return type of the **getResponse()** method is dependent on the response type (success or failure).

**Submit Completed (getResponse)**

| Returns                          | Description                                                                  |
| :------------------------------- | :--------------------------------------------------------------------------- |
| ResponseT or object or undefined | Returns the data that was submitted successfully through the OData V2 Model. |

**Submit Failed (getResponse)**

| Returns                                    | Description                           |
| ------------------------------------------ | ------------------------------------- |
| object                                     |                                       |
| &emsp;statusCode?: `string` \| `undefined` | The status code of the HTTP request.  |
| &emsp;body?: `string` \| `undefined`       | The HTTP response body.               |
| &emsp;statusText?: `string` \| `undefined` | The HTTP status text.                 |
| &emsp;headers?: `object` \| `undefined`    | The HTTP response headers.            |

---

**Submit Completed and Failed (getStatusCode)**

| Returns             | Description                                 |
| :------------------ | :------------------------------------------ |
| string or undefined | Returns the status code of the HTTP Request |

### Value Help

[99]: https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.valuehelpdialog.ValueHelpDialog

[Entry Create](#entry-create) class can create a [Value Help Dialog][99] for the properties that are rendered as [sap.m.Input][101] on the auto-generated form. Please find below a list of the features that the Value Help class offers.

> **Important:** Please be advised that the Value Help feature is only available for the **SIMPLE** Form. Should you require further information, please refer to the [Form Type](#form-type) section.

1) Generates a [Value Help Dialog][99] with a table and filterbar consisting of the `EntitySet` properties defined in the class constructor
2) Handles the filterbar and search field
3) Handles the selection

#### Constructor

You must initialize an object from **ValueHelpCL** in order to use it.

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Mandatory</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>controller</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.ui.core.mvc.Controller">sap.ui.core.mvc.Controller</a></td>
      <td>Yes</td>
      <td></td>
      <td>The controller object (usually <code>this</code>)</td>
    </tr>
    <tr>
      <td>settings</td>
      <td>object</td>
      <td>Yes</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>&emsp;propertyName</td>
      <td>string</td>
      <td>Yes</td>
      <td></td>
      <td>The property of the entity for which the Value Help is being created</td>
    </tr>
    <tr>
      <td>&emsp;valueHelpEntity</td>
      <td>string</td>
      <td>Yes</td>
      <td></td>
      <td>The <code>EntitySet</code> name that will be bound to the table in the value help dialog</td>
    </tr>
    <tr>
      <td>&emsp;valueHelpProperty</td>
      <td>string</td>
      <td>Yes</td>
      <td></td>
      <td>The property of the <code>valueHelpEntity</code> whose value will be set to <code>propertyName</code> after the selection is made in the table</td>
    </tr>
    <tr>
      <td>&emsp;readonlyProperties?</td>
      <td>string[]</td>
      <td>No</td>
      <td>[]</td>
      <td>The properties of the <code>valueHelpEntity</code> that are displayed in the columns of the table</td>
    </tr>
    <tr>
      <td>&emsp;excludedFilterProperties?</td>
      <td>string[]</td>
      <td>No</td>
      <td>[]</td>
      <td>The properties of the <code>valueHelpEntity</code> that are excluded from the filterbar</td>
    </tr>
    <tr>
      <td>&emsp;title?</td>
      <td>string</td>
      <td>No</td>
      <td><code>valueHelpEntity</code></td>
      <td>The title of the Value Help Dialog</td>
    </tr>
    <tr>
      <td>&emsp;searchPlaceholder?</td>
      <td>string</td>
      <td>No</td>
      <td>Search <code>valueHelpEntity</code></td>
      <td>The placeholder in the search field of the Value Help Dialog</td>
    </tr>
    <tr>
      <td>&emsp;namingStrategy?</td>
      <td><a href="#namingstrategies-enum">NamingStrategies</a></td>
      <td>No</td>
      <td>CAMEL_CASE</td>
      <td>The naming strategy that is used to generate the labels for filterbar and table column headers</td>
    </tr>
    <tr>
      <td>&emsp;resourceBundlePrefix?</td>
      <td>string</td>
      <td>No</td>
      <td>antaresVH</td>
      <td>The resource bundle prefix that is used for the i18n text lookup</td>
    </tr>
    <tr>
      <td>&emsp;useMetadataLabels?</td>
      <td>boolean</td>
      <td>No</td>
      <td>false</td>
      <td>Indicates if the labels in metadata should be used for the filterbar and table column headers</td>
    </tr>
    <tr>
      <td>&emsp;filterModelName?</td>
      <td>string</td>
      <td>No</td>
      <td>UI5AntaresVHFilterModel</td>
      <td>The JSONModel name of the filterbar which is needed by the ValueHelpCL</td>
    </tr>
    <tr>
      <td>&emsp;filterCaseSensitive?</td>
      <td>boolean</td>
      <td>No</td>
      <td>false</td>
      <td>Set to <strong>true</strong> for case sensitive search in the filterbar</td>
    </tr>
    <tr>
      <td>modelName?</td>
      <td>string</td>
      <td>No</td>
      <td>undefined</td>
      <td>The name of the OData V2 model. <strong>Do not specify</strong> if the model name = ""</td>
    </tr>
  </tbody>
</table>


---

Here are the steps that **ValueHelpCL** follows when creating the Value Help Dialog.

1) Creates a table and makes the `settings.valueHelpProperty` the first column of the table
2) Adds all the properties specified in the `settings.readonlyProperties` array as columns to the table next to the first column
3) Binds the `EntitySet` specified in the `settings.valueHelpEntity` to the created table
4) Creates a filterbar and UI Controls (Input, DatePicker etc.) for the `settings.valueHelpProperty` and `settings.readonlyProperties` if they don't exist in the `settings.excludedFilterProperties` array
5) Creates a JSON Model for handling the filterbar
6) Creates a search field
7) Uses internal functions to handle the selection and filterbar search

> **Important:** By default, all properties defined in the **readonlyProperties** parameter are included in the filterbar. To exclude properties from the filter bar, use the **excludedFilterProperties** parameter. Properties excluded from the filter bar will still be visible in the table of the Value Help Dialog. Please be advised that the **key** property defined in the **valueHelpProperty** parameter **cannot be excluded** from the filter bar.

#### Label Generation

The **ValueHelpCL** class uses the same methodology as that defined in [Label Generation](#label-generation) for the generation of labels for table column headers and filter bar elements. Please find below a list of the settings that can be applied in different label generation scenarios.

**Scenario 1:** In order to utilise the labels defined in the OData metadata, please set the [settings.useMetadataLabels](#constructor-1) parameter to true.

**Scenario 2:** In order to use i18n labels on the label generation, please either use the default format (antaresVH + `valueHelpEntity` + propertyName) for the text keys or modify the prefix by setting the [settings.resourceBundlePrefix](#constructor-1) parameter.

**Scenario 3:** In order for the library to generate labels from the technical property names of the `EntitySet` that is defined, it is necessary to set the correct value for the [settings.namingStrategy](#constructor-1) parameter.

**Sample**

Let us consider the following scenario: You have an `EntitySet` named **Products** with the following properties: `ID`, `name`, `categoryID`, and `supplierID`. You also have other `EntitySet`s named **Suppliers** and **Categories**, which you would like to use as a Value Help for the **Products-supplierID** and **Products-categoryID** properties.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import ValueHelpCL from "ui5/antares/ui/ValueHelpCL"; // Import the Value Help class
import { FormTypes } from "ui5/antares/types/entry/enums"; // Import the FormTypes enum
/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL(this, "Products");

    // Create an object from the ValueHelpCL class
    const categoryVH = new ValueHelpCL(this, {
        propertyName: "categoryID", // This is the property of the Products entity
        valueHelpEntity: "Categories", // This is the entity set that brings data
        valueHelpProperty: "ID", // This is the property of the entity set that will be mapped to propertyName after the selection is made
        readonlyProperties: ["name"] // These properties will be the columns of the table on the Value Help Dialog
    });

    // Create an object from the ValueHelpCL class
    const supplierVH = new ValueHelpCL(this, {
        propertyName: "supplierID", // This is the property of the Products entity
        valueHelpEntity: "Suppliers", // This is the entity set that brings data
        valueHelpProperty: "ID", // This is the property of the entity set that will be mapped to propertyName after the selection is made
        readonlyProperties: [ // These properties will be the columns of the table on the Value Help Dialog
          "companyName",
          "contactName",
          "contactTitle",
          "country",
          "city",
          "paymentTerms"  
        ],
        excludedFilterProperties: ["contactName"] // These properties will be excluded from the filterbar
    });    

    // Set the form type to SIMPLE to be able to use Value Help feature
    entry.setFormType(FormTypes.SIMPLE);

    // Add the value help object for categoryID
    entry.addValueHelp(categoryVH);

    // Add the value help object for supplierID
    entry.addValueHelp(supplierVH);

    entry.createNewEntry(); 
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/ui/ValueHelpCL", // Import the Value Help class
    "ui5/antares/types/entry/enums" // Import the enums
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, ValueHelpCL, EntryEnums) {
      "use strict";

      // Destructure the object to retrieve the FormTypes enum
      const { FormTypes } = EntryEnums;

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Create an object from the ValueHelpCL class
          const categoryVH = new ValueHelpCL(this, {
              propertyName: "categoryID", // This is the property of the Products entity
              valueHelpEntity: "Categories", // This is the entity set that brings data
              valueHelpProperty: "ID", // This is the property of the entity set that will be mapped to propertyName after the selection is made
              readonlyProperties: ["name"] // These properties will be the columns of the table on the Value Help Dialog
          });

          // Create an object from the ValueHelpCL class
          const supplierVH = new ValueHelpCL(this, {
              propertyName: "supplierID", // This is the property of the Products entity
              valueHelpEntity: "Suppliers", // This is the entity set that brings data
              valueHelpProperty: "ID", // This is the property of the entity set that will be mapped to propertyName after the selection is made
              readonlyProperties: [ // These properties will be the columns of the table on the Value Help Dialog
                "companyName",
                "contactName",
                "contactTitle",
                "country",
                "city",
                "paymentTerms"  
              ],
              excludedFilterProperties: ["contactName"] // These properties will be excluded from the filterbar
          });    

          // Set the form type to SIMPLE to be able to use Value Help feature
          entry.setFormType(FormTypes.SIMPLE);

          // Add the value help object for categoryID
          entry.addValueHelp(categoryVH);

          // Add the value help object for supplierID
          entry.addValueHelp(supplierVH);

          entry.createNewEntry(); 
        }
      });

    });
```

![Value Help](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/value_help_1.png?raw=true)

[207]: https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/value_help_2.png?raw=true
[208]: https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/value_help_3.png?raw=true

| categoryID         | supplierID         |
| :----------------: | :----------------: |
| ![Value Help][207] | ![Value Help][208] |

#### Standalone Usage

The **ValueHelpCL** class can also be utilized as a standalone solution with the [sap.m.Input][101] control.

**Sample**

Let us consider a scenario in which a [sap.m.Input][101] is present on an XML View. The objective is to create a [Value Help Dialog][99] when the **valueHelpRequest** event is triggered by the end user.

![Value Help](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/value_help_4.png?raw=true)

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ValueHelpCL from "ui5/antares/ui/ValueHelpCL"; // Import the Value Help class
import { Input$ValueHelpRequestEvent } from "sap/m/Input"; // Import the Value Help Request event type
/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  // The parameter type should be Input$ValueHelpRequestEvent
  public async onValueHelpRequest(event: Input$ValueHelpRequestEvent) {

    // Create an object from the ValueHelpCL class
    const supplierVH = new ValueHelpCL(this, {
        propertyName: "STANDALONE", // Since this is a mandatory param and not relevant for the standalone usage, you can set anything
        valueHelpEntity: "Suppliers", // This is the entity set that brings data
        valueHelpProperty: "ID", // This is the property of the entity set whose value will be set to the input
        readonlyProperties: [ // These properties will be the columns of the table on the Value Help Dialog
          "companyName",
          "contactName",
          "contactTitle",
          "country",
          "city",
          "paymentTerms"  
        ],
        excludedFilterProperties: ["contactName"] // These properties will be excluded from the filterbar
    });    

    // Pass the Input$ValueHelpRequestEvent to the public openValueHelpDialog method.
    supplierVH.openValueHelpDialog(event);
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/ui/ValueHelpCL" // Import the Value Help class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ValueHelpCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onValueHelpRequest: async function (event) {
          // Create an object from the ValueHelpCL class
          const supplierVH = new ValueHelpCL(this, {
              propertyName: "STANDALONE", // Since this is a mandatory param and not relevant for the standalone usage, you can set anything
              valueHelpEntity: "Suppliers", // This is the entity set that brings data
              valueHelpProperty: "ID", // This is the property of the entity set whose value will be set to the input
              readonlyProperties: [ // These properties will be the columns of the table on the Value Help Dialog
                "companyName",
                "contactName",
                "contactTitle",
                "country",
                "city",
                "paymentTerms"  
              ],
              excludedFilterProperties: ["contactName"] // These properties will be excluded from the filterbar
          });    

          // Pass the event to the public openValueHelpDialog method.
          supplierVH.openValueHelpDialog(event);
        }
      });

    });
```

### Validation Logic

[501]: #validationoperator-enum

The UI5 Antares classes includes a built-in validation mechanism to ensure that the input provided by the end user is accurate and complete before submission through the OData V2 Model.

In the event of a validation failure, the end user is promptly informed via an [sap.m.MessageBox.error](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) and the submission remains in a pending status until the validation is successfully completed.

There are 2 possible approaches to user input validation.

1) [Validation with Operator](#validation-with-operator)
2) [Validation with Validator Function](#validation-with-validator-function)

#### Constructor

You must initialize an object from **ValidationLogicCL** in order to use it.

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Mandatory</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>settings</td>
      <td>object</td>
      <td>Yes</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>&emsp;propertyName</td>
      <td>string</td>
      <td>Yes</td>
      <td></td>
      <td>The property of the entity set in the <a href="#constructor">constructor</a> for which the validation will be done</td>
    </tr>
    <tr>
      <td>&emsp;validator?</td>
      <td>(value: <a href="#validation-with-validator-function">ValidatorValueParameter</a>) => boolean</td>
      <td>No</td>
      <td></td>
      <td>The validator function</td>
    </tr>
    <tr>
      <td>&emsp;listener?</td>
      <td>object</td>
      <td>No</td>
      <td></td>
      <td>The object that is bind to the validator function</td>
    </tr>
    <tr>
      <td>&emsp;value1?</td>
      <td>string | number | Date | <a href="https://sapui5.hana.ondemand.com/#/api/module:sap/ui/core/date/UI5Date">UI5 Date</a></td>
      <td>No</td>
      <td></td>
      <td>First value to use with the given operator</td>
    </tr>
    <tr>
      <td>&emsp;value2?</td>
      <td>string | number | Date | <a href="https://sapui5.hana.ondemand.com/#/api/module:sap/ui/core/date/UI5Date">UI5 Date</a></td>
      <td>No</td>
      <td></td>
      <td>Second value to use with the given operator, used only for the <strong>BT</strong> and <strong>NB</strong> operators</td>
    </tr>
    <tr>
      <td>&emsp;operator?</td>
      <td><a href="#validationoperator-enum">ValidationOperator</a></td>
      <td>No</td>
      <td></td>
      <td>Operator used for the validation</td>
    </tr>
    <tr>
      <td>&emsp;message?</td>
      <td>string</td>
      <td>No</td>
      <td>Validation failed for <code>propertyName</code></td>
      <td>The message that is displayed when the validation fails</td>
    </tr>
    <tr>
      <td>&emsp;showMessageBox?</td>
      <td>boolean</td>
      <td>No</td>
      <td>true</td>
      <td>Indicates if the message box should be displayed by the end user</td>
    </tr>
    <tr>
      <td>&emsp;invalidValueMessage?</td>
      <td>string</td>
      <td>No</td>
      <td>Invalid value for <code>propertyName</code></td>
      <td>Displayed message when the end user types in an invalid value. For instance: string to a number field</td>
    </tr>
  </tbody>
</table>

#### Validation with Operator

If there are specific values that should be used for user input validation, they can be defined easily on the [constructor](#constructor-2).

> **Important:** Please note that **value1** and **value2** determine the type of the property. For example, if the property type is `Edm.DateTime` or `Edm.DateTimeOffset`, then value1 and value2 must be either JavaScript Date or [UI5 Date](https://sapui5.hana.ondemand.com/#/api/module:sap/ui/core/date/UI5Date).

**Sample**

Let us consider an `EntitySet` named **Products** with the following properties: `ID`, `name`, `description`, `price`, and `currency`. We wish to implement a logic that allows the **price** to be between 1500 and 2500, and that the **currency** is limited to EUR.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import ValidationLogicCL from "ui5/antares/ui/ValidationLogicCL"; // Import the ValidationLogicCL class
import { ValidationOperator } from "ui5/antares/types/ui/enums"; // Import the ValidationOperator enum

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // Create an object from the Validation Logic class for the price validation
    const priceValidation = new ValidationLogicCL({
      propertyName: "price", // price property of the Products
      operator: ValidationOperator.BT,
      value1: 1500,
      value2: 2500,
      message: "The price must be between 1500 and 2500",
      invalidValueMessage: "Please only type number for the price field"      
    });

    // Create an object from the Validation Logic class for the currency validation
    const currencyValidation = new ValidationLogicCL({
      propertyName: "currency", // Currency property of the Products
      operator: ValidationOperator.EQ,
      value1: "EUR",
      message: "Only EUR currency can be used"  
    });

    // Add the price validation object
    entry.addValidationLogic(priceValidation);

    // Add the currency validation object
    entry.addValidationLogic(currencyValidation);

    entry.createNewEntry();
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/ui/ValidationLogicCL", // Import the ValidationLogicCL class
    "ui5/antares/types/ui/enums" // Import the enums
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, ValidationLogicCL, UIEnums) {
      "use strict";

      // Destructure the object to retrieve the ValidationOperator enum
      const { ValidationOperator } = UIEnums;

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Create an object from the Validation Logic class for the price validation
          const priceValidation = new ValidationLogicCL({
            propertyName: "price", // price property of the Products
            operator: ValidationOperator.BT,
            value1: 1500,
            value2: 2500,
            message: "The price must be between 1500 and 2500",
            invalidValueMessage: "Please only type number for the price field"      
          });

          // Create an object from the Validation Logic class for the currency validation
          const currencyValidation = new ValidationLogicCL({
            propertyName: "currency", // Currency property of the Products
            operator: ValidationOperator.EQ,
            value1: "EUR",
            message: "Only EUR currency can be used"  
          });

          // Add the price validation object
          entry.addValidationLogic(priceValidation);

          // Add the currency validation object
          entry.addValidationLogic(currencyValidation);

          entry.createNewEntry();
        }
      });

    });
```

[601]: https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/validation_logic_1.png?raw=true
[602]: https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/validation_logic_2.png?raw=true

| Validation Failed         | Invalid Value         |
| :-----------------------: | :-------------------: |
| ![Validation Failed][601] | ![Invalid Value][602] |

#### Validation with Validator Function

If the validation logic is more complex than simply checking specific values, a custom function can be used for the validation.

The function that will be used for the validation must have a parameter to retrieve the value entered by the end user. UI5 Antares passes the user's input or the [Custom Control](#custom-control) to the validator function as a parameter.

> **Important:** The value can be of the following types: string, number, boolean, Date, [UI5 Date](https://sapui5.hana.ondemand.com/#/api/module:sap/ui/core/date/UI5Date), or [Control](https://sapui5.hana.ondemand.com/#/api/sap.ui.core.Control).

> **Important:** If the validator function is utilized for the purpose of validating a [Custom Control](#custom-control), the type of the parameter will be the control that is added. To illustrate, if a [sap.m.ComboBox](https://sapui5.hana.ondemand.com/#/api/sap.m.ComboBox) is added as a custom control, the [sap.m.ComboBox](https://sapui5.hana.ondemand.com/#/api/sap.m.ComboBox) class object will be passed back to the validator function. 

> **Important:** Please note that for auto-generated form elements, the value can only be one of the following types: string, number, boolean, Date, or [UI5 Date](https://sapui5.hana.ondemand.com/#/api/module:sap/ui/core/date/UI5Date)

The validator function should return a **boolean** value indicating whether the validation was successful or not.

| Return Value | Description                  |
| :----------- | :--------------------------- |
| true         | Validation is successful     |
| false        | Validation is not successful |

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import ValidationLogicCL from "ui5/antares/ui/ValidationLogicCL"; // Import the ValidationLogicCL class
import { ValidatorValueParameter } from "ui5/antares/types/ui/validation"; // Import the validator function parameter type

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // Create an object from the Validation Logic class for the currency validation
    const currencyValidation = new ValidationLogicCL({
      propertyName: "currency", // Currency property of the Products
      validator: this.validateCurrency,
      listener: this,
      message: "Only EUR currency can be used"  
    });

    // Add the currency validation object
    entry.addValidationLogic(currencyValidation);

    entry.createNewEntry();
  }

  public validateCurrency(value: ValidatorValueParameter): boolean {
    // Here you can write your own validation logic

    if ((value as string) !== "EUR") {
      return false; // Validation is not successful
    }

    return true; // Validation is successful
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/ui/ValidationLogicCL" // Import the ValidationLogicCL class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, ValidationLogicCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Create an object from the Validation Logic class for the currency validation
          const currencyValidation = new ValidationLogicCL({
            propertyName: "currency", // Currency property of the Products
            validator: this._validateCurrency,
            listener: this,
            message: "Only EUR currency can be used"  
          });

          // Add the currency validation object
          entry.addValidationLogic(currencyValidation);

          entry.createNewEntry();
        },

        _validateCurrency: function (value) {
          // Here you can write your own validation logic

          if (value !== "EUR") {
            return false; // Validation is not successful
          }

          return true; // Validation is successful
        }
      });

    });
```

#### ValidationOperator Enum

| Name                             | Description                                             |
| :------------------------------- | :------------------------------------------------------ |
| ValidationOperator.BT            | Between. Boundries are included                         |
| ValidationOperator.Contains      | Contains. It can only be used with `string` type        |
| ValidationOperator.EndsWith      | Ends with. It can only be used with `string` type       |
| ValidationOperator.EQ            | Equals                                                  |
| ValidationOperator.GE            | Greater than or equals                                  |
| ValidationOperator.GT            | Greater than                                            |
| ValidationOperator.LE            | Little than or equals                                   |
| ValidationOperator.LT            | Little than                                             |
| ValidationOperator.NB            | Not between. Boundries are included                     |
| ValidationOperator.NE            | Not equals                                              |
| ValidationOperator.NotContains   | Not contains. It can only be used with `string` type    |
| ValidationOperator.NotEndsWith   | Not ends with. It can only be used with `string` type   |
| ValidationOperator.NotStartsWith | Not starts with. It can only be used with `string` type |
| ValidationOperator.StartsWith    | Starts with. It can only be used with `string` type     |

### Object Page

By default, the [createNewEntry()](#create-new-entry) method generates a [sap.m.Dialog](https://sapui5.hana.ondemand.com/#/api/sap.m.Dialog) [Simple Form](https://sapui5.hana.ondemand.com/#/api/sap.ui.layout.form.SimpleForm) or [Smart Form](https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smartform.SmartForm) content, with the configurations done using the public methods. However, there may be a need for a larger screen for some of the reasons listed below.

- The `EntitySet` may have many properties that are not user friendly when displayed in a dialog.
- The custom content may not fit in the dialog.

In such cases, UI5 Antares has the capability to generate an [sap.uxap.ObjectPageLayout](https://sapui5.hana.ondemand.com/sdk/#/api/sap.uxap.ObjectPageLayout) instead of a [sap.m.Dialog](https://sapui5.hana.ondemand.com/#/api/sap.m.Dialog).

> **Hint:** All features of a dialog generation process are also available for the object page generation process.

By default, Entry classes generates an object page with a single section including all the properties of an `EntitySet`. The default title for this section is derived from the [Form Title](#form-title). To change the title of this section, please use the **setDefaultGroupTitle()** method.

> **Important:** Please be aware that any custom content added using the [addCustomContent()](#custom-content) or [addContentFromFragment()](#custom-content-from-fragment) methods will be added to a separate section with a default title. The default title for the custom content is **Custom Contents**, but this can be modified using the **setCustomContentSectionTitle()** method.

To generate an object page for the `EntitySet`, the **setDisplayObjectPage()** method can be utilized. The second parameter of this method is the **target name** of the current view. This information is required by the library to return the end user back to the view where the object page was called. The target information can be obtained from the application's **manifest.json** file. To find the target name of the current page, please look into the **"sap.ui5"."routing"."targets"** section in the **manifest.json** file.

> **IMPORTANT:** The object page generation is only available when the SAPUI5 application has a [router](https://sapui5.hana.ondemand.com/sdk/#/topic/e5200ee755f344c8aef8efcbab3308fb) initialized in the UI Component (Component.js). UI5 Antares, uses the router of the application and does not initialize a new router instance.

> **Important:** UI5 Antares does not change the hash when displaying the generated object page. Instead, a new target named **UI5AntaresObjectPageTarget** is added using the application's router. Then, the created target is displayed on the fly.

The target name is **MyTarget** in the sample of the **manifest.json** file provided below.

```json
{
  "sap.app": {
    ...
  },
  "sap.ui": {
    ...
  },
  "sap.ui5": {
    ...
    "routing": {
      "config": {
        ...
      },
      "routes": [
        ...
      ],
      "targets": {
        "MyTarget": {
          "viewType": "XML",
          "transition": "slide",
          "clearControlAggregation": "true",
          "viewId": "MyViewId",
          "viewName": "MyViewName"
        },
        ...
      }
    }
  }
}
```

---

**Setter (setDisplayObjectPage)**

| Parameter  | Type    | Mandatory | Description                                                                                                              | 
| :--------- | :------ | :-------- | :----------------------------------------------------------------------------------------------------------------------- |
| display    | boolean | Yes       | If set to **true**, the library will generate an object page instead of a dialog                                         |
| fromTarget | string  | Yes       | The target name of the view to where the end user should return after finishing the process on the generated object page |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getDisplayObjectPage)**

| Returns | Description                                                                                            |
| :------ | :----------------------------------------------------------------------------------------------------- |
| boolean | Returns all the value that was set using **setDisplayObjectPage()** method. Default value is **false** |

**Sample**

Let us consider an `EntitySet` named **Products** and we wish to have an object page instead of a dialog for the creation process.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public onCreateProduct() {
    // initialize
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // set the default section title
    entry.setDefaultGroupTitle("My Default Section");

    // activate the object page with the target
    entry.setDisplayObjectPage(true, "MyCurrentViewTarget");

    // call the object page
    entry.createNewEntry();
  }
  
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // initialize
          const entry = new EntryCreateCL(this, "Products");

          // set the default section title
          entry.setDefaultGroupTitle("My Default Section");          

          // activate the object page with the target
          entry.setDisplayObjectPage(true, "MyCurrentViewTarget");

          // call the object page
          entry.createNewEntry(); 
        }

      });

    });
```

The generated object page with the default values will look more or less like the following.

![Object Page](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/object_page_1.png?raw=true)

#### Sections

To add sections to the generated object page, [Form Grouping](#form-grouping) feature can be utilized.

#### Header Title

The title in the generated object page is derived from the [Form Title](#form-title) feature.

#### Header Label

The label which is displayed on the right side of the [sap.m.Avatar](https://sapui5.hana.ondemand.com/#/api/sap.m.Avatar) can be modified using the **setObjectPageHeaderLabel()** method. The default values for the header label are listed below.

**Default Values**

| Class                         | Default Value                                         |
| :---------------------------- | :---------------------------------------------------- |
| [Entry Create](#entry-create) | You can create a new ${this.entityName} on this page. |
| [Entry Update](#entry-update) | You can update ${this.entityName} on this page.       |
| [Entry Delete](#entry-delete) | You can delete ${this.entityName} on this page.       |
| [Entry Read](#entry-read)     | You can display ${this.entityName} on this page.      |

**Setter (setObjectPageHeaderLabel)**

| Parameter | Type   | Mandatory | Description                                                                                                               | 
| :-------- | :----- | :-------- | :------------------------------------------------------------------------------------------------------------------------ |
| label     | string | Yes       | The label which is displayed on the right side of the [sap.m.Avatar](https://sapui5.hana.ondemand.com/#/api/sap.m.Avatar) |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getObjectPageHeaderLabel)**

| Returns | Description                                                                                                                    |
| :------ | :----------------------------------------------------------------------------------------------------------------------------- |
| boolean | Returns all the value that was set using **setObjectPageHeaderLabel()** method. Default value differs based on the Entry class |

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public onCreateProduct() {
    // initialize
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // set the header title
    entry.setFormTitle("My Header Title");

    // set the default section title
    entry.setDefaultGroupTitle("My Default Section");

    // set the header label
    entry.setObjectPageHeaderLabel("My Header Label");

    // activate the object page with the target
    entry.setDisplayObjectPage(true, "MyCurrentViewTarget");

    // call the object page
    entry.createNewEntry();
  }
  
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // initialize
          const entry = new EntryCreateCL(this, "Products");

          // set the header title
          entry.setFormTitle("My Header Title");

          // set the default section title
          entry.setDefaultGroupTitle("My Default Section");

          // set the header label
          entry.setObjectPageHeaderLabel("My Header Label");

          // activate the object page with the target
          entry.setDisplayObjectPage(true, "MyCurrentViewTarget");

          // call the object page
          entry.createNewEntry();
        }

      });

    });
```

![Object Page](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/object_page_2.png?raw=true)

#### Header Avatar

To change the **src** of the [sap.m.Avatar](https://sapui5.hana.ondemand.com/#/api/sap.m.Avatar) displayed in the object page, the **setObjectPageAvatarSrc()** method can be utilized. The default values for the avatar are listed below.

**Default Values**

| Class                         | Default Value      |
| :---------------------------- | :----------------- |
| [Entry Create](#entry-create) | sap-icon://add     |
| [Entry Update](#entry-update) | sap-icon://edit    |
| [Entry Delete](#entry-delete) | sap-icon://delete  |
| [Entry Read](#entry-read)     | sap-icon://display |

**Setter (setObjectPageAvatarSrc)**

| Parameter | Type   | Mandatory | Description                                                                                  | 
| :-------- | :----- | :-------- | :------------------------------------------------------------------------------------------- |
| src       | string | Yes       | The src attribute of the [sap.m.Avatar](https://sapui5.hana.ondemand.com/#/api/sap.m.Avatar) |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getObjectPageAvatarSrc)**

| Returns | Description                                                                                                                  |
| :------ | :--------------------------------------------------------------------------------------------------------------------------- |
| string  | Returns all the value that was set using **setObjectPageAvatarSrc()** method. Default value differs based on the Entry class |

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public onCreateProduct() {
    // initialize
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // set the avatar src
    entry.setObjectPageAvatarSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png");

    // call the object page
    entry.createNewEntry();
  }
  
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
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
    function (Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // initialize
          const entry = new EntryCreateCL(this, "Products");

          // set the avatar src
          entry.setObjectPageAvatarSrc("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png");

          // call the object page
          entry.createNewEntry();
        }

      });

    });
```

![Object Page](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/object_page_3.png?raw=true)

#### Custom Content Section Title

To change the default title for the custom contents in the generated object page, the **setCustomContentSectionTitle()** method can be utilized.

**Setter (setCustomContentSectionTitle)**

| Parameter | Type   | Mandatory | Description                                                        | 
| :-------- | :----- | :-------- | :----------------------------------------------------------------- |
| title     | string | Yes       | The title of the section that is generated for the custom contents |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getCustomContentSectionTitle)**

| Returns | Description                                                                                                              |
| :------ | :----------------------------------------------------------------------------------------------------------------------- |
| string  | Returns all the value that was set using **setCustomContentSectionTitle()** method. Default value is **Custom Contents** |

### Custom Control

By default, UI5 Antares creates [sap.ui.comp.smartfield.SmartField][106] when the [form type](#form-type) is **SMART** or [sap.m.Input][101], [sap.m.DatePicker][102], [sap.m.DateTimePicker][103], [sap.m.CheckBox][104] depending on the `Edm Type` of the properties when the [form type](#form-type) is **SIMPLE**.

The **Custom Control** class enables the addition of various UI controls (e.g., [sap.m.Slider](https://sapui5.hana.ondemand.com/#/api/sap.m.Slider)) to the properties of the `EntityType` of the `EntitySet`, as defined in the [constructor](#constructor).

> **Important:** Please note that a custom control can only be added for the properties of an `EntitySet` that have been defined in the [constructor](#constructor).

When generating the form, UI5 Antares first checks to see if there is a corresponding custom control for the property. If one is found, it is added to the form. Otherwise, another UI Control will be generated.

#### Constructor

You must initialize an object from **CustomControlCL** in order to use it.

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Mandatory</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>control</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.ui.core.Control">Control</a></td>
      <td>Yes</td>
      <td></td>
      <td>The UI Control to add into the auto-generated form</td>
    </tr>
    <tr>
      <td>propertyName</td>
      <td>string</td>
      <td>Yes</td>
      <td></td>
      <td>The property of the entity set in the <a href="#constructor">constructor</a> for which the custom control be added</td>
    </tr>
    <tr>
      <td>validator?</td>
      <td><a href="#validation-logic">ValidationLogicCL</a></td>
      <td>No</td>
      <td></td>
      <td>The validation object</td>
    </tr>
  </tbody>
</table>

**Sample**

Let us consider an `EntitySet` named **Products** with the following properties: `ID`, `name`, `description`, `price`, and `currency`. We wish to add a [sap.m.ComboBox](https://sapui5.hana.ondemand.com/#/api/sap.m.ComboBox) with some predefined items for the `currency` property.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import CustomControlCL from "ui5/antares/ui/CustomControlCL"; // Import the Custom Control Class
import ComboBox from "sap/m/ComboBox"; // Import the ComboBox
import Item from "sap/ui/core/Item"; // Import the Item for ComboBox items

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // Create a custom control which is ComboBox in this sample
    const currencyComboBox = new ComboBox({
        selectedKey: "{currency}", // Do not forget to add the path of the property
        items: [
            new Item({ key: "EUR", text: "Euro" }),
            new Item({ key: "USD", text: "US Dollar" }),
            new Item({ key: "TRY", text: "Turkish Lira" }),
        ]
    });

    // Create an object from the CustomControlCL class with the UI Control and property name
    const currencyControl = new CustomControlCL(currencyComboBox, "currency");

    // Add the custom control
    entry.addCustomControl(currencyControl);

    entry.createNewEntry();
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/ui/CustomControlCL", // Import the Custom Control Class
    "sap/m/ComboBox", // Import the ComboBox
    "sap/ui/core/Item" // Import the Item for ComboBox items
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, CustomControlCL, ComboBox, Item) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Create a custom control which is ComboBox in this sample
          const currencyComboBox = new ComboBox({
              selectedKey: "{currency}", // Do not forget to add the path of the property
              items: [
                  new Item({ key: "EUR", text: "Euro" }),
                  new Item({ key: "USD", text: "US Dollar" }),
                  new Item({ key: "TRY", text: "Turkish Lira" }),
              ]
          });

          // Create an object from the CustomControlCL class with the UI Control and property name
          const currencyControl = new CustomControlCL(currencyComboBox, "currency");

          // Add the custom control
          entry.addCustomControl(currencyControl);

          entry.createNewEntry();
        }
      });

    });
```

![Custom Control](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/custom_control_1.png?raw=true)

#### Validation

Furthermore, the custom controls can be configured to execute a [Validation Logic](#validation-logic) before the transient entity is submitted.

**Important:** Since the custom UI control added to the form cannot be predicted by the library, validation and mandatory check can only be performed using the [Validator Function](#validation-with-validator-function).

UI5 Antares, passes the custom UI control as a parameter to the validator function.

**Sample**

Let us consider an `EntitySet` named **Products** with the following properties: `ID`, `name`, `description`, `price`, and `currency`. We wish to add a [sap.m.ComboBox](https://sapui5.hana.ondemand.com/#/api/sap.m.ComboBox) with some predefined items for the `currency` property. 

We also want to validate that the end user cannot leave the `currency` field blank, but must make a selection.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import CustomControlCL from "ui5/antares/ui/CustomControlCL"; // Import the Custom Control Class
import ValidationLogicCL from "ui5/antares/ui/ValidationLogicCL"; // Import the ValidationLogicCL class
import { ValidatorValueParameter } from "ui5/antares/types/ui/validation"; // Import the validator function parameter type
import ComboBox from "sap/m/ComboBox"; // Import the ComboBox
import Item from "sap/ui/core/Item"; // Import the Item for ComboBox items

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // Create a custom control which is ComboBox in this sample
    const currencyComboBox = new ComboBox({
        selectedKey: "{currency}", // Do not forget to add the path of the property
        items: [
            new Item({ key: "EUR", text: "Euro" }),
            new Item({ key: "USD", text: "US Dollar" }),
            new Item({ key: "TRY", text: "Turkish Lira" }),
        ]
    });

    // Create the validation object for the custom control
    const currencyValidation = new ValidationLogicCL({
      propertyName: "currency", // Currency property of the Products
      validator: this.validateCurrency,
      listener: this,
      message: "The currency field is mandatory"        
    });

    // Create an object from the CustomControlCL class with the UI Control, property name and validation object
    const currencyControl = new CustomControlCL(currencyComboBox, "currency", currencyValidation);

    // Add the custom control
    entry.addCustomControl(currencyControl);

    entry.createNewEntry();
  }

  // UI5 Antares will pass the added combobox back to the validator function
  public validateCurrency (control: ValidatorValueParameter): boolean {
    if (!(control as ComboBox).getSelectedKey()) {
      return false; // Validation is unsuccessful
    }

    return true; // Validation is successful
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/ui/CustomControlCL", // Import the Custom Control Class
    "ui5/antares/ui/ValidationLogicCL", // Import the ValidationLogicCL class
    "sap/m/ComboBox", // Import the ComboBox
    "sap/ui/core/Item" // Import the Item for ComboBox items
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, CustomControlCL, ValidationLogicCL, ComboBox, Item) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Create a custom control which is ComboBox in this sample
          const currencyComboBox = new ComboBox({
              selectedKey: "{currency}", // Do not forget to add the path of the property
              items: [
                  new Item({ key: "EUR", text: "Euro" }),
                  new Item({ key: "USD", text: "US Dollar" }),
                  new Item({ key: "TRY", text: "Turkish Lira" }),
              ]
          });

          // Create the validation object for the custom control
          const currencyValidation = new ValidationLogicCL({
            propertyName: "currency", // Currency property of the Products
            validator: this._validateCurrency,
            listener: this,
            message: "The currency field is mandatory"        
          });

          // Create an object from the CustomControlCL class with the UI Control, property name and validation object
          const currencyControl = new CustomControlCL(currencyComboBox, "currency", currencyValidation);

          // Add the custom control
          entry.addCustomControl(currencyControl);

          entry.createNewEntry();
        },

        // UI5 Antares will pass the added combobox back to the validator function
        _validateCurrency: function (control) {
          if (!control.getSelectedKey()) {
            return false; // Validation is unsuccessful
          }

          return true; // Validation is successful          
        }
      });

    });
```

#### Custom Control From Fragment

Another way to add custom controls to the auto-generated form is to load the UI controls from a custom fragment created in the application files.

> **Advantage:** It's possible to add multiple controls at once with this approach. It also avoids having to create UI controls in the controller. The custom controls can be organized in the `.fragment.xml` files.

**Important:** It is mandatory to add a [custom data](https://sapui5.hana.ondemand.com/#/api/sap.ui.core.CustomData) with **UI5AntaresEntityPropertyName** key to the each UI control in the fragment. The value of the **UI5AntaresEntityPropertyName** key should be the **property name** that the control is added for. Otherwise, UI5 Antares will be unable to understand for which property the UI control will be added.

**Sample**

Let us consider an `EntitySet` named **Products** with the following properties: `ID`, `name`, `description`, `price`, and `currency`. We wish to add a [sap.m.ComboBox](https://sapui5.hana.ondemand.com/#/api/sap.m.ComboBox) with some predefined items for the `currency` property and a [sap.m.Slider](https://sapui5.hana.ondemand.com/#/api/sap.m.Slider) for the `price` property.

Firstly, a file with `.fragment.xml` extension should be created in the application files. The UI controls will be placed into this file.

```xml
<core:FragmentDefinition
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
    xmlns:app="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"
>
    <ComboBox
        app:UI5AntaresEntityPropertyName="currency"
        selectedKey="{currency}"
    >
        <items>
            <core:Item
                key="EUR"
                text="Euro"
            />
            <core:Item
                key="USD"
                text="US Dollar"
            />
            <core:Item
                key="TRY"
                text="Turkish Lira"
            />
        </items>
    </ComboBox>
    <Slider
        app:UI5AntaresEntityPropertyName="price"
        width="100%"
        min="1000"
        max="100000"
        showAdvancedTooltip="true"
        showHandleTooltip="true"
        inputsAsTooltips="true"
        enableTickmarks="true"
        step="1000"
        class="sapUiMediumMarginBottom"
        value="{price}"
    />
</core:FragmentDefinition>
```

![Custom Control From Fragment](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/custom_control_fragment_1.png?raw=true)

Secondly, an object from the [FragmentCL](#fragment-class) should be instantiated with the controller and fragment path parameters.

> **Information:** Please be aware that **addControlFromFragment()** function is **asynchronous** and must be awaited.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the Fragment class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // Create an object from the FragmentCL class with the controller and fragment path parameters.
    const fragment = new FragmentCL(this, "your.apps.namespace.path.to.FragmentFileName");

    // Add the controls from the fragment. It is an asynchronous method and must be awaited.
    await entry.addControlFromFragment(fragment);

    entry.createNewEntry();
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/ui/FragmentCL" // Import the Fragment class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Create an object from the FragmentCL class with the controller and fragment path parameters.
          const fragment = new FragmentCL(this, "your.apps.namespace.path.to.FragmentFileName");

          // Add the controls from the fragment. It is an asynchronous method and must be awaited.
          await entry.addControlFromFragment(fragment);

          entry.createNewEntry();
        }
      });

    });
```

![Custom Control From Fragment](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/custom_control_fragment_2.png?raw=true)

#### Validation

Furthermore, the custom controls loaded from a fragment can be configured to execute a [Validation Logic](#validation-logic) before the transient entity is submitted.

**Important:** Since the custom UI control added to the form cannot be predicted by the library, validation and mandatory check can only be performed using the [Validator Function](#validation-with-validator-function).

UI5 Antares, passes the custom UI control as a parameter to the validator function.

To implement validation logic for controls loaded from a fragment, a [custom data](https://sapui5.hana.ondemand.com/#/api/sap.ui.core.CustomData) with the **UI5AntaresValidationLogic** key must be added to the control. The value of the **UI5AntaresValidationLogic** key should be the **name** of the [validator function](#validation-with-validator-function) in the controller.

Additionally, the default message displayed by the end user when the validation fails can be modified by setting a [custom data](https://sapui5.hana.ondemand.com/#/api/sap.ui.core.CustomData) with the key **UI5AntaresValidationMessage**. The value of the **UI5AntaresValidationMessage** can be either the message itself or the i18n binding.

**Sample**

Let us consider an `EntitySet` named **Products** with the following properties: `ID`, `name`, `description`, `price`, and `currency`. We wish to add a [sap.m.ComboBox](https://sapui5.hana.ondemand.com/#/api/sap.m.ComboBox) with some predefined items for the `currency` property and a [sap.m.Slider](https://sapui5.hana.ondemand.com/#/api/sap.m.Slider) for the `price` property Furthermore, we would like to include a validation and validation messages.

Firstly, a file with `.fragment.xml` extension should be created in the application files. The UI controls will be placed into this file.

```xml
<core:FragmentDefinition
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
    xmlns:app="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"
>
    <ComboBox
        app:UI5AntaresEntityPropertyName="currency"
        app:UI5AntaresValidationLogic="onValidateCurrency"
        app:UI5AntaresValidationMessage="{i18n>currencyValidationFailed}"
        selectedKey="{currency}"
    >
        <items>
            <core:Item
                key="EUR"
                text="Euro"
            />
            <core:Item
                key="USD"
                text="US Dollar"
            />
            <core:Item
                key="TRY"
                text="Turkish Lira"
            />
        </items>
    </ComboBox>
    <Slider
        app:UI5AntaresEntityPropertyName="price"
        app:UI5AntaresValidationLogic="onValidatePrice"
        app:UI5AntaresValidationMessage="The price must be bigger than 15000"
        width="100%"
        min="1000"
        max="100000"
        showAdvancedTooltip="true"
        showHandleTooltip="true"
        inputsAsTooltips="true"
        enableTickmarks="true"
        step="1000"
        class="sapUiMediumMarginBottom"
        value="{price}"
    />
</core:FragmentDefinition>
```

![Custom Control From Fragment](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/custom_control_fragment_3.png?raw=true)

Secondly, an object from the [FragmentCL](#fragment-class) should be instantiated with the controller and fragment path parameters.

> **Information:** Please be aware that **addControlFromFragment()** function is **asynchronous** and must be awaited.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the Fragment class
import { ValidatorValueParameter } from "ui5/antares/types/ui/validation"; // Import the validator function parameter type
import ComboBox from "sap/m/ComboBox";
import Slider from "sap/m/Slider";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // Create an object from the FragmentCL class with the controller and fragment path parameters.
    const fragment = new FragmentCL(this, "your.apps.namespace.path.to.FragmentFileName");

    // Add the controls from the fragment. It is an asynchronous method and must be awaited.
    await entry.addControlFromFragment(fragment);

    entry.createNewEntry();
  }

  // The name of the validator function must match to the custom data UI5AntaresValidationLogic defined in the .fragment.xml file
  public onValidateCurrency (control: ValidatorValueParameter): boolean {
    if (!(control as ComboBox).getSelectedKey()) {
      return false; // Validation is unsuccessful
    }

    return true; // Validation is successful
  }

  // The name of the validator function must match to the custom data UI5AntaresValidationLogic defined in the .fragment.xml file
  public onValidatePrice (control: ValidatorValueParameter): boolean {
    if ((control as Slider).getValue() <= 15000) {
      return false; // Validation is unsuccessful
    }

    return true; // Validation is successful
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/ui/FragmentCL" // Import the Fragment class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Create an object from the FragmentCL class with the controller and fragment path parameters.
          const fragment = new FragmentCL(this, "your.apps.namespace.path.to.FragmentFileName");

          // Add the controls from the fragment. It is an asynchronous method and must be awaited.
          await entry.addControlFromFragment(fragment);

          entry.createNewEntry();
        },

        // The name of the validator function must match to the custom data UI5AntaresValidationLogic defined in the .fragment.xml file
        onValidateCurrency: function (control) {
          if (!control.getSelectedKey()) {
            return false; // Validation is unsuccessful
          }

          return true; // Validation is successful
        },

        // The name of the validator function must match to the custom data UI5AntaresValidationLogic defined in the .fragment.xml file
        onValidatePrice: function (control) {
          if (control.getValue() <= 15000) {
            return false; // Validation is unsuccessful
          }

          return true; // Validation is successful
        }        
      });

    });
```

### Custom Content

It is possible to add any UI control to the dialog below the auto-generated form. The distinction between [Custom Control](#custom-control) and **Custom Content** is that the custom control can only be added for the properties of the `EntitySet` specified in the [constructor](#constructor), whereas the custom content is a UI control that is required on the dialog but is not included in the transient entity.

> **Important:** Custom contents are not included into the [Validation Logic](#validation-logic) process. The UI5 Antares is designed just to add custom contents to the dialog. However, it is important to note that the custom content must be managed manually.

For example, a custom content could be a [sap.m.Image](https://sapui5.hana.ondemand.com/#/api/sap.m.Image), [sap.m.upload.UploadSet](https://sapui5.hana.ondemand.com/#/api/sap.m.upload.UploadSet), or any other UI control that is required on the dialog.

[701]: https://sapui5.hana.ondemand.com/#/api/sap.ui.core.Control

To add a custom content to the dialog, **addCustomContent()** method can be utilized.

**Setter (addCustomContent)**

| Parameter | Type           | Mandatory | Description                           | 
| :-------- | :------------- | :-------- | :------------------------------------ |
| content   | [Control][701] | Yes       | The UI control to add into the dialog |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getCustomContents)**

| Returns          | Description                                                                                              |
| :--------------- | :------------------------------------------------------------------------------------------------------- |
| [Control[]][701] | Returns all the UI controls that were added using **addCustomContent()** method. Default value is **[]** |

**Sample**

Let us consider an `EntitySet` named **Products** and we wish to add an [sap.m.upload.UploadSet](https://sapui5.hana.ondemand.com/#/api/sap.m.upload.UploadSet) to the dialog that UI5 Antares will generate.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import UploadSet from "sap/m/upload/UploadSet"; // Import the Upload Set

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL(this, "Products");

    // Create the custom content
    const upload = new UploadSet();
    upload.addStyleClass("sapUiSmallMargin");

    // Add the custom content
    entry.addCustomContent(upload);

    entry.createNewEntry(); 
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "sap/m/upload/UploadSet" // Import the Upload Set
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, UploadSet) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Create the custom content
          const upload = new UploadSet();
          upload.addStyleClass("sapUiSmallMargin");

          // Add the custom content
          entry.addCustomContent(upload);

          entry.createNewEntry(); 
        }
      });

    });
```

![Custom Content](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/custom_content_1.png?raw=true)

#### Custom Content From Fragment

Another way to add custom contents to the dialog is to load the UI controls from a custom fragment created in the application files.

> **Advantage:** It's possible to add multiple contents at once with this approach. It also avoids having to create UI controls in the controller. The custom contents can be organized in the `.fragment.xml` files.

**Sample**

Let us consider an `EntitySet` named **Products** and we wish to add an [sap.m.Image](https://sapui5.hana.ondemand.com/#/api/sap.m.Image) and an [sap.m.RadioButtonGroup](https://sapui5.hana.ondemand.com/#/api/sap.m.RadioButtonGroup) loaded from a fragment to the dialog that UI5 Antares will generate.

Firstly, a file with `.fragment.xml` extension should be created in the application files. The UI controls will be placed into this file.

```xml
<core:FragmentDefinition
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>
    <VBox>
        <FlexBox justifyContent="Center">
            <Image
                class="sapUiSmallMargin"
                src="./img/antares.jpg"
                width="10rem"
            />
        </FlexBox>
        <RadioButtonGroup selectedIndex="0">
            <buttons>
                <RadioButton text="Option 1" />
                <RadioButton text="Option 2" />
                <RadioButton text="Option 3" />
            </buttons>
        </RadioButtonGroup>
    </VBox>
</core:FragmentDefinition>
```

![Custom Content From Fragment](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/custom_content_fragment_1.png?raw=true)

Secondly, an object from the [FragmentCL](#fragment-class) should be instantiated with the controller and fragment path parameters.

> **Information:** Please be aware that **addContentFromFragment()** function is **asynchronous** and must be awaited.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the Fragment class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    const entry = new EntryCreateCL<IProducts>(this, "Products");

    // Create an object from the FragmentCL class with the controller and fragment path parameters.
    const fragment = new FragmentCL(this, "your.apps.namespace.path.to.FragmentFileName");

    // Add the controls from the fragment. It is an asynchronous method and must be awaited.
    await entry.addContentFromFragment(fragment);

    entry.createNewEntry();
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "ui5/antares/ui/FragmentCL" // Import the Fragment class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          const entry = new EntryCreateCL(this, "Products");

          // Create an object from the FragmentCL class with the controller and fragment path parameters.
          const fragment = new FragmentCL(this, "your.apps.namespace.path.to.FragmentFileName");

          // Add the controls from the fragment. It is an asynchronous method and must be awaited.
          await entry.addContentFromFragment(fragment);

          entry.createNewEntry();
        }
      });

    });
```

![Custom Content From Fragment](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/custom_content_fragment_2.png?raw=true)

### Custom Fragment

If you prefer not to have the library generate a form and content, you may also use your own fragment and dialog with any content you desire. UI5 Antares will create a transient entity and open the dialog loaded from your fragment. Additionally, the transient entity will be bound to the dialog.

Please be aware that there are some manual steps that must be taken when using a custom fragment.

1) [Entry Create](#entry-create) class provides a public method named **submit()** which must be called manually to submit the transient entity.
2) [Entry Create](#entry-create) class provides a public method named **reset()** that must be called in the event that the transient entity will not be submitted and the dialog is closed and destroyed.

> **Information:** The **submit(resetAllOnFail:boolean = false)** method accepts an optional parameter with a default value of false. This parameter indicates whether all transient entities in the OData V2 Model should be reset or only the current context. If you wish to **reset all** transient entities, please set this parameter to **true**. If you only wish to reset the current transient entity, there is no need to set this parameter. 

> **Important:** Please be advised that the fragment to be loaded must contain a [sap.m.Dialog](https://sapui5.hana.ondemand.com/#/api/sap.m.Dialog) and that all UI controls must be placed as the content of the dialog.

> **Important:** It should be noted that only a limited number of features of the UI5 Antares can be utilized with a custom fragment.

**Supported Features**

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#mandatory-properties">Mandatory Properties</a></td>
      <td>By default, UI5 Antares performs a mandatory check for the properties with <strong>Nullable="false"</strong> attribute and the properties defined using <strong>setMandatoryProperties()</strong> method. However, this feature can be deactived using <a href="#auto-mandatory-check">setAutoMandatoryCheck()</a> method</td>
    </tr>
    <tr>
      <td><a href="#mandatory-error-message">Mandatory Error Message</a></td>
      <td>The default message that is displayed when the mandatory check fails can be modified</td>
    </tr>
    <tr>
      <td><a href="#attach-submit-completed">Attach Submit Completed</a></td>
      <td>It is possible to create a function that will be called after the transient entity has been submitted successfully</td>
    </tr>
    <tr>
      <td><a href="#attach-submit-failed">Attach Submit Failed</a></td>
      <td>It is possible to create a function that will be called if the transient entity submission fails</td>
    </tr>
    <tr>
      <td><a href="#properties-with-edmguid-type">Properties with Edm.Guid Type</a></td>
      <td>By default, UI5 Antares generates random UUID for the <strong>key</strong> properties with Edm.Guid type</td>
    </tr>
  </tbody>
</table>

To use a custom fragment, **setFragmentPath()** method can be utilized.

**Setter (setFragmentPath)**

| Parameter          | Type    | Mandatory | Description                                                                                                                                | 
| :----------------- | :------ | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| fragmentPath       | string  | Yes       | The path of the fragment that will be loaded by the library                                                                                |
| containsSmartForm? | boolean | No        | It should be set to **true** if the dialog contains a [Smart Form](https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smartform.SmartForm) |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getFragmentPath)**

| Returns             | Description                                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------------------------------ |
| string \| undefined | Returns all the fragment path that was set using **getFragmentPath()** method. Default value is **undefined** |

**Sample**

Let us consider an `EntitySet` named **Products** and we wish to create a custom fragment instead of having the library generate a form.

Firstly, a file with `.fragment.xml` extension should be created in the application files. The UI controls will be placed into this file.

```xml
<core:FragmentDefinition
    xmlns:form="sap.ui.layout.form"
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>
    <Dialog title="Create New Product">
        <form:SimpleForm>
            <form:content>
                <Label text="Product ID" />
                <MaskInput
                    mask="CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC"
                    value="{ID}"
                    placeholderSymbol="_"
                >
                    <rules>
                        <MaskInputRule
                            maskFormatSymbol="C"
                            regex="[a-f0-9]"
                        />
                    </rules>
                </MaskInput>
                <Label text="Name" />
                <Input value="{name}" />
                <Label text="Description" />
                <TextArea
                    value="{description}"
                    rows="5"
                />
                <Label text="Price" />
                <Slider
                    width="100%"
                    min="1000"
                    max="100000"
                    showAdvancedTooltip="true"
                    showHandleTooltip="true"
                    inputsAsTooltips="true"
                    enableTickmarks="true"
                    step="1000"
                    class="sapUiMediumMarginBottom"
                    value="{price}"
                />
                <Label text="Currency" />
                <ComboBox selectedKey="{currency}">
                    <items>
                        <core:Item
                            key="EUR"
                            text="Euro"
                        />
                        <core:Item
                            key="USD"
                            text="US Dollar"
                        />
                        <core:Item
                            key="TRY"
                            text="Turkish Lira"
                        />
                    </items>
                </ComboBox>
            </form:content>
        </form:SimpleForm>
        <beginButton>
            <Button
                text="Complete"
                press="onCompleteProduct"
            />
        </beginButton>
        <endButton>
            <Button
                text="Close"
                press="onCloseProductDialog"
            />
        </endButton>
    </Dialog>
</core:FragmentDefinition>
```

![Custom Fragment](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/custom_fragment_1.png?raw=true)

Secondly, an object from the [Entry Create](#entry-create) should be instantiated with the controller and `EntitySet` name.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL"; // Import the class
import ResponseCL from "ui5/antares/entry/v2/ResponseCL"; // Import the ResponseCL class
import { ISubmitResponse } from "ui5/antares/types/entry/submit"; // Import the error type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  // Class property
  private productEntry: EntryCreateCL<IProducts>;

  public onInit() {

  }

  public async onCreateProduct () {
    // Create an object and set it to the class property
    this.productEntry = new EntryCreateCL<IProducts>(this, "Products");

    // Set the path of the custom fragment
    this.productEntry.setFragmentPath("your.apps.namespace.path.to.FragmentFileName");

    // Attach submit completed
    this.productEntry.attachSubmitCompleted(this.productSubmitCompleted, this);

    // Attach submit failed
    this.productEntry.attachSubmitFailed(this.productSubmitFailed, this);

    // Load the fragment
    this.productEntry.createNewEntry();
  }

  // Press event of the begin button in the dialog
  public onCompleteProduct () {
    // Do your validation

    // Submit the entity
    this.productEntry.submit();
  }

  // Press event of the end button in the dialog
  public onCloseProductDialog () {
    // Reset the entity and close the dialog
    this.productEntry.reset();
  } 

  // Submit Completed Handler
  private productSubmitCompleted (response: ResponseCL<IProducts>): void {
    // Get the status code. Please be aware, it may also be undefined
    const statusCode = response.getStatusCode();

    // Get the data that was submitted. Please be aware, it may also be undefined
    const submittedData = response.getResponse();

    if (submittedData) {
      // Some operations
      const createdProductID = submittedData.ID;
    }
  }

  // Please use the ISubmitResponse type for the ResponseCL generic
  private productSubmitFailed(response: ResponseCL<ISubmitResponse>): void {
    // Get the status code. Please be aware, it may also be undefined
    const statusCode = response.getStatusCode();

    // Get the response. Please be aware, it may also be undefined
    const reason = response.getResponse();

    // Get the statusText
    if (reason) {
      MessageBox.error(reason.statusText || "The product was not created!");
    }
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryCreateCL", // Import the class
    "sap/m/MessageBox" // Import the Fragment class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryCreateCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // Create an object and set it to the class property
          this.productEntry = new EntryCreateCL(this, "Products");

          // Set the path of the custom fragment
          this.productEntry.setFragmentPath("your.apps.namespace.path.to.FragmentFileName");

          // Attach submit completed
          this.productEntry.attachSubmitCompleted(this.productSubmitCompleted, this);

          // Attach submit failed
          this.productEntry.attachSubmitFailed(this.productSubmitFailed, this);

          // Load the fragment
          this.productEntry.createNewEntry();
        },

        // Press event of the begin button in the dialog
        onCompleteProduct: function () {
          // Do your validation

          // Submit the entity
          this.productEntry.submit();
        },

        // Press event of the end button in the dialog
        onCloseProductDialog: function () {
          // Reset the entity and close the dialog
          this.productEntry.reset();
        }, 

        // Submit Completed Handler
        productSubmitCompleted: function (response) {
          // Get the status code. Please be aware, it may also be undefined
          const statusCode = response.getStatusCode();

          // Get the data that was submitted. Please be aware, it may also be undefined
          const submittedData = response.getResponse();

          if (submittedData) {
            // Some operations
            const createdProductID = submittedData.ID;
          }
        },

        // Submit Failed Handler
        productSubmitFailed: function (response) {
          // Get the status code. Please be aware, it may also be undefined
          const statusCode = response.getStatusCode();

          // Get the response. Please be aware, it may also be undefined
          const reason = response.getResponse();

          // Get the statusText
          if (reason) {
            MessageBox.error(reason.statusText || "The product was not created!");
          }
        }   
      });

    });
```

![Custom Fragment](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/custom_fragment_2.png?raw=true)

#### Auto Mandatory Check

By default, UI5 Antares performs a mandatory check for the properties with **Nullable="false"** attribute and the properties defined using [setMandatoryProperties()](#mandatory-properties) method. However, this feature can be deactived using **setAutoMandatoryCheck()** method.

**Setter (setAutoMandatoryCheck)**

| Parameter          | Type     | Mandatory | Description                                         | 
| :----------------- | :------- | :-------- | :-------------------------------------------------- |
| autoMandatoryCheck | boolean  | Yes       | If set to **false**, mandatory check is deactivated |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getAutoMandatoryCheck)**

| Returns | Description                                                                                        |
| :------ | :------------------------------------------------------------------------------------------------- |
| boolean | Returns the value that was set using **setAutoMandatoryCheck()** method. Default value is **true** |

## Entry Update

Entry Update (EntryUpdateCL) is a class that manages the UPDATE (PATCH/MERGE/PUT) operation through the OData V2 model. It basically avoids developers having to deal with fragments, user input validations, Value Help creations while working on custom SAPUI5 applications or Fiori Elements extensions. Below you can see the features that Entry Update has.

**Features:**
- sap.m.Dialog generation with a SmartForm, SimpleForm or Custom content
- sap.uxap.ObjectPageLayout generation with a SmartForm, SimpleForm or Custom Content
- User input validation via ValidationLogicCL class
- Value Help Dialog generation via ValueHelpCL class
- Property sorting, readonly properties
- Label generation for the SmartForm, SimpleForm elements
- submitChanges(), and resetChanges() handling based on the user interaction
- Call a fragment and bind the context in case you do not want to use the auto-generated dialog

### Use Case

Let's say that you have an EntitySet named `Products` which is bound to a table and you want to let the end user select a line from the table and edit the selected entity on a pop-up screen using the OData V2 service in your custom SAPUI5 application. Here are the steps you need to follow.

1) You need to create a **.fragment.xml** file that contains a Dialog with a form content (Simple, Smart etc.) and call it from the controller or generate the dialog directly on the controller
2) You have to write tons of Value Help code if you don't use [sap.ui.comp.smartfield.SmartField](https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smartfield.SmartField) with the OData Annotations
3) You need to validate the user input, such as checking mandatory fields and ensuring that the values entered match your business logic
4) You need to handle the table selection and the binding of the selected entity to the dialog or form

[EntryUpdateCL](#entry-update) class basically handles all of the steps defined above.

### Constructor

You must initialize an object from EntryUpdateCL in order to use it.

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Mandatory</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>controller</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.ui.core.mvc.Controller">sap.ui.core.mvc.Controller</a></td>
      <td>Yes</td>
      <td></td>
      <td>The controller object (usually <code>this</code>)</td>
    </tr>
    <tr>
      <td>settings</td>
      <td>object</td>
      <td>Yes</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>&emsp;entityPath</td>
      <td>string</td>
      <td>Yes</td>
      <td></td>
      <td>The name of the <strong>EntitySet</strong>. It can start with a <strong>"/"</strong></td>
    </tr>
    <tr>
      <td>&emsp;initializer</td>
      <td>string | <a href="https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Context">sap.ui.model.Context</a> | EntityKeysT</td>
      <td>Yes</td>
      <td></td>
      <td>The ID of the table or the context binding or the key values of the entity that will be updated</td>
    </tr>
    <tr>
      <td>modelName?</td>
      <td>string</td>
      <td>No</td>
      <td>undefined</td>
      <td>The name of the OData V2 model which can be found on the manifest.json file. <strong>Do not specify</strong> if the model name = ""</td>
    </tr>
  </tbody>
</table>

---

There are three distinct methods for constructing an object from the [Entry Update](#entry-update) class.

### Constructor with a Table ID

The most straightforward method for utilizing the capabilities of the [Entry Update](#entry-update) class is to construct an object with the ID of a table that you have on your XML view. This method offers several advantages.

1) The table row selected by the end user is automatically detected by the [Entry Update](#entry-update) class, and the context binding of the selected row is bound to the auto-generated dialog.
2) If no table row is selected by the end user, a default message is displayed in the [sap.m.MessageBox.error](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) to the end user.

> **Important:** This method supports only the table types and selection modes listed below. If the selection mode of the table whose ID is being used for object construction is not supported, the library throws an error.

> **Information:** The default message displayed when the end user has not selected a row from the table yet can be modified using [setSelectRowMessage()](#select-row-message) method.

**Supported Table Types**

[801]: https://sapui5.hana.ondemand.com/#/api/sap.m.Table
[802]: https://sapui5.hana.ondemand.com/#/api/sap.ui.table.Table
[803]: https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smarttable.SmartTable
[804]: https://sapui5.hana.ondemand.com/#/api/sap.ui.table.AnalyticalTable
[805]: https://sapui5.hana.ondemand.com/#/api/sap.ui.table.TreeTable
[806]: https://sapui5.hana.ondemand.com/#/api/sap.m.ListMode
[807]: https://sapui5.hana.ondemand.com/#/api/sap.ui.table.SelectionMode

| Table Type                               | Selection Mode                                                              |
| :--------------------------------------- | :-------------------------------------------------------------------------- |
| [sap.m.Table][801]                       | [SingleSelect][806] \| [SingleSelectLeft][806] \| [SingleSelectMaster][806] |
| [sap.ui.table.Table][802]                | [Single][807]                                                               |
| [sap.ui.comp.smarttable.SmartTable][803] | [Single][807]                                                               |
| [sap.ui.table.AnalyticalTable][804]      | [Single][807]                                                               |
| [sap.ui.table.TreeTable][805]            | [Single][807]                                                               |

**Sample**

Let us consider an `EntitySet` named **Products**, which is bound to an [sap.m.Table][801] on the XML view. Our objective is to add a [sap.m.Button](https://sapui5.hana.ondemand.com/#/api/sap.m.Button) to the header toolbar of the table. When the user selects a row from the table and presses the **Update Product** button, we will open a dialog so the end user can modify the entity.

![Update Constructor Sample](https://github.com/hasanciftci26/ui5-antares/blob/media/update_entry/update_constructor_1.png?raw=true)

**TypeScript**

**EntryUpdateCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains **all** properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor. 

`EntityT` is used as the returning type of the **getResponse(): EntityT** method of the `ResponseCL` class whose object is passed as a parameter into the function attached by the **attachSubmitCompleted(submitCompleted: (response: ResponseCL<EntityT>) => void, listener?: object)** method.

`EntityKeysT` is used as one of the types of the `initializer` parameter in the class [constructor](#constructor-4).

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onUpdateCategory() {
    // Initialize without a type and with the table id
    const entry = new EntryUpdateCL(this, {
      entityPath: "Categories",
      initializer: "tblCategories" // table id       
    }); 
  }

  public async onUpdateProduct() {
    // Initialize with a type and the table id
    const entry = new EntryUpdateCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: "tblProducts" // table id       
    }); 
  }

  public async onUpdateCustomer() {
    // Initialize with a model name and the table id
    const entry = new EntryUpdateCL(this, {
      entityPath: "Customers",
      initializer: "tblCustomers" // table id      
    }, "myODataModelName"); 
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryUpdateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryUpdateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onUpdateProduct: async function () {
          // Initialize with the table id
          const entry = new EntryUpdateCL(this, {
            entityPath: "Products",
            initializer: "tblProducts" // table id                
          }); 
        },

        onUpdateCategory: async function () {
          // Initialize with a model name
          const entry = new EntryUpdateCL(this, {
            entityPath: "Categories",
            initializer: "tblCategories" // table id                 
          }, "myODataModelName");
        }
      });

    });
```

### Constructor with a Context Binding

An alternative approach to constructing an object from the [Entry Update](#entry-update) class is to utilise the [context](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Context) of the entity that will be updated by the end user.

**Sample**

Let us consider an `EntitySet` named **Products**, which is bound to an [sap.m.Table][801] on the XML view. Our objective is to add a [sap.m.Button](https://sapui5.hana.ondemand.com/#/api/sap.m.Button) to the header toolbar of the table. When the user selects a row from the table and presses the **Update Product** button, we will retrieve the context of the selected row and use to construct an object from the [Entry Update](#entry-update) class.

![Update Constructor Sample](https://github.com/hasanciftci26/ui5-antares/blob/media/update_entry/update_constructor_1.png?raw=true)

**TypeScript**

**EntryUpdateCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains **all** properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor. 

`EntityT` is used as the returning type of the **getResponse(): EntityT** method of the `ResponseCL` class whose object is passed as a parameter into the function attached by the **attachSubmitCompleted(submitCompleted: (response: ResponseCL<EntityT>) => void, listener?: object)** method.

`EntityKeysT` is used as one of the types of the `initializer` parameter in the class [constructor](#constructor-4).

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL"; // Import the class
import MessageBox from "sap/m/MessageBox";
import Table from "sap/m/Table";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onUpdateCategory() {
    // Get the selected item and warn the end user if no row was selected
    const selectedItem = (this.getView().byId("tblCategories") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    // Get the selected context
    const selectedContext = selectedItem.getBindingContext();

    // Initialize without a type and use the binding context
    const entry = new EntryUpdateCL(this, {
      entityPath: "Categories",
      initializer: selectedContext // binding context
    }); 
  }

  public async onUpdateProduct() {
    // Get the selected item and warn the end user if no row was selected
    const selectedItem = (this.getView().byId("tblProducts") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    // Get the selected context
    const selectedContext = selectedItem.getBindingContext();

    // Initialize with a type and use the binding context
    const entry = new EntryUpdateCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: selectedContext // binding context
    }); 
  }

  public async onUpdateCustomer() {
    // Get the selected item and warn the end user if no row was selected
    const selectedItem = (this.getView().byId("tblCustomers") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    // Get the selected context
    const selectedContext = selectedItem.getBindingContext();

    // Initialize with a model name and use the binding context
    const entry = new EntryUpdateCL(this, {
      entityPath: "Customers",
      initializer: selectedContext // binding context   
    }, "myODataModelName"); 
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryUpdateCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryUpdateCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onUpdateProduct: async function () {
          // Get the selected item and warn the end user if no row was selected
          const selectedItem = this.getView().byId("tblProducts").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          // Get the selected context
          const selectedContext = selectedItem.getBindingContext();

          // Initialize with the binding context
          const entry = new EntryUpdateCL(this, {
            entityPath: "Products",
            initializer: selectedContext // binding context     
          }); 
        },

        onUpdateCategory: async function () {
          // Get the selected item and warn the end user if no row was selected
          const selectedItem = this.getView().byId("tblCategories").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          // Get the selected context
          const selectedContext = selectedItem.getBindingContext();

          // Initialize with the binding context
          const entry = new EntryUpdateCL(this, {
            entityPath: "Categories",
            initializer: selectedContext // binding context               
          }, "myODataModelName");
        }
      });

    });
```

### Constructor with Entity Keys

The final method for constructing an object from the [Entry Update](#entry-update) class is to utilize the key values of the entity that will be updated by the end user.

**Sample**

For the purposes of this example, let us consider an `EntitySet` named **Products** with a single **key** property named `ID`, whose type is `Edm.Guid`. We would like to allow the end user to edit a specific entity with the key value: **ID = "b2f0013e-418f-42aa-9a24-3770fe17ce18"**.

> **Hint:** Please note that if the `EntitySet` is bound to a table, you can retrieve the values of the **key** properties of the selected row using the **getBindingContext().getObject()** method.

> **Information:** The EntryUpdateCL class creates a binding context with the values of the specified **key** properties using the `initializer` parameter in the class [constructor](#constructor-4) and subsequently binds the created context to the dialog.

**TypeScript**

**EntryUpdateCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains **all** properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor. 

`EntityT` is used as the returning type of the **getResponse(): EntityT** method of the `ResponseCL` class whose object is passed as a parameter into the function attached by the **attachSubmitCompleted(submitCompleted: (response: ResponseCL<EntityT>) => void, listener?: object)** method.

`EntityKeysT` is used as one of the types of the `initializer` parameter in the class [constructor](#constructor-4).

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onUpdateCategory() {
    // Prepare the key values of a specific entity
    const keyValues = {
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
    };

    // Initialize without a type and use the key values as the initializer
    const entry = new EntryUpdateCL(this, {
      entityPath: "Categories",
      initializer: keyValues // key values of the entity
    });
  }

  public async onUpdateProduct() {
    // Prepare the key values of a specific entity
    const keyValues = {
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
    };

    // Initialize with a type and use the key values as the initializer
    const entry = new EntryUpdateCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: keyValues // key values of the entity
    });
  }

  public async onUpdateCustomer() {
    // Prepare the key values of a specific entity
    const keyValues = {
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
    };

    // Initialize with a model name and use the key values as the initializer
    const entry = new EntryUpdateCL(this, {
      entityPath: "Customers",
      initializer: keyValues // key values of the entity
    }, "myODataModelName"); 
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryUpdateCL"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryUpdateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onUpdateProduct: async function () {
          // Prepare the key values of a specific entity
          const keyValues = {
            ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
          };

          // Initialize with the entity set name and use the key values as the initializer
          const entry = new EntryUpdateCL(this, {
            entityPath: "Products",
            initializer: keyValues // key values of the entity
          });  
        },

        onUpdateCategory: async function () {
          // Prepare the key values of a specific entity
          const keyValues = {
            ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
          };

          // Initialize with the entity set name and use the key values as the initializer
          const entry = new EntryUpdateCL(this, {
            entityPath: "Categories",
            initializer: keyValues // key values of the entity        
          }, "myODataModelName");          
        }
      });

    });
```

### Select Row Message

If the object from the [Entry Update](#entry-update) class is constructed using the [Constructor with a Table ID](#constructor-with-a-table-id) approach, a default error message is displayed in an [sap.m.MessageBox.error](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) to the end user when the user has not yet selected a row from the table.

To change the default message, **setSelectRowMessage()** method can be utilized.

**Setter (setSelectRowMessage)**

| Parameter | Type   | Mandatory | Description                                                                           | 
| :-------- | :----- | :-------- | :------------------------------------------------------------------------------------ |
| message   | string | Yes       | The message that is displayed when the end user has not selected a row from the table |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getSelectRowMessage)**

| Returns | Description                                                                                                                     |
| :------ | :------------------------------------------------------------------------------------------------------------------------------ |
| string  | Returns the value that was set using **setSelectRowMessage()** method. Default value is **Please select a row from the table.** |

### Update Entry

**updateEntry()** method binds the context, which is determined using the `initializer` parameter in the class [constructor](#constructor-4), to the dialog that is automatically generated or loaded from the fragment that is placed in the application files. Once the context is bound, the generated/loaded dialog is opened.

By default, **updateEntry()** method uses the [ODataMetaModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.ODataMetaModel) to determine the `EntityType` of the `EntitySet` that was set by the [constructor](#constructor-4) and brings all the properties in the same order as the OData metadata into the generated form. 

All **key** properties are marked as mandatory/required and the labels are generated assuming that the naming convention of the `EntityType` is **camelCase**. Please see [Label Generation](#label-generation)

> **Important:** It is not possible to modify any of the **key** properties of an `EntitySet` on the auto-generated dialog. This behaviour cannot be altered.

> **Important:** Please be advised that the **updateEntry()** method must be called after any configurations have been made through the public method of the [Entry Update](#entry-update) class. Any configurations (form title, mandatory properties, etc.) made after the **updateEntry()** method will not be reflected. Basically, **updateEntry()** method should be called at the end of your code block.

By default, the **key** properties with **Edm.Guid** type are not visible on the generated form. However, this behavior can be modified using the [setDisplayGuidProperties()](#properties-with-edmguid-type) method.

> **Important:** Please be advised that the random UUID generation for properties with the `Edm.Guid` type is not available in the [Entry Update](#entry-update) class.

#### Method Parameters

| Returns         | Description                                                                                                                                                    |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise\<void\> | After the promise is resolved, the context can be retrieved by the **getEntryContext()** method using the object instantiated from the **EntryUpdateCL** class |

> **updateEntry()** method uses the default configurations when creating the dialog. However, these configurations can be modified using the public setter methods.

#### Default Values

| Term                    | Default Value                       | Description                                               | Setter                           | Getter                           |
| :---------------------- | :---------------------------------- | :-------------------------------------------------------- | :------------------------------- | :------------------------------- |
| Naming Strategy         | [NamingStrategies.CAMEL_CASE][12]   | The default naming strategy is **CAMEL_CASE**             | [setNamingStrategy()][2]         | [getNamingStrategy()][2]         |
| Resource Bundle Prefix  | antares                             | The default resource bundle prefix is **antares**         | [setResourceBundlePrefix()][10]  | [getResourceBundlePrefix()][10]  |
| Use Metadata Labels     | false                               | The labels are not taken from the metadata but generated  | [setUseMetadataLabels()][11]     | [getUseMetadataLabels()][11]     |
| Form Type               | [FormTypes.SMART][13]               | SmartForm with SmartFields is generated by default        | [setFormType()][3]               | [getFormType()][3]               |
| Form Title              | Update + ${entityPath}              | entityPath from the [constructor](#constructor-4) is used | [setFormTitle()][4]              | [getFormTitle()][4]              |
| Begin Button Text       | Update                              | The default begin button text is **Update**               | [setBeginButtonText()][5]        | [getBeginButtonText()][5]        |
| Begin Button Type       | [ButtonType.Success][7]             | The default button type is **Success**                    | [setBeginButtonType()][6]        | [getBeginButtonType()][6]        |
| End Button Text         | Close                               | The default end button text is **Close**                  | [setEndButtonText()][8]          | [getEndButtonText()][8]          |
| End Button Type         | [ButtonType.Negative][7]            | The default button type is **Negative**                   | [setEndButtonType()][9]          | [getEndButtonType()][9]          |
| Mandatory Error Message | Please fill in all required fields. | The displayed message when the mandatory check fails      | [setMandatoryErrorMessage()][14] | [getMandatoryErrorMessage()][14] |

<br/>

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL"; // Import the class
import Table from "sap/m/Table";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onUpdateProduct() {
    // Initialize without a type and with a table id
    const entry = new EntryUpdateCL(this, {
      entityPath: "Products",
      initializer: "tblProducts"
    });

    // Call 
    entry.updateEntry(); 
  }

  public async onUpdateCategory() {
    const selectedItem = (this.getView().byId("tblCategories") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    const selectedContext = selectedItem.getBindingContext();

    // Initialize with a type and a binding context
    const entry = new EntryUpdateCL<ICategory>(this, {
      entityPath: "Categories",
      initializer: selectedContext
    }); 

    // Call
    entry.updateEntry();
  }

  public async onUpdateCustomer () {
    const selectedItem = (this.getView().byId("tblCustomers") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    };

    const customerKeys = {
      ID: selectedItem.getBindingContext().getObject().ID
    };

    // Initialize without a type and with the key values
    const entry = new EntryUpdateCL(this, {
      entityPath: "Customers",
      initializer: customerKeys
    });

    // Call
    entry.updateEntry();
  }
}

interface ICategory {
  ID: string;
  name?: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryUpdateCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryUpdateCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onUpdateProduct: async function () {
          // Initialize with a table id
          const entry = new EntryUpdateCL(this, {
            entityPath: "Products",
            initializer: "tblProducts"
          }); 

          // Call
          entry.updateEntry();
        },

        onUpdateCategory: async function () {
          const selectedItem = this.getView().byId("tblCategories").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          const selectedContext = selectedItem.getBindingContext();

          // Initialize with a binding context
          const entry = new EntryUpdateCL(this, {
            entityPath: "Categories",
            initializer: selectedContext
          }); 

          // Call
          entry.updateEntry();
        },

        onUpdateCustomer: async function () {
          const selectedItem = this.getView().byId("tblCustomers").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          const customerKeys = {
            ID: selectedItem.getBindingContext().getObject().ID
          };

          // Initialize with the key values
          const entry = new EntryUpdateCL(this, {
            entityPath: "Customers",
            initializer: customerKeys
          }); 

          // Call
          entry.updateEntry();          
        }
      });

    });
```

The generated form with default values will more or less look like the following. It will vary depending on the configurations and the `EntityType` properties of the `EntitySet`.

![Update Entry](https://github.com/hasanciftci26/ui5-antares/blob/media/update_entry/update_entry.png?raw=true)

### Available Features

The [EntryUpdateCL](#entry-update) class is derived from the same abstract class as the [EntryCreateCL](#entry-create) class and contains the same methods. However, some of these functions are not applicable to the [EntryUpdateCL](#entry-update) class. 

> **Important:** Please note that the default values for the available functions may differ.

The features listed below are identical to those available in [EntryCreateCL](#entry-create). Methods can be accessed through the object constructed from the [EntryUpdateCL](#entry-update) class.

> **Hint**: To access the documentation for a particular feature, please click on the name of the feature.

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Availability</th>
      <th>Default Value</th>
      <th>Remarks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#manual-submit">Manual Submit</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#label-generation">Label Generation</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#resource-bundle-prefix">Resource Bundle Prefix</a></td>
      <td align="center">&#x2714;</td>
      <td>antares</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#naming-strategy">Naming Strategy</a></td>
      <td align="center">&#x2714;</td>
      <td>CAMEL_CASE</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#form-type">Form Type</a></td>
      <td align="center">&#x2714;</td>
      <td>SMART</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#form-title">Form Title</a></td>
      <td align="center">&#x2714;</td>
      <td>Update <code>${entityPath}</code></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#form-grouping">Form Grouping</a></td>
      <td align="center">&#x2714;</td>
      <td>[]</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#begin-button-text">Begin Button Text</a></td>
      <td align="center">&#x2714;</td>
      <td>Update</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#begin-button-type">Begin Button Type</a></td>
      <td align="center">&#x2714;</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.m.ButtonType">ButtonType.Success</a></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#end-button-text">End Button Text</a></td>
      <td align="center">&#x2714;</td>
      <td>Close</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#end-button-type">End Button Type</a></td>
      <td align="center">&#x2714;</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.m.ButtonType">ButtonType.Negative</a></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#properties-with-edmguid-type">Properties with Edm.Guid Type</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td>The random UUID generation is not available. You can only modify the visibilities of the properties with <code>Edm.Guid</code> type</td>
    </tr>
    <tr>
      <td><a href="#form-property-order">Form Property Order</a></td>
      <td align="center">&#x2714;</td>
      <td>[]</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#excluded-properties">Excluded Properties</a></td>
      <td align="center">&#x2714;</td>
      <td>[]</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#mandatory-properties">Mandatory Properties</a></td>
      <td align="center">&#x2714;</td>
      <td>[]</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#readonly-properties">Readonly Properties</a></td>
      <td align="center">&#x2714;</td>
      <td>[keys]</td>
      <td>By default, the <strong>key</strong> properties are readonly and cannot be changed, but additional readonly properties can be added</td>
    </tr>    
    <tr>
      <td><a href="#attach-submit-completed">Attach Submit Completed</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#attach-submit-failed">Attach Submit Failed</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#response-class">Response Class</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#value-help">Value Help</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#validation-logic">Validation Logic</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#object-page">Object Page</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#custom-control">Custom Control</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#custom-content">Custom Content</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#custom-fragment">Custom Fragment</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
  </tbody>
</table>

## Entry Delete

Entry Delete (EntryDeleteCL) is a class that manages the DELETE operation through the OData V2 model. It basically avoids developers having to deal with fragments (review before the deletion), row selection while working on custom SAPUI5 applications or Fiori Elements extensions. Below you can see the features that Entry Delete has.

**Features:**
- sap.m.Dialog generation with a SmartForm, SimpleForm or Custom content
- sap.uxap.ObjectPageLayout generation with a SmartForm, SimpleForm or Custom Content
- Property sorting
- Label generation for the SmartForm, SimpleForm elements
- delete() handling based on the user interaction
- Call a fragment and bind the context in case you do not want to use the auto-generated dialog

### Use Case

Let's say that you have an EntitySet named `Products` which is bound to a table. The objective is to enable the end user to select a row from the table and delete it from the database through the OData V2 Model. The following steps outline the process.

1) If you wish for the user to view the data of the selected entity on a pop-up screen, you must create a **.fragment.xml** file that contains a dialog with form content (Simple, Smart, etc.) and call it from the controller or generate the dialog directly on the controller
2) You need to handle the table selection and the binding of the selected entity to the dialog or form
3) You need to handle the delete through the OData V2 Model

[EntryDeleteCL](#entry-delete) class basically handles all of the steps defined above.

### Constructor

You must initialize an object from EntryDeleteCL in order to use it.

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Mandatory</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>controller</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.ui.core.mvc.Controller">sap.ui.core.mvc.Controller</a></td>
      <td>Yes</td>
      <td></td>
      <td>The controller object (usually <code>this</code>)</td>
    </tr>
    <tr>
      <td>settings</td>
      <td>object</td>
      <td>Yes</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>&emsp;entityPath</td>
      <td>string</td>
      <td>Yes</td>
      <td></td>
      <td>The name of the <strong>EntitySet</strong>. It can start with a <strong>"/"</strong></td>
    </tr>
    <tr>
      <td>&emsp;initializer</td>
      <td>string | <a href="https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Context">sap.ui.model.Context</a> | EntityKeysT</td>
      <td>Yes</td>
      <td></td>
      <td>The ID of the table or the context binding or the key values of the entity that will be deleted</td>
    </tr>
    <tr>
      <td>modelName?</td>
      <td>string</td>
      <td>No</td>
      <td>undefined</td>
      <td>The name of the OData V2 model which can be found on the manifest.json file. <strong>Do not specify</strong> if the model name = ""</td>
    </tr>
  </tbody>
</table>

---

There are three distinct methods for constructing an object from the [Entry Delete](#entry-delete) class.

### Constructor with a Table ID

The most straightforward method for utilizing the capabilities of the [Entry Delete](#entry-delete) class is to construct an object with the ID of a table that you have on your XML view. This method offers several advantages.

1) The table row selected by the end user is automatically detected by the [Entry Delete](#entry-delete) class, and the context binding of the selected row is bound to the auto-generated dialog.
2) If no table row is selected by the end user, a default message is displayed in the [sap.m.MessageBox.error](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) to the end user.

> **Important:** This method supports only the table types and selection modes listed below. If the selection mode of the table whose ID is being used for object construction is not supported, the library throws an error.

> **Information:** The default message displayed when the end user has not selected a row from the table yet can be modified using [setSelectRowMessage()](#select-row-message-1) method.

**Supported Table Types**

[801]: https://sapui5.hana.ondemand.com/#/api/sap.m.Table
[802]: https://sapui5.hana.ondemand.com/#/api/sap.ui.table.Table
[803]: https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smarttable.SmartTable
[804]: https://sapui5.hana.ondemand.com/#/api/sap.ui.table.AnalyticalTable
[805]: https://sapui5.hana.ondemand.com/#/api/sap.ui.table.TreeTable
[806]: https://sapui5.hana.ondemand.com/#/api/sap.m.ListMode
[807]: https://sapui5.hana.ondemand.com/#/api/sap.ui.table.SelectionMode

| Table Type                               | Selection Mode                                                              |
| :--------------------------------------- | :-------------------------------------------------------------------------- |
| [sap.m.Table][801]                       | [SingleSelect][806] \| [SingleSelectLeft][806] \| [SingleSelectMaster][806] |
| [sap.ui.table.Table][802]                | [Single][807]                                                               |
| [sap.ui.comp.smarttable.SmartTable][803] | [Single][807]                                                               |
| [sap.ui.table.AnalyticalTable][804]      | [Single][807]                                                               |
| [sap.ui.table.TreeTable][805]            | [Single][807]                                                               |

**Sample**

Let us consider an `EntitySet` named **Products**, which is bound to an [sap.m.Table][801] on the XML view. Our objective is to add a [sap.m.Button](https://sapui5.hana.ondemand.com/#/api/sap.m.Button) to the header toolbar of the table. When the user selects a row from the table and presses the **Delete Product** button, we will open a dialog with a **Delete** button so the user can display the data before the deletion.

![Delete Constructor Sample](https://github.com/hasanciftci26/ui5-antares/blob/media/delete_entry/delete_constructor_1.png?raw=true)

**TypeScript**

**EntryDeleteCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains **all** properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor. 

`EntityT` type is used for the parameter of the function that is attached using the [attachDeleteCompleted()](#attach-delete-completed) method. This allows the data of the deleted entity to be retrieved after the successful deletion.

`EntityKeysT` is used as one of the types of the `initializer` parameter in the class [constructor](#constructor-5).

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteCategory() {
    // Initialize without a type and with the table id
    const entry = new EntryDeleteCL(this, {
      entityPath: "Categories",
      initializer: "tblCategories" // table id       
    }); 
  }

  public async onDeleteProduct() {
    // Initialize with a type and the table id
    const entry = new EntryDeleteCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: "tblProducts" // table id       
    }); 
  }

  public async onDeleteCustomer() {
    // Initialize with a model name and the table id
    const entry = new EntryDeleteCL(this, {
      entityPath: "Customers",
      initializer: "tblCustomers" // table id      
    }, "myODataModelName"); 
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryDeleteCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryDeleteCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize with the table id
          const entry = new EntryDeleteCL(this, {
            entityPath: "Products",
            initializer: "tblProducts" // table id                
          }); 
        },

        onDeleteCategory: async function () {
          // Initialize with a model name
          const entry = new EntryDeleteCL(this, {
            entityPath: "Categories",
            initializer: "tblCategories" // table id                 
          }, "myODataModelName");
        }
      });

    });
```

### Constructor with a Context Binding

An alternative approach to constructing an object from the [Entry Delete](#entry-delete) class is to utilise the [context](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Context) of the entity that will be deleted by the end user.

**Sample**

Let us consider an `EntitySet` named **Products**, which is bound to an [sap.m.Table][801] on the XML view. Our objective is to add a [sap.m.Button](https://sapui5.hana.ondemand.com/#/api/sap.m.Button) to the header toolbar of the table. When the user selects a row from the table and presses the **Delete Product** button, we will retrieve the context of the selected row and use to construct an object from the [Entry Delete](#entry-delete) class.

![Delete Constructor Sample](https://github.com/hasanciftci26/ui5-antares/blob/media/delete_entry/delete_constructor_1.png?raw=true)

**TypeScript**

**EntryDeleteCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains **all** properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor. 

`EntityT` type is used for the parameter of the function that is attached using the [attachDeleteCompleted()](#attach-delete-completed) method. This allows the data of the deleted entity to be retrieved after the successful deletion.

`EntityKeysT` is used as one of the types of the `initializer` parameter in the class [constructor](#constructor-5).

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL"; // Import the class
import MessageBox from "sap/m/MessageBox";
import Table from "sap/m/Table";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteCategory() {
    // Get the selected item and warn the end user if no row was selected
    const selectedItem = (this.getView().byId("tblCategories") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    // Get the selected context
    const selectedContext = selectedItem.getBindingContext();

    // Initialize without a type and use the binding context
    const entry = new EntryDeleteCL(this, {
      entityPath: "Categories",
      initializer: selectedContext // binding context
    }); 
  }

  public async onDeleteProduct() {
    // Get the selected item and warn the end user if no row was selected
    const selectedItem = (this.getView().byId("tblProducts") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    // Get the selected context
    const selectedContext = selectedItem.getBindingContext();

    // Initialize with a type and use the binding context
    const entry = new EntryDeleteCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: selectedContext // binding context
    }); 
  }

  public async onDeleteCustomer() {
    // Get the selected item and warn the end user if no row was selected
    const selectedItem = (this.getView().byId("tblCustomers") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    // Get the selected context
    const selectedContext = selectedItem.getBindingContext();

    // Initialize with a model name and use the binding context
    const entry = new EntryDeleteCL(this, {
      entityPath: "Customers",
      initializer: selectedContext // binding context   
    }, "myODataModelName"); 
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryDeleteCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryDeleteCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Get the selected item and warn the end user if no row was selected
          const selectedItem = this.getView().byId("tblProducts").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          // Get the selected context
          const selectedContext = selectedItem.getBindingContext();

          // Initialize with the binding context
          const entry = new EntryDeleteCL(this, {
            entityPath: "Products",
            initializer: selectedContext // binding context     
          }); 
        },

        onDeleteCategory: async function () {
          // Get the selected item and warn the end user if no row was selected
          const selectedItem = this.getView().byId("tblCategories").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          // Get the selected context
          const selectedContext = selectedItem.getBindingContext();

          // Initialize with the binding context
          const entry = new EntryDeleteCL(this, {
            entityPath: "Categories",
            initializer: selectedContext // binding context               
          }, "myODataModelName");
        }
      });

    });
```

### Constructor with Entity Keys

The final method for constructing an object from the [Entry Delete](#entry-delete) class is to utilize the key values of the entity that will be deleted by the end user.

**Sample**

For the purposes of this example, let us consider an `EntitySet` named **Products** with a single **key** property named `ID`, whose type is `Edm.Guid`. We would like to allow the end user to delete a specific entity with the key value: **ID = "b2f0013e-418f-42aa-9a24-3770fe17ce18"**.

> **Hint:** Please note that if the `EntitySet` is bound to a table, you can retrieve the values of the **key** properties of the selected row using the **getBindingContext().getObject()** method.

> **Information:** The EntryDeleteCL class creates a binding context with the values of the specified **key** properties using the `initializer` parameter in the class [constructor](#constructor-5) and subsequently binds the created context to the dialog.

**TypeScript**

**EntryDeleteCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains **all** properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor. 

`EntityT` type is used for the parameter of the function that is attached using the [attachDeleteCompleted()](#attach-delete-completed) method. This allows the data of the deleted entity to be retrieved after the successful deletion.

`EntityKeysT` is used as one of the types of the `initializer` parameter in the class [constructor](#constructor-5).

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteCategory() {
    // Prepare the key values of a specific entity
    const keyValues = {
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
    };

    // Initialize without a type and use the key values as the initializer
    const entry = new EntryDeleteCL(this, {
      entityPath: "Categories",
      initializer: keyValues // key values of the entity
    });
  }

  public async onDeleteProduct() {
    // Prepare the key values of a specific entity
    const keyValues = {
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
    };

    // Initialize with a type and use the key values as the initializer
    const entry = new EntryDeleteCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: keyValues // key values of the entity
    });
  }

  public async onDeleteCustomer() {
    // Prepare the key values of a specific entity
    const keyValues = {
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
    };

    // Initialize with a model name and use the key values as the initializer
    const entry = new EntryDeleteCL(this, {
      entityPath: "Customers",
      initializer: keyValues // key values of the entity
    }, "myODataModelName"); 
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryDeleteCL"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryDeleteCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Prepare the key values of a specific entity
          const keyValues = {
            ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
          };

          // Initialize with the entity set name and use the key values as the initializer
          const entry = new EntryDeleteCL(this, {
            entityPath: "Products",
            initializer: keyValues // key values of the entity
          });  
        },

        onDeleteCategory: async function () {
          // Prepare the key values of a specific entity
          const keyValues = {
            ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
          };

          // Initialize with the entity set name and use the key values as the initializer
          const entry = new EntryDeleteCL(this, {
            entityPath: "Categories",
            initializer: keyValues // key values of the entity        
          }, "myODataModelName");          
        }
      });

    });
```

### Select Row Message

If the object from the [Entry Delete](#entry-delete) class is constructed using the [Constructor with a Table ID](#constructor-with-a-table-id-1) approach, a default error message is displayed in an [sap.m.MessageBox.error](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) to the end user when the user has not yet selected a row from the table.

To change the default message, **setSelectRowMessage()** method can be utilized.

**Setter (setSelectRowMessage)**

| Parameter | Type   | Mandatory | Description                                                                           | 
| :-------- | :----- | :-------- | :------------------------------------------------------------------------------------ |
| message   | string | Yes       | The message that is displayed when the end user has not selected a row from the table |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getSelectRowMessage)**

| Returns | Description                                                                                                                     |
| :------ | :------------------------------------------------------------------------------------------------------------------------------ |
| string  | Returns the value that was set using **setSelectRowMessage()** method. Default value is **Please select a row from the table.** |

### Delete Entry

**deleteEntry(previewBeforeDelete: boolean = true)** method binds the context, which is determined using the `initializer` parameter in the class [constructor](#constructor-5), to the dialog that is automatically generated or loaded from the fragment that is placed in the application files. Once the context is bound, the generated/loaded dialog is opened.

By default, **deleteEntry()** method uses the [ODataMetaModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.ODataMetaModel) to determine the `EntityType` of the `EntitySet` that was set by the [constructor](#constructor-5) and brings all the properties in the same order as the OData metadata into the generated form. 

The labels are generated assuming that the naming convention of the `EntityType` is **camelCase**. Please see [Label Generation](#label-generation)

> **Important:** It is not possible to modify any of the properties of an `EntitySet` on the auto-generated dialog. This behaviour cannot be altered.

> **Important:** Please be advised that the **deleteEntry()** method must be called after any configurations have been made through the public method of the [Entry Delete](#entry-delete) class. Any configurations (form title, begin button text, etc.) made after the **deleteEntry()** method will not be reflected. Basically, **deleteEntry()** method should be called at the end of your code block.

By default, the **key** properties with **Edm.Guid** type are not visible on the generated form. However, this behavior can be modified using the [setDisplayGuidProperties()](#properties-with-edmguid-type) method.

> **Important:** Please be advised that the random UUID generation for properties with the `Edm.Guid` type is not available in the [Entry Delete](#entry-delete) class.

By default, the **deleteEntry(previewBeforeDelete: boolean = true)** method generates a dialog and opens it with the bound context before the deletion is completed. The auto-generated dialog includes a **Delete** button. When the user presses the **Delete** button, an [sap.m.MessageBox.confirm](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) is displayed to the end user to complete the deletion process.

> **Hint:** The auto-generated dialog opening step can be bypassed by setting the **previewBeforeDelete=false** parameter in the **deleteEntry(previewBeforeDelete: boolean = true)** method. The end user will only display an [sap.m.MessageBox.confirm](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) with this configuration.

#### Method Parameters

| Parameter           | Type    | Mandatory | Default Value | Description                                                                                                     | 
| :------------------ | :------ | :-------- | :------------ | :-------------------------------------------------------------------------------------------------------------- |
| previewBeforeDelete | boolean | No        | true          | If set to **false**, no dialog will be displayed by the end user. Only the confirmation MessageBox is displayed |

| Returns         | Description                                                                                                                                                    |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise\<void\> | After the promise is resolved, the context can be retrieved by the **getEntryContext()** method using the object instantiated from the **EntryDeleteCL** class |

> **deleteEntry()** method uses the default configurations when creating the dialog. However, these configurations can be modified using the public setter methods.

#### Default Values

[75]: #confirmation-text
[76]: #confirmation-title

| Term                    | Default Value                       | Description                                               | Setter                           | Getter                           |
| :---------------------- | :---------------------------------- | :-------------------------------------------------------- | :------------------------------- | :------------------------------- |
| Naming Strategy         | [NamingStrategies.CAMEL_CASE][12]   | The default naming strategy is **CAMEL_CASE**             | [setNamingStrategy()][2]         | [getNamingStrategy()][2]         |
| Resource Bundle Prefix  | antares                             | The default resource bundle prefix is **antares**         | [setResourceBundlePrefix()][10]  | [getResourceBundlePrefix()][10]  |
| Use Metadata Labels     | false                               | The labels are not taken from the metadata but generated  | [setUseMetadataLabels()][11]     | [getUseMetadataLabels()][11]     |
| Form Type               | [FormTypes.SMART][13]               | SmartForm with SmartFields is generated by default        | [setFormType()][3]               | [getFormType()][3]               |
| Form Title              | Delete + ${entityPath}              | entityPath from the [constructor](#constructor-5) is used | [setFormTitle()][4]              | [getFormTitle()][4]              |
| Begin Button Text       | Delete                              | The default begin button text is **Delete**               | [setBeginButtonText()][5]        | [getBeginButtonText()][5]        |
| Begin Button Type       | [ButtonType.Reject][7]              | The default button type is **Reject**                     | [setBeginButtonType()][6]        | [getBeginButtonType()][6]        |
| End Button Text         | Close                               | The default end button text is **Close**                  | [setEndButtonText()][8]          | [getEndButtonText()][8]          |
| End Button Type         | [ButtonType.Default][7]             | The default button type is **Default**                    | [setEndButtonType()][9]          | [getEndButtonType()][9]          |
| Confirmation Text       | The selected line will be deleted. Do you confirm? | The message displayed in the MessageBox.confirm | [setConfirmationText()][75] | [getConfirmationText()][75]      |
| Confirmation Title      | Confirm Delete                      | The title of the MessageBox.confirm                       | [setConfirmationTitle()][76]     | [getConfirmationTitle()][76]     |

<br/>

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL"; // Import the class
import Table from "sap/m/Table";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteProduct() {
    // Initialize without a type and with a table id
    const entry = new EntryDeleteCL(this, {
      entityPath: "Products",
      initializer: "tblProducts"
    });

    // Call with no preview
    entry.deleteEntry(false); 
  }

  public async onDeleteCategory() {
    const selectedItem = (this.getView().byId("tblCategories") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    const selectedContext = selectedItem.getBindingContext();

    // Initialize with a type and a binding context
    const entry = new EntryDeleteCL<ICategory>(this, {
      entityPath: "Categories",
      initializer: selectedContext
    }); 

    // Call with the preview
    entry.deleteEntry();
  }

  public async onDeleteCustomer () {
    const selectedItem = (this.getView().byId("tblCustomers") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    };

    const customerKeys = {
      ID: selectedItem.getBindingContext().getObject().ID
    };

    // Initialize without a type and with the key values
    const entry = new EntryDeleteCL(this, {
      entityPath: "Customers",
      initializer: customerKeys
    });

    // Call with the preview
    entry.deleteEntry();
  }
}

interface ICategory {
  ID: string;
  name?: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryDeleteCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryDeleteCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize with a table id
          const entry = new EntryDeleteCL(this, {
            entityPath: "Products",
            initializer: "tblProducts"
          }); 

          // Call with no preview
          entry.deleteEntry(false);
        },

        onDeleteCategory: async function () {
          const selectedItem = this.getView().byId("tblCategories").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          const selectedContext = selectedItem.getBindingContext();

          // Initialize with a binding context
          const entry = new EntryDeleteCL(this, {
            entityPath: "Categories",
            initializer: selectedContext
          }); 

          // Call with the preview
          entry.deleteEntry();
        },

        onDeleteCustomer: async function () {
          const selectedItem = this.getView().byId("tblCustomers").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          const customerKeys = {
            ID: selectedItem.getBindingContext().getObject().ID
          };

          // Initialize with the key values
          const entry = new EntryDeleteCL(this, {
            entityPath: "Customers",
            initializer: customerKeys
          }); 

          // Call with the preview
          entry.deleteEntry();          
        }
      });

    });
```

The generated form with default values will more or less look like the following. It will vary depending on the configurations and the `EntityType` properties of the `EntitySet`.

![Delete Entry](https://github.com/hasanciftci26/ui5-antares/blob/media/delete_entry/delete_entry.png?raw=true)

![Delete Entry Confirmation](https://github.com/hasanciftci26/ui5-antares/blob/media/delete_entry/confirmation_text.png?raw=true)

### Confirmation Text

A default confirmation message is displayed on an [sap.m.MessageBox.confirm](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) to request confirmation from the end user before deleting any data.

To change the default confirmation message, **setConfirmationText()** method can be utilized.

**Setter (setConfirmationText)**

| Parameter | Type   | Mandatory | Description                                                     | 
| :-------- | :----- | :-------- | :-------------------------------------------------------------- |
| text      | string | Yes       | The message displayed in MessageBox.confirm before the deletion |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getConfirmationText)**

| Returns | Description                                                                                                                                    |
| :------ | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| string  | Returns the value that was set using **setConfirmationText()** method. Default value is **The selected line will be deleted. Do you confirm?** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteProduct() {
    // Initialize with a type and with a table id
    const entry = new EntryDeleteCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: "tblProducts"
    });

    // Change the confirmation message
    entry.setConfirmationText("This line will be removed from the database. Do you want to continue?");

    // Call with no preview
    entry.deleteEntry(false); 
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryDeleteCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryDeleteCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize with a table id
          const entry = new EntryDeleteCL(this, {
            entityPath: "Products",
            initializer: "tblProducts"
          });

          // Change the confirmation message
          entry.setConfirmationText("This line will be removed from the database. Do you want to continue?");

          // Call with no preview
          entry.deleteEntry(false);  
        }
      });

    });
```

### Confirmation Title

A default title is displayed on an [sap.m.MessageBox.confirm](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) to request confirmation from the end user before deleting any data.

To change the default title of the MessageBox, **setConfirmationTitle()** method can be utilized.

**Setter (setConfirmationTitle)**

| Parameter | Type   | Mandatory | Description                                                   | 
| :-------- | :----- | :-------- | :------------------------------------------------------------ |
| title     | string | Yes       | The title displayed in MessageBox.confirm before the deletion |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getConfirmationTitle)**

| Returns | Description                                                                                                 |
| :------ | :---------------------------------------------------------------------------------------------------------- |
| string  | Returns the value that was set using **setConfirmationTitle()** method. Default value is **Confirm Delete** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteProduct() {
    // Initialize with a type and with a table id
    const entry = new EntryDeleteCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: "tblProducts"
    });

    // Change the confirmation title
    entry.setConfirmationTitle("My Confirmation Title");

    // Call with no preview
    entry.deleteEntry(false); 
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryDeleteCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryDeleteCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize with a table id
          const entry = new EntryDeleteCL(this, {
            entityPath: "Products",
            initializer: "tblProducts"
          });

          // Change the confirmation title
          entry.setConfirmationTitle("My Confirmation Title");

          // Call with no preview
          entry.deleteEntry(false);  
        }
      });

    });
```

### Attach Delete Completed

The [Entry Delete](#entry-delete) class can call a function that has been attached using the **attachDeleteCompleted()** method after a successful deletion. This function will then receive the data of the deleted entity.

To attach a function, **attachDeleteCompleted()** method can be utilized.

[421]: #constructor-5

**Setter (attachDeleteCompleted)**

| Parameter | Type                    | Mandatory | Description                                                        | 
| :-------- | :---------------------- | :-------- | :----------------------------------------------------------------- |
| completed | (data: EntityT) => void | Yes       | The function that will be called after the successful deletion     |
| listener? | object                  | No        | The default listener is the **controller** from [constructor][421] |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Sample**

Once the deletion is successful, you would like to receive a response and take the necessary actions.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL"; // Import the class
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteProduct() {
    // Initialize with a type and with a table id
    const entry = new EntryDeleteCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: "tblProducts"
    });

    // Attach the function
    entry.attachDeleteCompleted(this.onDeleteCompleted, this);

    // Call with no preview
    entry.deleteEntry(false); 
  }

  // If possible, use the same type that is used in the constructor
  private onDeleteCompleted (data: IProducts) {
    const productID = data.ID;

    MessageBox.information(`The product with the following ID is removed: ${productID}`);
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryDeleteCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryDeleteCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize with a table id
          const entry = new EntryDeleteCL(this, {
            entityPath: "Products",
            initializer: "tblProducts"
          });

          // Attach the function
          entry.attachDeleteCompleted(this.onDeleteCompleted, this);

          // Call with no preview
          entry.deleteEntry(false); 
        },

        // Handler function
        onDeleteCompleted: function (data) {
          const productID = data.ID;

          MessageBox.information(`The product with the following ID is removed: ${productID}`);
        }
      });

    });
```

### Attach Delete Failed

In the event that the deletion of the entity is unsuccessful, [Entry Delete](#entry-delete) class can then call a function with a specific signature. The result of the deletion will then be passed to the attached function.

To attach a function, **attachDeleteFailed()** method can be utilized.

**Setter (attachDeleteFailed)**

| Parameter | Type                                                               | Mandatory | Description                                                        | 
| :-------- | :----------------------------------------------------------------- | :-------- | :----------------------------------------------------------------- |
| failed    | (response: [ResponseCL\<IDeleteFailed\>](#response-class)) => void | Yes       | The function that will be called after the deletion fail           |
| listener? | object                                                             | No        | The default listener is the **controller** from [constructor][421] |

| Returns | Description |
| :------ | :---------- |
| void    |             |

<br>

An object constructed from the [ResponceCL](#response-class) class passed as a parameter to the function. This object has 2 public methods.

**getResponse()**

| Returns                      | Description                          |
| ---------------------------- | ------------------------------------ |
| `object` \| `undefined`      |                                      |
| &emsp;headers: `object`      | The HTTP response headers.           |
| &emsp;message: `string`      | The HTTP response message.           |
| &emsp;responseText: `string` | The HTTP response text.              |
| &emsp;statusCode: `string`   | The status code of the HTTP request. |
| &emsp;statusText: `string`   | The HTTP status text.                |

---

**getStatusCode()**

| Returns             | Description                                 |
| :------------------ | :------------------------------------------ |
| string or undefined | Returns the status code of the HTTP Request |

**Sample**

Once the deletion is not successful, you would like to receive a response and take the necessary actions.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL"; // Import the class
import ResponseCL from "ui5/antares/entry/v2/ResponseCL"; // Import the ResponseCL class
import { IDeleteFailed } from "ui5/antares/types/entry/delete"; // Import the Delete Failed type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteProduct() {
    // Initialize with a type and with a table id
    const entry = new EntryDeleteCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: "tblProducts"
    });

    // Attach the function
    entry.attachDeleteFailed(this.onDeleteFailed, this);

    // Call with no preview
    entry.deleteEntry(false); 
  }

  // If possible, use the IDeleteFailed type
  private onDeleteFailed (response: ResponseCL<IDeleteFailed>) {
    const statusCode = response.getStatusCode(); // get the status code
    const deleteResponse = response.getResponse(); // get the response

    if (deleteResponse) {
      MessageBox.error(deleteResponse.message);
    }
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryDeleteCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryDeleteCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize with a table id
          const entry = new EntryDeleteCL(this, {
            entityPath: "Products",
            initializer: "tblProducts"
          });

          // Attach the function
          entry.attachDeleteFailed(this.onDeleteFailed, this);

          // Call with no preview
          entry.deleteEntry(false); 
        },

        // Handler function
        onDeleteFailed: function (response) {
          const statusCode = response.getStatusCode(); // get the status code
          const deleteResponse = response.getResponse(); // get the response

          if (deleteResponse) {
            MessageBox.error(deleteResponse.message);
          }
        }
      });

    });
```

### Available Features

The [EntryDeleteCL](#entry-delete) class is derived from the same abstract class as the [EntryCreateCL](#entry-create) class and contains the same methods. However, some of these functions are not applicable to the [EntryDeleteCL](#entry-delete) class. 

> **Important:** Please note that the default values for the available functions may differ.

The features listed below are identical to those available in [EntryCreateCL](#entry-create). Methods can be accessed through the object constructed from the [EntryDeleteCL](#entry-delete) class.

> **Hint**: To access the documentation for a particular feature, please click on the name of the feature.

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Availability</th>
      <th>Default Value</th>
      <th>Remarks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#manual-submit">Manual Submit</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>  
    <tr>
      <td><a href="#label-generation">Label Generation</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#resource-bundle-prefix">Resource Bundle Prefix</a></td>
      <td align="center">&#x2714;</td>
      <td>antares</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#naming-strategy">Naming Strategy</a></td>
      <td align="center">&#x2714;</td>
      <td>CAMEL_CASE</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#form-type">Form Type</a></td>
      <td align="center">&#x2714;</td>
      <td>SMART</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#form-title">Form Title</a></td>
      <td align="center">&#x2714;</td>
      <td>Delete <code>${entityPath}</code></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#form-grouping">Form Grouping</a></td>
      <td align="center">&#x2714;</td>
      <td>[]</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#begin-button-text">Begin Button Text</a></td>
      <td align="center">&#x2714;</td>
      <td>Delete</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#begin-button-type">Begin Button Type</a></td>
      <td align="center">&#x2714;</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.m.ButtonType">ButtonType.Reject</a></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#end-button-text">End Button Text</a></td>
      <td align="center">&#x2714;</td>
      <td>Close</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#end-button-type">End Button Type</a></td>
      <td align="center">&#x2714;</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.m.ButtonType">ButtonType.Default</a></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#confirmation-text">Confirmation Text</a></td>
      <td align="center">&#x2714;</td>
      <td>The selected line will be deleted. Do you confirm?</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#confirmation-title">Confirmation Title</a></td>
      <td align="center">&#x2714;</td>
      <td>Confirm Delete</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#properties-with-edmguid-type">Properties with Edm.Guid Type</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td>The random UUID generation is not available. You can only modify the visibilities of the properties with <code>Edm.Guid</code> type</td>
    </tr>
    <tr>
      <td><a href="#form-property-order">Form Property Order</a></td>
      <td align="center">&#x2714;</td>
      <td>[]</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#excluded-properties">Excluded Properties</a></td>
      <td align="center">&#x2714;</td>
      <td>[]</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#mandatory-properties">Mandatory Properties</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#readonly-properties">Readonly Properties</a></td>
      <td align="center">&#x2717;</td>
      <td>[all properties]</td>
      <td>By default, all the properties are readonly and cannot be changed</td>
    </tr>    
    <tr>
      <td><a href="#attach-submit-completed">Attach Submit Completed</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td>Please see <a href="#attach-delete-completed">Attach Delete Completed</a></td>
    </tr>    
    <tr>
      <td><a href="#attach-submit-failed">Attach Submit Failed</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td>Please see <a href="#attach-delete-failed">Attach Delete Failed</a></td>
    </tr>    
    <tr>
      <td><a href="#response-class">Response Class</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td>Only available for <a href="#attach-delete-failed">Attach Delete Failed</a></td>
    </tr>    
    <tr>
      <td><a href="#value-help">Value Help</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#validation-logic">Validation Logic</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#object-page">Object Page</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#custom-control">Custom Control</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#custom-content">Custom Content</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#custom-fragment">Custom Fragment</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
  </tbody>
</table>

## Entry Read

Entry Read (EntryReadCL) is a class that manages the READ operation through the OData V2 model. It basically avoids developers having to deal with fragments, row selection while working on custom SAPUI5 applications or Fiori Elements extensions. Below you can see the features that Entry Read has.

**Features:**
- sap.m.Dialog generation with a SmartForm, SimpleForm or Custom content
- sap.uxap.ObjectPageLayout generation with a SmartForm, SimpleForm or Custom Content
- Property sorting, excluding
- Label generation for the SmartForm, SimpleForm elements
- Call a fragment and bind the context in case you do not want to use the auto-generated dialog

### Use Case

Let's say that you have an EntitySet named `Products` which is bound to a table and the `Products` entity has many properties that would not fit to the table. The objective is to enable the end user to select a row from the table and display the details with more properties through the OData V2 Model on a dialog screen. The following steps outline the process.

1) You need to create a **.fragment.xml** file that contains a Dialog with a form content (Simple, Smart etc.) and call it from the controller or generate the dialog directly on the controller
2) You need to handle the table selection
3) You need to handle the binding of the selected entity to the dialog or form

[EntryReadCL](#entry-read) class basically handles all of the steps defined above.

### Constructor

You must initialize an object from EntryReadCL in order to use it.

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Mandatory</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>controller</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.ui.core.mvc.Controller">sap.ui.core.mvc.Controller</a></td>
      <td>Yes</td>
      <td></td>
      <td>The controller object (usually <code>this</code>)</td>
    </tr>
    <tr>
      <td>settings</td>
      <td>object</td>
      <td>Yes</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>&emsp;entityPath</td>
      <td>string</td>
      <td>Yes</td>
      <td></td>
      <td>The name of the <strong>EntitySet</strong>. It can start with a <strong>"/"</strong></td>
    </tr>
    <tr>
      <td>&emsp;initializer</td>
      <td>string | <a href="https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Context">sap.ui.model.Context</a> | EntityKeysT</td>
      <td>Yes</td>
      <td></td>
      <td>The ID of the table or the context binding or the key values of the entity that will be displayed</td>
    </tr>
    <tr>
      <td>modelName?</td>
      <td>string</td>
      <td>No</td>
      <td>undefined</td>
      <td>The name of the OData V2 model which can be found on the manifest.json file. <strong>Do not specify</strong> if the model name = ""</td>
    </tr>
  </tbody>
</table>

---

There are three distinct methods for constructing an object from the [Entry Read](#entry-read) class.

### Constructor with a Table ID

The most straightforward method for utilizing the capabilities of the [Entry Read](#entry-read) class is to construct an object with the ID of a table that you have on your XML view. This method offers several advantages.

1) The table row selected by the end user is automatically detected by the [Entry Read](#entry-read) class, and the context binding of the selected row is bound to the auto-generated dialog.
2) If no table row is selected by the end user, a default message is displayed in the [sap.m.MessageBox.error](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) to the end user.

> **Important:** This method supports only the table types and selection modes listed below. If the selection mode of the table whose ID is being used for object construction is not supported, the library throws an error.

> **Information:** The default message displayed when the end user has not selected a row from the table yet can be modified using [setSelectRowMessage()](#select-row-message-2) method.

**Supported Table Types**

| Table Type                               | Selection Mode                                                              |
| :--------------------------------------- | :-------------------------------------------------------------------------- |
| [sap.m.Table][801]                       | [SingleSelect][806] \| [SingleSelectLeft][806] \| [SingleSelectMaster][806] |
| [sap.ui.table.Table][802]                | [Single][807]                                                               |
| [sap.ui.comp.smarttable.SmartTable][803] | [Single][807]                                                               |
| [sap.ui.table.AnalyticalTable][804]      | [Single][807]                                                               |
| [sap.ui.table.TreeTable][805]            | [Single][807]                                                               |

**Sample**

Let us consider an `EntitySet` named **Products**, which is bound to an [sap.m.Table][801] on the XML view. Our objective is to add a [sap.m.Button](https://sapui5.hana.ondemand.com/#/api/sap.m.Button) to the header toolbar of the table. When the user selects a row from the table and presses the **Display Product Details** button, we will open a dialog so the user can display all the details of the selected line.

![Read Constructor Sample](https://github.com/hasanciftci26/ui5-antares/blob/media/read_entry/read_constructor_1.png?raw=true)

**TypeScript**

**EntryReadCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains **all** properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor. 

`EntityKeysT` is used as one of the types of the `initializer` parameter in the class [constructor](#constructor-6).

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryReadCL from "ui5/antares/entry/v2/EntryReadCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDisplayCategoryDetails() {
    // Initialize without a type and with the table id
    const entry = new EntryReadCL(this, {
      entityPath: "Categories",
      initializer: "tblCategories" // table id       
    }); 
  }

  public async onDisplayProductDetails() {
    // Initialize with a type and the table id
    const entry = new EntryReadCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: "tblProducts" // table id       
    }); 
  }

  public async onDisplayCustomerDetails() {
    // Initialize with a model name and the table id
    const entry = new EntryReadCL(this, {
      entityPath: "Customers",
      initializer: "tblCustomers" // table id      
    }, "myODataModelName"); 
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryReadCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryReadCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDisplayProductDetails: async function () {
          // Initialize with the table id
          const entry = new EntryReadCL(this, {
            entityPath: "Products",
            initializer: "tblProducts" // table id                
          }); 
        },

        onDisplayCategoryDetails: async function () {
          // Initialize with a model name
          const entry = new EntryReadCL(this, {
            entityPath: "Categories",
            initializer: "tblCategories" // table id                 
          }, "myODataModelName");
        }
      });

    });
```

### Constructor with a Context Binding

An alternative approach to constructing an object from the [Entry Read](#entry-read) class is to utilise the [context](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Context) of the entity that will be displayed by the end user.

**Sample**

Let us consider an `EntitySet` named **Products**, which is bound to an [sap.m.Table][801] on the XML view. Our objective is to add a [sap.m.Button](https://sapui5.hana.ondemand.com/#/api/sap.m.Button) to the header toolbar of the table. When the user selects a row from the table and presses the **Display Product Details** button, we will retrieve the context of the selected row and use to construct an object from the [Entry Read](#entry-read) class.

![Read Constructor Sample](https://github.com/hasanciftci26/ui5-antares/blob/media/read_entry/read_constructor_1.png?raw=true)

**TypeScript**

**EntryReadCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains **all** properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor. 

`EntityKeysT` is used as one of the types of the `initializer` parameter in the class [constructor](#constructor-6).

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryReadCL from "ui5/antares/entry/v2/EntryReadCL"; // Import the class
import MessageBox from "sap/m/MessageBox";
import Table from "sap/m/Table";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDisplayCategoryDetails() {
    // Get the selected item and warn the end user if no row was selected
    const selectedItem = (this.getView().byId("tblCategories") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    // Get the selected context
    const selectedContext = selectedItem.getBindingContext();

    // Initialize without a type and use the binding context
    const entry = new EntryReadCL(this, {
      entityPath: "Categories",
      initializer: selectedContext // binding context
    }); 
  }

  public async onDisplayProductDetails() {
    // Get the selected item and warn the end user if no row was selected
    const selectedItem = (this.getView().byId("tblProducts") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    // Get the selected context
    const selectedContext = selectedItem.getBindingContext();

    // Initialize with a type and use the binding context
    const entry = new EntryReadCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: selectedContext // binding context
    }); 
  }

  public async onDisplayCustomerDetails() {
    // Get the selected item and warn the end user if no row was selected
    const selectedItem = (this.getView().byId("tblCustomers") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    // Get the selected context
    const selectedContext = selectedItem.getBindingContext();

    // Initialize with a model name and use the binding context
    const entry = new EntryReadCL(this, {
      entityPath: "Customers",
      initializer: selectedContext // binding context   
    }, "myODataModelName"); 
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryReadCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryReadCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDisplayProductDetails: async function () {
          // Get the selected item and warn the end user if no row was selected
          const selectedItem = this.getView().byId("tblProducts").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          // Get the selected context
          const selectedContext = selectedItem.getBindingContext();

          // Initialize with the binding context
          const entry = new EntryReadCL(this, {
            entityPath: "Products",
            initializer: selectedContext // binding context     
          }); 
        },

        onDisplayCategoryDetails: async function () {
          // Get the selected item and warn the end user if no row was selected
          const selectedItem = this.getView().byId("tblCategories").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          // Get the selected context
          const selectedContext = selectedItem.getBindingContext();

          // Initialize with the binding context
          const entry = new EntryReadCL(this, {
            entityPath: "Categories",
            initializer: selectedContext // binding context               
          }, "myODataModelName");
        }
      });

    });
```

### Constructor with Entity Keys

The final method for constructing an object from the [Entry Read](#entry-read) class is to utilize the key values of the entity that will be displayed by the end user.

**Sample**

For the purposes of this example, let us consider an `EntitySet` named **Products** with a single **key** property named `ID`, whose type is `Edm.Guid`. We would like to allow the end user to display a specific entity with the key value: **ID = "b2f0013e-418f-42aa-9a24-3770fe17ce18"**.

> **Hint:** Please note that if the `EntitySet` is bound to a table, you can retrieve the values of the **key** properties of the selected row using the **getBindingContext().getObject()** method.

> **Information:** The EntryReadCL class creates a binding context with the values of the specified **key** properties using the `initializer` parameter in the class [constructor](#constructor-6) and subsequently binds the created context to the dialog.

**TypeScript**

**EntryReadCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains **all** properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor. 

`EntityKeysT` is used as one of the types of the `initializer` parameter in the class [constructor](#constructor-5).

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryReadCL from "ui5/antares/entry/v2/EntryReadCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDisplayCategoryDetails() {
    // Prepare the key values of a specific entity
    const keyValues = {
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
    };

    // Initialize without a type and use the key values as the initializer
    const entry = new EntryReadCL(this, {
      entityPath: "Categories",
      initializer: keyValues // key values of the entity
    });
  }

  public async onDisplayProductDetails() {
    // Prepare the key values of a specific entity
    const keyValues = {
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
    };

    // Initialize with a type and use the key values as the initializer
    const entry = new EntryReadCL<IProducts, IProductKeys>(this, {
      entityPath: "Products",
      initializer: keyValues // key values of the entity
    });
  }

  public async onDisplayCustomerDetails() {
    // Prepare the key values of a specific entity
    const keyValues = {
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
    };

    // Initialize with a model name and use the key values as the initializer
    const entry = new EntryReadCL(this, {
      entityPath: "Customers",
      initializer: keyValues // key values of the entity
    }, "myODataModelName"); 
  }
}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryReadCL"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryReadCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDisplayProductDetails: async function () {
          // Prepare the key values of a specific entity
          const keyValues = {
            ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
          };

          // Initialize with the entity set name and use the key values as the initializer
          const entry = new EntryReadCL(this, {
            entityPath: "Products",
            initializer: keyValues // key values of the entity
          });  
        },

        onDisplayCategoryDetails: async function () {
          // Prepare the key values of a specific entity
          const keyValues = {
            ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18"
          };

          // Initialize with the entity set name and use the key values as the initializer
          const entry = new EntryReadCL(this, {
            entityPath: "Categories",
            initializer: keyValues // key values of the entity        
          }, "myODataModelName");          
        }
      });

    });
```

### Select Row Message

If the object from the [Entry Read](#entry-read) class is constructed using the [Constructor with a Table ID](#constructor-with-a-table-id-2) approach, a default error message is displayed in an [sap.m.MessageBox.error](https://sapui5.hana.ondemand.com/#/api/sap.m.MessageBox) to the end user when the user has not yet selected a row from the table.

To change the default message, **setSelectRowMessage()** method can be utilized.

**Setter (setSelectRowMessage)**

| Parameter | Type   | Mandatory | Description                                                                           | 
| :-------- | :----- | :-------- | :------------------------------------------------------------------------------------ |
| message   | string | Yes       | The message that is displayed when the end user has not selected a row from the table |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getSelectRowMessage)**

| Returns | Description                                                                                                                     |
| :------ | :------------------------------------------------------------------------------------------------------------------------------ |
| string  | Returns the value that was set using **setSelectRowMessage()** method. Default value is **Please select a row from the table.** |

### Read Entry

**readEntry()** method binds the context, which is determined using the `initializer` parameter in the class [constructor](#constructor-6), to the dialog that is automatically generated or loaded from the fragment that is placed in the application files. Once the context is bound, the generated/loaded dialog is opened.

By default, **readEntry()** method uses the [ODataMetaModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.ODataMetaModel) to determine the `EntityType` of the `EntitySet` that was set by the [constructor](#constructor-6) and brings all the properties in the same order as the OData metadata into the generated form. 

The labels are generated assuming that the naming convention of the `EntityType` is **camelCase**. Please see [Label Generation](#label-generation)

> **Important:** It is not possible to modify any of the properties of an `EntitySet` on the auto-generated dialog. This behaviour cannot be altered.

> **Important:** Please be advised that the **readEntry()** method must be called after any configurations have been made through the public method of the [Entry Read](#entry-read) class. Any configurations (form title, end button text, etc.) made after the **readEntry()** method will not be reflected. Basically, **readEntry()** method should be called at the end of your code block.

By default, the **key** properties with **Edm.Guid** type are not visible on the generated form. However, this behavior can be modified using the [setDisplayGuidProperties()](#properties-with-edmguid-type) method.

> **Important:** Please be advised that the random UUID generation for properties with the `Edm.Guid` type is not available in the [Entry Read](#entry-read) class.

#### Method Parameters

| Returns         | Description                                                                                                                                                  |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise\<void\> | After the promise is resolved, the context can be retrieved by the **getEntryContext()** method using the object instantiated from the **EntryReadCL** class |

> **readEntry()** method uses the default configurations when creating the dialog. However, these configurations can be modified using the public setter methods.

#### Default Values

| Term                    | Default Value                       | Description                                               | Setter                           | Getter                           |
| :---------------------- | :---------------------------------- | :-------------------------------------------------------- | :------------------------------- | :------------------------------- |
| Naming Strategy         | [NamingStrategies.CAMEL_CASE][12]   | The default naming strategy is **CAMEL_CASE**             | [setNamingStrategy()][2]         | [getNamingStrategy()][2]         |
| Resource Bundle Prefix  | antares                             | The default resource bundle prefix is **antares**         | [setResourceBundlePrefix()][10]  | [getResourceBundlePrefix()][10]  |
| Use Metadata Labels     | false                               | The labels are not taken from the metadata but generated  | [setUseMetadataLabels()][11]     | [getUseMetadataLabels()][11]     |
| Form Type               | [FormTypes.SMART][13]               | SmartForm with SmartFields is generated by default        | [setFormType()][3]               | [getFormType()][3]               |
| Form Title              | Read + ${entityPath}                | entityPath from the [constructor](#constructor-6) is used | [setFormTitle()][4]              | [getFormTitle()][4]              |
| End Button Text         | Close                               | The default end button text is **Close**                  | [setEndButtonText()][8]          | [getEndButtonText()][8]          |
| End Button Type         | [ButtonType.Negative][7]            | The default button type is **Negative**                   | [setEndButtonType()][9]          | [getEndButtonType()][9]          |

<br/>

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import EntryReadCL from "ui5/antares/entry/v2/EntryReadCL"; // Import the class
import Table from "sap/m/Table";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDisplayProductDetails() {
    // Initialize without a type and with a table id
    const entry = new EntryReadCL(this, {
      entityPath: "Products",
      initializer: "tblProducts"
    });

    // Call 
    entry.readEntry(false); 
  }

  public async onDisplayCategoryDetails() {
    const selectedItem = (this.getView().byId("tblCategories") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    }

    const selectedContext = selectedItem.getBindingContext();

    // Initialize with a type and a binding context
    const entry = new EntryReadCL<ICategory>(this, {
      entityPath: "Categories",
      initializer: selectedContext
    }); 

    // Call
    entry.readEntry();
  }

  public async onDisplayCustomerDetails () {
    const selectedItem = (this.getView().byId("tblCustomers") as Table).getSelectedItem();

    if (!selectedItem) {
      MessageBox.error("Please select a row from the table");
      return;
    };

    const customerKeys = {
      ID: selectedItem.getBindingContext().getObject().ID
    };

    // Initialize without a type and with the key values
    const entry = new EntryReadCL(this, {
      entityPath: "Customers",
      initializer: customerKeys
    });

    // Call
    entry.readEntry();
  }
}

interface ICategory {
  ID: string;
  name?: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/entry/v2/EntryReadCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, EntryReadCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDisplayProductDetails: async function () {
          // Initialize with a table id
          const entry = new EntryReadCL(this, {
            entityPath: "Products",
            initializer: "tblProducts"
          }); 

          // Call
          entry.readEntry();
        },

        onDisplayCategoryDetails: async function () {
          const selectedItem = this.getView().byId("tblCategories").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          const selectedContext = selectedItem.getBindingContext();

          // Initialize with a binding context
          const entry = new EntryReadCL(this, {
            entityPath: "Categories",
            initializer: selectedContext
          }); 

          // Call
          entry.readEntry();
        },

        onDisplayCustomerDetails: async function () {
          const selectedItem = this.getView().byId("tblCustomers").getSelectedItem();

          if (!selectedItem) {
            MessageBox.error("Please select a row from the table");
            return;
          }

          const customerKeys = {
            ID: selectedItem.getBindingContext().getObject().ID
          };

          // Initialize with the key values
          const entry = new EntryReadCL(this, {
            entityPath: "Customers",
            initializer: customerKeys
          }); 

          // Call
          entry.readEntry();          
        }
      });

    });
```

The generated form with default values will more or less look like the following. It will vary depending on the configurations and the `EntityType` properties of the `EntitySet`.

![Read Entry](https://github.com/hasanciftci26/ui5-antares/blob/media/read_entry/read_entry.png?raw=true)

### Available Features

The [EntryReadCL](#entry-read) class is derived from the same abstract class as the [EntryCreateCL](#entry-create) class and contains the same methods. However, some of these functions are not applicable to the [EntryReadCL](#entry-read) class. 

> **Important:** Please note that the default values for the available functions may differ.

The features listed below are identical to those available in [EntryCreateCL](#entry-create). Methods can be accessed through the object constructed from the [EntryReadCL](#entry-read) class.

> **Hint**: To access the documentation for a particular feature, please click on the name of the feature.

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Availability</th>
      <th>Default Value</th>
      <th>Remarks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#manual-submit">Manual Submit</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>  
    <tr>
      <td><a href="#label-generation">Label Generation</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#resource-bundle-prefix">Resource Bundle Prefix</a></td>
      <td align="center">&#x2714;</td>
      <td>antares</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#naming-strategy">Naming Strategy</a></td>
      <td align="center">&#x2714;</td>
      <td>CAMEL_CASE</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#form-type">Form Type</a></td>
      <td align="center">&#x2714;</td>
      <td>SMART</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#form-title">Form Title</a></td>
      <td align="center">&#x2714;</td>
      <td>Delete <code>${entityPath}</code></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#form-grouping">Form Grouping</a></td>
      <td align="center">&#x2714;</td>
      <td>[]</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#begin-button-text">Begin Button Text</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#begin-button-type">Begin Button Type</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#end-button-text">End Button Text</a></td>
      <td align="center">&#x2714;</td>
      <td>Close</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="#end-button-type">End Button Type</a></td>
      <td align="center">&#x2714;</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.m.ButtonType">ButtonType.Negative</a></td>
      <td></td>
    </tr>   
    <tr>
      <td><a href="#properties-with-edmguid-type">Properties with Edm.Guid Type</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td>The random UUID generation is not available. You can only modify the visibilities of the properties with <code>Edm.Guid</code> type</td>
    </tr>
    <tr>
      <td><a href="#form-property-order">Form Property Order</a></td>
      <td align="center">&#x2714;</td>
      <td>[]</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#excluded-properties">Excluded Properties</a></td>
      <td align="center">&#x2714;</td>
      <td>[]</td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#mandatory-properties">Mandatory Properties</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#readonly-properties">Readonly Properties</a></td>
      <td align="center">&#x2717;</td>
      <td>[all properties]</td>
      <td>By default, all the properties are readonly and cannot be changed</td>
    </tr>    
    <tr>
      <td><a href="#attach-submit-completed">Attach Submit Completed</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#attach-submit-failed">Attach Submit Failed</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#response-class">Response Class</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#value-help">Value Help</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#validation-logic">Validation Logic</a></td>
      <td align="center">&#x2717;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#object-page">Object Page</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>      
    <tr>
      <td><a href="#custom-control">Custom Control</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#custom-content">Custom Content</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
    <tr>
      <td><a href="#custom-fragment">Custom Fragment</a></td>
      <td align="center">&#x2714;</td>
      <td></td>
      <td></td>
    </tr>    
  </tbody>
</table>

## Promisified OData V2 Classes

UI5 Antares, provides promisified OData V2 classes that can be used through the [sap.ui.model.odata.v2.ODataModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel) you have on your application's manifest.json file.

### OData Create

ODataCreateCL is a class that uses [sap.ui.model.odata.v2.ODataModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel) to handle POST (CREATE) requests in a promisified way.

#### Constructor

You must initialize an object from ODataCreateCL in order to use it.

| Parameter  | Type                            | Mandatory | Default Value | Description                                                                                                            | 
| :--------- | :------------------------------ | :-------- | :------------ | :--------------------------------------------------------------------------------------------------------------------- |
| controller | [sap.ui.core.mvc.Controller][1] | Yes       |               | The controller object (usually `this`)                                                                                 |
| entityPath | string                          | Yes       |               | The name of the **EntitySet**. It can start with a **"/"**                                                             |
| modelName? | string                          | No        | undefined     | The name of the OData V2 model which can be found on the manifest.json file. **Do not specify** if the model name = "" |

**TypeScript**

**ODataCreateCL\<EntityT\>** is a generic class and can be initialized with a type that contains the properties of the EntitySet that is used as a parameter on the class constructor. `EntityT` is used as the type of the `data` parameter of the **setData(data: EntityT)** method and as the returning type of the **getData(): EntityT** method. 

Also, it is used as the returning type of the **create(): Promise\<EntityT\>** method which is used to send the POST request through the [sap.ui.model.odata.v2.ODataModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel).

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    // Initialize without a type
    const odata = new ODataCreateCL(this, "Products"); 
  }

  public async onCreateCategory() {
    // Initialize with a type
    const odata = new ODataCreateCL<ICategory>(this, "Categories"); 
  }

  public async onCreateCustomer() {
    // Initialize with a model name
    const odata = new ODataCreateCL(this, "Customers", "myODataModelName"); 
  }
}

interface ICategory {
  ID: string;
  name?: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataCreateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // Initialize
          const odata = new ODataCreateCL(this, "Products"); 
        },

        onCreateCategory: async function () {
          // Initialize with a model name
          const odata = new ODataCreateCL(this, "Categories", "myODataModelName");
        }
      });

    });
```

#### Set Data

To set the data that will be sent via the POST HTTP request body, the **setData()** method can be used.

> **Hint:** You can set the data including the associations (deep create).

**Setter (setData)**

| Parameter | Type    | Mandatory | Description                                               | 
| :-------- | :------ | :-------- | :-------------------------------------------------------- |
| data      | EntityT | Yes       | The data that will be sent via the POST HTTP request body |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getData)**

| Returns | Description                                                                               |
| :------ | :---------------------------------------------------------------------------------------- |
| EntityT | Returns the value that was set using **setData()** method. Default value is **undefined** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    // Initialize with a type
    const odata = new ODataCreateCL<IProducts>(this, "Products"); 

    // set the http body
    odata.setData({
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18",
      name: "Product Name",
      description: "Description",
      brand: "Brand",
      price: 999,
      currency: "EUR",
      quantityInStock: 15,
      categoryID: "eb7783a6-f30f-4f7d-b85c-f211eea54568",
      supplierID: "7734d25f-0d1e-4ab4-b8a8-cd201f29fd2f"
    });
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataCreateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // Initialize
          const odata = new ODataCreateCL(this, "Products"); 

          // set the http body
          odata.setData({
            ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18",
            name: "Product Name",
            description: "Description",
            brand: "Brand",
            price: 999,
            currency: "EUR",
            quantityInStock: 15,
            categoryID: "eb7783a6-f30f-4f7d-b85c-f211eea54568",
            supplierID: "7734d25f-0d1e-4ab4-b8a8-cd201f29fd2f"
          });
        }
      });

    });
```

#### Create Request

To send the POST (Create) request through the OData V2 model, **create()** method can be utilized.

> **Important:** It is mandatory to set the data using the [setData()](#set-data) method before calling the **create()** method.

The **create()** method runs **asynchronously** and can be awaited. 

The **create()** method returns the data of the created entity if the request was successful.

> **Important:** If the POST request fails, the [OData Create](#odata-create) class will throw an error. To catch the error, the **create()** method should be called in a try-catch block. 

**Error Type**

If the POST request fails, the object thrown by the class can contain the properties below.

| Returns                                                | Description                          |
| ------------------------------------------------------ | ------------------------------------ |
| `object`                                               |                                      |
| &emsp;headers?: `object` \| `undefined`                | The HTTP response headers.           |
| &emsp;message?: `string` \| `undefined`                | The HTTP response message.           |
| &emsp;responseText?: `string` \| `undefined`           | The HTTP response text.              |
| &emsp;statusCode?: `string` \| `number` \| `undefined` | The status code of the HTTP request. |
| &emsp;statusText?: `string` \| `undefined`             | The HTTP status text.                |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL"; // Import the class
import { IError } from "ui5/antares/types/common"; // Import the error type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    // Initialize with a type
    const odata = new ODataCreateCL<IProducts>(this, "Products"); 

    // set the http body
    odata.setData({
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18",
      name: "Product Name",
      description: "Description",
      brand: "Brand",
      price: 999,
      currency: "EUR",
      quantityInStock: 15,
      categoryID: "eb7783a6-f30f-4f7d-b85c-f211eea54568",
      supplierID: "7734d25f-0d1e-4ab4-b8a8-cd201f29fd2f"
    });

    try {
      // send the http request and get the result
      const result = await odata.create();
      MessageBox.information(result.ID + " was created.");
    } catch (error) {
      // catch the error
      MessageBox.error((error as IError).message || "Request failed");
    }
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataCreateCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataCreateCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // Initialize
          const odata = new ODataCreateCL(this, "Products"); 

          // set the http body
          odata.setData({
            ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18",
            name: "Product Name",
            description: "Description",
            brand: "Brand",
            price: 999,
            currency: "EUR",
            quantityInStock: 15,
            categoryID: "eb7783a6-f30f-4f7d-b85c-f211eea54568",
            supplierID: "7734d25f-0d1e-4ab4-b8a8-cd201f29fd2f"
          });

          try {
            // send the http request and get the result
            const result = await odata.create();
            MessageBox.information(result.ID + " was created.");
          } catch (error) {
            // catch the error
            MessageBox.error(error.message || "Request failed");
          }          
        }
      });

    });
```

#### URL Parameters

To set the URL parameters before sending the POST request with the [create()](#create-request) method, the **setUrlParameters()** method can be used.

**Setter (setUrlParameters)**

| Parameter     | Type                   | Mandatory | Description                            | 
| :------------ | :--------------------- | :-------- | :------------------------------------- |
| urlParameters | Record<string, string> | Yes       | The URL parameters of the POST request |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getUrlParameters)**

| Returns                             | Description                                                                                        |
| :---------------------------------- | :------------------------------------------------------------------------------------------------- |
| Record<string, string> \| undefined | Returns the value that was set using **setUrlParameters()** method. Default value is **undefined** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    // Initialize with a type
    const odata = new ODataCreateCL<IProducts>(this, "Products"); 

    // set the url parameters
    odata.setUrlParameters({
      "$expand": "toProductLocations"
    });
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataCreateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // Initialize
          const odata = new ODataCreateCL(this, "Products"); 

          // set the url parameters
          odata.setUrlParameters({
            "$expand": "toProductLocations"
          });         
        }
      });

    });
```

#### Refresh After Change

By default, the OData V2 model will be refreshed after the POST request has been completed.

To change the default behavior, the **setRefreshAfterChange()** method can be utilized.

**Setter (setRefreshAfterChange)**

| Parameter          | Type    | Mandatory | Description                                                                                        | 
| :----------------- | :------ | :-------- | :------------------------------------------------------------------------------------------------- |
| refreshAfterChange | boolean | Yes       | If set to **false**, the OData V2 model will not be refreshed after the request has been completed |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getRefreshAfterChange)**

| Returns | Description                                                                                        |
| :------ | :------------------------------------------------------------------------------------------------- |
| boolean | Returns the value that was set using **setRefreshAfterChange()** method. Default value is **true** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    // Initialize with a type
    const odata = new ODataCreateCL<IProducts>(this, "Products"); 

    // deactivate the auto model refresh
    odata.setRefreshAfterChange(false);
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataCreateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // Initialize
          const odata = new ODataCreateCL(this, "Products"); 

          // deactivate the auto model refresh
          odata.setRefreshAfterChange(false);      
        }
      });

    });
```

#### Additional Response Info

The [create()](#create-request) method returns the data of the successfully created entity. However, you may want to get some additional information such as `status code`, `headers`.

The **getResponse()** method can be utilized to get additional information after the [create()](#create-request) is resolved.

| Returns                                                | Description                          |
| ------------------------------------------------------ | ------------------------------------ |
| `object`                                               |                                      |
| &emsp;$reported?: `boolean` \| `undefined`             |                                      |
| &emsp;body?: `string` \| `undefined`                   | The HTTP body                        |
| &emsp;headers?: `object` \| `undefined`                | The HTTP response headers.           |
| &emsp;statusCode?: `string` \| `number` \| `undefined` | The status code of the HTTP request. |
| &emsp;statusText?: `string` \| `undefined`             | The HTTP status text.                |
| &emsp;_imported?: `boolean` \| `undefined`             |                                      |
| &emsp;data?: `EntityT` \| `undefined`                  | The data that was created            |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL"; // Import the class
import { IError } from "ui5/antares/types/common"; // Import the error type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onCreateProduct() {
    // Initialize with a type
    const odata = new ODataCreateCL<IProducts>(this, "Products"); 

    // set the http body
    odata.setData({
      ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18",
      name: "Product Name",
      description: "Description",
      brand: "Brand",
      price: 999,
      currency: "EUR",
      quantityInStock: 15,
      categoryID: "eb7783a6-f30f-4f7d-b85c-f211eea54568",
      supplierID: "7734d25f-0d1e-4ab4-b8a8-cd201f29fd2f"
    });

    try {
      // send the http request and get the result
      const result = await odata.create();
      MessageBox.information(result.ID + " was created.");

      // get the additional response info
      const response = odata.getResponse();

      if (response) {
        console.log("Status Code: " + response.statusCode);
      }
    } catch (error) {
      // catch the error
      MessageBox.error((error as IError).message || "Request failed");
    }
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataCreateCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataCreateCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onCreateProduct: async function () {
          // Initialize
          const odata = new ODataCreateCL(this, "Products"); 

          // set the http body
          odata.setData({
            ID: "b2f0013e-418f-42aa-9a24-3770fe17ce18",
            name: "Product Name",
            description: "Description",
            brand: "Brand",
            price: 999,
            currency: "EUR",
            quantityInStock: 15,
            categoryID: "eb7783a6-f30f-4f7d-b85c-f211eea54568",
            supplierID: "7734d25f-0d1e-4ab4-b8a8-cd201f29fd2f"
          });

          try {
            // send the http request and get the result
            const result = await odata.create();
            MessageBox.information(result.ID + " was created.");

            // get the additional response info
            const response = odata.getResponse();

            if (response) {
              console.log("Status Code: " + response.statusCode);
            }            
          } catch (error) {
            // catch the error
            MessageBox.error(error.message || "Request failed");
          }          
        }
      });

    });
```

#### Create Entry

[2001]: https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Context

To create a transient entity context which can be bound to a form or a dialog, **createEntry()** method can be utilized.

> **Hint**: If you want to create the context with the initial values, [setData()](#set-data) method can be utilized.

| Returns         | Description                         |
| :-------------- | :---------------------------------- |
| [Context][2001] | The context of the transient entity |

### OData Update

ODataUpdateCL is a class that uses [sap.ui.model.odata.v2.ODataModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel) to handle PATCH/MERGE (UPDATE) requests in a promisified way.

#### Constructor

You must initialize an object from ODataUpdateCL in order to use it.

| Parameter  | Type                            | Mandatory | Default Value | Description                                                                                                            | 
| :--------- | :------------------------------ | :-------- | :------------ | :--------------------------------------------------------------------------------------------------------------------- |
| controller | [sap.ui.core.mvc.Controller][1] | Yes       |               | The controller object (usually `this`)                                                                                 |
| entityPath | string                          | Yes       |               | The name of the **EntitySet**. It can start with a **"/"**                                                             |
| modelName? | string                          | No        | undefined     | The name of the OData V2 model which can be found on the manifest.json file. **Do not specify** if the model name = "" |

**TypeScript**

**ODataUpdateCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains the properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor.

`EntityT` is used as the type of the `data` parameter of the **setData(data: EntityT)** method and as the returning type of the **getData(): EntityT** and **update(): Promise\<EntityT\>** methods. 

`EntityKeysT` is used as the type of the `keys` parameter of the **update(keys: EntityKeysT)** method.

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataUpdateCL from "ui5/antares/odata/v2/ODataUpdateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onUpdateProduct() {
    // Initialize without a type
    const odata = new ODataUpdateCL(this, "Products"); 
  }

  public async onUpdateCategory() {
    // Initialize with a type
    const odata = new ODataUpdateCL<ICategory, ICategoryKeys>(this, "Categories"); 
  }

  public async onUpdateCustomer() {
    // Initialize with a model name
    const odata = new ODataUpdateCL(this, "Customers", "myODataModelName"); 
  }
}

// The properties that will be updated should not be optional
interface ICategory {
  ID: string;
  name: string;
}

interface ICategoryKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataUpdateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataUpdateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onUpdateProduct: async function () {
          // Initialize
          const odata = new ODataUpdateCL(this, "Products"); 
        },

        onUpdateCategory: async function () {
          // Initialize with a model name
          const odata = new ODataUpdateCL(this, "Categories", "myODataModelName");
        }
      });

    });
```

#### Set Data

To set the data that will be sent via the UPDATE HTTP request body, the **setData()** method can be used.

**Setter (setData)**

| Parameter | Type    | Mandatory | Description                                                 | 
| :-------- | :------ | :-------- | :---------------------------------------------------------- |
| data      | EntityT | Yes       | The data that will be sent via the UPDATE HTTP request body |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getData)**

| Returns | Description                                                                               |
| :------ | :---------------------------------------------------------------------------------------- |
| EntityT | Returns the value that was set using **setData()** method. Default value is **undefined** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataUpdateCL from "ui5/antares/odata/v2/ODataUpdateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onUpdateProduct() {
    // Initialize with a type
    const odata = new ODataUpdateCL<IProducts, IProductKeys>(this, "Products"); 

    // set the http body to update
    odata.setData({
      name: "New Product Name",
      description: "New Description"
    });
  }

}

// The properties that will be updated should not be optional
interface IProducts {
  ID?: string;
  name: string;
  description: string;
  brand?: string;
  price?: number;
  currency?: string;
  quantityInStock?: number;
  categoryID?: string;
  supplierID?: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataUpdateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataUpdateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onUpdateProduct: async function () {
          // Initialize
          const odata = new ODataUpdateCL(this, "Products"); 

          // set the http body to update
          odata.setData({
            name: "New Product Name",
            description: "New Description"
          });
        }
      });

    });
```

#### Update Request

To send the PATCH/MERGE/PUT (Update) request through the OData V2 model, **update(keys: EntityKeysT)** method can be utilized.

> **Important:** It is mandatory to set the data using the [setData()](#set-data-1) method before calling the **update()** method.

The **update()** method runs **asynchronously** and can be awaited. 

The **update()** method returns the data of the update entity if the request was successful.

> **Important:** If the UPDATE request fails, the [OData Update](#odata-update) class will throw an error. To catch the error, the **update()** method should be called in a try-catch block. 

**Error Type**

If the UPDATE request fails, the object thrown by the class can contain the properties below.

| Returns                                                | Description                          |
| ------------------------------------------------------ | ------------------------------------ |
| `object`                                               |                                      |
| &emsp;headers?: `object` \| `undefined`                | The HTTP response headers.           |
| &emsp;message?: `string` \| `undefined`                | The HTTP response message.           |
| &emsp;responseText?: `string` \| `undefined`           | The HTTP response text.              |
| &emsp;statusCode?: `string` \| `number` \| `undefined` | The status code of the HTTP request. |
| &emsp;statusText?: `string` \| `undefined`             | The HTTP status text.                |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataUpdateCL from "ui5/antares/odata/v2/ODataUpdateCL"; // Import the class
import { IError } from "ui5/antares/types/common"; // Import the error type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onUpdateProduct() {
    // Initialize with a type
    const odata = new ODataUpdateCL<IProducts, IProductKeys>(this, "Products"); 

    // set the http body to update
    odata.setData({
      name: "New Product Name",
      description: "New Description"
    });

    try {
      // send the http request and get the result. Note: You have to specify the key values of the entity that will be updated
      const result = await odata.update({
        ID: "3ccb5dd2-cc12-483a-b569-a6ec844f8f0b"
      });

      MessageBox.information("The entity with the following ID: " + result.ID + " was updated.");
    } catch (error) {
      // catch the error
      MessageBox.error((error as IError).message || "Request failed");
    }
  }

}

// The properties that will be updated should not be optional
interface IProducts {
  ID?: string;
  name: string;
  description: string;
  brand?: string;
  price?: number;
  currency?: string;
  quantityInStock?: number;
  categoryID?: string;
  supplierID?: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataUpdateCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataUpdateCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onUpdateProduct: async function () {
          // Initialize
          const odata = new ODataUpdateCL(this, "Products"); 

          // set the http body to update
          odata.setData({
            name: "New Product Name",
            description: "New Description"
          });

          try {
            // send the http request and get the result. Note: You have to specify the key values of the entity that will be updated
            const result = await odata.update({
              ID: "3ccb5dd2-cc12-483a-b569-a6ec844f8f0b"
            });

            MessageBox.information("The entity with the following ID: " + result.ID + " was updated.");
          } catch (error) {
            // catch the error
            MessageBox.error(error.message || "Request failed");
          }          
        }
      });

    });
```

#### URL Parameters

To set the URL parameters before sending the UPDATE request with the [update()](#update-request) method, the **setUrlParameters()** method can be used.

**Setter (setUrlParameters)**

| Parameter     | Type                   | Mandatory | Description                              | 
| :------------ | :--------------------- | :-------- | :--------------------------------------- |
| urlParameters | Record<string, string> | Yes       | The URL parameters of the UPDATE request |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getUrlParameters)**

| Returns                             | Description                                                                                        |
| :---------------------------------- | :------------------------------------------------------------------------------------------------- |
| Record<string, string> \| undefined | Returns the value that was set using **setUrlParameters()** method. Default value is **undefined** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataUpdateCL from "ui5/antares/odata/v2/ODataUpdateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onUpdateProduct() {
    // Initialize with a type
    const odata = new ODataUpdateCL<IProducts, IProductKeys>(this, "Products"); 

    // set the url parameters
    odata.setUrlParameters({
      "$expand": "toProductLocations"
    });
  }

}

// The properties that will be updated should not be optional
interface IProducts {
  ID?: string;
  name: string;
  description: string;
  brand?: string;
  price?: number;
  currency?: string;
  quantityInStock?: number;
  categoryID?: string;
  supplierID?: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataUpdateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataUpdateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onUpdateProduct: async function () {
          // Initialize
          const odata = new ODataUpdateCL(this, "Products"); 

          // set the url parameters
          odata.setUrlParameters({
            "$expand": "toProductLocations"
          });         
        }
      });

    });
```

#### Refresh After Change

By default, the OData V2 model will be refreshed after the UPDATE request has been completed.

To change the default behavior, the **setRefreshAfterChange()** method can be utilized.

**Setter (setRefreshAfterChange)**

| Parameter          | Type    | Mandatory | Description                                                                                        | 
| :----------------- | :------ | :-------- | :------------------------------------------------------------------------------------------------- |
| refreshAfterChange | boolean | Yes       | If set to **false**, the OData V2 model will not be refreshed after the request has been completed |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getRefreshAfterChange)**

| Returns | Description                                                                                        |
| :------ | :------------------------------------------------------------------------------------------------- |
| boolean | Returns the value that was set using **setRefreshAfterChange()** method. Default value is **true** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataUpdateCL from "ui5/antares/odata/v2/ODataUpdateCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onUpdateProduct() {
    // Initialize with a type
    const odata = new ODataUpdateCL<IProducts, IProductKeys>(this, "Products"); 

    // deactivate the auto model refresh
    odata.setRefreshAfterChange(false);
  }

}

// The properties that will be updated should not be optional
interface IProducts {
  ID?: string;
  name: string;
  description: string;
  brand?: string;
  price?: number;
  currency?: string;
  quantityInStock?: number;
  categoryID?: string;
  supplierID?: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataUpdateCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataUpdateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onUpdateProduct: async function () {
          // Initialize
          const odata = new ODataUpdateCL(this, "Products"); 

          // deactivate the auto model refresh
          odata.setRefreshAfterChange(false);      
        }
      });

    });
```

#### Additional Response Info

The [update()](#update-request) method returns the data of the successfully updated entity. However, you may want to get some additional information such as `status code`, `headers`.

The **getResponse()** method can be utilized to get additional information after the [update()](#update-request) is resolved.

| Returns                                                | Description                          |
| ------------------------------------------------------ | ------------------------------------ |
| `object`                                               |                                      |
| &emsp;$reported?: `boolean` \| `undefined`             |                                      |
| &emsp;body?: `string` \| `undefined`                   | The HTTP body                        |
| &emsp;headers?: `object` \| `undefined`                | The HTTP response headers.           |
| &emsp;statusCode?: `string` \| `number` \| `undefined` | The status code of the HTTP request. |
| &emsp;statusText?: `string` \| `undefined`             | The HTTP status text.                |
| &emsp;_imported?: `boolean` \| `undefined`             |                                      |
| &emsp;data?: `EntityT` \| `undefined`                  | The data that was updated            |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataUpdateCL from "ui5/antares/odata/v2/ODataUpdateCL"; // Import the class
import { IError } from "ui5/antares/types/common"; // Import the error type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onUpdateProduct() {
    // Initialize with a type
    const odata = new ODataUpdateCL<IProducts, IProductKeys>(this, "Products"); 

    // set the http body
    odata.setData({
      name: "New Product Name",
      description: "New Description"
    });

    try {
      // send the http request and get the result
      const result = await odata.update({
        ID: "3ccb5dd2-cc12-483a-b569-a6ec844f8f0b"
      });

      MessageBox.information(result.ID + " was updated.");

      // get the additional response info
      const response = odata.getResponse();

      if (response) {
        console.log("Status Code: " + response.statusCode);
      }
    } catch (error) {
      // catch the error
      MessageBox.error((error as IError).message || "Request failed");
    }
  }

}

// The properties that will be updated should not be optional
interface IProducts {
  ID?: string;
  name: string;
  description: string;
  brand?: string;
  price?: number;
  currency?: string;
  quantityInStock?: number;
  categoryID?: string;
  supplierID?: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataUpdateCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataUpdateCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onUpdateProduct: async function () {
          // Initialize
          const odata = new ODataUpdateCL(this, "Products"); 

          // set the http body
          odata.setData({
            name: "New Product Name",
            description: "New Description"
          });

          try {
            // send the http request and get the result
            const result = await odata.update({
              ID: "3ccb5dd2-cc12-483a-b569-a6ec844f8f0b"
            });

            MessageBox.information(result.ID + " was updated.");

            // get the additional response info
            const response = odata.getResponse();

            if (response) {
              console.log("Status Code: " + response.statusCode);
            }            
          } catch (error) {
            // catch the error
            MessageBox.error(error.message || "Request failed");
          }          
        }
      });

    });
```

### OData Delete

ODataDeleteCL is a class that uses [sap.ui.model.odata.v2.ODataModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel) to handle DELETE requests in a promisified way.

#### Constructor

You must initialize an object from ODataDeleteCL in order to use it.

| Parameter  | Type                            | Mandatory | Default Value | Description                                                                                                            | 
| :--------- | :------------------------------ | :-------- | :------------ | :--------------------------------------------------------------------------------------------------------------------- |
| controller | [sap.ui.core.mvc.Controller][1] | Yes       |               | The controller object (usually `this`)                                                                                 |
| entityPath | string                          | Yes       |               | The name of the **EntitySet**. It can start with a **"/"**                                                             |
| modelName? | string                          | No        | undefined     | The name of the OData V2 model which can be found on the manifest.json file. **Do not specify** if the model name = "" |

**TypeScript**

**ODataDeleteCL\<EntityKeysT\>** is a generic class and can be initialized with a type. 

- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor.

`EntityKeysT` is used as the returning type and the type of the `keys` parameter of the **delete(keys: EntityKeysT): Promise\<EntityKeysT\>** method.

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataDeleteCL from "ui5/antares/odata/v2/ODataDeleteCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteProduct() {
    // Initialize without a type
    const odata = new ODataDeleteCL(this, "Products"); 
  }

  public async onDeleteCategory() {
    // Initialize with a type
    const odata = new ODataDeleteCL<ICategoryKeys>(this, "Categories"); 
  }

  public async onDeleteCustomer() {
    // Initialize with a model name
    const odata = new ODataDeleteCL(this, "Customers", "myODataModelName"); 
  }
}

interface ICategoryKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataDeleteCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataDeleteCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize
          const odata = new ODataDeleteCL(this, "Products"); 
        },

        onDeleteCategory: async function () {
          // Initialize with a model name
          const odata = new ODataDeleteCL(this, "Categories", "myODataModelName");
        }
      });

    });
```

#### Delete Request

To send the DELETE request through the OData V2 model, **delete(keys: EntityKeysT): Promise\<EntityKeysT\>** method can be utilized.

The **delete()** method runs **asynchronously** and can be awaited. 

The **delete()** method returns the key data of the deleted entity if the request was successful.

> **Important:** If the DELETE request fails, the [OData Delete](#odata-delete) class will throw an error. To catch the error, the **delete()** method should be called in a try-catch block. 

**Error Type**

If the DELETE request fails, the object thrown by the class can contain the properties below.

| Returns                                                | Description                          |
| ------------------------------------------------------ | ------------------------------------ |
| `object`                                               |                                      |
| &emsp;headers?: `object` \| `undefined`                | The HTTP response headers.           |
| &emsp;message?: `string` \| `undefined`                | The HTTP response message.           |
| &emsp;responseText?: `string` \| `undefined`           | The HTTP response text.              |
| &emsp;statusCode?: `string` \| `number` \| `undefined` | The status code of the HTTP request. |
| &emsp;statusText?: `string` \| `undefined`             | The HTTP status text.                |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataDeleteCL from "ui5/antares/odata/v2/ODataDeleteCL"; // Import the class
import { IError } from "ui5/antares/types/common"; // Import the error type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteProduct() {
    // Initialize with a type
    const odata = new ODataDeleteCL<IProductKeys>(this, "Products"); 

    try {
      // send the http request and get the result. Note: You have to specify the key values of the entity that will be deleted
      const result = await odata.delete({
        ID: "3ccb5dd2-cc12-483a-b569-a6ec844f8f0b"
      });

      MessageBox.information("The entity with the following ID: " + result.ID + " was deleted.");
    } catch (error) {
      // catch the error
      MessageBox.error((error as IError).message || "Request failed");
    }
  }

}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataDeleteCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataDeleteCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize
          const odata = new ODataDeleteCL(this, "Products"); 

          try {
            // send the http request and get the result. Note: You have to specify the key values of the entity that will be deleted
            const result = await odata.delete({
              ID: "3ccb5dd2-cc12-483a-b569-a6ec844f8f0b"
            });

            MessageBox.information("The entity with the following ID: " + result.ID + " was deleted.");
          } catch (error) {
            // catch the error
            MessageBox.error(error.message || "Request failed");
          }          
        }
      });

    });
```

#### URL Parameters

To set the URL parameters before sending the DELETE request with the [delete()](#delete-request) method, the **setUrlParameters()** method can be used.

**Setter (setUrlParameters)**

| Parameter     | Type                   | Mandatory | Description                              | 
| :------------ | :--------------------- | :-------- | :--------------------------------------- |
| urlParameters | Record<string, string> | Yes       | The URL parameters of the DELETE request |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getUrlParameters)**

| Returns                             | Description                                                                                        |
| :---------------------------------- | :------------------------------------------------------------------------------------------------- |
| Record<string, string> \| undefined | Returns the value that was set using **setUrlParameters()** method. Default value is **undefined** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataDeleteCL from "ui5/antares/odata/v2/ODataDeleteCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteProduct() {
    // Initialize with a type
    const odata = new ODataDeleteCL<IProductKeys>(this, "Products"); 

    // set the url parameters
    odata.setUrlParameters({
      "$expand": "toProductLocations"
    });
  }

}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataDeleteCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataDeleteCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize
          const odata = new ODataDeleteCL(this, "Products"); 

          // set the url parameters
          odata.setUrlParameters({
            "$expand": "toProductLocations"
          });         
        }
      });

    });
```

#### Refresh After Change

By default, the OData V2 model will be refreshed after the DELETE request has been completed.

To change the default behavior, the **setRefreshAfterChange()** method can be utilized.

**Setter (setRefreshAfterChange)**

| Parameter          | Type    | Mandatory | Description                                                                                        | 
| :----------------- | :------ | :-------- | :------------------------------------------------------------------------------------------------- |
| refreshAfterChange | boolean | Yes       | If set to **false**, the OData V2 model will not be refreshed after the request has been completed |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getRefreshAfterChange)**

| Returns | Description                                                                                        |
| :------ | :------------------------------------------------------------------------------------------------- |
| boolean | Returns the value that was set using **setRefreshAfterChange()** method. Default value is **true** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataDeleteCL from "ui5/antares/odata/v2/ODataDeleteCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteProduct() {
    // Initialize with a type
    const odata = new ODataDeleteCL<IProductKeys>(this, "Products"); 

    // deactivate the auto model refresh
    odata.setRefreshAfterChange(false);
  }

}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataDeleteCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataDeleteCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize
          const odata = new ODataDeleteCL(this, "Products"); 

          // deactivate the auto model refresh
          odata.setRefreshAfterChange(false);      
        }
      });

    });
```

#### Additional Response Info

The [delete()](#delete-request) method returns the key data of the successfully deleted entity. However, you may want to get some additional information such as `status code`, `headers`.

The **getResponse()** method can be utilized to get additional information after the [delete()](#delete-request) is resolved.

| Returns                                                | Description                          |
| ------------------------------------------------------ | ------------------------------------ |
| `object`                                               |                                      |
| &emsp;$reported?: `boolean` \| `undefined`             |                                      |
| &emsp;body?: `string` \| `undefined`                   | The HTTP body                        |
| &emsp;headers?: `object` \| `undefined`                | The HTTP response headers.           |
| &emsp;statusCode?: `string` \| `number` \| `undefined` | The status code of the HTTP request. |
| &emsp;statusText?: `string` \| `undefined`             | The HTTP status text.                |
| &emsp;_imported?: `boolean` \| `undefined`             |                                      |
| &emsp;data?: `string` \| `undefined`                   | The data that was deleted            |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataDeleteCL from "ui5/antares/odata/v2/ODataDeleteCL"; // Import the class
import { IError } from "ui5/antares/types/common"; // Import the error type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onDeleteProduct() {
    // Initialize with a type
    const odata = new ODataDeleteCL<IProductKeys>(this, "Products"); 

    try {
      // send the http request and get the result
      const result = await odata.delete({
        ID: "3ccb5dd2-cc12-483a-b569-a6ec844f8f0b"
      });

      MessageBox.information(result.ID + " was deleted.");

      // get the additional response info
      const response = odata.getResponse();

      if (response) {
        console.log("Status Code: " + response.statusCode);
      }
    } catch (error) {
      // catch the error
      MessageBox.error((error as IError).message || "Request failed");
    }
  }

}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataDeleteCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataDeleteCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onDeleteProduct: async function () {
          // Initialize
          const odata = new ODataDeleteCL(this, "Products"); 

          try {
            // send the http request and get the result
            const result = await odata.delete({
              ID: "3ccb5dd2-cc12-483a-b569-a6ec844f8f0b"
            });

            MessageBox.information(result.ID + " was deleted.");

            // get the additional response info
            const response = odata.getResponse();

            if (response) {
              console.log("Status Code: " + response.statusCode);
            }            
          } catch (error) {
            // catch the error
            MessageBox.error(error.message || "Request failed");
          }          
        }
      });

    });
```

### OData Read

ODataReadCL is a class that uses [sap.ui.model.odata.v2.ODataModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel) to handle GET (Read) requests in a promisified way.

#### Constructor

You must initialize an object from ODataReadCL in order to use it.

| Parameter  | Type                            | Mandatory | Default Value | Description                                                                                                            | 
| :--------- | :------------------------------ | :-------- | :------------ | :--------------------------------------------------------------------------------------------------------------------- |
| controller | [sap.ui.core.mvc.Controller][1] | Yes       |               | The controller object (usually `this`)                                                                                 |
| entityPath | string                          | Yes       |               | The name of the **EntitySet**. It can start with a **"/"**                                                             |
| modelName? | string                          | No        | undefined     | The name of the OData V2 model which can be found on the manifest.json file. **Do not specify** if the model name = "" |

**TypeScript**

**ODataReadCL\<EntityT, EntityKeysT\>** is a generic class and can be initialized with 2 types. 

- The `EntityT` type contains the properties of the `EntitySet` that is used as a parameter on the class constructor. 
- The `EntityKeysT` type contains the **key** properties of the `EntitySet` that is used as a parameter on the class constructor.

`EntityT` is used as the returning type of the **read(): Promise\<EntityT\[\]\>** and **readByKey(keys: EntityKeysT): Promise\<EntityT\>** methods.

`EntityKeysT` is used as the type of the `keys` parameter of the **readByKey(keys: EntityKeysT): Promise\<EntityT\>** method.

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataReadCL from "ui5/antares/odata/v2/ODataReadCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onReadProduct() {
    // Initialize without a type
    const odata = new ODataReadCL(this, "Products"); 
  }

  public async onReadCategory() {
    // Initialize with a type
    const odata = new ODataReadCL<ICategory, ICategoryKeys>(this, "Categories"); 
  }

  public async onReadCustomer() {
    // Initialize with a model name
    const odata = new ODataReadCL(this, "Customers", "myODataModelName"); 
  }
}

interface ICategory {
  ID: string;
  name: string;
}

interface ICategoryKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataReadCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataReadCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onReadProduct: async function () {
          // Initialize
          const odata = new ODataReadCL(this, "Products"); 
        },

        onReadCategory: async function () {
          // Initialize with a model name
          const odata = new ODataReadCL(this, "Categories", "myODataModelName");
        }
      });

    });
```

#### Read Request (GET EntitySet)

To send the GET (Read) request through the OData V2 model, **read(): Promise\<EntityT\[\]\>** method can be utilized.

The **read()** method runs **asynchronously** and can be awaited. 

The **read()** method returns the data (multiple) of the entity if the request was successful. 

> **Important:** Normally, [sap.ui.model.odata.v2.ODataModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel%23methods/read) method returns the data as an object with the **results** property. However, **read()** method returns the data as an **array** consisting of objects with the `EntityT` type defined in the class constructor.

> **Important:** If the GET request fails, the [OData Read](#odata-read) class will throw an error. To catch the error, the **read()** method should be called in a try-catch block. 

**Error Type**

If the GET request fails, the object thrown by the class can contain the properties below.

| Returns                                                | Description                          |
| ------------------------------------------------------ | ------------------------------------ |
| `object`                                               |                                      |
| &emsp;headers?: `object` \| `undefined`                | The HTTP response headers.           |
| &emsp;message?: `string` \| `undefined`                | The HTTP response message.           |
| &emsp;responseText?: `string` \| `undefined`           | The HTTP response text.              |
| &emsp;statusCode?: `string` \| `number` \| `undefined` | The status code of the HTTP request. |
| &emsp;statusText?: `string` \| `undefined`             | The HTTP status text.                |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataReadCL from "ui5/antares/odata/v2/ODataReadCL"; // Import the class
import { IError } from "ui5/antares/types/common"; // Import the error type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onReadProducts() {
    // Initialize with a type
    const odata = new ODataReadCL<IProducts, IProductKeys>(this, "Products"); 

    try {
      // send the http request and get the result.
      const result = await odata.read();

      result.forEach((row: IProducts) => {
        // write your logic
      });
    } catch (error) {
      // catch the error
      MessageBox.error((error as IError).message || "Request failed");
    }
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string | null;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string | null;
  supplierID: string | null;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataReadCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataReadCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onReadProducts: async function () {
          // Initialize
          const odata = new ODataReadCL(this, "Products"); 

          try {
            // send the http request and get the result.
            const result = await odata.read();

            result.forEach((row) => {
              // write your logic
            });
          } catch (error) {
            // catch the error
            MessageBox.error(error.message || "Request failed");
          }          
        }
      });

    });
```

#### Read By Key Request (GET Entity)

To send the GET (Read) request to retrieve a single data through the OData V2 model, **readByKey(keys: EntityKeysT): Promise\<EntityT\>** method can be utilized.

The **readByKey()** method runs **asynchronously** and can be awaited. 

The **readByKey()** method returns the data (single) of the entity if the request was successful. 

> **Important:** If the GET request fails, the [OData Read](#odata-read) class will throw an error. To catch the error, the **readByKey()** method should be called in a try-catch block. 

**Error Type**

If the GET request fails, the object thrown by the class can contain the properties below.

| Returns                                                | Description                          |
| ------------------------------------------------------ | ------------------------------------ |
| `object`                                               |                                      |
| &emsp;headers?: `object` \| `undefined`                | The HTTP response headers.           |
| &emsp;message?: `string` \| `undefined`                | The HTTP response message.           |
| &emsp;responseText?: `string` \| `undefined`           | The HTTP response text.              |
| &emsp;statusCode?: `string` \| `number` \| `undefined` | The status code of the HTTP request. |
| &emsp;statusText?: `string` \| `undefined`             | The HTTP status text.                |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataReadCL from "ui5/antares/odata/v2/ODataReadCL"; // Import the class
import { IError } from "ui5/antares/types/common"; // Import the error type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onReadSingleProduct() {
    // Initialize with a type
    const odata = new ODataReadCL<IProducts, IProductKeys>(this, "Products"); 

    try {
      // send the http request and get the result. Note: you need to specify the key values of the entity to read a single data
      const result = await odata.readByKey({
        ID: "f60481d8-3426-4a91-a6a3-5e445a7deb46"
      });

      MessageBox.information("Product with ID: " + result.ID);
    } catch (error) {
      // catch the error
      MessageBox.error((error as IError).message || "Request failed");
    }
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string | null;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string | null;
  supplierID: string | null;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataReadCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataReadCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onReadProduct: async function () {
          // Initialize
          const odata = new ODataReadCL(this, "Products"); 

          try {
            // send the http request and get the result. Note: you need to specify the key values of the entity to read a single data
            const result = await odata.readByKey({
              ID: "f60481d8-3426-4a91-a6a3-5e445a7deb46"
            });

            MessageBox.information("Product with ID: " + result.ID);
          } catch (error) {
            // catch the error
            MessageBox.error(error.message || "Request failed");
          }          
        }
      });

    });
```

#### URL Parameters

To set the URL parameters before sending the GET request with the [read()](#read-request-get-entityset) or the [readByKey()](#read-by-key-request-get-entity) method, the **setUrlParameters()** method can be used.

**Setter (setUrlParameters)**

| Parameter     | Type                   | Mandatory | Description                           | 
| :------------ | :--------------------- | :-------- | :------------------------------------ |
| urlParameters | Record<string, string> | Yes       | The URL parameters of the GET request |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getUrlParameters)**

| Returns                             | Description                                                                                        |
| :---------------------------------- | :------------------------------------------------------------------------------------------------- |
| Record<string, string> \| undefined | Returns the value that was set using **setUrlParameters()** method. Default value is **undefined** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataReadCL from "ui5/antares/odata/v2/ODataReadCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onReadProduct() {
    // Initialize with a type
    const odata = new ODataReadCL<IProducts, IProductKeys>(this, "Products"); 

    // set the url parameters
    odata.setUrlParameters({
      "$expand": "toProductLocations"
    });
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataReadCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataReadCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onReadProduct: async function () {
          // Initialize
          const odata = new ODataReadCL(this, "Products"); 

          // set the url parameters
          odata.setUrlParameters({
            "$expand": "toProductLocations"
          });         
        }
      });

    });
```

#### Filters

To execute the [read()](#read-request-get-entityset) method with the filters, 2 different methods can be used.

[3001]: https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Filter

**Setter (addFilter)**

This method allows you to add filters one at a time.

| Parameter | Type           | Mandatory | Description       | 
| :-------- | :------------- | :-------- | :---------------- |
| filter    | [Filter][3001] | Yes       | The filter object |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Setter (setFilters)**

This method allows you to set multiple filters at once.

> **Important:** This method overwrites all the filters that are added with **addFilter()** method or set with **setFilters()** method.

| Parameter | Type               | Mandatory | Description                 | 
| :-------- | :----------------- | :-------- | :-------------------------- |
| filters   | [Filter\[\]][3001] | Yes       | The array of filter objects |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getFilters)**

| Returns            | Description                                                                                                                        |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| [Filter\[\]][3001] | Returns all the filters that were added using **addFilter()** method or set using **setFilters()** method. Default value is **[]** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataReadCL from "ui5/antares/odata/v2/ODataReadCL"; // Import the class
import Filter from "sap/ui/model/Filter"; // Import Filter class
import FilterOperator from "sap/ui/model/FilterOperator"; // Import FilterOperator enum

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onReadProduct() {
    // Initialize with a type
    const odata = new ODataReadCL<IProducts, IProductKeys>(this, "Products"); 
    const nameFilter = new Filter("name", FilterOperator.Contains, "smartphone");
    const priceFilter = new Filter("price", FilterOperator.GT, 1500);

    // add the filters one by one
    odata.addFilter(nameFilter);
    odata.addFilter(priceFilter);
  }

  public async onReadCategory() {
    // Initialize
    const odata = new ODataReadCL(this, "Categories"); 
    const nameFilter = new Filter("name", FilterOperator.Contains, "smartphone");
    const priceFilter = new Filter("price", FilterOperator.GT, 1500);

    // set the filters at once
    odata.setFilters([nameFilter, priceFilter]);
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataReadCL", // Import the class
    "sap/ui/model/Filter", // Import Filter class
    "sap/ui/model/FilterOperator" // Import FilterOperator enum
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataReadCL, Filter, FilterOperator) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onReadProduct: async function () {
          // Initialize
          const odata = new ODataReadCL(this, "Products"); 
          const nameFilter = new Filter("name", FilterOperator.Contains, "smartphone");
          const priceFilter = new Filter("price", FilterOperator.GT, 1500);

          // add the filters one by one
          odata.addFilter(nameFilter);
          odata.addFilter(priceFilter);        
        },

        onReadCategory: async function () {
          // Initialize
          const odata = new ODataReadCL(this, "Categories"); 
          const nameFilter = new Filter("name", FilterOperator.Contains, "smartphone");
          const priceFilter = new Filter("price", FilterOperator.GT, 1500);

          // set the filters at once
          odata.setFilters([nameFilter, priceFilter]);          
        }
      });

    });
```

#### Sorters

To execute the [read()](#read-request-get-entityset) method with the sorters, 2 different methods can be used.

[3002]: https://sapui5.hana.ondemand.com/#/api/sap.ui.model.Sorter

**Setter (addSorter)**

This method allows you to add sorters one at a time.

| Parameter | Type           | Mandatory | Description       | 
| :-------- | :------------- | :-------- | :---------------- |
| sorter    | [Sorter][3002] | Yes       | The sorter object |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Setter (setSorters)**

This method allows you to set multiple sorters at once.

> **Important:** This method overwrites all the sorters that are added with **addSorter()** method or set with **setSorters()** method.

| Parameter | Type               | Mandatory | Description                 | 
| :-------- | :----------------- | :-------- | :-------------------------- |
| sorters   | [Sorter\[\]][3002] | Yes       | The array of sorter objects |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getSorters)**

| Returns            | Description                                                                                                                        |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| [Sorter\[\]][3002] | Returns all the sorters that were added using **addSorter()** method or set using **setSorters()** method. Default value is **[]** |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataReadCL from "ui5/antares/odata/v2/ODataReadCL"; // Import the class
import Sorter from "sap/ui/model/Sorter"; // Import the Sorter class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onReadProduct() {
    // Initialize with a type
    const odata = new ODataReadCL<IProducts, IProductKeys>(this, "Products"); 
    const nameSorter = new Sorter("name");
    const priceSorter = new Sorter("price", true); // descending

    // add the sorters one by one
    odata.addSorter(nameSorter);
    odata.addSorter(priceSorter);
  }

  public async onReadCategory() {
    // Initialize
    const odata = new ODataReadCL(this, "Categories"); 
    const nameSorter = new Sorter("name");
    const priceSorter = new Sorter("price", true); // descending

    // set the sorters at once
    odata.setSorters([nameSorter, priceSorter]);
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataReadCL", // Import the class
    "sap/ui/model/Sorter" // Import the Sorter class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataReadCL, Sorter) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onReadProduct: async function () {
          // Initialize
          const odata = new ODataReadCL(this, "Products"); 
          const nameSorter = new Sorter("name");
          const priceSorter = new Sorter("price", true); // descending

          // add the sorters one by one
          odata.addSorter(nameSorter);
          odata.addSorter(priceSorter);      
        },

        onReadCategory: async function () {
          // Initialize
          const odata = new ODataReadCL(this, "Categories"); 
          const nameSorter = new Sorter("name");
          const priceSorter = new Sorter("price", true); // descending

          // set the sorters at once
          odata.setSorters([nameSorter, priceSorter]);         
        }
      });

    });
```

#### Additional Response Info

The [read()](#read-request-get-entityset) and the [readByKey()](#read-by-key-request-get-entity) methods return the data of the entity. However, you may want to get some additional information such as `status code`, `headers`.

The **getResponse()** method can be utilized to get additional information after the [read()](#read-request-get-entityset) or the [readByKey()](#read-by-key-request-get-entity) is resolved.

| Returns                                                | Description                          |
| ------------------------------------------------------ | ------------------------------------ |
| `object`                                               |                                      |
| &emsp;$reported?: `boolean` \| `undefined`             |                                      |
| &emsp;body?: `string` \| `undefined`                   | The HTTP body                        |
| &emsp;headers?: `object` \| `undefined`                | The HTTP response headers.           |
| &emsp;statusCode?: `string` \| `number` \| `undefined` | The status code of the HTTP request. |
| &emsp;statusText?: `string` \| `undefined`             | The HTTP status text.                |
| &emsp;_imported?: `boolean` \| `undefined`             |                                      |
| &emsp;data?: { results : EntityT\[\] } \| `undefined`  | The data that was fetched            |

**Sample**

Please see the sample below.

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import ODataReadCL from "ui5/antares/odata/v2/ODataReadCL"; // Import the class
import { IError } from "ui5/antares/types/common"; // Import the error type
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onReadProduct() {
    // Initialize with a type
    const odata = new ODataReadCL<IProducts, IProductKeys>(this, "Products"); 

    try {
      // send the http request and get the result
      const result = await odata.readByKey({
        ID: "3ccb5dd2-cc12-483a-b569-a6ec844f8f0b"
      });

      MessageBox.information(result.ID + " was fetched.");

      // get the additional response info
      const response = odata.getResponse();

      if (response) {
        console.log("Status Code: " + response.statusCode);
      }
    } catch (error) {
      // catch the error
      MessageBox.error((error as IError).message || "Request failed");
    }
  }

}

interface IProducts {
  ID: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  currency: string;
  quantityInStock: number;
  categoryID: string;
  supplierID: string;
}

interface IProductKeys {
  ID: string;
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/odata/v2/ODataReadCL", // Import the class
    "sap/m/MessageBox"
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataReadCL, MessageBox) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onReadProduct: async function () {
          // Initialize
          const odata = new ODataReadCL(this, "Products"); 

          try {
            // send the http request and get the result
            const result = await odata.readByKey({
              ID: "3ccb5dd2-cc12-483a-b569-a6ec844f8f0b"
            });

            MessageBox.information(result.ID + " was fetched.");

            // get the additional response info
            const response = odata.getResponse();

            if (response) {
              console.log("Status Code: " + response.statusCode);
            }            
          } catch (error) {
            // catch the error
            MessageBox.error(error.message || "Request failed");
          }          
        }
      });

    });
```

## Fragment Class

The Fragment class provides some public methods to load the contents of a fragment (*.fragment.xml) file and open a dialog or popover. 

> The FragmentCL class is also used in the [Custom Control From Fragment](#custom-control-from-fragment) and [Custom Content From Fragment](#custom-content-from-fragment) methods of the Entry classes.

### Constructor

You must initialize an object from FragmentCL in order to use it.

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Mandatory</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>controller</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.ui.core.mvc.Controller">sap.ui.core.mvc.Controller</a></td>
      <td>Yes</td>
      <td></td>
      <td>The controller object (usually <code>this</code>)</td>
    </tr>
    <tr>
      <td>fragmentPath</td>
      <td>string</td>
      <td>Yes</td>
      <td></td>
      <td>The path of the fragment whose content will be loaded or opened</td>
    </tr>
    <tr>
      <td>openByControl?</td>
      <td><a href="https://sapui5.hana.ondemand.com/#/api/sap.ui.core.Control">sap.ui.core.Control</a></td>
      <td>No</td>
      <td></td>
      <td>If the loaded fragment contains a popover, this parameter sets which control the popover opens next to. For instance: sap.m.Button</td>
    </tr>
  </tbody>
</table>

**Sample**

Let us assume that we have created a file with the extension **.fragment.xml** and the following content. We would now like to open the dialog in the controller.

```xml
<core:FragmentDefinition
    xmlns:form="sap.ui.layout.form"
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>
    <Dialog title="Create New Product">
        <form:SimpleForm>
            <form:content>
                <Label text="Product ID" />
                <MaskInput
                    mask="CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC"
                    value="{ID}"
                    placeholderSymbol="_"
                >
                    <rules>
                        <MaskInputRule
                            maskFormatSymbol="C"
                            regex="[a-f0-9]"
                        />
                    </rules>
                </MaskInput>
                <Label text="Name" />
                <Input value="{name}" />
                <Label text="Description" />
                <TextArea
                    value="{description}"
                    rows="5"
                />
                <Label text="Price" />
                <Slider
                    width="100%"
                    min="1000"
                    max="100000"
                    showAdvancedTooltip="true"
                    showHandleTooltip="true"
                    inputsAsTooltips="true"
                    enableTickmarks="true"
                    step="1000"
                    class="sapUiMediumMarginBottom"
                    value="{price}"
                />
                <Label text="Currency" />
                <ComboBox selectedKey="{currency}">
                    <items>
                        <core:Item
                            key="EUR"
                            text="Euro"
                        />
                        <core:Item
                            key="USD"
                            text="US Dollar"
                        />
                        <core:Item
                            key="TRY"
                            text="Turkish Lira"
                        />
                    </items>
                </ComboBox>
            </form:content>
        </form:SimpleForm>
        <beginButton>
            <Button
                text="Complete"
                press="onCompleteProduct"
            />
        </beginButton>
        <endButton>
            <Button
                text="Close"
                press="onCloseProductDialog"
            />
        </endButton>
    </Dialog>
</core:FragmentDefinition>
```

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onOpenDialog() {
    // Initialize with the controller and fragment path
    const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/ui/FragmentCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onOpenDialog: async function () {
          // Initialize with the controller and fragment path
          const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");
        }
      });

    });
```

### Load Content

To load the content inside of a fragment file, the **load(): Promise\<Control \| Control\[\]\>** method can be utilized.

> **Information:** If the fragment contains more than one UI control, the **load()** method will return an array containing the UI controls. For single content, the **load()** method will return the UI control itself.

> **Information:** Please be aware that **load()** function is **asynchronous** and must be awaited.

**Sample**

Let us assume that we have created a file with the extension **.fragment.xml** and the following content. We would now like to use the sap.m.Text in the controller.

```xml
<core:FragmentDefinition
    xmlns:form="sap.ui.layout.form"
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>
    <Text text="My Text" />
</core:FragmentDefinition>

```

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the class
import Text from "sap/m/Text";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async onLoadFragment() {
    // Initialize with the controller and fragment path
    const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");

    // load the content of the fragment
    const content = await fragment.load() as unknown as Text;

    // use the content
    console.log(content.getText());
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/ui/FragmentCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        onLoadFragment: async function () {
          // Initialize with the controller and fragment path
          const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");

          // load the content of the fragment
          const content = await fragment.load();

          // use the content
          console.log(content.getText());
        }
      });

    });
```

### Open Dialog or Popover

To open a dialog or a popover from a fragment file, there are two distinct methods that can be executed.

Please note that both methods only support the following dialog and popover classes:

1) [sap.m.Dialog](https://sapui5.hana.ondemand.com/#/api/sap.m.Dialog)
2) [sap.m.Popover](https://sapui5.hana.ondemand.com/#/api/sap.m.Popover)
3) [sap.m.MessagePopover](https://sapui5.hana.ondemand.com/#/api/sap.m.MessagePopover)
4) [sap.m.ColorPalettePopover](https://sapui5.hana.ondemand.com/#/api/sap.m.ColorPalettePopover)
5) [sap.m.ResponsivePopover](https://sapui5.hana.ondemand.com/#/api/sap.m.ResponsivePopover)

#### Open Sync

To utilize the **open()** method, it is essential to first execute the [load()](#load-content) method.

> **Hint:** The **open()** method returns the dialog or popover loaded from a fragment using the [load()](#load-content) method.

> **Important:** When opening a popover, it is necessary to set the control that the popover opens next to. Please see [constructor](#constructor-11)

**Sample 1**

Let us assume that we have created a file with the extension **.fragment.xml** and the following content. We would now like to open the **dialog** in the controller.

```xml
<core:FragmentDefinition
    xmlns:form="sap.ui.layout.form"
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>
    <Dialog title="Create New Product">
        <form:SimpleForm>
            <form:content>
                <Label text="Product ID" />
                <MaskInput
                    mask="CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC"
                    value="{ID}"
                    placeholderSymbol="_"
                >
                    <rules>
                        <MaskInputRule
                            maskFormatSymbol="C"
                            regex="[a-f0-9]"
                        />
                    </rules>
                </MaskInput>
                <Label text="Name" />
                <Input value="{name}" />
                <Label text="Description" />
                <TextArea
                    value="{description}"
                    rows="5"
                />
            </form:content>
        </form:SimpleForm>
        <beginButton>
            <Button
                text="Complete"
                press="onCompleteProduct"
            />
        </beginButton>
        <endButton>
            <Button
                text="Close"
                press="onCloseProductDialog"
            />
        </endButton>
    </Dialog>
</core:FragmentDefinition>
```

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async openDialog() {
    // Initialize with the controller and fragment path
    const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");

    // load the content of the fragment
    await fragment.load();

    // open the dialog
    fragment.open();
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/ui/FragmentCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        openDialog: async function () {
          // Initialize with the controller and fragment path
          const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");

          // load the content of the fragment
          await fragment.load();

          // open the dialog
          fragment.open();
        }
      });

    });
```

**Sample 2**

Let us assume that we have created a file with the extension **.fragment.xml** and the following content. We would now like to open the **popover** in the controller.

```xml
<core:FragmentDefinition
    xmlns:form="sap.ui.layout.form"
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>
    <Popover>
        <content>
            <Text text="Test" />
            <Button
                text="Finish"
                press="onFinish"
            />
        </content>
    </Popover>
</core:FragmentDefinition>
```

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the class
import Button from "sap/m/Button";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async openPopover() {
    // Initialize with the controller and fragment path and the open by control
    const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName", this.getView()?.byId("myButton") as Button);

    // load the content of the fragment
    await fragment.load();

    // open the dialog
    fragment.open();
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/ui/FragmentCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        openPopover: async function () {
          // Initialize with the controller and fragment path and the open by control
          const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName", this.getView().byId("myButton"));

          // load the content of the fragment
          await fragment.load();

          // open the dialog
          fragment.open();
        }
      });

    });
```

#### Open Async

The **openAsync()** method firstly loads the dialog or popover from a fragment and then opens it.

> **Hint:** The **openAsync()** method returns the dialog or popover loaded from a fragment.

> **Important:** When opening a popover, it is necessary to set the control that the popover opens next to. Please see [constructor](#constructor-11)

> **Information:** Please be aware that **openAsync()** function is **asynchronous**. To retrieve the dialog or popover, please await the **openAsync()** method.

**Sample 1**

Let us assume that we have created a file with the extension **.fragment.xml** and the following content. We would now like to open the **dialog** in the controller.

```xml
<core:FragmentDefinition
    xmlns:form="sap.ui.layout.form"
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>
    <Dialog title="Create New Product">
        <form:SimpleForm>
            <form:content>
                <Label text="Product ID" />
                <MaskInput
                    mask="CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC"
                    value="{ID}"
                    placeholderSymbol="_"
                >
                    <rules>
                        <MaskInputRule
                            maskFormatSymbol="C"
                            regex="[a-f0-9]"
                        />
                    </rules>
                </MaskInput>
                <Label text="Name" />
                <Input value="{name}" />
                <Label text="Description" />
                <TextArea
                    value="{description}"
                    rows="5"
                />
            </form:content>
        </form:SimpleForm>
        <beginButton>
            <Button
                text="Complete"
                press="onCompleteProduct"
            />
        </beginButton>
        <endButton>
            <Button
                text="Close"
                press="onCloseProductDialog"
            />
        </endButton>
    </Dialog>
</core:FragmentDefinition>
```

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async openDialog() {
    // Initialize with the controller and fragment path
    const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");

    // open the dialog
    fragment.openAsync();
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/ui/FragmentCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        openDialog: async function () {
          // Initialize with the controller and fragment path
          const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");

          // open the dialog
          fragment.openAsync();
        }
      });

    });
```

**Sample 2**

Let us assume that we have created a file with the extension **.fragment.xml** and the following content. We would now like to open the **popover** in the controller.

```xml
<core:FragmentDefinition
    xmlns:form="sap.ui.layout.form"
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>
    <Popover>
        <content>
            <Text text="Test" />
            <Button
                text="Finish"
                press="onFinish"
            />
        </content>
    </Popover>
</core:FragmentDefinition>
```

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the class
import Button from "sap/m/Button";

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  public onInit() {

  }

  public async openPopover() {
    // Initialize with the controller and fragment path and the open by control
    const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName", this.getView()?.byId("myButton") as Button);

    // open the dialog
    fragment.openAsync();
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/ui/FragmentCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        openPopover: async function () {
          // Initialize with the controller and fragment path and the open by control
          const fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName", this.getView().byId("myButton"));

          // open the dialog
          fragment.openAsync();
        }
      });

    });
```

### Close Dialog or Popover

To close the dialog or the popover opened by one of the following approaches, please use the **close()** method.

> **Important:** Please be advised that it is your responsibility to destroy the content after using the **close()** method. This can be achieved by using the [destroyFragmentContent()](#destroy-fragment-content) method.

1) [load()](#load-content) and [open()](#open-sync)
2) [openAsync()](#open-async)

**Sample**

Let us assume that we have created a file with the extension **.fragment.xml** and the following content. We would now like to open the **dialog** in the controller. When the user presses the **Close** button, we will close the dialog and destroy it.

```xml
<core:FragmentDefinition
    xmlns:form="sap.ui.layout.form"
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>
    <Dialog title="Create New Product">
        <form:SimpleForm>
            <form:content>
                <Label text="Product ID" />
                <MaskInput
                    mask="CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC"
                    value="{ID}"
                    placeholderSymbol="_"
                >
                    <rules>
                        <MaskInputRule
                            maskFormatSymbol="C"
                            regex="[a-f0-9]"
                        />
                    </rules>
                </MaskInput>
                <Label text="Name" />
                <Input value="{name}" />
                <Label text="Description" />
                <TextArea
                    value="{description}"
                    rows="5"
                />
            </form:content>
        </form:SimpleForm>
        <beginButton>
            <Button
                text="Complete"
                press="onCompleteProduct"
            />
        </beginButton>
        <endButton>
            <Button
                text="Close"
                press="onCloseDialog"
            />
        </endButton>
    </Dialog>
</core:FragmentDefinition>
```

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  private fragment: FragmentCL; // The class property

  public onInit() {

  }

  public async openDialog() {
    // Initialize with the controller and fragment path and set to the class property
    this.fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");

    // open the dialog
    this.fragment.openAsync();
  }

  public async onCloseDialog () {
    this.fragment.close(); // close the dialog
    this.fragment.destroyFragmentContent(); // do not forget to destroy after closing
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/ui/FragmentCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        openDialog: async function () {
          // Initialize with the controller and fragment path and set to the class property
          this.fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");

          // open the dialog
          this.fragment.openAsync();
        },

        onCloseDialog: async function () {
          this.fragment.close(); // close the dialog
          this.fragment.destroyFragmentContent(); // do not forget to destroy after closing
        }
      });

    });
```

### Get Fragment Content

To retrieve the content loaded from a fragment file using the [load()](#load-content) method, the **getFragmentContent()** method can be utilized.

| Returns                              | Description                                                                                                                         |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| [Control][701] \| [Control\[\]][701] | Returns the control or controls loaded from a fragment file using the [load()](#load-content) or [openAsync()](#open-async) methods |

### Destroy Fragment Content

To destroy the content loaded from a fragment using the [load()](#load-content) or [openAsync()](#open-async) methods, the **destroyFragmentContent()** method can be utilized.

**Sample**

Let us assume that we have created a file with the extension **.fragment.xml** and the following content. We would now like to open the **dialog** in the controller. When the user presses the **Close** button, we will close the dialog and destroy it.

```xml
<core:FragmentDefinition
    xmlns:form="sap.ui.layout.form"
    xmlns="sap.m"
    xmlns:core="sap.ui.core"
>
    <Dialog title="Create New Product">
        <form:SimpleForm>
            <form:content>
                <Label text="Product ID" />
                <MaskInput
                    mask="CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC"
                    value="{ID}"
                    placeholderSymbol="_"
                >
                    <rules>
                        <MaskInputRule
                            maskFormatSymbol="C"
                            regex="[a-f0-9]"
                        />
                    </rules>
                </MaskInput>
                <Label text="Name" />
                <Input value="{name}" />
                <Label text="Description" />
                <TextArea
                    value="{description}"
                    rows="5"
                />
            </form:content>
        </form:SimpleForm>
        <beginButton>
            <Button
                text="Complete"
                press="onCompleteProduct"
            />
        </beginButton>
        <endButton>
            <Button
                text="Close"
                press="onCloseDialog"
            />
        </endButton>
    </Dialog>
</core:FragmentDefinition>
```

**TypeScript**

```ts
import Controller from "sap/ui/core/mvc/Controller";
import FragmentCL from "ui5/antares/ui/FragmentCL"; // Import the class

/**
 * @namespace your.apps.namespace
 */
export default class YourController extends Controller {
  private fragment: FragmentCL; // The class property

  public onInit() {

  }

  public async openDialog() {
    // Initialize with the controller and fragment path and set to the class property
    this.fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");

    // open the dialog
    this.fragment.openAsync();
  }

  public async onCloseDialog () {
    this.fragment.close(); // close the dialog
    this.fragment.destroyFragmentContent(); // do not forget to destroy after closing
  }
}
```

---

**JavaScript**

```js
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ui5/antares/ui/FragmentCL" // Import the class
], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, FragmentCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function () {

        },

        openDialog: async function () {
          // Initialize with the controller and fragment path and set to the class property
          this.fragment = new FragmentCL(this, "your.apps.namespace.fragments.FragmentFileName");

          // open the dialog
          this.fragment.openAsync();
        },

        onCloseDialog: async function () {
          this.fragment.close(); // close the dialog
          this.fragment.destroyFragmentContent(); // do not forget to destroy after closing
        }
      });

    });
```

## Planned Features

Here is a list of features that are in the pipeline for the next releases.

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Supported UI5 Antares Versions</th>
      <th>Scope</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Deep Create</td>
      <td>*</td>
      <td width="150"><a href="#entry-create">Entry Create</a></td>
      <td>Creating a deep entity on the auto-generated dialog will be possible. When the cardinality is 1-1, the properties of the associated entity will be added into the auto-generated form in a different group. When the cardinality is 1-N, a table will be placed after the auto-generated form</td>
    </tr>    
  </tbody>
</table>

## Change Log

Please see [CHANGELOG.md](./CHANGELOG.md)

# License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.