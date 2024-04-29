import Button from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import SmartField from "sap/ui/comp/smartfield/SmartField";
import Group from "sap/ui/comp/smartform/Group";
import GroupElement from "sap/ui/comp/smartform/GroupElement";
import SmartForm from "sap/ui/comp/smartform/SmartForm";
import Controller from "sap/ui/core/mvc/Controller";
import Context from "sap/ui/model/Context";
import AnnotationCL from "ui5/antares/annotation/v2/AnnotationCL";
import EntityCL from "ui5/antares/entity/v2/EntityCL";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import { FormTypes, NamingStrategies } from "ui5/antares/types/entry/enums";

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
    private entryDialog: Dialog;
    private entryContext: Context;

    constructor(controller: Controller, entityName: string) {
        super(controller, entityName);
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
        if (!this.fragmentPath) {
            try {
                this.generateDialog();
            } catch (error) {
                throw error;
            }
        }
    }

    public reset() {
        if (this.getODataModel().hasPendingChanges()) {
            this.getODataModel().resetChanges([this.entryContext.getPath()]);
        }
    }

    private async generateDialog() {
        this.getDialogBase();

        if (this.formType === FormTypes.SMART) {
            try {
                const annotation = new AnnotationCL(this.namingStrategy, this.getODataModel(), this.getEntityName(), this.getMetadataUrl());
                const xmlAnnotation = await annotation.generateFormAnnotations();
                const smartForm = this.getSmartFormContent();

                this.getODataModel().addAnnotationXML(xmlAnnotation);
                this.entryContext = this.createEntry();

                smartForm.setModel(this.getODataModel());
                smartForm.bindElement(this.entryContext.getPath());

                this.entryDialog.addContent(smartForm);
            } catch (error) {
                throw error;
            }
        }

        this.getSourceView().addDependent(this.entryDialog);
        this.entryDialog.open();
    }

    private getDialogBase() {
        const dialogId = `diaCreateNew${this.getEntityName()}`;

        this.entryDialog = new Dialog({
            id: dialogId,
            showHeader: false,
            escapeHandler: this.onCancelESC.bind(this),
            beginButton: new Button({
                text: this.createButtonText,
                press: this.onCreate.bind(this)
            }),
            endButton: new Button({
                text: this.cancelButtonText,
                press: this.onCancel.bind(this)
            })
        });
    }

    private getSmartFormContent(): SmartForm {
        try {
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
        } catch (error) {
            throw error;
        }
    }

    private getSmartFormGroup(): Group {
        const entity = new EntityCL(this.getODataModel(), this.getEntityName());
        const group = new Group();

        try {
            const entityType = entity.getEntityType();

            if (!entityType.property) {
                throw new Error(`${entityType.name} EntityType has no property in the OData metadata!`);
            }

            const entityTypeKeys = entityType.key.propertyRef.map(ref => ref.name);
            const entityTypeProps = entityType.property.map(prop => prop.name);
            this.addSmartKeyProperties(group, entityTypeKeys);

            if (this.formPropertyOrder) {
                for (const order of this.formPropertyOrder) {
                    if (entityTypeKeys.includes(order) || !entityTypeProps.includes(order)) {
                        continue;
                    }

                    const smartField = new SmartField({
                        value: `{${order}}`
                    });

                    group.addGroupElement(new GroupElement({
                        elements: [smartField]
                    }));
                }

                if (!this.excludeOtherProps) {
                    for (const property of entityTypeProps) {
                        if (entityTypeKeys.includes(property) || this.formPropertyOrder.includes(property) || this.excludedProperties.includes(property)) {
                            continue;
                        }

                        const smartField = new SmartField({
                            value: `{${property}}`
                        });

                        group.addGroupElement(new GroupElement({
                            elements: [smartField]
                        }));
                    }
                }
            } else {
                for (const property of entityTypeProps) {
                    if (entityTypeKeys.includes(property) || this.excludedProperties.includes(property)) {
                        continue;
                    }

                    const smartField = new SmartField({
                        value: `{${property}}`
                    });

                    group.addGroupElement(new GroupElement({
                        elements: [smartField]
                    }));
                }
            }

            return group;
        } catch (error) {
            throw error;
        }
    }

    private addSmartKeyProperties(smartGroup: Group, entityTypeKeys: string[]) {
        entityTypeKeys.forEach((key) => {
            const smartField = new SmartField({
                value: `{${key}}`
            });

            smartGroup.addGroupElement(new GroupElement({
                elements: [smartField]
            }));
        });
    }

    private onCreate() {

    }

    private onCancel() {
        this.reset();
        this.entryDialog.close();
        this.entryDialog.destroy();
    }

    private onCancelESC(event: typeof Promise) {
        this.reset();
        event.resolve();
        this.entryDialog.destroy();
    }
}