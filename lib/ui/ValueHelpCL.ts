import Column from "sap/m/Column";
import TableSelectDialog, { TableSelectDialog$ConfirmEvent, TableSelectDialog$SearchEvent } from "sap/m/TableSelectDialog";
import Text from "sap/m/Text";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import ModelCL from "ui5/antares/base/v2/ModelCL";
import { IValueHelpSettings } from "ui5/antares/types/ui/valuehelp";
import { NamingStrategies } from "ui5/antares/types/entry/enums";
import EntityCL from "ui5/antares/entity/v2/EntityCL";
import { AggregationBindingInfo } from "sap/ui/base/ManagedObject";
import ColumnListItem from "sap/m/ColumnListItem";
import Input, { Input$ValueHelpRequestEvent } from "sap/m/Input";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";

/**
 * @namespace ui5.antares.ui
 */
export default class ValueHelpCL extends ModelCL {
    private propertyName: string;
    private valueHelpEntity: string;
    private entityPath: string;
    private valueHelpProperty: string;
    private readonlyProperties: string[];
    private noDataText: string;
    private title: string;
    private searchPlaceholder: string;
    private namingStrategy: NamingStrategies;
    private resourceBundlePrefix: string;
    private sourceControl: Input;

    constructor(controller: Controller | UIComponent, settings: IValueHelpSettings, modelName?: string) {
        super(controller, modelName);
        this.propertyName = settings.propertyName;
        this.valueHelpEntity = settings.valueHelpEntity.startsWith("/") ? settings.valueHelpEntity.slice(1) : settings.valueHelpEntity;
        this.entityPath = `/${this.valueHelpEntity}`;
        this.valueHelpProperty = settings.valueHelpProperty;
        this.noDataText = settings.noDataText || `No ${this.valueHelpEntity} found`;
        this.title = settings.title || `Select ${this.valueHelpEntity}`;
        this.searchPlaceholder = settings.searchPlaceholder || `Search ${this.valueHelpEntity}`;
        this.readonlyProperties = settings.readonlyProperties || [];
        this.namingStrategy = settings.namingStrategy || NamingStrategies.CAMEL_CASE;
        this.resourceBundlePrefix = settings.resourceBundlePrefix || "antaresVH";
    }

    public getValueHelpDialog(): TableSelectDialog {
        const tableSelectDialog = new TableSelectDialog({
            title: this.title,
            noDataText: this.noDataText,
            searchPlaceholder: this.searchPlaceholder,
            showClearButton: true,
            confirm: this.onConfirm.bind(this),
            search: this.onSearch.bind(this),
            columns: this.getColumns(),
            items: this.getItems()
        });

        tableSelectDialog.setModel(this.getODataModel(), this.getModelName());
        return tableSelectDialog;
    }

    public openValueHelpDialog(event: Input$ValueHelpRequestEvent) {
        this.getValueHelpDialog().open(event.getSource().getValue()).fireSearch({ value: event.getSource().getValue() });
        this.sourceControl = event.getSource();
    }

    public getPropertyName(): string {
        return this.propertyName;
    }

    private getColumns(): Column[] {
        const entity = new EntityCL(this.getSourceController(), this.valueHelpEntity, this.resourceBundlePrefix, this.namingStrategy, this.getModelName());
        const columns: Column[] = [new Column({ header: new Text({ text: entity.getEntityTypePropLabel(this.valueHelpProperty) }) })];

        this.readonlyProperties.forEach((property) => {
            columns.push(new Column({ header: new Text({ text: entity.getEntityTypePropLabel(property) }) }));
        });

        return columns;
    }

    private getItems(): AggregationBindingInfo {
        const path = this.getModelName() ? `${this.getModelName()}>${this.entityPath}` : this.entityPath;

        const items: AggregationBindingInfo = {
            path: path,
            template: this.getTemplate()
        }

        return items;
    }

    private getTemplate(): ColumnListItem {
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

    private onConfirm(event: TableSelectDialog$ConfirmEvent) {
        const selectedItem = event.getParameter("selectedItem");

        if (selectedItem) {
            this.sourceControl.setValue(selectedItem.getBindingContext(this.getModelName())?.getProperty(this.valueHelpProperty));
        }
    }

    private onSearch(event: TableSelectDialog$SearchEvent) {
        const searchValue = event.getParameter("value");
        const filters: Filter[] = [new Filter(this.valueHelpProperty, FilterOperator.Contains, searchValue)];

        this.readonlyProperties.forEach((property) => {
            filters.push(new Filter(property, FilterOperator.Contains, searchValue));
        });

        const filter = new Filter({ filters: filters, and: false, caseSensitive: false });
        (event.getSource().getBinding("items") as ListBinding).filter(filter);
    }
}