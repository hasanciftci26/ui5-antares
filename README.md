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

## Table of Contents

- [UI5 Antares](#ui5-antares)
  - [Prerequisites](#prerequisites)
  - [Table of Contents](#table-of-contents)
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
    - [Resource Bundle Prefix](#resource-bundle-prefix)
    - [Naming Strategy](#naming-strategy)
      - [NamingStrategies Enum](#namingstrategies-enum)
    - [Form Type](#form-type)
      - [FormTypes Enum](#formtypes-enum)
    - [Form Title](#form-title)
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
    - [Validation Logic](#validation-logic)
    - [Custom Control](#custom-control)
    - [Custom Content](#custom-content)
    - [Custom Fragment](#custom-fragment)

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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
          const entry = new EntryCreateCL(this, "Products");

          // New i18n text lookup format will be => myPrefix + entityPath + propertyName
          entry.setResourceBundlePrefix("myPrefix");

          entry.createNewEntry(); 
        },

        onCreateCategory: async function() {
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
    function(Controller, EntryCreateCL, EntryEnums) {
      "use strict";

      // Destructure the object to retrieve the NamingStrategies enum
      const { NamingStrategies } = EntryEnums;

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
    function(Controller, EntryCreateCL, EntryEnums) {
      "use strict";

      // Destructure the object to retrieve the FormTypes enum
      const { FormTypes } = EntryEnums;

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
          const entry = new EntryCreateCL(this, "Products");

          // Set the form title
          entry.setFormTitle("My Form Title");

          entry.createNewEntry(); 
        }
      });

    });
```

![Form Title](https://github.com/hasanciftci26/ui5-antares/blob/media/create_entry/form_title.png?raw=true)

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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
    function(Controller, EntryCreateCL, ButtonType) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
    function(Controller, EntryCreateCL, ButtonType) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
    function(Controller, EntryCreateCL, EntryEnums) {
      "use strict";

      // Destructure the object to retrieve the GuidStrategies enum
      const { GuidStrategies } = EntryEnums;

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
          const entry = new EntryCreateCL(this, "Products");

          // Set the property order and bring all the properties
          entry.setPropertyOrder(["categoryID", "supplierID", "price", "currency", "name"]);

          entry.createNewEntry(); 
        },

        onCreateCustomer: async function() {
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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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

| Returns  | Description                                                                                      |
| :------- | :----------------------------------------------------------------------------------------------- |
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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
  currency: number;
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
    function(Controller, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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
  currency: number;
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
    function(Controller, MessageBox, EntryCreateCL) {
      "use strict";

      return Controller.extend("your.apps.namespace.YourController", {
        onInit: function() {

        },

        onCreateProduct: async function() {
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

### Validation Logic

### Custom Control

### Custom Content

### Custom Fragment