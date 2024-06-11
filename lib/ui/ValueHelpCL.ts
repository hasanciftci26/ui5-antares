import Column from "sap/m/Column";
import Text from "sap/m/Text";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import ModelCL from "ui5/antares/base/v2/ModelCL";
import { IValueHelpSettings } from "ui5/antares/types/ui/valuehelp";
import { NamingStrategies } from "ui5/antares/types/entry/enums";
import EntityCL from "ui5/antares/entity/v2/EntityCL";
import ColumnListItem from "sap/m/ColumnListItem";
import Input, { Input$ValueHelpRequestEvent } from "sap/m/Input";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import ValueHelpDialog, { ValueHelpDialog$OkEvent } from "sap/ui/comp/valuehelpdialog/ValueHelpDialog";
import UITable from "sap/ui/table/Table";
import Table from "sap/m/Table";
import UIColumn from "sap/ui/table/Column";
import Label from "sap/m/Label";
import FilterBar, { FilterBar$SearchEvent } from "sap/ui/comp/filterbar/FilterBar";
import FilterGroupItem from "sap/ui/comp/filterbar/FilterGroupItem";
import Control from "sap/ui/core/Control";
import SearchField from "sap/m/SearchField";
import { IEntityType } from "ui5/antares/types/entity/type";
import DatePicker from "sap/m/DatePicker";
import DateTimePicker from "sap/m/DateTimePicker";
import CheckBox from "sap/m/CheckBox";
import JSONModel from "sap/ui/model/json/JSONModel";
import { PropertyBindingInfo } from "sap/ui/base/ManagedObject";

/**
 * @namespace ui5.antares.ui
 */
export default class ValueHelpCL extends ModelCL {
    private propertyName: string;
    private valueHelpEntity: string;
    private entityPath: string;
    private valueHelpProperty: string;
    private readonlyProperties: string[];
    private excludedFilterProperties: string[];
    private title: string;
    private searchPlaceholder: string;
    private namingStrategy: NamingStrategies;
    private resourceBundlePrefix: string;
    private useMetadataLabels: boolean;
    private sourceControl: Input;
    private valueHelpDialog: ValueHelpDialog;
    private searchField: SearchField;
    private filterBar: FilterBar;
    private entityTypeProperties: IEntityType[];
    private readonly numberTypes: string[] = [
        "Edm.Decimal", "Edm.Double", "Edm.Int16", "Edm.Int32", "Edm.Int64"
    ];
    private filterModelName: string;
    private filterModel: JSONModel;
    private caseSensitive: boolean;

    constructor(controller: Controller | UIComponent, settings: IValueHelpSettings, modelName?: string) {
        super(controller, modelName);
        this.propertyName = settings.propertyName;
        this.valueHelpEntity = settings.valueHelpEntity.startsWith("/") ? settings.valueHelpEntity.slice(1) : settings.valueHelpEntity;
        this.entityPath = `/${this.valueHelpEntity}`;
        this.valueHelpProperty = settings.valueHelpProperty;
        this.title = settings.title || `${this.valueHelpEntity}`;
        this.searchPlaceholder = settings.searchPlaceholder || `Search ${this.valueHelpEntity}`;
        this.readonlyProperties = settings.readonlyProperties || [];
        this.excludedFilterProperties = settings.excludedFilterProperties || [];
        this.namingStrategy = settings.namingStrategy || NamingStrategies.CAMEL_CASE;
        this.resourceBundlePrefix = settings.resourceBundlePrefix || "antaresVH";
        this.useMetadataLabels = settings.useMetadataLabels === undefined ? false : settings.useMetadataLabels;
        this.filterModelName = settings.filterModelName || "UI5AntaresVHFilterModel";
        this.caseSensitive = settings.filterCaseSensitive ?? false;
    }

    public openValueHelpDialog(event: Input$ValueHelpRequestEvent) {
        this.getValueHelpDialog().then((dialog) => {
            dialog.open();
        });
        this.sourceControl = event.getSource();
    }

    public getPropertyName(): string {
        return this.propertyName;
    }

