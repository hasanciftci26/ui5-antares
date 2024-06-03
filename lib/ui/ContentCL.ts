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
import { FormTypes, GuidStrategies } from "ui5/antares/types/entry/enums";
import EntryCL from "ui5/antares/entry/v2/EntryCL";
import { IEntityType } from "ui5/antares/types/entity/type";
import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import CustomControlCL from "ui5/antares/ui/CustomControlCL";
import CustomData from "sap/ui/core/CustomData";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";
import { IFormGroups } from "ui5/antares/types/entry/common";
import Title from "sap/ui/core/Title";
import ColumnLayout from "sap/ui/comp/smartform/ColumnLayout";

/**
 * @namespace ui5.antares.ui
 */
export default class ContentCL<EntryT extends EntryCL<EntityT>, EntityT extends object = object> extends EntityCL {
    private entry: EntryT;
    private smartGroup: Group;
    private method: ODataMethods;
    private simpleFormElements: UI5Element[];
    private readonly numberTypes: string[] = [
        "Edm.Decimal", "Edm.Double", "Edm.Int16", "Edm.Int32", "Edm.Int64"
    ];

    constructor(controller: Controller | UIComponent, entry: EntryT, method: ODataMethods, modelName?: string) {
        super(controller, entry.getEntityName(), entry.getResourceBundlePrefix(), entry.getNamingStrategy(), modelName);
        this.entry = entry;
        this.method = method;
    }

    public async getSmartForm(): Promise<SmartForm> {
        const smartFormGroups = await this.getSmartFormGroups();

        const smartForm = new SmartForm({
            editTogglable: false,
            editable: true,
            title: this.entry.getFormTitle(),
            groups: smartFormGroups
        });

        return smartForm;
    }

    public async getSimpleForm(): Promise<SimpleForm> {
        const simpleFormContent = await this.getSimpleFormContent();

        const simpleForm = new SimpleForm({
            editable: true,
            layout: "ResponsiveGridLayout",
            columnsXL: 3,
            columnsL: 3,
            columnsM: 2,
            title: this.entry.getFormTitle(),
            content: simpleFormContent
        });

        return simpleForm;
    }

    private async getSmartFormGroups(): Promise<Group[]> {
        const formGroups = this.entry.getFormGroups();
        const smartGroups: Group[] = [];

        this.smartGroup = new Group({
            title: this.entry.getDefaultGroupTitle()
        });

        smartGroups.push(this.smartGroup);
        // Key properties are always in the default group
        await this.addKeyProperties();

        if (formGroups.length) {
            if (this.entry.getIncludeAllProperties()) {
                await this.addDefaultGroupElements(formGroups);
            }

            for (const group of formGroups) {
                this.smartGroup = new Group({
                    title: group.title === "UI5AntaresDefaultGroup" ? this.entry.getUnknownGroupTitle() : group.title
                });

                smartGroups.push(this.smartGroup);
                await this.addProperties(group);
            }
        } else {
            await this.addProperties();
        }

        return smartGroups;
    }

    private async getSimpleFormContent(): Promise<UI5Element[]> {
        const formGroups = this.entry.getFormGroups();
        this.simpleFormElements = [];

        if (this.entry.getDefaultGroupTitle()) {
            this.simpleFormElements.push(new Title({ text: this.entry.getDefaultGroupTitle() }));
        }

        // Key properties are always in the default group
        await this.addKeyProperties();

        if (formGroups.length) {
            if (this.entry.getIncludeAllProperties()) {
                await this.addDefaultGroupElements(formGroups);
            }

            for (const group of formGroups) {
                this.simpleFormElements.push(new Title({ text: group.title === "UI5AntaresDefaultGroup" ? this.entry.getUnknownGroupTitle() : group.title }));
                await this.addProperties(group);
            }
        } else {
            await this.addProperties();
        }

        return this.simpleFormElements;
    }

