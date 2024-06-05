import BaseController from "test/ui5/antares/controller/BaseController";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL";
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL";
import { IProducts } from "../types/create";
import { FormTypes, GuidStrategies } from "ui5/antares/types/entry/enums";
import ValueHelpCL from "ui5/antares/ui/ValueHelpCL";
import ValidationLogicCL from "ui5/antares/ui/ValidationLogicCL";
import { ValidationOperator } from "ui5/antares/types/ui/enums";
import EntryReadCL from "ui5/antares/entry/v2/EntryReadCL";
import Button from "sap/m/Button";
import MessageToast from "sap/m/MessageToast";

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
        entry.setFormGroups([{
            title: "Name Group",
            properties: ["Name"]
        }, {
            title: "Money",
            properties: ["Price", "Currency"]
        }]);

        entry.setMandatoryProperties(["Price", "CategoryID"]);
        entry.setDisplayObjectPage(true, "TargetHomepage");
        entry.setDefaultGroupTitle("First Section");
        entry.setFormType(FormTypes.SIMPLE);
        entry.addValidationLogic(new ValidationLogicCL({
            propertyName: "Price",
            operator: ValidationOperator.GT,
            value1: 1500,
            message: "Price must be greater than 1500"
        }));

        entry.addCustomContent(new Button({text: "Custom Button"}));
        entry.createNewEntry();
    }

    public async onUpdateProduct(): Promise<void> {
        const entry = new EntryUpdateCL<IProducts>(this, {
            entityPath: "Products",
            initializer: "stProducts"
        });

        // entry.setDisplayGuidProperties(GuidStrategies.ALL);

        entry.setFormGroups([{
            title: "Name Group",
            properties: ["Name"]
        }, {
            title: "Money",
            properties: ["Price", "Currency"]
        }]);        

        entry.setDisplayObjectPage(true, "TargetHomepage");
        entry.updateEntry();
    }

    public async onDeleteProduct(): Promise<void> {
        const entry = new EntryDeleteCL<IProducts>(this, {
            entityPath: "Products",
            initializer: "stProducts"
        });

        entry.setDisplayObjectPage(true, "TargetHomepage");
        entry.attachDeleteCompleted(this.onDeleteCompleted, this);
        entry.deleteEntry();
    }

    public async onReadProduct(): Promise<void> {
        const entry = new EntryReadCL(this, {
            entityPath: "Products",
            initializer: "stProducts"
        });

        entry.setFormGroups([{
            title: "Super",
            properties: ["Price", "Currency"]
        }]);
        entry.setDisplayObjectPage(true, "TargetHomepage");
        entry.readEntry();
    }

    public async onCreateCustomer(): Promise<void> {
        const entry = new EntryCreateCL(this, "Customers");
        // entry.setFormType(FormTypes.SIMPLE);
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

    public onDeleteCompleted() {
        MessageToast.show("Successfully deleted.");
    }
}