# UI5 Antares

[TS_URL]: https://www.typescriptlang.org
[SAPUI5_URL]: https://sapui5.hana.ondemand.com
[UI5_LICENSE_URL]: https://tools.hana.ondemand.com/developer-license-3_2.txt
[ANTARES_URL]: #ui5-antares

The UI5 Antares is a custom SAPUI5 library comprising useful classes and methods, specifically designed to streamline the development process when working with OData V2 services.

> [!NOTE]
> UI5 Antares is developed in [TypeScript][TS_URL] and is compatible with both SAPUI5 JavaScript and SAPUI5 TypeScript applications.

> [!CAUTION]
> This library utilizes the classes and components of the [SAPUI5][SAPUI5_URL] framework without modifying or copying the source code, which is licensed under the [SAP Developer License][UI5_LICENSE_URL]. It is important to carefully review the [SAP Developer License][UI5_LICENSE_URL] terms and conditions, as well as adhere to the restrictions set forth therein when using the [UI5 Antares][ANTARES_URL] library.

> [!IMPORTANT]
> To view the complete documentation for this library, please click on the following link: [UI5 Antares](https://ui5-antares.github.io)

## Features

[SIMPLEFORM_URL]: https://sapui5.hana.ondemand.com/#/api/sap.ui.layout.form.SimpleForm
[SMARTFORM_URL]: https://sapui5.hana.ondemand.com/#/api/sap.ui.comp.smartform.SmartForm
[ODATA_MODEL_URL]: https://sapui5.hana.ondemand.com/#/api/sap.ui.model.odata.v2.ODataModel

- OData V2 metadata-based dialog and [Simple Form][SIMPLEFORM_URL] - [Smart Form][SMARTFORM_URL] generation for CRUD operations
- OData V2 metadata-based object page and [Simple Form][SIMPLEFORM_URL] - [Smart Form][SMARTFORM_URL] generation for CRUD operations
- Value Help Dialog generation
- User input validations/mandatory checks
- HTTP request handling for OData V2 CRUD operations
- Promisified OData V2 classes based on the [sap.ui.model.odata.v2.ODataModel][ODATA_MODEL_URL] class

### Auto Generated Dialog

![UI5 Antares Dialog GIF](https://github.com/ui5-antares/ui5-antares.github.io/blob/master/docs/images/core/antares_dialog.gif?raw=true)

### Auto Generated Object Page

![UI5 Antares Object Page GIF](https://github.com/ui5-antares/ui5-antares.github.io/blob/master/docs/images/core/antares_object_page.gif?raw=true)

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](https://github.com/hasanciftci26/ui5-antares/blob/master/LICENSE) file for details.