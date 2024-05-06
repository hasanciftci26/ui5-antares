import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import EntryCL from "ui5/antares/entry/v2/EntryCL";
import { DialogStrategies } from "ui5/antares/types/entry/enums";
import { IUpdateSettings } from "ui5/antares/types/entry/update";
import { ODataMethods } from "ui5/antares/types/odata/enums";

/**
 * @namespace ui5.antares.entry.v2
 */
export default class EntryUpdateCL<EntityT extends object = object, EntityKeysT extends object = object> extends EntryCL<EntityT, EntityKeysT> {
    private settings: IUpdateSettings;

    constructor(controller: Controller | UIComponent, settings: IUpdateSettings, modelName?: string) {
        super(controller, settings.entityPath, ODataMethods.UPDATE, modelName);
        this.settings = settings;
    }

    public async updateEntry() {
        if (!this.getSourceView()) {
            throw new Error("updateEntry() method cannot be used on the UIComponent!");
        }

        this.getODataModel().setDefaultBindingMode("TwoWay");
        this.getODataModel().setUseBatch(true);

        if (this.getDialogStrategy() === DialogStrategies.LOAD) {
            await this.loadDialog();
        } else {
            await this.createDialog();
        }
    }

    private async createDialog() {
        await this.initializeContext(this.settings.initializer);
    }

    private async loadDialog() {
        await this.initializeContext(this.settings.initializer);
    }
}