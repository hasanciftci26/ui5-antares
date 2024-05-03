import EntityCL from "../entity/v2/EntityCL";
import SmartForm from "sap/ui/comp/smartform/SmartForm";
import Group from "sap/ui/comp/smartform/Group";
import SmartField from "sap/ui/comp/smartfield/SmartField";
import GroupElement from "sap/ui/comp/smartform/GroupElement";
import { IContentConfigurations } from "../types/ui/content";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import UI5Element from "sap/ui/core/Element";
import Label from "sap/m/Label";
import CheckBox from "sap/m/CheckBox";
import DatePicker from "sap/m/DatePicker";
import DateTimePicker from "sap/m/DateTimePicker";
import Input from "sap/m/Input";
import { FormTypes } from "ui5/antares/types/entry/enums";

/**
 * @namespace ui5.antares.ui
 */
export default class ContentCL extends EntityCL {
    private formPropertyOrder?: string[];
    private mandatoryProperties: string[];
    private excludeOtherProps: boolean;
    private excludedProperties: string[];
    private useMetadataLabels: boolean;
    private formType: FormTypes;
    private smartGroup: Group;
    private simpleFormElements: UI5Element[];

    constructor(config: IContentConfigurations) {
        super(config.controller, config.entityName, config.resourceBundlePrefix, config.namingStrategy, config.modelName);
        this.formPropertyOrder = config.formPropertyOrder;
        this.mandatoryProperties = config.mandatoryProperties;
        this.excludeOtherProps = config.excludeOtherProps;
        this.excludedProperties = config.excludedProperties;
        this.useMetadataLabels = config.useMetadataLabels;
        this.formType = config.formType;
    }

    public async getSmartForm(formTitle?: string): Promise<SmartForm> {
        const smartFormGroup = await this.getSmartFormGroup();

        const smartForm = new SmartForm({
            editTogglable: false,
            editable: true,
            title: formTitle || `Create New ${this.getEntityName()}`,
            groups: [smartFormGroup]
        });

        return smartForm;
    }

    public async getSimpleForm(formTitle?: string): Promise<SimpleForm> {
        const simpleFormContent = await this.getSimpleFormContent();

        const simpleForm = new SimpleForm({
            editable: true,
            title: formTitle || `Create New ${this.getEntityName()}`,
            content: simpleFormContent
        });

        return simpleForm;
    }

    private async getSmartFormGroup(): Promise<Group> {
        this.smartGroup = new Group();

        await this.addKeyProperties();

        if (this.formPropertyOrder) {
            await this.addOrderedProperties();
        } else {
            await this.addProperties();
        }

        return this.smartGroup;
    }

    private async getSimpleFormContent(): Promise<UI5Element[]> {
        this.simpleFormElements = [];
        await this.addKeyProperties();

        if (this.formPropertyOrder) {
            await this.addOrderedProperties();
        } else {
            await this.addProperties();
        }

        return this.simpleFormElements;
    }    

    private async addKeyProperties() {
        const entityTypeKeys = await this.getEntityTypeKeys();

        if (this.formType === FormTypes.SIMPLE) {
            this.mandatoryProperties.push(...entityTypeKeys.map(key => key.originalProperty));
        }

        entityTypeKeys.forEach((key) => {
            if (this.formType === FormTypes.SMART) {
                const smartField = new SmartField({
                    value: `{${key.originalProperty}}`
                });

                const groupElement = new GroupElement({
                    elements: [smartField]
                });

                if (!this.useMetadataLabels) {
                    groupElement.setLabel(key.generatedLabel);
                }

                this.smartGroup.addGroupElement(groupElement);
            } else {
                this.simpleFormElements.push(new Label({ text: key.generatedLabel }));

                switch (key.propertyType) {
                    case "Edm.Boolean":
                        this.addCheckBox(key.originalProperty)
                        break;
                    case "Edm.DateTime":
                        this.addDatePicker(key.originalProperty)
                        break;
                    case "Edm.DateTimeOffset":
                        this.addDateTimePicker(key.originalProperty)
                        break;
                    default:
                        this.addInput(key.originalProperty);
                        break;
                }
            }
        });
    }

