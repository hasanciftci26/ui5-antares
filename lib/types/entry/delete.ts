import Context from "sap/ui/model/Context";

export interface IDeleteSettings<EntityKeysT extends object> {
    entityPath: string;
    initializer: string | Context | EntityKeysT;
}

export interface IDeleteFailed {
    headers: object;
    message: string;
    responseText: string;
    statusCode: string;
    statusText: string;
}