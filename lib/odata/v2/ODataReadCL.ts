import Controller from "sap/ui/core/mvc/Controller";
import ODataCL from "ui5/antares/odata/v2/ODataCL";
import { IError } from "ui5/antares/types/common";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import Filter from "sap/ui/model/Filter";
import Sorter from "sap/ui/model/Sorter";
import { IODataReadResult } from "ui5/antares/types/odata/read";

/**
 * @namespace ui5.antares.odata.v2
 */
export default class ODataReadCL<EntityT extends object = object, EntityKeyT extends object = object> extends ODataCL {
    private filters: Filter[] = [];
    private sorters: Sorter[] = [];
    private urlParameters?: Record<string, string>;

    constructor(controller: Controller, entityPath: string, modelName?: string) {
        super(controller, entityPath, ODataMethods.READ, modelName);
    }

    public setFilters(filters: Filter[]) {
        this.filters = filters;
    }

    public addFilter(filter: Filter) {
        this.filters.push(filter);
    }

    public setSorters(sorters: Sorter[]) {
        this.sorters = sorters;
    }

    public addSorter(sorter: Sorter) {
        this.sorters.push(sorter);
    }

    public setUrlParameters(urlParameters: Record<string, string>): void {
        this.urlParameters = urlParameters;
    }

    public read(): Promise<EntityT[]> {
        const oDataModel = this.getODataModel();

        return new Promise((resolve, reject) => {
            oDataModel.read(this.getEntityPath(), {
                filters: this.filters,
                sorters: this.sorters,
                urlParameters: this.urlParameters,
                success: (responseData: IODataReadResult<EntityT>) => {
                    resolve(responseData.results);
                },
                error: (error: IError) => {
                    reject(error);
                }
            });
        });
    }

    public readByKey(keys: EntityKeyT): Promise<EntityT> {
        const oDataModel = this.getODataModel();
        const path = oDataModel.createKey(this.getEntityPath(), keys);

        return new Promise((resolve, reject) => {
            oDataModel.read(path, {
                urlParameters: this.urlParameters,
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