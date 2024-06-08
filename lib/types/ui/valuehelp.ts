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
}

export interface IValueHelpDialogOKEvent {
    getParameter: (parameter: "tokens") => ITokens[] | undefined;
}

export interface ITokens {
    getKey: () => string;
}