    private async getValueHelpDialog(): Promise<ValueHelpDialog> {
        const entity = new EntityCL(this.getSourceController(), this.valueHelpEntity, this.resourceBundlePrefix, this.namingStrategy, this.getModelName());

        this.valueHelpDialog = new ValueHelpDialog({
            title: this.title,
            supportRanges: false,
            supportMultiselect: false,
            ok: this.onConfirm.bind(this),
            cancel: this.onCancel.bind(this),
            afterClose: this.onAfterClose.bind(this),
            key: this.valueHelpProperty
        });

        this.entityTypeProperties = await entity.getEntityTypeProperties();
        this.addFilterBar(this.valueHelpDialog);
        this.addSearchField(this.valueHelpDialog);
        const table = await this.valueHelpDialog.getTableAsync();

        if (table instanceof UITable) {
            this.bindUITable(table, this.valueHelpDialog);
        }

        if (table instanceof Table) {
            this.bindTable(table, this.valueHelpDialog);
        }

        this.valueHelpDialog.update();
        return this.valueHelpDialog;
    }

    private onConfirm(event: ValueHelpDialog$OkEvent) {
        const selectedTokens = event.getParameter("tokens");

        if (selectedTokens) {
            this.sourceControl.setValue(selectedTokens[0].getKey());
        }

        this.valueHelpDialog.close();
    }

    private onCancel() {
        this.valueHelpDialog.close();
    }

    private onAfterClose() {
        this.valueHelpDialog.destroy();
    }

    private addFilterBar(valueHelpDialog: ValueHelpDialog) {
        const filterGroupItems = this.getFilterGroupItems();

        this.filterBar = new FilterBar({
            advancedMode: true,
            isRunningInValueHelpDialog: true,
            search: this.onFilterBarSearch.bind(this),
            filterGroupItems: filterGroupItems
        });

        this.createFilterModel();
        this.filterBar.setModel(this.filterModel, this.filterModelName);
        valueHelpDialog.setFilterBar(this.filterBar);
    }

    private getFilterGroupItems(): FilterGroupItem[] {
        const entity = new EntityCL(this.getSourceController(), this.valueHelpEntity, this.resourceBundlePrefix, this.namingStrategy, this.getModelName());
        const keyProperty = this.entityTypeProperties.find(prop => prop.propertyName === this.valueHelpProperty);

        if (!keyProperty) {
            throw new Error(`Property ${this.valueHelpProperty} does not exist on entity ${this.valueHelpEntity}!`);
        }

        let keyPropertyLabel = entity.getEntityTypePropLabel(this.valueHelpProperty);

        if (this.useMetadataLabels) {
            keyPropertyLabel = keyProperty.annotationLabel || entity.getEntityTypePropLabel(this.valueHelpProperty);
        }

        const groupItems: FilterGroupItem[] = [new FilterGroupItem({
            groupName: "__$INTERNAL$",
            name: this.valueHelpProperty,
            label: keyPropertyLabel,
            visibleInFilterBar: true,
            control: this.getFilterControl(keyProperty)
        })];

        for (const property of this.readonlyProperties) {
            const readonlyProperty = this.entityTypeProperties.find(prop => prop.propertyName === property);

            if (!readonlyProperty) {
                throw new Error(`Property ${property} does not exist on entity ${this.valueHelpEntity}!`);
            }

            if (this.excludedFilterProperties.includes(property)) {
                continue;
            }

            let readonlyPropertyLabel = entity.getEntityTypePropLabel(property);

            if (this.useMetadataLabels) {
                readonlyPropertyLabel = readonlyProperty.annotationLabel || entity.getEntityTypePropLabel(property);
            }

            groupItems.push(new FilterGroupItem({
                groupName: "__$INTERNAL$",
                name: property,
                label: readonlyPropertyLabel,
                visibleInFilterBar: true,
                control: this.getFilterControl(readonlyProperty)
            }));
        }

        return groupItems;
    }

    private getFilterControl(property: IEntityType): Control {
        switch (property.propertyType) {
            case "Edm.DateTime":
                return this.getDatePickerControl(property);
            case "Edm.DateTimeOffset":
                return this.getDateTimePickerControl(property);
            case "Edm.Boolean":
                return this.getCheckBoxControl(property);
            default:
                return this.getInputControl(property);
        }
    }

    private getInputControl(property: IEntityType): Input {
        const inputValue: PropertyBindingInfo = {
            path: `${this.filterModelName}>/${property.propertyName}`
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
            name: property.propertyName,
            value: inputValue,
            submit: () => {
                this.filterBar.search();
            }
        });

