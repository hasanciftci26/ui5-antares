export interface IError {
    message: string;
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