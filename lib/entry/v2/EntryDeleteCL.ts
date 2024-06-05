import { Button$PressEvent } from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import MessageBox from "sap/m/MessageBox";
import { ButtonType } from "sap/m/library";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Context from "sap/ui/model/odata/v2/Context";
import EntryCL from "ui5/antares/entry/v2/EntryCL";
import { IDeleteFailed, IDeleteSettings } from "ui5/antares/types/entry/delete";
import { DialogStrategies, FormTypes } from "ui5/antares/types/entry/enums";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import ContentCL from "ui5/antares/ui/ContentCL";
import DialogCL from "ui5/antares/ui/DialogCL";
import FragmentCL from "ui5/antares/ui/FragmentCL";
import ResponseCL from "ui5/antares/entry/v2/ResponseCL";
import Targets from "sap/ui/core/routing/Targets";

/**
 * @namespace ui5.antares.entry.v2
 */
export default class EntryDeleteCL<EntityT extends object = object, EntityKeysT extends object = object> extends EntryCL<EntityT, EntityKeysT> {
    private settings: IDeleteSettings<EntityKeysT>;
    private confirmationText: string = "The selected line will be deleted. Do you confirm?"
    private confirmationTitle: string = "Confirm Delete";
    private deleteCompleted?: (data: EntityT) => void;
    private completedListener?: object;
    private deleteFailed?: (response: ResponseCL<IDeleteFailed>) => void;
    private failedListener?: object;

    constructor(controller: Controller | UIComponent, settings: IDeleteSettings<EntityKeysT>, modelName?: string) {
        super(controller, settings.entityPath, ODataMethods.DELETE, modelName);
        this.settings = settings;
        this.setBeginButtonType(ButtonType.Reject);
        this.setEndButtonType(ButtonType.Default);
    }

    public setConfirmationText(text: string) {
        this.confirmationText = text;
    }

    public getConfirmationText(): string {
        return this.confirmationText;
    }

    public setConfirmationTitle(title: string) {
        this.confirmationTitle = title;
    }

    public getConfirmationTitle(): string {
        return this.confirmationTitle;
    }

    public attachDeleteCompleted(completed: (data: EntityT) => void, listener?: object) {
        this.deleteCompleted = completed;
        this.completedListener = listener || this.getSourceController();
    }

    public attachDeleteFailed(failed: (response: ResponseCL<IDeleteFailed>) => void, listener?: object) {
        this.deleteFailed = failed;
        this.failedListener = listener || this.getSourceController();
    }

    public async deleteEntry(previewBeforeDelete: boolean = true) {
        if (!this.getSourceView()) {
            throw new Error("deleteEntry() method cannot be used on the UIComponent!");
        }

        this.getODataModel().setDefaultBindingMode("TwoWay");
        this.getODataModel().setUseBatch(true);
        await this.initializeContext(this.settings.initializer);

        if (previewBeforeDelete) {
            if (this.getDisplayObjectPage()) {
                await this.createObjectPage();
            } else {
                if (this.getDialogStrategy() === DialogStrategies.LOAD) {
                    await this.loadDialog();
                } else {
                    await this.createDialog();
                }
            }
        } else {
            this.deleteEntryContext();
        }
    }

    private async createDialog() {
        const content = new ContentCL<EntryDeleteCL<EntityT>, EntityT>(this.getSourceController(), this, ODataMethods.DELETE, this.getModelName());

        // Create Dialog
        this.createEntryDialog(`diaUI5AntaresDelete${this.getEntityName()}`);
        const entryDialog = this.getEntryDialog() as DialogCL;
        entryDialog.addBeginButton(this.getBeginButtonText(), this.getBeginButtonType(), this.onDeleteTriggered, this);
        entryDialog.addEndButton(this.getEndButtonText(), this.getEndButtonType(), this.onEntryCanceled, this);
        entryDialog.addEscapeHandler(this.onEscapePressed, this);
        entryDialog.getDialog().setInitialFocus(entryDialog.getDialog().getEndButton());

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

    private onDeleteTriggered(event: Button$PressEvent) {
        this.deleteEntryContext();
        this.closeEntryDialog();
        this.destroyEntryDialog();
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

    private deleteEntryContext(isObjectPage: boolean = false) {
        const context = this.getEntryContext() as Context;
        const data = context.getObject() as EntityT;

        MessageBox.confirm(this.confirmationText, {
            title: this.confirmationTitle,
            actions: ["YES", "NO"],
            initialFocus: "NO",
            onClose: (event: "YES" | "NO") => {
                if (event === "YES") {
                    context.delete({ refreshAfterChange: true, groupId: "$auto" }).then(() => {
                        if (this.deleteCompleted) {
                            this.deleteCompleted.call(this.completedListener, data);
                        }

                        if (isObjectPage) {
                            (this.getUIRouter().getTargets() as Targets).display(this.getFromTarget());
                        }
                    }).catch((error: IDeleteFailed) => {
                        if (this.deleteFailed) {
                            const response = new ResponseCL<IDeleteFailed>(error, error.statusCode);
                            this.deleteFailed.call(this.failedListener, response);
                        }

                        if (isObjectPage) {
                            (this.getUIRouter().getTargets() as Targets).display(this.getFromTarget());
                        }
                    });
                }
            }
        });
    }

    private async createObjectPage() {
        const content = new ContentCL<EntryDeleteCL<EntityT>, EntityT>(this.getSourceController(), this, ODataMethods.DELETE, this.getModelName());

        // Create Object Page
        this.createObjectPageLayout();
        const objectPageInstance = this.getObjectPageInstance();
        objectPageInstance.addCompleteButton(this.getBeginButtonText(), this.getBeginButtonType());
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

        this.registerEventForObjectPage();
        await this.createTypedView();
        this.displayTypedView();
    }

    private registerEventForObjectPage() {
        const eventBus = this.getSourceOwnerComponent().getEventBus();
        eventBus.subscribeOnce("UI5AntaresEntryDelete", "Complete", this.objectPageEventHandler, this);
    }

    private objectPageEventHandler(channelId: string, eventId: string, data: object) {
        this.deleteEntryContext(true);
    }
}