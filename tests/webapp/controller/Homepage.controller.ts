import BaseController from "test/ui5/antares/controller/BaseController";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL";
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL";
import { IProducts } from "../types/create";
import { FormTypes } from "ui5/antares/types/entry/enums";
import ValueHelpCL from "ui5/antares/ui/ValueHelpCL";
import ValidationLogicCL from "ui5/antares/ui/ValidationLogicCL";
import { ValidationOperator } from "ui5/antares/types/ui/enums";

/**
 * @namespace test.ui5.antares.controller
 */
export default class Homepage extends BaseController {

    /* ======================================================================================================================= */
    /* Lifecycle methods                                                                                                       */
    /* ======================================================================================================================= */

    public onInit(): void {

    }

    /* ======================================================================================================================= */
    /* Event Handlers                                                                                                          */
    /* ======================================================================================================================= */

    public async onCreateProduct(): Promise<void> {
        const entry = new EntryCreateCL<IProducts>(this, "Products");
        entry.setFormType(FormTypes.SIMPLE);
        entry.addValueHelp(new ValueHelpCL(this, {
            propertyName: "CategoryID",
            valueHelpEntity: "Categories",
            valueHelpProperty: "ID",
            readonlyProperties: ["Name"]
        }));
        entry.addValueHelp(new ValueHelpCL(this, {
            propertyName: "SupplierID",
            valueHelpEntity: "Suppliers",
            valueHelpProperty: "ID",
            readonlyProperties: ["CompanyName", "ContactName", "Country"]
        }));
        entry.createNewEntry();
    }

    public async onUpdateProduct(): Promise<void> {
        const entry = new EntryUpdateCL<IProducts>(this, {
            entityPath: "Products",
            initializer: "stProducts"
        });

        entry.updateEntry();
    }

    public async onDeleteProduct(): Promise<void> {
        const entry = new EntryDeleteCL<IProducts>(this, {
            entityPath: "Products",
            initializer: "stProducts"
        });

        entry.deleteEntry();
    }

    public async onCreateCustomer(): Promise<void> {
        const entry = new EntryCreateCL(this, "Customers");
        entry.setFormType(FormTypes.SIMPLE);
        entry.addValidationLogic(new ValidationLogicCL({
            propertyName: "BirthDate",
            operator: ValidationOperator.GT,
            value1: new Date("2025-01-01")
        }));
        entry.createNewEntry();
    }

    /* ======================================================================================================================= */
    /* Internal methods                                                                                                        */
    /* ======================================================================================================================= */
}