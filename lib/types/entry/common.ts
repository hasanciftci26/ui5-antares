import { smartfield } from "sap/ui/comp/library";
import CustomData from "sap/ui/core/CustomData";
import Router from "sap/ui/core/routing/Router";
import EntryCL from "ui5/antares/entry/v2/EntryCL";
import { ODataMethods } from "ui5/antares/types/odata/enums";

export interface IFormGroups {
    title: string;
    properties: string[];
}

export interface IObjectPageViewData {
    entry: EntryCL;
    router: Router;
    method: ODataMethods;
}

export interface IFieldCustomData {
    propertyName: string;
    customData: CustomData;
}

export interface ITextInEditModeSource {
    propertyName: string;
    textInEditModeSource: smartfield.TextInEditModeSource;
}