    private async addDefaultGroupElements(groups: IFormGroups[]) {
        const groupProperties = groups.reduce((props, group) => props = [...props, ...group.properties], [] as string[]);
        const entityTypeKeys = await this.getEntityTypeKeys();
        const entityTypeProperties = await this.getEntityTypeProperties();
        const defaultProperties: string[] = [];

        for (const property of entityTypeProperties) {
            if (entityTypeKeys.some(key => key.propertyName === property.propertyName) ||
                this.entry.getExcludedProperties().includes(property.propertyName) ||
                groupProperties.includes(property.propertyName)) {
                continue;
            }

            defaultProperties.push(property.propertyName);
        }

        if (defaultProperties.length) {
            groups.push({
                title: "UI5AntaresDefaultGroup",
                properties: defaultProperties
            });
        }
    }

    private async addKeyProperties() {
        const entityTypeKeys = await this.getEntityTypeKeys();
        this.entry.setMandatoryProperties([...this.entry.getMandatoryProperties(), ...entityTypeKeys.map(key => key.propertyName)]);

        entityTypeKeys.forEach((key) => {
            if (this.entry.getFormType() === FormTypes.SMART) {
                const customControl = this.entry.getCustomControl(key.propertyName);

                if (customControl) {
                    this.addSmartCustomControl(customControl, key);
                } else {
                    this.addSmartField(key, true);
                }
            } else {
                const customControl = this.entry.getCustomControl(key.propertyName);

                if (customControl) {
                    this.addSimpleCustomControl(customControl, key);
                } else {
                    this.addSimpleFormField(key, true);
                }
            }
        });
    }

