import Context from "sap/ui/model/Context";

export interface IDeleteSettings {
    entityPath: string;
    initializer?: string | Context;
}

export interface IDeleteFailed {
    headers: object;
    message: string;
    responseText: string;
    statusCode: string;
    statusText: string;
}