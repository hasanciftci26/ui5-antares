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
    - [Create New Entry](#create-new-entry)
      - [Method Parameters](#method-parameters)
      - [Default Values](#default-values)
    - [Label Generation](#label-generation)
      - [Resource Model](#resource-model-i18n)
      - [Label Generation From The Technical Names](#label-generation-from-the-technical-names)
      - [Use Metadata Labels](#use-metadata-labels)
    - [Form Type](#form-type)
    - [Form Title](#form-title)
    - [Begin Button Text](#begin-button-text)
    - [Begin Button Type](#begin-button-type)
    - [End Button Text](#end-button-text)
    - [End Button Type](#end-button-type)
    - [Properties with Edm.Guid Type](#properties-with-edmguid-type)

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

### Create New Entry

**createNewEntry(data?: EntityT)** method creates an entry  for the `EntitySet` which is specified through the class constructor and binds it to the dialog that is automatically generated or loaded from the fragment that is placed in the application files. [createEntry()](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel%23methods/createEntry) method is used to create an entry. The generated/loaded dialog is opened after the entry is created.

By default, **createNewEntry()** method uses the [ODataMetaModel](https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.ODataMetaModel) to determine the `EntityType` of the `EntitySet` that was set by the [constructor](#constructor) and brings all the properties in the same order as the OData metadata into the generated form. 

All **key** properties are marked as mandatory/required and the labels are generated assuming that the naming convention of the `EntityType` is **camelCase**. Please see [Label Generation](#label-generation)

By default, random UUID value is generated for the **key** properties with **Edm.Guid** type and these fields are not visible on the generated form. However, this behaviour can be modified using the [setGenerateRandomGuid()](#properties-with-edmguid-type) and [setDisplayGuidProperties()](#properties-with-edmguid-type) methods.

#### Method Parameters

| Parameter  | Type                            | Mandatory | Default Value | Description                     | 
| :--------- | :------------------------------ | :-------- | :------------ | :------------------------------ |
| data?      | EntityT or object               | No        | undefined     | The initial values of the entry |

| Returns         | Description                                                                                                                                                          |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise\<void\> | After the promise is resolved, the created entry can be retrieved by the **getEntryContext()** method using the object instantiated from the **EntryCreateCL** class |

> **createNewEntry()** method uses the default configurations when creating the dialog. However, these configurations can be modified using the public setter methods.

[2]: #label-generation
[3]: #form-type
[4]: #form-title
[5]: #begin-button-text
[6]: #begin-button-type
[7]: https://sapui5.hana.ondemand.com/#/api/sap.m.ButtonType
[8]: #end-button-text
[9]: #end-button-type

#### Default Values

| Term              | Default Value              | Description                                             | Setter                    | Getter                    |
| :---------------- | :------------------------- | :------------------------------------------------------ | :------------------------ | :------------------------ |
| Naming Strategy   | CAMEL_CASE                 | The default naming strategy is **CAMEL_CASE**           | [setNamingStrategy()][2]  | [getNamingStrategy()][2]  |
| Form Type         | SMART                      | SmartForm with SmartFields is generated by default      | [setFormType()][3]        | [getFormType()][3]        |
| Form Title        | Create New + ${entityPath} | entityPath from the [constructor](#constructor) is used | [setFormTitle()][4]       | [getFormTitle()][4]       |
| Begin Button Text | Create                     | The default begin button text is **Create**             | [setBeginButtonText()][5] | [getBeginButtonText()][5] |
| Begin Button Type | [ButtonType.Success][7]    | The default button type is **Success**                  | [setBeginButtonType()][6] | [getBeginButtonType()][6] |
| End Button Text   | Close                      | The default end button text is **Close**                | [setEndButtonText()][8]   | [getEndButtonText()][8]   |
| End Button Type   | [ButtonType.Negative][7]   | The default button type is **Negative**                 | [setEndButtonType()][9]   | [getEndButtonType()][9]   |

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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
          // Initialize
          const entry = new EntryCreateCL(this, "Products"); 

          // Call without the initial values
          entry.createNewEntry();
        },

        onCreateCategory: async function() {
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

| Parameter         | Type    | Mandatory | Default Value | Description                                                                                                           | 
| :-----------------| :------ | :-------- | :------------ | :-------------------------------------------------------------------------------------------------------------------- |
| useMetadataLabels | boolean | Yes       |               | If the value is **true**, OData V2 metadata labels will be used when creating labels for auto-generated form elements |

| Returns | Description |
| :------ | :---------- |
| void    |             |

**Getter (getUseMetadataLabels)**

| Returns           | Type    | Description                                                                                        |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------- |
| useMetadataLabels | boolean | Returns the value that was set using **setUseMetadataLabels()** method. Default value is **false** |

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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
          const entry = new EntryCreateCL(this, "Products");

          // The OData V2 metadata labels will be used for the form elements.
          entry.setUseMetadataLabels(true);

          entry.createNewEntry(); 
        }
      });

    });
```

### Resource Bundle Prefix

### Naming Strategy

### Form Type

### Form Title

### Begin Button Text

### Begin Button Type

### End Button Text

### End Button Type

### Properties with Edm.Guid Type