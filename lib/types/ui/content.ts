import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import { FormTypes, NamingStrategies } from "ui5/antares/types/entry/enums";

export interface IContentConfigurations {
    controller: Controller | UIComponent;
    entityName: string;
    resourceBundlePrefix: string;
    namingStrategy: NamingStrategies;
    modelName?: string;
    formPropertyOrder?: string[];
    excludeOtherProps: boolean;
    excludedProperties: string[];
    mandatoryProperties: string[];
    useMetadataLabels: boolean;
    formType: FormTypes;
}