        return input;
    }

    private getDatePickerControl(property: IEntityType): DatePicker {
        const datePicker = new DatePicker({
            name: property.propertyName,
            dateValue: {
                path: `${this.filterModelName}>/${property.propertyName}`,
                constraints: {
                    displayFormat: "Date"
                },
                type: "sap.ui.model.odata.type.DateTime"
            }
        });

        return datePicker;
    }

    private getDateTimePickerControl(property: IEntityType): DateTimePicker {
        const dateTimePicker = new DateTimePicker({
            name: property.propertyName,
            dateValue: {
                path: `${this.filterModelName}>/${property.propertyName}`,
                type: "sap.ui.model.odata.type.DateTimeOffset"
            }
        });

        return dateTimePicker;
    }

    private getCheckBoxControl(property: IEntityType): CheckBox {
        const checkbox = new CheckBox({
            name: property.propertyName,
            selected: {
                path: `${this.filterModelName}>/${property.propertyName}`
            }
        });

        return checkbox;
    }

    private bindUITable(table: UITable, valueHelpDialog: ValueHelpDialog) {
        const path = this.getModelName() ? `${this.getModelName()}>${this.entityPath}` : this.entityPath;

        table.setModel(this.getODataModel(), this.getModelName());
        table.bindAggregation("rows", {
            path: path,
            events: {
                dataReceived: () => {
                    valueHelpDialog.update();
                }
            }
        });

        this.addUITableColumns(table);
    }

    private addUITableColumns(table: UITable) {
        const entity = new EntityCL(this.getSourceController(), this.valueHelpEntity, this.resourceBundlePrefix, this.namingStrategy, this.getModelName());
        const keyProperty = this.entityTypeProperties.find(prop => prop.propertyName === this.valueHelpProperty);

        if (!keyProperty) {
            throw new Error(`Property ${this.valueHelpProperty} does not exist on entity ${this.valueHelpEntity}!`);
        }

        let keyPropertyLabel = entity.getEntityTypePropLabel(this.valueHelpProperty);

        if (this.useMetadataLabels) {
            keyPropertyLabel = keyProperty.annotationLabel || entity.getEntityTypePropLabel(this.valueHelpProperty);
        }

        const keyPropertyColumn = new UIColumn({
            label: new Label({ text: keyPropertyLabel }),
            template: new Text({ text: `{${this.valueHelpProperty}}` })
        });

        keyPropertyColumn.data({ fieldName: this.valueHelpProperty });
        table.addColumn(keyPropertyColumn);

        for (const property of this.readonlyProperties) {
            const readonlyProperty = this.entityTypeProperties.find(prop => prop.propertyName === property);

            if (!readonlyProperty) {
                throw new Error(`Property ${property} does not exist on entity ${this.valueHelpEntity}!`);
            }

            let readonlyPropertyLabel = entity.getEntityTypePropLabel(property);

            if (this.useMetadataLabels) {
                readonlyPropertyLabel = readonlyProperty.annotationLabel || entity.getEntityTypePropLabel(property);
            }

            const readonlyColumn = new UIColumn({
                label: new Label({ text: readonlyPropertyLabel }),
                template: new Text({ text: `{${property}}` })
            });

            readonlyColumn.data({ fieldName: property });
            table.addColumn(readonlyColumn);
        }
    }

    private bindTable(table: Table, valueHelpDialog: ValueHelpDialog) {
        const path = this.getModelName() ? `${this.getModelName()}>${this.entityPath}` : this.entityPath;

        table.setModel(this.getODataModel(), this.getModelName());
        table.bindAggregation("items", {
            path: path,
            template: this.getTableTemplate(),
            events: {
                dataReceived: () => {
                    valueHelpDialog.update();
                }
            }
        });

        this.addTableColumns(table);
    }

    private getTableTemplate(): ColumnListItem {
        const valueHelpPropText = this.getModelName() ? `${this.getModelName()}>${this.valueHelpProperty}` : this.valueHelpProperty;

        const columnListItem = new ColumnListItem({
            cells: new Text({ text: `{${valueHelpPropText}}` })
        });

        this.readonlyProperties.forEach((property) => {
            const readonlyPropText = this.getModelName() ? `${this.getModelName()}>${property}` : property;
            columnListItem.addCell(new Text({ text: `{${readonlyPropText}}` }));
        });

        return columnListItem;
    }

    private addTableColumns(table: Table) {
        const entity = new EntityCL(this.getSourceController(), this.valueHelpEntity, this.resourceBundlePrefix, this.namingStrategy, this.getModelName());
        const keyProperty = this.entityTypeProperties.find(prop => prop.propertyName === this.valueHelpProperty);

        if (!keyProperty) {
            throw new Error(`Property ${this.valueHelpProperty} does not exist on entity ${this.valueHelpEntity}!`);
        }

        let keyPropertyLabel = entity.getEntityTypePropLabel(this.valueHelpProperty);

        if (this.useMetadataLabels) {
            keyPropertyLabel = keyProperty.annotationLabel || entity.getEntityTypePropLabel(this.valueHelpProperty);
        }

        table.addColumn(new Column({ header: new Label({ text: keyPropertyLabel }) }));

        for (const property of this.readonlyProperties) {
            const readonlyProperty = this.entityTypeProperties.find(prop => prop.propertyName === property);

            if (!readonlyProperty) {
                throw new Error(`Property ${property} does not exist on entity ${this.valueHelpEntity}!`);
            }

            let readonlyPropertyLabel = entity.getEntityTypePropLabel(property);

            if (this.useMetadataLabels) {
                readonlyPropertyLabel = readonlyProperty.annotationLabel || entity.getEntityTypePropLabel(property);
            }

            table.addColumn(new Column({ header: new Label({ text: readonlyPropertyLabel }) }));
        }
    }

    private async onFilterBarSearch(event: FilterBar$SearchEvent) {
        const filterData = this.filterModel.getData() as object;
        const filterProperties = Object.keys(filterData).filter(key => key !== "VHSearchFieldValue");
        const filters: Filter[] = [];

        for (const property of filterProperties) {
            const filterValue = filterData[property as keyof typeof filterData];

            if (filterValue === undefined || filterValue === null || filterValue === "") {
                continue;
            }

            const entityTypeProperty = this.entityTypeProperties.find(prop => prop.propertyName === property);

            if (entityTypeProperty?.propertyType === "Edm.String") {
                filters.push(new Filter({
                    path: property,
                    operator: FilterOperator.Contains,
                    caseSensitive: this.caseSensitive,
                    value1: filterValue
                }));
            } else {
                filters.push(new Filter({
                    path: property,
                    operator: FilterOperator.EQ,
                    value1: filterValue
                }));
            }
        }

        const searchFieldFilters = this.getSearchFieldFilters();

        if (searchFieldFilters.length) {
            filters.push(new Filter({
                filters: this.getSearchFieldFilters(),
                and: false
            }));
        }

        const table = await this.valueHelpDialog.getTableAsync();

        if (table instanceof UITable) {
            const binding = table.getBinding("rows") as ListBinding;

            if (filters.length) {
                binding.filter(new Filter({ filters: filters, and: true }));
            } else {
                binding.filter();
            }
        }

        if (table instanceof Table) {
            const binding = table.getBinding("items") as ListBinding;

            if (filters.length) {
                binding.filter(new Filter({ filters: filters, and: true }));
            } else {
                binding.filter();
            }
        }
    }

    private addSearchField(valueHelpDialog: ValueHelpDialog) {
        this.searchField = new SearchField({
            placeholder: this.searchPlaceholder,
            value: {
                path: `${this.filterModelName}>/VHSearchFieldValue`
            }
        });
        const filterbar = valueHelpDialog.getFilterBar();

        filterbar.setBasicSearch(this.searchField);
        this.searchField.attachSearch(() => {
            filterbar.search();
        });
    }

    private getSearchFieldFilters(): Filter[] {
        const searchFieldValue: string | undefined = this.filterModel.getProperty("/VHSearchFieldValue");
        const filters: Filter[] = [];
        const keyProperty = this.entityTypeProperties.find(prop => prop.propertyName === this.valueHelpProperty);

        if (!searchFieldValue) {
            return filters;
        }

        if (keyProperty?.propertyType === "Edm.String") {
            filters.push(new Filter({
                path: this.valueHelpProperty,
                operator: FilterOperator.Contains,
                value1: searchFieldValue,
                caseSensitive: this.caseSensitive
            }));
        }

        for (const property of this.readonlyProperties) {
            if (this.excludedFilterProperties.includes(property)) {
                continue;
            }

            const readonlyProperty = this.entityTypeProperties.find(prop => prop.propertyName === property);

            if (readonlyProperty?.propertyType === "Edm.String") {
                filters.push(new Filter({
                    path: property,
                    operator: FilterOperator.Contains,
                    value1: searchFieldValue,
                    caseSensitive: this.caseSensitive
                }));
            }

        }

        return filters;
    }

    private createFilterModel() {
        const filterModel = new JSONModel();
        filterModel.setDefaultBindingMode("TwoWay");
        this.filterModel = filterModel;
    }
}