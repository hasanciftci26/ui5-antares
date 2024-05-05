export interface ISubmitChangeResponse<T> {
    __batchResponses: IBatchResponses<T>[];
}

export interface IBatchResponses<T> {
    __changeResponses?: IChangeResponses<T>[];
    response?: ISubmitResponse;
    $reported?: boolean;
    message?: string;
}

export interface IChangeResponses<T> {
    $reported?: boolean;
    _imported?: boolean;
    statusCode?: string;
    statusText?: string;
    headers?: object;
    data?: T;
    response?: ISubmitResponse;
}

export interface ISubmitResponse {
    statusCode?: string;
    body?: string;
    statusText?: string;
    headers?: object;
}