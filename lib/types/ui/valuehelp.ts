import CustomData from "sap/ui/core/CustomData";
import { NamingStrategies } from "ui5/antares/types/entry/enums";

export interface IValueHelpSettings {
    propertyName: string;
    valueHelpEntity: string;
    valueHelpProperty: string;
    readonlyProperties?: string[];
    excludedFilterProperties?: string[];
    title?: string;
    searchPlaceholder?: string;
    namingStrategy?: NamingStrategies;
    resourceBundlePrefix?: string;
    useMetadataLabels?: boolean;
    filterModelName?: string;
    filterCaseSensitive?: boolean;
}

export interface IValueHelpDialogOKEvent {
    getParameter: (parameter: "tokens") => ITokens[] | undefined;
}

export interface ITokens {
    getKey: () => string;
    getCustomData: () => CustomData[];
}

export interface IValueHelpInitialFilter {
    propertyName: string;
    value: string | number | boolean | Date;
}