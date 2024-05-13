import Controller from "sap/ui/core/mvc/Controller";
import ODataCL from "ui5/antares/odata/v2/ODataCL";
import { IError, ICreateResponse } from "ui5/antares/types/common";
import Context from "sap/ui/model/Context";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace ui5.antares.odata.v2
 */
export default class ODataCreateCL<EntityT extends object = object> extends ODataCL {
    private payload?: EntityT;
    private urlParameters?: Record<string, string>;
    private refreshAfterChange: boolean = true;
    private response?: ICreateResponse<EntityT>;

    constructor(controller: Controller | UIComponent, entityPath: string, modelName?: string) {
        super(controller, entityPath, ODataMethods.CREATE, modelName);
    }

    public setData(data: EntityT) {
        this.payload = data;
    }

    public getData(): EntityT | undefined {
        return this.payload;
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

    public getResponse(): ICreateResponse<EntityT> | undefined {
        return this.response;
    }

    public createEntry(): Context {
        const oDataModel = this.getODataModel();

        const entry = oDataModel.createEntry(this.getEntityPath(), {
            properties: this.payload
        }) as Context;

        return entry;
    }

    public create(): Promise<EntityT> {
        this.checkData(this.payload);
        const oDataModel = this.getODataModel();

        return new Promise((resolve, reject) => {
            oDataModel.create(this.getEntityPath(), this.payload!, {
                urlParameters: this.urlParameters,
                refreshAfterChange: this.refreshAfterChange,
                success: (responseData: EntityT, response: ICreateResponse<EntityT>) => {
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