import Controller from "sap/ui/core/mvc/Controller";
import ODataCL from "ui5/antares/odata/v2/ODataCL";
import { IError } from "ui5/antares/types/common";
import Context from "sap/ui/model/Context";
import { ODataMethods } from "ui5/antares/types/odata/enums";

/**
 * @namespace ui5.antares.odata.v2
 */
export default class ODataCreateCL<EntityT extends object = object, ErrorT = IError> extends ODataCL {
    private payload?: EntityT;
    private entityPath: string;
    private urlParameters?: Record<string, string>;
    private refreshAfterChange: boolean = true;

    constructor(controller: Controller, entityName: string) {
        super(controller, ODataMethods.CREATE);
        this.entityPath = entityName.startsWith("/") ? entityName : `/${entityName}`;
    }

    protected getEntityName(): string {
        return this.entityPath.slice(1);
    }

    public setODataModelName(modelName: string) {
        this.setModelName(modelName);
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

    public createEntry(): Context {
        const oDataModel = this.getODataModel();

        const entry = oDataModel.createEntry(this.entityPath, {
            properties: this.payload
        }) as Context;

        return entry;
    }

    public create(): Promise<EntityT> {
        this.checkData(this.payload);
        const oDataModel = this.getODataModel();

        return new Promise((resolve, reject) => {
            oDataModel.create(this.entityPath, this.payload!, {
                urlParameters: this.urlParameters,
                refreshAfterChange: this.refreshAfterChange,
                success: (responseData: EntityT) => {
                    resolve(responseData);
                },
                error: (error: ErrorT) => {
                    reject(error);
                }
            });
        });
    }
}