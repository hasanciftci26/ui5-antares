import { Button$PressEvent } from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Context from "sap/ui/model/Context";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import { FormTypes, NamingStrategies } from "ui5/antares/types/entry/enums";
import ContentCL from "ui5/antares/ui/ContentCL";
import DialogCL from "ui5/antares/ui/DialogCL";

/**
 * @namespace ui5.antares.entry.v2
 */
export default class EntryCreateCL<EntityT extends object> extends ODataCreateCL<EntityT> {
    private fragmentPath?: string;
    private namingStrategy: NamingStrategies = NamingStrategies.CAMEL_CASE;
    private formType: FormTypes = FormTypes.SMART;
    private formId?: string;
    private formTitle?: string;
    private formPropertyOrder?: string[];
    private excludeOtherProps: boolean = false;
    private excludedProperties: string[] = [];
    private mandatoryProperties: string[] = [];
    private resourceBundlePrefix: string = "antares";
    private useMetadataLabels: boolean = false;
    private createButtonText: string = "Create";
    private cancelButtonText: string = "Cancel";
    public entryDialog: Dialog;
    public entryContext: Context;

    constructor(controller: Controller, entityPath: string, modelName?: string) {
        super(controller, entityPath, modelName);
    }

    public setFragmentPath(fragmentPath: string) {
        this.fragmentPath = fragmentPath;
    }

    public setFormId(formId: string) {
        this.formId = formId;
    }

    public setFormType(formType: FormTypes) {
        this.formType = formType;
    }

    public setNamingStrategy(strategy: NamingStrategies) {
        this.namingStrategy = strategy;
    }

    public setFormTitle(title: string) {
        this.formTitle = title;
    }

    public setCreateButtonText(text: string) {
        this.createButtonText = text;
    }

    public setCancelButtonText(text: string) {
        this.cancelButtonText = text;
    }

    public setFormPropertyOrder(order: string[], excludeOtherProps: boolean = false) {
        this.formPropertyOrder = order;
        this.excludeOtherProps = excludeOtherProps;
    }

    public setExcludedProperties(properties: string[]) {
        this.excludedProperties = properties;
    }

    public setMandatoryProperties(properties: string[]) {
        this.mandatoryProperties = properties;
    }

    public setResourceBundlePrefix(prefix: string) {
        this.resourceBundlePrefix = prefix;
    }

    public setUseMetadataLabels(useMetadataLabels: boolean) {
        if (this.formType !== FormTypes.SMART && useMetadataLabels) {
            throw new Error("Metadata Labels can only be used with SmartForm!");
        }
        this.useMetadataLabels = useMetadataLabels;
    }

    public createNewEntry() {
        if (!this.getSourceView()) {
            throw new Error("createNewEntry() method cannot be used on the UIComponent!");
        }

        if (this.fragmentPath) {
        } else {
            this.createDialog();
        }
    }

    public reset() {
        if (this.getODataModel().hasPendingChanges()) {
            this.getODataModel().resetChanges([this.entryContext.getPath()]);
        }
    }

    private async createDialog() {
        const dialog = new DialogCL(`diaCreateNew${this.getEntityName()}`, this.createButtonText, this.cancelButtonText);
        dialog.attachOnBeginButton(this.onCreateCompleted, this);
        dialog.attachOnEndButton(this.onEntryCanceled, this);
        dialog.attachEscapeHandler(this.onCancelESC, this);
        this.entryDialog = dialog.createEntryDialog();

        const content = new ContentCL({
            controller: this.getSourceController(),
            entityName: this.getEntityName(),
            excludedProperties: this.excludedProperties,
            excludeOtherProps: this.excludeOtherProps,
            mandatoryProperties: this.mandatoryProperties,
            namingStrategy: this.namingStrategy,
            resourceBundlePrefix: this.resourceBundlePrefix,
            formPropertyOrder: this.formPropertyOrder,
            modelName: this.getModelName(),
            useMetadataLabels: this.useMetadataLabels,
            formType: this.formType
        });

        this.entryContext = this.createEntry();

        if (this.formType === FormTypes.SMART) {
            const smartForm = await content.getSmartForm(this.formTitle);
            smartForm.setModel(this.getODataModel());
            smartForm.setBindingContext(this.entryContext);
            this.entryDialog.addContent(smartForm);
        } else {
            const simpleForm = await content.getSimpleForm(this.formTitle);
            simpleForm.setModel(this.getODataModel());
            simpleForm.setBindingContext(this.entryContext);
            this.entryDialog.addContent(simpleForm);
        }

        (this.getSourceView() as View).addDependent(this.entryDialog);
        this.entryDialog.open();
    }

    private onCreateCompleted(event: Button$PressEvent) {

    }

    private onEntryCanceled(event: Button$PressEvent) {
        this.reset();
        this.entryDialog.close();
        this.entryDialog.destroy();
    }

    private onCancelESC(event: { resolve: Function; reject: Function; }) {
        this.reset();
        event.resolve();
        this.entryDialog.destroy();
    }
}