import ResourceBundle from "sap/base/i18n/ResourceBundle";
import BaseObject from "sap/ui/base/Object";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Router from "sap/ui/core/routing/Router";
import Targets from "sap/ui/core/routing/Targets";
import BindingMode from "sap/ui/model/BindingMode";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
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
    private resourceBundle?: ResourceBundle;
    private bindingMode: BindingMode | "Default" | "OneTime" | "OneWay" | "TwoWay";
    private resourceModel?: ResourceModel;
    private uiRouter: Router;
    private uiTargets: Targets;

    constructor(controller: Controller | UIComponent, modelName?: string) {
        super();
        this.controller = controller;
        this.modelName = modelName;

        if (controller instanceof Controller) {
            this.sourceView = controller.getView() as View;
            this.ownerComponent = controller.getOwnerComponent() as UIComponent;
        } else {
            this.ownerComponent = controller;
        }

        const resourceModel = this.ownerComponent.getModel("i18n");

        if (resourceModel instanceof ResourceModel) {
            this.resourceBundle = resourceModel.getResourceBundle() as ResourceBundle;
            this.resourceModel = resourceModel;
        }

        this.oDataModel = this.ownerComponent.getModel(this.modelName) as ODataModel;
        this.bindingMode = this.oDataModel.getDefaultBindingMode();
        this.uiRouter = this.ownerComponent.getRouter();
        this.uiTargets = this.ownerComponent.getTargets();
        this.setMetadataUrl();
    }

    protected getSourceController(): Controller | UIComponent {
        return this.controller;
    }

    protected getSourceView(): View | undefined {
        return this.sourceView;
    }

    public getSourceOwnerComponent(): UIComponent {
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

    protected getServiceUrl(): string {
        return this.metadataUrl.split("$metadata")[0];
    }

    protected getResourceBundle(): ResourceBundle | undefined {
        return this.resourceBundle;
    }

    protected setOldBindingMode() {
        this.oDataModel.setDefaultBindingMode(this.bindingMode);
    }

    protected getResourceModel(): ResourceModel | undefined {
        return this.resourceModel;
    }

    protected getUIRouter(): Router {
        return this.uiRouter;
    }

    protected getUITargets(): Targets {
        return this.uiTargets;
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