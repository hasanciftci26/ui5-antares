import { Button$PressEvent } from "sap/m/Button";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import { DialogStrategies, FormTypes } from "ui5/antares/types/entry/enums";
import ContentCL from "ui5/antares/ui/ContentCL";
import EntryCL from "ui5/antares/entry/v2/EntryCL";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import MessageBox from "sap/m/MessageBox";
import FragmentCL from "ui5/antares/ui/FragmentCL";
import DialogCL from "ui5/antares/ui/DialogCL";
import UIComponent from "sap/ui/core/UIComponent";
import Dialog from "sap/m/Dialog";

/**
 * @namespace ui5.antares.entry.v2
 */
export default class EntryCreateCL<EntityT extends object = object> extends EntryCL<EntityT> {

    constructor(controller: Controller | UIComponent, entityPath: string, modelName?: string) {
        super(controller, entityPath, ODataMethods.CREATE, modelName);
    }

    public async createNewEntry(data?: EntityT) {
        if (!this.getSourceView()) {
            throw new Error("createNewEntry() method cannot be used on the UIComponent!");
        }

        this.getODataModel().setDefaultBindingMode("TwoWay");
        this.getODataModel().setUseBatch(true);

        if (this.getDialogStrategy() === DialogStrategies.LOAD) {
            await this.loadDialog(data);
        } else {
            await this.createDialog(data);
        }
    }

    private async createDialog(data?: EntityT) {
        const content = new ContentCL<EntryCreateCL<EntityT>, EntityT>(this.getSourceController(), this, this.getModelName());

        // Create Dialog
        this.createEntryDialog(`diaUI5AntaresCreateNew${this.getEntityName()}`);
        const entryDialog = this.getEntryDialog() as DialogCL;
        entryDialog.addBeginButton(this.getBeginButtonText(), this.getBeginButtonType(), this.onCreateTriggered, this);
        entryDialog.addEndButton(this.getEndButtonText(), this.getEndButtonType(), this.onEntryCanceled, this);
        entryDialog.addEscapeHandler(this.onEscapePressed, this);

        //Create Context
        this.createEntryContext(data);

        if (this.getFormType() === FormTypes.SMART) {
            const smartForm = await content.getSmartForm();
            smartForm.setModel(this.getODataModel());
            smartForm.setBindingContext(this.getEntryContext());
            entryDialog.addContent(smartForm);

            this.getCustomContents().forEach((customContent) => {
                entryDialog.addContent(customContent);
            });
        } else {
            const simpleForm = await content.getSimpleForm();
            simpleForm.setModel(this.getODataModel(), this.getModelName());
            simpleForm.setBindingContext(this.getEntryContext(), this.getModelName());
            entryDialog.addContent(simpleForm);

            this.getCustomContents().forEach((customContent) => {
                entryDialog.addContent(customContent);
            });
        }

        (this.getSourceView() as View).addDependent(entryDialog.getDialog());
        entryDialog.getDialog().open();
    }

    private onCreateTriggered(event: Button$PressEvent) {
        const validation = this.valueValidation();

        if (!validation.validated) {
            MessageBox.error(validation.message);
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

    private async loadDialog(data?: EntityT) {
        await this.addMandatoryKeyProperties();

        // Create Dialog
        this.createEntryDialog();
        const fragment = this.getEntryDialog() as FragmentCL;
        await fragment.load();
        const content = fragment.getFragmentContent();

        if (content instanceof Dialog) {
            // Set context and open the dialog
            this.createEntryContext(data);

            if (this.getContainsSmartForm()) {
                content.setModel(this.getODataModel());
                content.setBindingContext(this.getEntryContext());
            } else {
                content.setModel(this.getODataModel(), this.getModelName());
                content.setBindingContext(this.getEntryContext(), this.getModelName());
            }

            fragment.open();
        } else {
            fragment.destroyFragmentContent();
            throw new Error("Provided fragment must contain a sap.m.Dialog control. Put all the controls into a sap.m.Dialog");
        }
    }
}