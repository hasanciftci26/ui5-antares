import BaseController from "test/ui5/antares/controller/BaseController";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL";
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL";
import EntryDeleteCL from "ui5/antares/entry/v2/EntryDeleteCL";
import { IProducts } from "../types/create";

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

    /* ======================================================================================================================= */
    /* Internal methods                                                                                                        */
    /* ======================================================================================================================= */
}