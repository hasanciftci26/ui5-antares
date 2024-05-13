export interface IError {
    headers?: object;
    message?: string;
    responseText?: string;
    statusCode?: string | number;
    statusText?: string;
}

export interface IManifestModels {
    dataSource: string;
    preload?: boolean;
    settings?: object;
}

export interface IManifestDataSources {
    uri: string;
    type: string;
    settings?: object;
}

export interface IResponse {
    $reported?: boolean;
    body?: string;
    headers?: object;
    statusCode?: string | number;
    statusText?: string;
    _imported?: boolean;
}

export interface ICreateResponse<T> extends IResponse {
    data?: T;
}

export interface IUpdateResponse<T> extends IResponse {
    data?: T;
}

export interface IDeleteResponse extends IResponse {
    data?: string;
}

export interface IReadResponse<T> extends IResponse {
    data?: {
        results: T[];
    };
}