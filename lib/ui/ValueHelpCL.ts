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

/**
 * @namespace ui5.antares.ui
 */
export default class ValueHelpCL extends ModelCL {
    private propertyName: string;
    private valueHelpEntity: string;
    private entityPath: string;
    private valueHelpProperty: string;
    private readonlyProperties: string[];
    private title: string;
    private searchPlaceholder: string;
    private namingStrategy: NamingStrategies;
    private resourceBundlePrefix: string;
    private sourceControl: Input;
    private valueHelpDialog: ValueHelpDialog;
    private searchField: SearchField;
    private filterBar: FilterBar;

    constructor(controller: Controller | UIComponent, settings: IValueHelpSettings, modelName?: string) {
        super(controller, modelName);
        this.propertyName = settings.propertyName;
        this.valueHelpEntity = settings.valueHelpEntity.startsWith("/") ? settings.valueHelpEntity.slice(1) : settings.valueHelpEntity;
        this.entityPath = `/${this.valueHelpEntity}`;
        this.valueHelpProperty = settings.valueHelpProperty;
        this.title = settings.title || `${this.valueHelpEntity}`;
        this.searchPlaceholder = settings.searchPlaceholder || `Search ${this.valueHelpEntity}`;
        this.readonlyProperties = settings.readonlyProperties || [];
        this.namingStrategy = settings.namingStrategy || NamingStrategies.CAMEL_CASE;
        this.resourceBundlePrefix = settings.resourceBundlePrefix || "antaresVH";
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
        this.valueHelpDialog = new ValueHelpDialog({
            title: this.title,
            supportRanges: false,
            supportMultiselect: false,
            ok: this.onConfirm.bind(this),
            cancel: this.onCancel.bind(this),
            afterClose: this.onAfterClose.bind(this),
            key: this.valueHelpProperty
        });

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
        this.filterBar = new FilterBar({
            advancedMode: true,
            isRunningInValueHelpDialog: true,
            search: this.onFilterBarSearch.bind(this),
            filterGroupItems: this.getFilterGroupItems()
        });

        valueHelpDialog.setFilterBar(this.filterBar);
    }

    private getFilterGroupItems(): FilterGroupItem[] {
        const entity = new EntityCL(this.getSourceController(), this.valueHelpEntity, this.resourceBundlePrefix, this.namingStrategy, this.getModelName());
        const groupItems: FilterGroupItem[] = [new FilterGroupItem({
            groupName: "__$INTERNAL$",
            name: this.valueHelpProperty,
            label: entity.getEntityTypePropLabel(this.valueHelpProperty),
            visibleInFilterBar: true,
            control: new Input({
                name: this.valueHelpProperty,
                submit: () => {
                    this.filterBar.search();
                }
            })
        })];

        this.readonlyProperties.forEach((property) => {
            groupItems.push(new FilterGroupItem({
                groupName: "__$INTERNAL$",
                name: property,
                label: entity.getEntityTypePropLabel(property),
                visibleInFilterBar: true,
                control: new Input({
                    name: property,
                    submit: () => {
                        this.filterBar.search();
                    }
                })
            }));
        });

        return groupItems;
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
        const keyPropertyColumn = new UIColumn({
            label: new Label({ text: entity.getEntityTypePropLabel(this.valueHelpProperty) }),
            template: new Text({ text: `{${this.valueHelpProperty}}` })
        });

        keyPropertyColumn.data({ fieldName: this.valueHelpProperty });
        table.addColumn(keyPropertyColumn);

        this.readonlyProperties.forEach((property) => {
            const readonlyColumn = new UIColumn({
                label: new Label({ text: entity.getEntityTypePropLabel(property) }),
                template: new Text({ text: `{${property}}` })
            });

            readonlyColumn.data({ fieldName: property });
            table.addColumn(readonlyColumn);
        });
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
        table.addColumn(new Column({ header: new Label({ text: entity.getEntityTypePropLabel(this.valueHelpProperty) }) }));

        this.readonlyProperties.forEach((property) => {
            table.addColumn(new Column({ header: new Label({ text: entity.getEntityTypePropLabel(property) }) }));
        });
    }

    private async onFilterBarSearch(event: FilterBar$SearchEvent) {
        const selectionSet = event.getParameter("selectionSet");
        const searchQuery = this.searchField.getValue();

        if (!selectionSet) {
            return;
        }

        const defaultFilters: Filter[] = [];

        const filters = selectionSet.reduce(function (result: Filter[], control: Control) {
            if ((control as Input).getValue()) {
                result.push(new Filter({
                    path: (control as Input).getName(),
                    operator: FilterOperator.Contains,
                    value1: (control as Input).getValue()
                }));
            }

            return result;
        }, defaultFilters);

        filters.push(new Filter({
            filters: this.getSearchFieldFilters(searchQuery),
            and: false
        }));

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
        this.searchField = new SearchField({ placeholder: this.searchPlaceholder });
        const filterbar = valueHelpDialog.getFilterBar();
        filterbar.setBasicSearch(this.searchField);
        this.searchField.attachSearch(() => {
            filterbar.search();
        });
    }

    private getSearchFieldFilters(searchQuery: string): Filter[] {
        const filters: Filter[] = [new Filter(this.valueHelpProperty, FilterOperator.Contains, searchQuery)];

        this.readonlyProperties.forEach((property) => {
            filters.push(new Filter(property, FilterOperator.Contains, searchQuery));
        });

        return filters;
    }
}