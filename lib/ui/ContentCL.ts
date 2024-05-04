import EntityCL from "ui5/antares/entity/v2/EntityCL";
import SmartForm from "sap/ui/comp/smartform/SmartForm";
import Group from "sap/ui/comp/smartform/Group";
import SmartField from "sap/ui/comp/smartfield/SmartField";
import GroupElement from "sap/ui/comp/smartform/GroupElement";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import UI5Element from "sap/ui/core/Element";
import Label from "sap/m/Label";
import CheckBox from "sap/m/CheckBox";
import DatePicker from "sap/m/DatePicker";
import DateTimePicker from "sap/m/DateTimePicker";
import Input from "sap/m/Input";
import { FormTypes } from "ui5/antares/types/entry/enums";
import EntryCL from "ui5/antares/entry/v2/EntryCL";
import { PropertyType } from "ui5/antares/types/entity/type";
import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import CustomControlCL from "ui5/antares/ui/CustomControlCL";

/**
 * @namespace ui5.antares.ui
 */
export default class ContentCL<T extends EntryCL> extends EntityCL {
    private entry: T;
    private smartGroup: Group;
    private simpleFormElements: UI5Element[];

    constructor(controller: Controller | UIComponent, entry: T, modelName?: string) {
        super(controller, entry.getEntityName(), entry.getResourceBundlePrefix(), entry.getNamingStrategy(), modelName);
        this.entry = entry;
    }

    public async getSmartForm(): Promise<SmartForm> {
        const smartFormGroup = await this.getSmartFormGroup();

        const smartForm = new SmartForm({
            editTogglable: false,
            editable: true,
            title: this.entry.getFormTitle(),
            groups: [smartFormGroup]
        });

        return smartForm;
    }

    public async getSimpleForm(): Promise<SimpleForm> {
        const simpleFormContent = await this.getSimpleFormContent();

        const simpleForm = new SimpleForm({
            editable: true,
            title: this.entry.getFormTitle(),
            content: simpleFormContent
        });

        return simpleForm;
    }

    private async getSmartFormGroup(): Promise<Group> {
        this.smartGroup = new Group();
        await this.addKeyProperties();
        await this.addProperties();
        return this.smartGroup;
    }

    private async getSimpleFormContent(): Promise<UI5Element[]> {
        this.simpleFormElements = [];
        await this.addKeyProperties();
        await this.addProperties();
        return this.simpleFormElements;
    }

    private async addKeyProperties() {
        const entityTypeKeys = await this.getEntityTypeKeys();
        this.entry.setMandatoryProperties([...this.entry.getMandatoryProperties(), ...entityTypeKeys.map(key => key.propertyName)]);

        entityTypeKeys.forEach((key) => {
            if (this.entry.getFormType() === FormTypes.SMART) {
                const customControl = this.entry.getCustomControl(key.propertyName);

                if (customControl) {
                    this.addSmartCustomControl(customControl, key.propertyName);
                } else {
                    this.addSmartField(key.propertyName);
                }
            } else {
                const customControl = this.entry.getCustomControl(key.propertyName);

                if (customControl) {
                    this.addSimpleCustomControl(customControl, key.propertyName);
                } else {
                    this.addSimpleFormField(key.propertyName, key.propertyType);
                }
            }
        });
    }

    private async addProperties() {
        const entityTypeKeys = await this.getEntityTypeKeys();
        const entityTypeProperties = await this.getEntityTypeProperties();

        for (const property of this.entry.getPropertyOrder()) {
            if (entityTypeKeys.some(key => key.propertyName === property) || !entityTypeProperties.some(prop => prop.propertyName === property)) {
                continue;
            }

            if (this.entry.getFormType() === FormTypes.SMART) {
                const customControl = this.entry.getCustomControl(property);

                if (customControl) {
                    this.addSmartCustomControl(customControl, property);
                } else {
                    this.addSmartField(property);
                }
            } else {
                const customControl = this.entry.getCustomControl(property);

                if (customControl) {
                    this.addSimpleCustomControl(customControl, property);
                } else {
                    let propertyType: PropertyType = entityTypeProperties.find(prop => prop.propertyName === property)?.propertyType || "Edm.String";
                    this.addSimpleFormField(property, propertyType);
                }
            }
        }

        if (this.entry.getUseAllProperties()) {
            for (const property of entityTypeProperties) {
                if (entityTypeKeys.some(key => key.propertyName === property.propertyName) ||
                    this.entry.getPropertyOrder().includes(property.propertyName) ||
                    this.entry.getExcludedProperties().includes(property.propertyName)) {
                    continue;
                }

                if (this.entry.getFormType() === FormTypes.SMART) {
                    const customControl = this.entry.getCustomControl(property.propertyName);

                    if (customControl) {
                        this.addSmartCustomControl(customControl, property.propertyName);
                    } else {
                        this.addSmartField(property.propertyName);
                    }
                } else {
                    const customControl = this.entry.getCustomControl(property.propertyName);

                    if (customControl) {
                        this.addSimpleCustomControl(customControl, property.propertyName);
                    } else {
                        this.addSimpleFormField(property.propertyName, property.propertyType);
                    }
                }
            }
        }
    }

    private addSmartField(property: string) {
        const smartField = new SmartField({
            mandatory: this.entry.getMandatoryProperties().includes(property),
            value: `{${property}}`
        });

        const groupElement = new GroupElement({
            elements: [smartField]
        });

        if (!this.entry.getUseMetadataLabels()) {
            groupElement.setLabel(this.getEntityTypePropLabel(property));
        }

        this.smartGroup.addGroupElement(groupElement);
    }

    private addSimpleFormField(property: string, propertyType: PropertyType) {
        this.simpleFormElements.push(new Label({ text: this.getEntityTypePropLabel(property) }));

        switch (propertyType) {
            case "Edm.Boolean":
                this.addCheckBox(property)
                break;
            case "Edm.DateTime":
                this.addDatePicker(property)
                break;
            case "Edm.DateTimeOffset":
                this.addDateTimePicker(property)
                break;
            default:
                this.addInput(property);
                break;
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

        if (this.entry.getMandatoryProperties().includes(property)) {
            datePicker.setRequired(true);
        }

        this.simpleFormElements.push(datePicker);
    }

    private addDateTimePicker(property: string) {
        const dateTimePicker = new DateTimePicker({
            value: `path : '${property}', type : 'sap.ui.model.odata.type.DateTimeOffset'`
        });

        if (this.entry.getMandatoryProperties().includes(property)) {
            dateTimePicker.setRequired(true);
        }

        this.simpleFormElements.push(dateTimePicker);
    }

    private addInput(property: string) {
        const input = new Input({
            value: `{${property}}`
        });

        if (this.entry.getMandatoryProperties().includes(property)) {
            input.setRequired(true);
        }

        this.simpleFormElements.push(input);
    }

    private addSmartCustomControl(control: CustomControlCL, property: string) {
        const groupElement = new GroupElement({
            elements: [control.getControl()]
        });

        if (!this.entry.getUseMetadataLabels()) {
            groupElement.setLabel(this.getEntityTypePropLabel(property));
        }

        this.smartGroup.addGroupElement(groupElement);
    }

    private addSimpleCustomControl(control: CustomControlCL, property: string) {
        this.simpleFormElements.push(new Label({ text: this.getEntityTypePropLabel(property) }));
        this.simpleFormElements.push(control.getControl());
    }
}