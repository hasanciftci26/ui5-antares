import Context from "sap/ui/model/Context";

export interface IReadSettings<EntityKeysT extends object> {
    entityPath: string;
    initializer: string | Context | EntityKeysT;
}