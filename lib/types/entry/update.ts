import Context from "sap/ui/model/Context";

export interface IUpdateSettings {
    entityPath: string;
    initializer?: string | Context;
}