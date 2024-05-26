import Context from "sap/ui/model/Context";

export interface IUpdateSettings<EntityKeysT extends object> {
    entityPath: string;
    initializer: string | Context | EntityKeysT;
}