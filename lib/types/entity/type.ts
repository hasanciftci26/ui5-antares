export type PropertyType =
    "Edm.Boolean" |
    "Edm.String" |
    "Edm.Binary" |
    "Edm.Byte" |
    "Edm.DateTime" |
    "Edm.DateTimeOffset" |
    "Edm.Decimal" |
    "Edm.Double" |
    "Edm.Guid" |
    "Edm.Int16" |
    "Edm.Int32" |
    "Edm.Int64" |
    "Edm.SByte" |
    "Edm.Single" |
    "Edm.Stream" |
    "Edm.Time";

export interface IEntityType {
    propertyName: string;
    propertyType: PropertyType;
    precision?: string;
    scale?: string;
    nullable?: "false" | "true";
    annotationLabel?: string;
    displayFormat?: string;
}

export interface IEntitySet {
    entityType: string;
}

export interface IMetaModelEntityType {
    name: string;
    key: {
        propertyRef: IPropertyRef[];
    };
    property?: IProperty[];
}

export interface IPropertyRef {
    name: string;
}

export interface IProperty {
    name: string;
    type: PropertyType;
    precision?: string;
    scale?: string;
    nullable?: "false" | "true";
    extensions?: IExtensions[];
}

export interface IExtensions {
    name: string;
    namespace: string;
    value: string;    
}