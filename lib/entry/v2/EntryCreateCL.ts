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
        } else {
            const simpleForm = await content.getSimpleForm();
            simpleForm.setModel(this.getODataModel());
            simpleForm.setBindingContext(this.entryContext);
            this.entryDialog.addContent(simpleForm);
        }

        (this.getSourceView() as View).addDependent(this.entryDialog.getDialog());
        this.entryDialog.getDialog().open();
    }

    private onCreateCompleted(event: Button$PressEvent) {

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
}