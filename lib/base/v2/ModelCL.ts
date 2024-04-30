import BaseObject from "sap/ui/base/Object";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { IManifestDataSources, IManifestModels } from "ui5/antares/types/common";

/**
 * @namespace ui5.antares.base.v2
 */
export default abstract class ModelCL extends BaseObject {
    private controller: Controller | UIComponent;
    private sourceView?: View;
    private ownerComponent: UIComponent;
    private oDataModel: ODataModel;
    private metadataUrl: string;
    private modelName?: string;

    constructor(controller: Controller | UIComponent, modelName?: string) {
        super();
        this.controller = controller;
        this.modelName = modelName;

        if (controller instanceof Controller) {
            this.sourceView = controller.getView() as View;
            this.ownerComponent = controller.getOwnerComponent() as UIComponent;
            this.oDataModel = this.ownerComponent.getModel(this.modelName) as ODataModel;
        } else {
            this.ownerComponent = controller;
            this.oDataModel = this.ownerComponent.getModel(this.modelName) as ODataModel;
        }

        this.setMetadataUrl();
    }

    protected getSourceController(): Controller | UIComponent {
        return this.controller;
    }

    protected getSourceView(): View | void {
        return this.sourceView;
    }

    protected getSourceOwnerComponent(): UIComponent {
        return this.ownerComponent;
    }

    protected getODataModel(): ODataModel {
        return this.oDataModel;
    }

    protected getMetadataUrl(): string {
        return this.metadataUrl;
    }

    protected getModelName(): string | undefined {
        return this.modelName;
    }

    protected setModelName(modelName?: string): void {
        this.modelName = modelName;
        this.oDataModel = this.ownerComponent.getModel(this.modelName) as ODataModel;
        this.setMetadataUrl();
    }

    private setMetadataUrl(): void {
        const modelEntry: IManifestModels | undefined = this.ownerComponent.getManifestEntry(`/sap.ui5/models/${this.modelName || ""}`);

        if (modelEntry) {
            const dataSource: IManifestDataSources | undefined = this.ownerComponent.getManifestEntry(`/sap.app/dataSources/${modelEntry.dataSource}`);

            if (dataSource) {
                let manifestUrl = dataSource.uri;

                if (!manifestUrl.startsWith("/")) {
                    manifestUrl = "/" + manifestUrl;
                }

                if (!manifestUrl.endsWith("/")) {
                    manifestUrl = manifestUrl + "/"
                }

                this.metadataUrl = `${manifestUrl}$metadata`;
            }
        }
    }
}