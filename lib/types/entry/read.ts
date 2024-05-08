import Context from "sap/ui/model/Context";

export interface IReadSettings {
    entityPath: string;
    initializer?: string | Context;
}