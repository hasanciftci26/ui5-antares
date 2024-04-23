import BaseObject from "sap/ui/base/Object";
import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import View from "sap/ui/core/mvc/View";

/**
 * @namespace ui5.antares.odata.v2
 */
export default abstract class ODataCL extends BaseObject {
    private controller: Controller;
    private sourceView: View;
    private oDataModel: ODataModel;
    private modelName?: string;

    constructor(controller: Controller) {
        super();
        this.controller = controller;
        this.sourceView = controller.getView() as View;
        this.oDataModel = this.sourceView.getModel(this.modelName) as ODataModel;
    }

    protected getSourceController(): Controller {
        return this.controller;
    }

    protected getODataModel(): ODataModel {
        return this.oDataModel;
    }

    protected setModelName(modelName: string) {
        this.modelName = modelName;
    }
}