    private async addOrderedProperties() {
        const entityTypeKeys = await this.getEntityTypeKeys();
        const entityTypeProperties = await this.getEntityTypeProperties();

        for (const order of this.formPropertyOrder!) {
            if (entityTypeKeys.some(key => key.originalProperty === order) || !entityTypeProperties.find(prop => prop.originalProperty === order)) {
                continue;
            }

            if (this.formType === FormTypes.SMART) {
                const smartField = new SmartField({
                    mandatory: this.mandatoryProperties.includes(order),
                    value: `{${order}}`
                });

                const groupElement = new GroupElement({
                    elements: [smartField]
                });

                if (!this.useMetadataLabels) {
                    groupElement.setLabel(this.getEntityTypePropLabel(order));
                }

                this.smartGroup.addGroupElement(groupElement);
            } else {
                const propertyType = entityTypeProperties.find(prop => prop.originalProperty === order)!.propertyType;
                this.simpleFormElements.push(new Label({ text: this.getEntityTypePropLabel(order) }));

                switch (propertyType) {
                    case "Edm.Boolean":
                        this.addCheckBox(order)
                        break;
                    case "Edm.DateTime":
                        this.addDatePicker(order)
                        break;
                    case "Edm.DateTimeOffset":
                        this.addDateTimePicker(order)
                        break;
                    default:
                        this.addInput(order);
                        break;
                }
            }
        }

        if (!this.excludeOtherProps) {
            for (const property of entityTypeProperties) {
                if (entityTypeKeys.some(key => key.originalProperty === property.originalProperty) ||
                    this.formPropertyOrder!.includes(property.originalProperty) ||
                    this.excludedProperties.includes(property.originalProperty)) {
                    continue;
                }

                if (this.formType === FormTypes.SMART) {
                    const smartField = new SmartField({
                        mandatory: this.mandatoryProperties.includes(property.originalProperty),
                        value: `{${property.originalProperty}}`
                    });

                    const groupElement = new GroupElement({
                        elements: [smartField]
                    });

                    if (!this.useMetadataLabels) {
                        groupElement.setLabel(property.generatedLabel);
                    }

                    this.smartGroup.addGroupElement(groupElement);
                } else {
                    this.simpleFormElements.push(new Label({ text: property.generatedLabel }));

                    switch (property.propertyType) {
                        case "Edm.Boolean":
                            this.addCheckBox(property.originalProperty)
                            break;
                        case "Edm.DateTime":
                            this.addDatePicker(property.originalProperty)
                            break;
                        case "Edm.DateTimeOffset":
                            this.addDateTimePicker(property.originalProperty)
                            break;
                        default:
                            this.addInput(property.originalProperty);
                            break;
                    }
                }
            }
        }
    }

    private async addProperties() {
        const entityTypeKeys = await this.getEntityTypeKeys();
        const entityTypeProperties = await this.getEntityTypeProperties();

        for (const property of entityTypeProperties) {
            if (entityTypeKeys.some(key => key.originalProperty === property.originalProperty) || this.excludedProperties.includes(property.originalProperty)) {
                continue;
            }

            if (this.formType === FormTypes.SMART) {
                const smartField = new SmartField({
                    mandatory: this.mandatoryProperties.includes(property.originalProperty),
                    value: `{${property.originalProperty}}`
                });

                const groupElement = new GroupElement({
                    elements: [smartField]
                });

                if (!this.useMetadataLabels) {
                    groupElement.setLabel(property.generatedLabel);
                }

                this.smartGroup.addGroupElement(groupElement);
            } else {
                this.simpleFormElements.push(new Label({ text: property.generatedLabel }));

                switch (property.propertyType) {
                    case "Edm.Boolean":
                        this.addCheckBox(property.originalProperty)
                        break;
                    case "Edm.DateTime":
                        this.addDatePicker(property.originalProperty)
                        break;
                    case "Edm.DateTimeOffset":
                        this.addDateTimePicker(property.originalProperty)
                        break;
                    default:
                        this.addInput(property.originalProperty);
                        break;
                }
            }
        }
    }

    private addCheckBox(property: string) {
        this.simpleFormElements.push(new CheckBox({
            selected: `{${property}}`
        }));
    }

    private addDatePicker(property: string) {
        const datePicker = new DatePicker({
            value: `{constraints : {displayFormat : 'Date'}, path : '${property}', type : 'sap.ui.model.odata.type.DateTime'}`
        });

        if (this.mandatoryProperties.includes(property)) {
            datePicker.setRequired(true);
        }

        this.simpleFormElements.push(datePicker);
    }

    private addDateTimePicker(property: string) {
        const dateTimePicker = new DateTimePicker({
            value: `path : '${property}', type : 'sap.ui.model.odata.type.DateTimeOffset'`
        });

        if (this.mandatoryProperties.includes(property)) {
            dateTimePicker.setRequired(true);
        }

        this.simpleFormElements.push(dateTimePicker);
    }

    private addInput(property: string) {
        const input = new Input({
            value: `{${property}}`
        });

        if (this.mandatoryProperties.includes(property)) {
            input.setRequired(true);
        }

        this.simpleFormElements.push(input);
    }
}