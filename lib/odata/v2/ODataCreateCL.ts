import Controller from "sap/ui/core/mvc/Controller";
import ODataCL from "ui5/antares/odata/v2/ODataCL";
import { IError } from "../../types/common";
import Context from "sap/ui/model/Context";

/**
 * @namespace ui5.antares.odata.v2
 */
export default class ODataCreateCL<EntityT extends object, ErrorT = IError> extends ODataCL {
    private payload: EntityT;
    private entityPath: string;
    private urlParameters?: Record<string, string>;

    constructor(controller: Controller, entityName: string) {
        super(controller);
        this.entityPath = entityName.startsWith("/") ? entityName : `/${entityName}`;
    }

    public setODataModelName(modelName: string) {
        this.setModelName(modelName);
    }

    public setData(data: EntityT) {
        this.payload = data;
    }

    public createEntry(): Context {
        const oDataModel = this.getODataModel();

        const entry = oDataModel.createEntry(this.entityPath, {
            properties: this.payload
        }) as Context;

        return entry;
    }

    public create(): Promise<EntityT> {
        const oDataModel = this.getODataModel();

        return new Promise((resolve, reject) => {
            oDataModel.create(this.entityPath, this.payload, {
                urlParameters: this.urlParameters,
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