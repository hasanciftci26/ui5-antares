import { Button$PressEvent } from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import EntryCL from "ui5/antares/entry/v2/EntryCL";
import { DialogStrategies, FormTypes } from "ui5/antares/types/entry/enums";
import { IReadSettings } from "ui5/antares/types/entry/read";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import ContentCL from "ui5/antares/ui/ContentCL";
import DialogCL from "ui5/antares/ui/DialogCL";
import FragmentCL from "ui5/antares/ui/FragmentCL";

/**
 * @namespace ui5.antares.entry.v2
 */
export default class EntryReadCL<EntityT extends object = object, EntityKeysT extends object = object> extends EntryCL<EntityT, EntityKeysT> {
    private settings: IReadSettings<EntityKeysT>;

    constructor(controller: Controller | UIComponent, settings: IReadSettings<EntityKeysT>, modelName?: string) {
        super(controller, settings.entityPath, ODataMethods.READ, modelName);
        this.settings = settings;
    }

    public async readEntry() {
        if (!this.getSourceView()) {
            throw new Error("readEntry() method cannot be used on the UIComponent!");
        }

        this.getODataModel().setDefaultBindingMode("TwoWay");
        this.getODataModel().setUseBatch(true);

        if (this.getDisplayObjectPage()) {
            await this.createObjectPage();
        } else {
            if (this.getDialogStrategy() === DialogStrategies.LOAD) {
                await this.loadDialog();
            } else {
                await this.createDialog();
            }
        }
    }

    private async createDialog() {
        await this.initializeContext(this.settings.initializer);
        const content = new ContentCL<EntryReadCL<EntityT>, EntityT>(this.getSourceController(), this, ODataMethods.READ, this.getModelName());

        // Create Dialog
        this.createEntryDialog(`diaUI5AntaresRead${this.getEntityName()}`);
        const entryDialog = this.getEntryDialog() as DialogCL;
        entryDialog.addEndButton(this.getEndButtonText(), this.getEndButtonType(), this.onEntryCanceled, this);
        entryDialog.addEscapeHandler(this.onEscapePressed, this);

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

    private async loadDialog() {
        await this.initializeContext(this.settings.initializer);

        this.createEntryDialog();
        const fragment = this.getEntryDialog() as FragmentCL;
        await fragment.load();
        const content = fragment.getFragmentContent();

        if (content instanceof Dialog) {
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

    private async createObjectPage() {
        await this.initializeContext(this.settings.initializer);
        const content = new ContentCL<EntryReadCL<EntityT>, EntityT>(this.getSourceController(), this, ODataMethods.READ, this.getModelName());

        // Create Object Page
        this.createObjectPageLayout();
        const objectPageInstance = this.getObjectPageInstance();
        objectPageInstance.addCancelButton(this.getEndButtonText(), this.getEndButtonType());

        if (this.getFormType() === FormTypes.SMART) {
            await content.addSmartSections();
            objectPageInstance.getObjectPageLayout().setModel(this.getODataModel());
            objectPageInstance.getObjectPageLayout().setBindingContext(this.getEntryContext());
        } else {
            await content.addSimpleSections();
            objectPageInstance.getObjectPageLayout().setModel(this.getODataModel(), this.getModelName());
            objectPageInstance.getObjectPageLayout().setBindingContext(this.getEntryContext(), this.getModelName());
        }

        if (this.getCustomContents().length) {
            objectPageInstance.addEmptySection(this.getCustomContentSectionTitle());

            this.getCustomContents().forEach((customContent) => {
                objectPageInstance.addContentToSection(customContent);
            });
        }

        await this.createTypedView();
        this.displayTypedView();
    }
}