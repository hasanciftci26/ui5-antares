import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import ODataCL from "ui5/antares/odata/v2/ODataCL";
import { IError, IDeleteResponse } from "ui5/antares/types/common";
import { ODataMethods } from "ui5/antares/types/odata/enums";

/**
 * @namespace ui5.antares.odata.v2
 */
export default class ODataDeleteCL<EntityKeyT extends object = object> extends ODataCL {
    private urlParameters?: Record<string, string>;
    private refreshAfterChange: boolean = true;
    private response?: IDeleteResponse;

    constructor(controller: Controller | UIComponent, entityPath: string, modelName?: string) {
        super(controller, entityPath, ODataMethods.DELETE, modelName);
    }

    public setUrlParameters(urlParameters: Record<string, string>): void {
        this.urlParameters = urlParameters;
    }

    public getUrlParameters(): Record<string, string> | undefined {
        return this.urlParameters;
    }

    public setRefreshAfterChange(refreshAfterChange: boolean) {
        this.refreshAfterChange = refreshAfterChange;
    }

    public getRefreshAfterChange(): boolean {
        return this.refreshAfterChange;
    }

    public getResponse(): IDeleteResponse | undefined {
        return this.response;
    }

    public delete(keys: EntityKeyT): Promise<EntityKeyT> {
        const oDataModel = this.getODataModel();
        const path = oDataModel.createKey(this.getEntityPath(), keys);

        return new Promise((resolve, reject) => {
            oDataModel.remove(path, {
                urlParameters: this.urlParameters,
                refreshAfterChange: this.refreshAfterChange,
                success: (responseData: EntityKeyT, response: IDeleteResponse) => {
                    this.response = response;
                    resolve(responseData);
                },
                error: (error: IError) => {
                    reject(error);
                }
            });
        });
    }
}