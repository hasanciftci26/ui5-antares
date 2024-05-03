import Controller from "sap/ui/core/mvc/Controller";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import ModelCL from "ui5/antares/base/v2/ModelCL";

/**
 * @namespace ui5.antares.odata.v2
 */
export default abstract class ODataCL extends ModelCL {
    private entityPath: string;
    private entityName: string;
    private method: ODataMethods;

    constructor(controller: Controller, entityPath: string, method: ODataMethods,  modelName?: string) {
        super(controller, modelName);
        this.method = method;
        this.entityPath = entityPath.startsWith("/") ? entityPath : `/${entityPath}`;
        this.entityName = this.entityPath.slice(1);
    }

    abstract setUrlParameters(urlParameters: Record<string, string>): void

    protected getEntityPath() {
        return this.entityPath;
    }

    protected getEntityName() {
        return this.entityName;
    }

    protected checkData(data?: object): void {
        if (!data) {
            throw new Error(`No data was found! Use setData() method to execute ${this.method} operation.`);
        }
    }
}