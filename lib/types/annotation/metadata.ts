export interface IODataMetadata {
    version: string;
    dataServices: IDataServices;
}

export interface IDataServices {
    dataServiceVersion: string;
    schema: ISchema[];
}

export interface ISchema {
    namespace: string | null;
    entityContainer?: IEntityContainer[];
    entityType?: IEntityType[];
    complexType?: IComplexType[];
    association?: IAssociation[];
    annotations?: IAnnotations[];
}

export interface IEntityContainer {
    name?: string;
    functionImport?: IFunctionImport[];
    entitySet?: IEntitySet[];
    associationSet?: IAssociationSet[];
    isDefaultEntityContainer?: boolean;
}

export interface IEntitySet {
    entityType: string;
    name: string;
}

export interface IAssociationSet {
    name: string;
    association: string;
    end: IAssociationSetEnd[];
}

export interface IAssociationSetEnd {
    role: string;
    entitySet: string;
}

export interface IFunctionImport {
    name: string;
    httpMethod: string;
    returnType: string;
    parameter: IFunctionImportParameter[];
}

export interface IFunctionImportParameter {
    name: string;
    mode: string;
    type: string;
    nullable: string;
}

export interface IEntityType {
    key: {
        propertyRef: IPropertyRef[];
    };
    name?: string;
    namespace: string | null;
    property?: IEntityTypeProperty[];
    navigationProperty?: IEntityTypeNavProperty[];
}

export interface IEntityTypeProperty {
    name: string;
    type: string;
    nullable?: string;
    maxLength?: string;
    scale?: string;
    precision?: string;
}

export interface IEntityTypeNavProperty {
    name: string;
    relationship: string;
    fromRole: string;
    toRole: string;
}

export interface IPropertyRef {
    name: string;
}

export interface IComplexType {
    name: string;
    property?: IComplexTypeProperty[];
}

export interface IComplexTypeProperty extends IEntityTypeProperty {
    extensions?: ICompTypePropExtensions[];
}

export interface ICompTypePropExtensions {
    name: string;
    namespace: string | null;
    value: string;
}

export interface IAssociation {
    name: string;
    end?: IAssociationEnd[];
    referentialConstraint?: IReferentialConstraint;
}

export interface IAssociationEnd {
    role: string;
    type: string;
    multiplicity: string;
    onDelete?: {
        action: string;
    };
}

export interface IReferentialConstraint {
    dependent?: IConstraint;
    principal?: IConstraint;
}

export interface IConstraint {
    role: string;
    propertyRef: IPropertyRef[];
}

export interface IAnnotations {
    target: string;
    annotation: IAnnotation[];
}

export interface IAnnotation {
    term: string;
    record: IAnnotationRecord;
}

export interface IAnnotationRecord {
    type: string;
    propertyValue: IAnnotationPropValue[];
}

export interface IAnnotationPropValue {
    property: string;
    collection?: IAnnotationCollection;
    bool?: string;
}

export interface IAnnotationCollection {
    extensions: IAnnotationExtensions[];
}

export interface IAnnotationExtensions extends ICompTypePropExtensions {
    attributes?: string[];
    children?: string[];
}