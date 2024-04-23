import Controller from "sap/ui/core/mvc/Controller";
import ODataCL from "ui5/antares/odata/v2/ODataCL";
import { IError } from "ui5/antares/types/common";
import { ODataMethods } from "ui5/antares/types/odata/enums";

/**
 * @namespace ui5.antares.odata.v2
 */
export default class ODataDeleteCL<EntityKeyT extends object = object> extends ODataCL {
    private entityPath: string;
    private urlParameters?: Record<string, string>;
    private refreshAfterChange: boolean = true;

    constructor(controller: Controller, entityName: string) {
        super(controller, ODataMethods.DELETE);
        this.entityPath = entityName.startsWith("/") ? entityName : `/${entityName}`;
    }

    public setODataModelName(modelName: string) {
        this.setModelName(modelName);
    }

    public setUrlParameters(urlParameters: Record<string, string>): void {
        this.urlParameters = urlParameters;
    }

    public setRefreshAfterChange(refreshAfterChange: boolean) {
        this.refreshAfterChange = refreshAfterChange;
    }

    public delete(keys: EntityKeyT): Promise<EntityKeyT> {
        const oDataModel = this.getODataModel();
        const path = oDataModel.createKey(this.entityPath, keys);

        return new Promise((resolve, reject) => {
            oDataModel.remove(path, {
                urlParameters: this.urlParameters,
                refreshAfterChange: this.refreshAfterChange,
                success: (responseData: EntityKeyT) => {
                    resolve(responseData);
                },
                error: (error: IError) => {
                    reject(error);
                }
            });
        });
    }
}