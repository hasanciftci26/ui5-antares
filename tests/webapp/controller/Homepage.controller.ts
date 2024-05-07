import BaseController from "test/ui5/antares/controller/BaseController";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL";
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL";
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
import Image from "sap/m/Image";
import ODataCL from "ui5/antares/odata/v2/ODataCL";
import ValueHelpCL from "ui5/antares/ui/ValueHelpCL";
import Table from "sap/m/Table";
import ValidationLogicCL from "ui5/antares/ui/ValidationLogicCL";
import { ValidationOperator } from "ui5/antares/types/ui/enums";
import { ValidatorValue, ValidatorValueParameter } from "ui5/antares/types/ui/validation";

/**
 * @namespace test.ui5.antares.controller
 */
QUnit.config.autostart = false;
export default class Homepage extends BaseController {
    private fragmentEntry: EntryCreateCL<IProducts>;

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
        entry.setEndButtonText("İptal");
        entry.setBeginButtonType(ButtonType.Default);
        entry.setEndButtonType(ButtonType.Attention);
        entry.setFormTitle("Yeni Ürün Yarat");
        entry.setFormType(FormTypes.SIMPLE);
        entry.setMandatoryErrorMessage("Lütfen gerekli tüm alanları doldurunuz.");
        entry.addValidationLogic(new ValidationLogicCL({
            propertyName: "Price",
            operator: ValidationOperator.BT,
            value1: 999,
            value2: 2350,
            message: "Price 999-2350 arası olabilir"
        }));
        entry.createNewEntry();
    }

    public onValidate(value: ValidatorValueParameter): boolean {
        return false;
    }

    public async onCreateProductFragment(): Promise<void> {
        this.fragmentEntry = new EntryCreateCL<IProducts>(this, "Products");
        this.fragmentEntry.setFragmentPath("test.ui5.antares.fragments.CreateProduct");
        this.fragmentEntry.setMandatoryProperties(["CategoryID"]);
        this.fragmentEntry.createNewEntry({ ID: 182 });
    }

    public onCompleteCreate() {
        this.fragmentEntry.submit();
    }

    public onCloseDialog() {
        this.fragmentEntry.reset();
    }

    /* ======================================================================================================================= */
    /* Internal methods                                                                                                        */
    /* ======================================================================================================================= */

    public checkMandatory(control: Control): boolean {
        (control as CheckBox).getSelected();
        return true;
    }

    public onSubmitCompleted(response: ResponseCL<IProducts>) {
        const statusCode = response.getStatusCode();
        const data = response.getResponse();
        MessageBox.information("Create successful");
    }
}