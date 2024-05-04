import BaseController from "test/ui5/antares/controller/BaseController";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL";
import { IProducts } from "../types/create";
import { FormTypes, NamingStrategies } from "ui5/antares/types/entry/enums";
import { ButtonType } from "sap/m/library";

/**
 * @namespace test.ui5.antares.controller
 */
QUnit.config.autostart = false;
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
        entry.setBeginButtonText("Kaydet");
        entry.setBeginButtonType(ButtonType.Critical);
        entry.setEndButtonText("Çıkış");
        entry.setFormTitle("Yeni Ürün");
        entry.setMandatoryProperties(["CategoryID"]);
        entry.setExcludedProperties(["SupplierID"]);
        entry.setPropertyOrder(["Price", "Currency"], false);
        entry.createNewEntry();
    }

    /* ======================================================================================================================= */
    /* Internal methods                                                                                                        */
    /* ======================================================================================================================= */
}