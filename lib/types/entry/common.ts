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