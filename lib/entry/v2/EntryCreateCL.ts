import { Button$PressEvent } from "sap/m/Button";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Context from "sap/ui/model/Context";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import { FormTypes } from "ui5/antares/types/entry/enums";
import ContentCL from "ui5/antares/ui/ContentCL";
import DialogCL from "ui5/antares/ui/DialogCL";
import EntryCL from "ui5/antares/entry/v2/EntryCL";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import MessageBox from "sap/m/MessageBox";
import SmartForm from "sap/ui/comp/smartform/SmartForm";
import GroupElement from "sap/ui/comp/smartform/GroupElement";
import SmartField from "sap/ui/comp/smartfield/SmartField";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import Input from "sap/m/Input";
import DatePicker from "sap/m/DatePicker";
import DateTimePicker from "sap/m/DateTimePicker";

/**
 * @namespace ui5.antares.entry.v2
 */
export default class EntryCreateCL<EntityT extends object> extends EntryCL {
    private entryDialog: DialogCL;
    private entryContext: Context;

    constructor(controller: Controller, entityPath: string, modelName?: string) {
        super(controller, entityPath, ODataMethods.CREATE, modelName);
    }

    public createNewEntry(data?: EntityT) {
        if (!this.getSourceView()) {
            throw new Error("createNewEntry() method cannot be used on the UIComponent!");
        }

        this.getODataModel().setDefaultBindingMode("TwoWay");
        this.getODataModel().setUseBatch(true);

        if (this.getFragmentPath()) {
        } else {
            this.createDialog(data);
        }
    }

    private async createDialog(data?: EntityT) {
        const content = new ContentCL(this.getSourceController(), this, this.getModelName());

        this.entryDialog = new DialogCL(`diaUI5AntaresCreateNew${this.getEntityName()}`);
        this.entryDialog.addBeginButton(this.getBeginButtonText(), this.getBeginButtonType(), this.onCreateCompleted, this);
        this.entryDialog.addEndButton(this.getEndButtonText(), this.getEndButtonType(), this.onEntryCanceled, this);
        this.entryDialog.addEscapeHandler(this.onEscapePressed, this);

        const entry = new ODataCreateCL<EntityT>(this.getSourceController(), this.getEntityPath(), this.getModelName());

        if (data) {
            entry.setData(data);
        }

        this.entryContext = entry.createEntry();

        if (this.getFormType() === FormTypes.SMART) {
            const smartForm = await content.getSmartForm();
            smartForm.setModel(this.getODataModel());
            smartForm.setBindingContext(this.entryContext);
            this.entryDialog.addContent(smartForm);

            this.getCustomContents().forEach((content)=>{
                this.entryDialog.addContent(content);
            });
        } else {
            const simpleForm = await content.getSimpleForm();
            simpleForm.setModel(this.getODataModel());
            simpleForm.setBindingContext(this.entryContext);
            this.entryDialog.addContent(simpleForm);

            this.getCustomContents().forEach((content)=>{
                this.entryDialog.addContent(content);
            });            
        }

        (this.getSourceView() as View).addDependent(this.entryDialog.getDialog());
        this.entryDialog.getDialog().open();
    }

    private onCreateCompleted(event: Button$PressEvent) {
        if (this.mandatoryFieldCheck()) {
            MessageBox.error(this.getErrorMessage());
            return;
        }
    }

    private onEntryCanceled(event: Button$PressEvent) {
        this.reset();
        this.entryDialog.getDialog().close();
        this.entryDialog.getDialog().destroy();
    }

    private onEscapePressed(event: { resolve: Function; reject: Function; }) {
        this.reset();
        event.resolve();
        this.entryDialog.getDialog().destroy();
    }

    public reset() {
        if (this.getODataModel().hasPendingChanges()) {
            this.getODataModel().resetChanges([this.entryContext.getPath()]);
        }
    }

    private mandatoryFieldCheck(): boolean {
        let checkFailed = false;

        if (this.getFormType() === FormTypes.SMART) {
            const smartGroupElements = (this.entryDialog.getDialog().getContent()[0] as SmartForm).getGroups()[0].getGroupElements() as GroupElement[];

            smartGroupElements.forEach((element) => {
                const control = element.getElements()[0];
                const customData = control.getCustomData().find(data => data.getKey() === "UI5AntaresCustomControlName");

                if (customData) {
                    const customControl = this.getCustomControl(customData.getValue());

                    if (customControl) {
                        if (customControl.getMandatoryHandler()?.call(customControl.getListener(), customControl.getControl())) {
                            checkFailed = true;
                        }
                    }
                } else {
                    if ((control as SmartField).getMandatory() && !(control as SmartField).getValue()) {
                        (control as SmartField).setValueState("Error");
                        checkFailed = true;
                    }
                }
            });
        } else {
            const simpleFormElements = (this.entryDialog.getDialog().getContent()[0] as SimpleForm).getContent();

            for (const element of simpleFormElements) {
                const customData = element.getCustomData().find(data => data.getKey() === "UI5AntaresCustomControlName");

                if (customData) {
                    const customControl = this.getCustomControl(customData.getValue());

                    if (customControl) {
                        if (customControl.getMandatoryHandler()?.call(customControl.getListener(), customControl.getControl())) {
                            checkFailed = true;
                        }
                    }
                } else {
                    if (element.getMetadata().getName() === "sap.m.Label" || element.getMetadata().getName() === "sap.m.CheckBox") {
                        continue;
                    }

                    switch (element.getMetadata().getName()) {
                        case "sap.m.Input":
                            if ((element as Input).getRequired() && !(element as Input).getValue()) {
                                (element as Input).setValueState("Error");
                                checkFailed = true;
                            }
                            break;
                        case "sap.m.DatePicker":
                            if ((element as DatePicker).getRequired() && !(element as DatePicker).getValue()) {
                                (element as DatePicker).setValueState("Error");
                                checkFailed = true;
                            }
                            break;
                        case "sap.m.DateTimePicker":
                            if ((element as DateTimePicker).getRequired() && !(element as DateTimePicker).getValue()) {
                                (element as DateTimePicker).setValueState("Error");
                                checkFailed = true;
                            }
                            break;
                    }
                }
            }
        }

        return checkFailed;
    }
}