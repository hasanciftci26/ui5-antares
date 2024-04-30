import { Button$PressEvent } from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import SmartField from "sap/ui/comp/smartfield/SmartField";
import Group from "sap/ui/comp/smartform/Group";
import GroupElement from "sap/ui/comp/smartform/GroupElement";
import SmartForm from "sap/ui/comp/smartform/SmartForm";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Context from "sap/ui/model/Context";
import AnnotationCL from "ui5/antares/annotation/v2/AnnotationCL";
import EntityCL from "ui5/antares/entity/v2/EntityCL";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import { FormTypes, NamingStrategies } from "ui5/antares/types/entry/enums";
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

        if (this.formType === FormTypes.SMART) {
            const annotation = new AnnotationCL(this.getSourceController(), this.getEntityName(), this.namingStrategy, this.getModelName());
            await annotation.appendFormAnnotations();

            const smartForm = this.getSmartFormContent();
            this.entryContext = this.createEntry();
            smartForm.setModel(this.getODataModel());
            smartForm.bindElement(this.entryContext.getPath());

            this.entryDialog.addContent(smartForm);
        }

        (this.getSourceView() as View).addDependent(this.entryDialog);
        this.entryDialog.open();
    }

    private getSmartFormContent(): SmartForm {
        const smartFormGroup = this.getSmartFormGroup();
        this.formId = `sfCreateNew${this.getEntityName()}`;

        const smartForm = new SmartForm({
            id: this.formId,
            editTogglable: false,
            editable: true,
            title: this.formTitle || `Create New ${this.getEntityName()}`,
            groups: [smartFormGroup]
        });

        return smartForm;
    }

    private getSmartFormGroup(): Group {
        const entity = new EntityCL(this.getSourceController(), this.getEntityName(), this.getModelName());
        const smartGroup = new Group();

        this.addSmartKeyProperties(smartGroup, entity);

        if (this.formPropertyOrder) {
            this.addOrderedSmartProperties(smartGroup, entity);
        } else {
            this.addSmartProperties(smartGroup, entity);
        }

        return smartGroup;
    }

    private addSmartKeyProperties(smartGroup: Group, entity: EntityCL) {
        const entityTypeKeys = entity.getEntityTypeKeys();

        entityTypeKeys.forEach((key) => {
            const smartField = new SmartField({
                value: `{${key}}`
            });

            smartGroup.addGroupElement(new GroupElement({
                elements: [smartField]
            }));
        });
    }

    private addOrderedSmartProperties(smartGroup: Group, entity: EntityCL) {
        const entityTypeKeys = entity.getEntityTypeKeys();
        const entityTypeProperties = entity.getEntityTypeProperties();

        for (const order of this.formPropertyOrder!) {
            if (entityTypeKeys.includes(order) || !entityTypeProperties.includes(order)) {
                continue;
            }

            const smartField = new SmartField({
                value: `{${order}}`
            });

            smartGroup.addGroupElement(new GroupElement({
                elements: [smartField]
            }));
        }

        if (!this.excludeOtherProps) {
            for (const property of entityTypeProperties) {
                if (entityTypeKeys.includes(property) || this.formPropertyOrder!.includes(property) || this.excludedProperties.includes(property)) {
                    continue;
                }

                const smartField = new SmartField({
                    value: `{${property}}`
                });

                smartGroup.addGroupElement(new GroupElement({
                    elements: [smartField]
                }));
            }
        }
    }

    private addSmartProperties(smartGroup: Group, entity: EntityCL) {
        const entityTypeKeys = entity.getEntityTypeKeys();
        const entityTypeProperties = entity.getEntityTypeProperties();

        for (const property of entityTypeProperties) {
            if (entityTypeKeys.includes(property) || this.excludedProperties.includes(property)) {
                continue;
            }

            const smartField = new SmartField({
                value: `{${property}}`
            });

            smartGroup.addGroupElement(new GroupElement({
                elements: [smartField]
            }));
        }
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