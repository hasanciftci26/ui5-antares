import { Button$PressEvent } from "sap/m/Button";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import { FormTypes } from "ui5/antares/types/entry/enums";
import ContentCL from "ui5/antares/ui/ContentCL";
import EntryCL from "ui5/antares/entry/v2/EntryCL";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace ui5.antares.entry.v2
 */
export default class EntryCreateCL<EntityT extends object = object> extends EntryCL<EntityT> {

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
        const content = new ContentCL<EntryCreateCL<EntityT>, EntityT>(this.getSourceController(), this, this.getModelName());

        // Create Dialog
        this.createEntryDialog(`diaUI5AntaresCreateNew${this.getEntityName()}`);
        this.getEntryDialog().addBeginButton(this.getBeginButtonText(), this.getBeginButtonType(), this.onCreateTriggered, this);
        this.getEntryDialog().addEndButton(this.getEndButtonText(), this.getEndButtonType(), this.onEntryCanceled, this);
        this.getEntryDialog().addEscapeHandler(this.onEscapePressed, this);

        //Create Context
        this.createEntryContext(data);

        if (this.getFormType() === FormTypes.SMART) {
            const smartForm = await content.getSmartForm();
            smartForm.setModel(this.getODataModel());
            smartForm.setBindingContext(this.getEntryContext());
            this.getEntryDialog().addContent(smartForm);

            this.getCustomContents().forEach((content) => {
                this.getEntryDialog().addContent(content);
            });
        } else {
            const simpleForm = await content.getSimpleForm();
            simpleForm.setModel(this.getODataModel(), this.getModelName());
            simpleForm.setBindingContext(this.getEntryContext(), this.getModelName());
            this.getEntryDialog().addContent(simpleForm);

            this.getCustomContents().forEach((content) => {
                this.getEntryDialog().addContent(content);
            });
        }

        (this.getSourceView() as View).addDependent(this.getEntryDialog().getDialog());
        this.getEntryDialog().getDialog().open();
    }

    private onCreateTriggered(event: Button$PressEvent) {
        if (this.mandatoryFieldCheck()) {
            MessageBox.error(this.getErrorMessage());
            return;
        }

        this.submit();
    }

    private onEntryCanceled(event: Button$PressEvent) {
        this.reset();
        this.closeEntryDialog();
        this.destroyEntryDialog();
    }

    private onEscapePressed(event: { resolve: Function; reject: Function; }) {
        this.reset();
        event.resolve();
        this.destroyEntryDialog();
    }
}