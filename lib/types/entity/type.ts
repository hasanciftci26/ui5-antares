export interface IEntityType {
    originalProperty: string;
    propertyType: "Edm.Boolean" |
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
    generatedLabel: string;
}