    private async addProperties(group?: IFormGroups) {
        const entityTypeKeys = await this.getEntityTypeKeys();
        const entityTypeProperties = await this.getEntityTypeProperties();

        for (const property of this.entry.getPropertyOrder()) {
            if (entityTypeKeys.some(key => key.propertyName === property) || !entityTypeProperties.some(prop => prop.propertyName === property)) {
                continue;
            }

            if (group) {
                if (!group.properties.includes(property)) {
                    continue;
                }
            }

            let entityTypeProperty = entityTypeProperties.find(prop => prop.propertyName === property) as IEntityType;

            if (this.entry.getFormType() === FormTypes.SMART) {
                const customControl = this.entry.getCustomControl(property);

                if (customControl) {
                    this.addSmartCustomControl(customControl, entityTypeProperty);
                } else {
                    this.addSmartField(entityTypeProperty);
                }
            } else {
                const customControl = this.entry.getCustomControl(property);

                if (customControl) {
                    this.addSimpleCustomControl(customControl, entityTypeProperty);
                } else {
                    this.addSimpleFormField(entityTypeProperty);
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

                if (group) {
                    if (!group.properties.includes(property.propertyName)) {
                        continue;
                    }
                }

                if (this.entry.getFormType() === FormTypes.SMART) {
                    const customControl = this.entry.getCustomControl(property.propertyName);

                    if (customControl) {
                        this.addSmartCustomControl(customControl, property);
                    } else {
                        this.addSmartField(property);
                    }
                } else {
                    const customControl = this.entry.getCustomControl(property.propertyName);

                    if (customControl) {
                        this.addSimpleCustomControl(customControl, property);
                    } else {
                        this.addSimpleFormField(property);
                    }
                }
            }
        }
    }

    private addSmartField(property: IEntityType, keyField: boolean = false) {
        const smartField = new SmartField({
            mandatory: this.entry.getMandatoryProperties().includes(property.propertyName),
            value: `{${property.propertyName}}`
        });

        if (property.nullable === "false") {
            smartField.setMandatory(true);
        }

        smartField.addCustomData(new CustomData({ key: "UI5AntaresStandardControlName", value: property.propertyName }));
        smartField.addCustomData(new CustomData({ key: "UI5AntaresStandardControlType", value: property.propertyType }));

        if ((this.method === ODataMethods.UPDATE && keyField) || this.method === ODataMethods.DELETE || this.method === ODataMethods.READ) {
            smartField.setEditable(false);
        }

        if (this.method === ODataMethods.CREATE) {
            switch (this.entry.getGenerateRandomGuid()) {
                case GuidStrategies.ALL:
                    if (property.propertyType === "Edm.Guid") {
                        smartField.setEditable(false);
                    }
                    break;
                case GuidStrategies.ONLY_KEY:
                    if (property.propertyType === "Edm.Guid" && keyField) {
                        smartField.setEditable(false);
                    }
                    break;
                case GuidStrategies.ONLY_NON_KEY:
                    if (property.propertyType === "Edm.Guid" && !keyField) {
                        smartField.setEditable(false);
                    }
                    break;
            }
        }

        switch (this.entry.getDisplayGuidProperties()) {
            case GuidStrategies.NONE:
                if (property.propertyType === "Edm.Guid" && !this.entry.getFormGroups().length) {
                    smartField.setVisible(false);
                }
                break;
            case GuidStrategies.ONLY_KEY:
                if (property.propertyType === "Edm.Guid" && !keyField && !this.entry.getFormGroups().length) {
                    smartField.setVisible(false);
                }
                break;
            case GuidStrategies.ONLY_NON_KEY:
                if (property.propertyType === "Edm.Guid" && keyField && !this.entry.getFormGroups().length) {
                    smartField.setVisible(false);
                }
                break;
        }

        if (this.entry.getReadonlyProperties().includes(property.propertyName)) {
            smartField.setEditable(false);
        }

        const groupElement = new GroupElement({
            elements: [smartField]
        });

        if (!this.entry.getUseMetadataLabels()) {
            groupElement.setLabel(this.getEntityTypePropLabel(property.propertyName));
        }

        this.smartGroup.addGroupElement(groupElement);
    }

    private addSimpleFormField(property: IEntityType, keyField: boolean = false) {
        if (this.entry.getUseMetadataLabels()) {
            this.simpleFormElements.push(new Label({ text: property.annotationLabel || this.getEntityTypePropLabel(property.propertyName) }));
        } else {
            this.simpleFormElements.push(new Label({ text: this.getEntityTypePropLabel(property.propertyName) }));
        }

        switch (property.propertyType) {
            case "Edm.Boolean":
                this.addCheckBox(property, keyField);
                break;
            case "Edm.DateTime":
                if (property.displayFormat === "Date") {
                    this.addDatePicker(property, keyField);
                } else {
                    this.addDateTimePicker(property, keyField);
                }
                break;
            case "Edm.DateTimeOffset":
                this.addDateTimePicker(property, keyField);
                break;
            default:
                this.addInput(property, keyField);
                break;
        }
    }

    private addCheckBox(property: IEntityType, keyField: boolean) {
        const selectedPath = this.getModelName() ? `${this.getModelName()}>${property.propertyName}` : property.propertyName;
        const checkbox = new CheckBox({
            selected: {
                path: selectedPath
            }
        });

        if ((this.method === ODataMethods.UPDATE && keyField) || this.method === ODataMethods.DELETE || this.method === ODataMethods.READ) {
            checkbox.setEditable(false);
        }

        if (property.nullable === "false") {
            checkbox.setRequired(true);
        }

        if (this.entry.getReadonlyProperties().includes(property.propertyName)) {
            checkbox.setEditable(false);
        }

        this.simpleFormElements.push(checkbox);
    }

    private addDatePicker(property: IEntityType, keyField: boolean) {
        const valuePath = this.getModelName() ? `${this.getModelName()}>${property.propertyName}` : property.propertyName;
        const dateValue: PropertyBindingInfo = {
            path: valuePath,
            type: "sap.ui.model.odata.type.DateTime",
            constraints: {
                displayFormat: "Date"
            }
        };

        const datePicker = new DatePicker({
            dateValue: dateValue
        });

        datePicker.addCustomData(new CustomData({ key: "UI5AntaresStandardControlName", value: property.propertyName }));
        datePicker.addCustomData(new CustomData({ key: "UI5AntaresStandardControlType", value: property.propertyType }));

        if ((this.method === ODataMethods.UPDATE && keyField) || this.method === ODataMethods.DELETE || this.method === ODataMethods.READ) {
            datePicker.setEditable(false);
        }

        if (this.entry.getMandatoryProperties().includes(property.propertyName) || property.nullable === "false") {
            datePicker.setRequired(true);
        }

        if (this.entry.getReadonlyProperties().includes(property.propertyName)) {
            datePicker.setEditable(false);
        }

        this.simpleFormElements.push(datePicker);
    }

    private addDateTimePicker(property: IEntityType, keyField: boolean) {
        const valuePath = this.getModelName() ? `${this.getModelName()}>${property.propertyName}` : property.propertyName;

        const dateTimePicker = new DateTimePicker({
            dateValue: {
                path: valuePath,
                type: "sap.ui.model.odata.type.DateTimeOffset"
            }
        });

        dateTimePicker.addCustomData(new CustomData({ key: "UI5AntaresStandardControlName", value: property.propertyName }));
        dateTimePicker.addCustomData(new CustomData({ key: "UI5AntaresStandardControlType", value: property.propertyType }));

        if ((this.method === ODataMethods.UPDATE && keyField) || this.method === ODataMethods.DELETE || this.method === ODataMethods.READ) {
            dateTimePicker.setEditable(false);
        }

        if (this.entry.getMandatoryProperties().includes(property.propertyName) || property.nullable === "false") {
            dateTimePicker.setRequired(true);
        }

        if (this.entry.getReadonlyProperties().includes(property.propertyName)) {
            dateTimePicker.setEditable(false);
        }

        this.simpleFormElements.push(dateTimePicker);
    }

    private addInput(property: IEntityType, keyField: boolean) {
        const valueHelp = this.entry.getValueHelp(property.propertyName);
        const valuePath = this.getModelName() ? `${this.getModelName()}>${property.propertyName}` : property.propertyName;
        const inputValue: PropertyBindingInfo = {
            path: valuePath
        };

        if (this.numberTypes.includes(property.propertyType)) {
            inputValue.type = `sap.ui.model.odata.type.${property.propertyType.slice(4)}`;

            switch (property.propertyType) {
                case "Edm.Decimal":
                    if (property.precision && property.scale) {
                        inputValue.constraints = {
                            precision: property.precision,
                            scale: property.scale
                        };
                    }
                    break;
                default:
                    const groupingEnabled = property.propertyType === "Edm.Double";
                    inputValue.formatOptions = {
                        groupingEnabled: groupingEnabled
                    };
                    break;
            }
        }

        const input = new Input({
            value: inputValue
        });

        input.addCustomData(new CustomData({ key: "UI5AntaresStandardControlName", value: property.propertyName }));
        input.addCustomData(new CustomData({ key: "UI5AntaresStandardControlType", value: property.propertyType }));

        if ((this.method === ODataMethods.UPDATE && keyField) || this.method === ODataMethods.DELETE || this.method === ODataMethods.READ) {
            input.setEditable(false);
        }

        if (this.method === ODataMethods.CREATE) {
            switch (this.entry.getGenerateRandomGuid()) {
                case GuidStrategies.ALL:
                    if (property.propertyType === "Edm.Guid") {
                        input.setEditable(false);
                    }
                    break;
                case GuidStrategies.ONLY_KEY:
                    if (property.propertyType === "Edm.Guid" && keyField) {
                        input.setEditable(false);
                    }
                    break;
                case GuidStrategies.ONLY_NON_KEY:
                    if (property.propertyType === "Edm.Guid" && !keyField) {
                        input.setEditable(false);
                    }
                    break;
            }
        }

        switch (this.entry.getDisplayGuidProperties()) {
            case GuidStrategies.NONE:
                if (property.propertyType === "Edm.Guid" && !this.entry.getFormGroups().length) {
                    input.setVisible(false);
                }
                break;
            case GuidStrategies.ONLY_KEY:
                if (property.propertyType === "Edm.Guid" && !keyField && !this.entry.getFormGroups().length) {
                    input.setVisible(false);
                }
                break;
            case GuidStrategies.ONLY_NON_KEY:
                if (property.propertyType === "Edm.Guid" && keyField && !this.entry.getFormGroups().length) {
                    input.setVisible(false);
                }
                break;
        }

        if (this.entry.getMandatoryProperties().includes(property.propertyName) || property.nullable === "false") {
            input.setRequired(true);
        }

        if (this.entry.getReadonlyProperties().includes(property.propertyName)) {
            input.setEditable(false);
        }

        if (valueHelp) {
            input.setShowValueHelp(true);
            input.attachValueHelpRequest({}, valueHelp.openValueHelpDialog, valueHelp);
        }

        this.simpleFormElements.push(input);
    }

    private addSmartCustomControl(control: CustomControlCL, property: IEntityType) {
        const groupElement = new GroupElement({
            elements: [control.getControl()]
        });

        if (!this.entry.getUseMetadataLabels()) {
            groupElement.setLabel(this.getEntityTypePropLabel(property.propertyName));
        }

        this.smartGroup.addGroupElement(groupElement);
    }

    private addSimpleCustomControl(control: CustomControlCL, property: IEntityType) {
        if (this.entry.getUseMetadataLabels()) {
            this.simpleFormElements.push(new Label({ text: property.annotationLabel || this.getEntityTypePropLabel(property.propertyName) }));
        } else {
            this.simpleFormElements.push(new Label({ text: this.getEntityTypePropLabel(property.propertyName) }));
        }
        this.simpleFormElements.push(control.getControl());
    }

    public async addSmartSections() {
        const objectPageInstance = this.entry.getObjectPageInstance();
        const formGroups = this.entry.getFormGroups();
        const smartFormForKeys = this.createSmartForm();

        await this.addKeyProperties();
        objectPageInstance.addSection(smartFormForKeys, this.entry.getDefaultGroupTitle() || this.entry.getFormTitle());

        if (formGroups.length) {
            if (this.entry.getIncludeAllProperties()) {
                await this.addDefaultGroupElements(formGroups);
            }

            for (const group of formGroups) {
                const smartForm = this.createSmartForm();
                await this.addProperties(group);
                objectPageInstance.addSection(smartForm, group.title === "UI5AntaresDefaultGroup" ? this.entry.getUnknownGroupTitle() : group.title);
            }
        } else {
            await this.addProperties();
        }
    }

    public async addSimpleSections() {
        const objectPageInstance = this.entry.getObjectPageInstance();
        const formGroups = this.entry.getFormGroups();
        const simpleFormForKeys = this.createSimpleForm();

        await this.addKeyProperties();

        this.simpleFormElements.forEach((element) => {
            simpleFormForKeys.addContent(element);
        });

        objectPageInstance.addSection(simpleFormForKeys, this.entry.getDefaultGroupTitle() || this.entry.getFormTitle());

        if (formGroups.length) {
            if (this.entry.getIncludeAllProperties()) {
                await this.addDefaultGroupElements(formGroups);
            }

            for (const group of formGroups) {
                const simpleForm = this.createSimpleForm();
                await this.addProperties(group);

                this.simpleFormElements.forEach((element) => {
                    simpleForm.addContent(element);
                });

                objectPageInstance.addSection(simpleForm, group.title === "UI5AntaresDefaultGroup" ? this.entry.getUnknownGroupTitle() : group.title);
            }
        } else {
            await this.addProperties();
        }
    }

    private createSmartForm(): SmartForm {
        this.smartGroup = new Group();

        const smartForm = new SmartForm({
            editTogglable: false,
            editable: true,
            groups: this.smartGroup,
            layout: new ColumnLayout({
                columnsXL: 1,
                columnsL: 1,
                columnsM: 1,
                emptyCellsLarge: 5
            })
        });

        return smartForm;
    }

    private createSimpleForm(): SimpleForm {
        this.simpleFormElements = [];

        const simpleForm = new SimpleForm({
            editable: true,
            layout: "ColumnLayout",
            emptySpanXL: 5,
            emptySpanL: 5,
            emptySpanM: 5,
            emptySpanS: 5,
            columnsXL: 1,
            columnsL: 1,
            columnsM: 1
        });

        return simpleForm;
    }
}