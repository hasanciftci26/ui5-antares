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
import CustomData from "sap/ui/core/CustomData";

/**
 * @namespace ui5.antares.ui
 */
export default class ContentCL<EntryT extends EntryCL<EntityT>, EntityT extends object = object> extends EntityCL {
    private entry: EntryT;
    private smartGroup: Group;
    private simpleFormElements: UI5Element[];
    private numberTypes: string[] = [
        "Edm.Decimal", "Edm.Double", "Edm.Int16", "Edm.Int32", "Edm.Int64"
    ];

    constructor(controller: Controller | UIComponent, entry: EntryT, modelName?: string) {
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
                    this.addSmartField(key.propertyName, key.propertyType);
                }
            } else {
                const customControl = this.entry.getCustomControl(key.propertyName);

                if (customControl) {
                    this.addSimpleCustomControl(customControl, key.propertyName);
                } else {
                    this.addSimpleFormField(key.propertyName, key.propertyType, key.precision, key.scale);
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
                    let propertyType: PropertyType = entityTypeProperties.find(prop => prop.propertyName === property)?.propertyType || "Edm.String";
                    this.addSmartField(property, propertyType);
                }
            } else {
                const customControl = this.entry.getCustomControl(property);

                if (customControl) {
                    this.addSimpleCustomControl(customControl, property);
                } else {
                    let entityTypeProperty = entityTypeProperties.find(prop => prop.propertyName === property);
                    this.addSimpleFormField(property, entityTypeProperty?.propertyType || "Edm.String", entityTypeProperty?.precision, entityTypeProperty?.scale);
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
                        this.addSmartField(property.propertyName, property.propertyType);
                    }
                } else {
                    const customControl = this.entry.getCustomControl(property.propertyName);

                    if (customControl) {
                        this.addSimpleCustomControl(customControl, property.propertyName);
                    } else {
                        this.addSimpleFormField(property.propertyName, property.propertyType, property.precision, property.scale);
                    }
                }
            }
        }
    }

    private addSmartField(property: string, propertyType: PropertyType) {
        const smartField = new SmartField({
            mandatory: this.entry.getMandatoryProperties().includes(property),
            value: `{${property}}`
        });

        smartField.addCustomData(new CustomData({ key: "UI5AntaresStandardControlName", value: property }));
        smartField.addCustomData(new CustomData({ key: "UI5AntaresStandardControlType", value: propertyType }));

        const groupElement = new GroupElement({
            elements: [smartField]
        });

        if (!this.entry.getUseMetadataLabels()) {
            groupElement.setLabel(this.getEntityTypePropLabel(property));
        }

        this.smartGroup.addGroupElement(groupElement);
    }

    private addSimpleFormField(property: string, propertyType: PropertyType, precision?: string, scale?: string) {
        this.simpleFormElements.push(new Label({ text: this.getEntityTypePropLabel(property) }));

        switch (propertyType) {
            case "Edm.Boolean":
                this.addCheckBox(property);
                break;
            case "Edm.DateTime":
                this.addDatePicker(property, propertyType);
                break;
            case "Edm.DateTimeOffset":
                this.addDateTimePicker(property, propertyType);
                break;
            default:
                this.addInput(property, propertyType, precision, scale);
                break;
        }
    }

    private addCheckBox(property: string) {
        const selected = this.getModelName() ? `${this.getModelName()}>${property}` : property;

        this.simpleFormElements.push(new CheckBox({
            selected: `{${selected}}`
        }));
    }

    private addDatePicker(property: string, propertyType: PropertyType) {
        const value = this.getModelName() ? `${this.getModelName()}>${property}` : property;

        const datePicker = new DatePicker({
            value: `{constraints : {displayFormat : 'Date'}, path : '${value}', type : 'sap.ui.model.odata.type.DateTime'}`
        });

        datePicker.addCustomData(new CustomData({ key: "UI5AntaresStandardControlName", value: property }));
        datePicker.addCustomData(new CustomData({ key: "UI5AntaresStandardControlType", value: propertyType }));

        if (this.entry.getMandatoryProperties().includes(property)) {
            datePicker.setRequired(true);
        }

        this.simpleFormElements.push(datePicker);
    }

    private addDateTimePicker(property: string, propertyType: PropertyType) {
        const value = this.getModelName() ? `${this.getModelName()}>${property}` : property;

        const dateTimePicker = new DateTimePicker({
            value: `path : '${value}', type : 'sap.ui.model.odata.type.DateTimeOffset'`
        });

        dateTimePicker.addCustomData(new CustomData({ key: "UI5AntaresStandardControlName", value: property }));
        dateTimePicker.addCustomData(new CustomData({ key: "UI5AntaresStandardControlType", value: propertyType }));

        if (this.entry.getMandatoryProperties().includes(property)) {
            dateTimePicker.setRequired(true);
        }

        this.simpleFormElements.push(dateTimePicker);
    }

    private addInput(property: string, propertyType: PropertyType, precision?: string, scale?: string) {
        const valueHelp = this.entry.getValueHelp(property);
        let value = this.getModelName() ? `${this.getModelName()}>${property}` : property;

        if (this.numberTypes.includes(propertyType)) {
            value = `path : '${value}', type : 'sap.ui.model.odata.type.${propertyType.slice(4)}'`;

            if (propertyType !== "Edm.Decimal" && propertyType !== "Edm.Double") {
                value = value + ", formatOptions : {groupingEnabled : false}";
            }

            if (propertyType === "Edm.Decimal" && precision && scale) {
                value = value + `, constraints : {precision : ${precision}, scale : ${scale}}`;
            }
        }

        const input = new Input({
            value: `{${value}}`
        });

        input.addCustomData(new CustomData({ key: "UI5AntaresStandardControlName", value: property }));
        input.addCustomData(new CustomData({ key: "UI5AntaresStandardControlType", value: propertyType }));

        if (this.entry.getMandatoryProperties().includes(property)) {
            input.setRequired(true);
        }

        if (valueHelp) {
            input.setShowValueHelp(true);
            input.attachValueHelpRequest({}, valueHelp.openValueHelpDialog, valueHelp);
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