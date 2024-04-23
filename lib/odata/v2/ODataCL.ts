import BaseObject from "sap/ui/base/Object";
import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import View from "sap/ui/core/mvc/View";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace ui5.antares.odata.v2
 */
export default abstract class ODataCL extends BaseObject {
    private controller: Controller;
    private sourceView: View;
    private ownerComponent: UIComponent;
    private oDataModel: ODataModel;
    private modelName?: string;
    private method: ODataMethods;

    constructor(controller: Controller, method: ODataMethods) {
        super();
        this.controller = controller;
        this.sourceView = controller.getView() as View;
        this.ownerComponent = controller.getOwnerComponent() as UIComponent;
        this.oDataModel = this.ownerComponent.getModel(this.modelName) as ODataModel;
        this.method = method;
    }

    abstract setUrlParameters(urlParameters: Record<string, string>): void
    abstract setODataModelName(modelName: string): void

    protected getSourceController(): Controller {
        return this.controller;
    }

    protected getODataModel(): ODataModel {
        return this.oDataModel;
    }

    protected setModelName(modelName: string): void {
        this.modelName = modelName;
    }

    protected getSourceView(): View {
        return this.sourceView;
    }

    protected checkData(data?: object): void {
        if (!data) {
            throw new Error(`No data was found! Use setData() method to execute ${this.method} operation.`);
        }
    }
}