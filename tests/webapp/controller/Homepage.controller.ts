import BaseController from "test/ui5/antares/controller/BaseController";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL";
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL";
import EntryReadCL from "ui5/antares/entry/v2/EntryReadCL";
import { IProducts } from "../types/create";
import { FormTypes, GuidStrategies, NamingStrategies } from "ui5/antares/types/entry/enums";
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
import UploadSet from "sap/m/upload/UploadSet";
import ComboBox, { ComboBox$SelectionChangeEvent } from "sap/m/ComboBox";
import Item from "sap/ui/core/Item";
import FragmentCL from "ui5/antares/ui/FragmentCL";

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
        entry.setFormType(FormTypes.SIMPLE);
        entry.setDisplayGuidProperties(GuidStrategies.ALL);
        entry.setGenerateRandomGuid(GuidStrategies.ALL);
        await entry.addControlFromFragment(new FragmentCL(this, "test.ui5.antares.fragments.ProductsCustomControls"));
        await entry.addContentFromFragment(new FragmentCL(this, "test.ui5.antares.fragments.ProductsCustomContents"));
        entry.createNewEntry();
    }

    public async onUpdateProduct(): Promise<void> {
        const entry = new EntryUpdateCL<IProducts>(this, {
            entityPath: "Products",
            initializer: "tblProducts"
        });

        entry.addValidationLogic(new ValidationLogicCL({
            propertyName: "Price",
            operator: ValidationOperator.GT,
            value1: 1550
        }));
        entry.setDisplayGuidProperties(GuidStrategies.ALL);
        await entry.addControlFromFragment(new FragmentCL(this, "test.ui5.antares.fragments.ProductsCustomControls"));
        entry.setFormType(FormTypes.SIMPLE);
        entry.updateEntry();
    }

    public async onReadProduct(): Promise<void> {
        const entry = new EntryReadCL<IProducts>(this, {
            entityPath: "Products",
            initializer: "tblProducts"
        });
        entry.setDisplayGuidProperties(GuidStrategies.ALL);
        entry.readEntry();
    }

    public onCheckCurrency(control: ComboBox): boolean {
        if (control.getSelectedKey() === "TRY") {
            return false;
        }

        return true;
    }

    public onChange(event: ComboBox$SelectionChangeEvent) {
        let test = "x";
    }

    public onValidate(value: ValidatorValueParameter): boolean {
        if ((value as ComboBox).getSelectedKey() === "TRY") {
            return false;
        } else {
            return true;
        }
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