import BaseController from "test/ui5/antares/controller/BaseController";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL";
import { IProducts } from "../types/create";
import { FormTypes, NamingStrategies } from "ui5/antares/types/entry/enums";
import { ButtonType } from "sap/m/library";
import CustomControlCL from "ui5/antares/ui/CustomControlCL";
import Input from "sap/m/Input";
import CheckBox from "sap/m/CheckBox";
import Control from "sap/ui/core/Control";
import DatePicker from "sap/m/DatePicker";
import ResponseCL from "ui5/antares/entry/v2/ResponseCL";
import MessageBox from "sap/m/MessageBox";

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
        entry.createNewEntry();
    }

    /* ======================================================================================================================= */
    /* Internal methods                                                                                                        */
    /* ======================================================================================================================= */

    public checkMandatory(control: Control): boolean {
        return true;
    }

    public onSubmitCompleted(response: ResponseCL<IProducts>) {
        const statusCode = response.getStatusCode();
        const data = response.getResponse();
        MessageBox.information("Create successful");
    }
}