import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import ODataCL from "ui5/antares/odata/v2/ODataCL";
import { IError } from "ui5/antares/types/common";
import { ODataMethods } from "ui5/antares/types/odata/enums";

/**
 * @namespace ui5.antares.odata.v2
 */
export default class ODataUpdateCL<EntityT extends object = object, EntityKeyT extends object = object> extends ODataCL {
    private payload: EntityT;
    private urlParameters?: Record<string, string>;
    private refreshAfterChange: boolean = true;

    constructor(controller: Controller | UIComponent, entityPath: string, modelName?: string) {
        super(controller, entityPath, ODataMethods.UPDATE, modelName);
    }

    public setData(data: EntityT) {
        this.payload = data;
    }

    public setUrlParameters(urlParameters: Record<string, string>): void {
        this.urlParameters = urlParameters;
    }

    public setRefreshAfterChange(refreshAfterChange: boolean) {
        this.refreshAfterChange = refreshAfterChange;
    }

    public update(keys: EntityKeyT): Promise<EntityT> {
        this.checkData(this.payload);
        const oDataModel = this.getODataModel();
        const path = oDataModel.createKey(this.getEntityPath(), keys);

        return new Promise((resolve, reject) => {
            oDataModel.update(path, this.payload, {
                urlParameters: this.urlParameters,
                refreshAfterChange: this.refreshAfterChange,
                success: (responseData: EntityT) => {
                    resolve(responseData);
                },
                error: (error: IError) => {
                    reject(error);
                }
            });
        });
    }
}