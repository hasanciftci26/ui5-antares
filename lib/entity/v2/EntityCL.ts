import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import ODataMetaModel, { EntitySet, EntityType } from "sap/ui/model/odata/ODataMetaModel";
import ModelCL from "ui5/antares/base/v2/ModelCL";
import { IEntityType } from "ui5/antares/types/entity/type";
import { NamingStrategies } from "ui5/antares/types/entry/enums";
import Util from "ui5/antares/util/Util";

/**
 * @namespace ui5.antares.entity.v2
 */
export default class EntityCL extends ModelCL {
    private entityName: string;
    private metaModel: ODataMetaModel;
    private resourceBundlePrefix: string;
    private namingStrategy: NamingStrategies;

    constructor(controller: Controller | UIComponent, entityName: string, resourceBundlePrefix: string, namingStrategy: NamingStrategies, modelName?: string) {
        super(controller, modelName);
        this.entityName = entityName;
        this.resourceBundlePrefix = resourceBundlePrefix;
        this.namingStrategy = namingStrategy;
        this.metaModel = this.getODataModel().getMetaModel();
    }

    protected getEntityName(): string {
        return this.entityName;
    }

    public getMetaModel(): ODataMetaModel {
        return this.metaModel;
    }

    public async getEntityType(): Promise<EntityType> {
        try {
            const entitySet = await this.getEntitySet();
            const entityType: EntityType | undefined = this.metaModel.getODataEntityType(entitySet.entityType) as EntityType;

            if (!entityType) {
                throw new Error(`${entitySet.entityType} EntityType was not found in the OData metadata!`);
            }

            return entityType;
        } catch (error) {
            throw error;
        }
    }

    public getEntitySet(): Promise<EntitySet> {
        return new Promise((resolve, reject) => {
            this.metaModel.loaded().then(() => {
                const entitySet: EntitySet | undefined = this.metaModel.getODataEntitySet(this.entityName) as EntitySet;

                if (!entitySet) {
                    reject(`${this.entityName} EntitySet was not found in the OData metadata!`);
                }

                resolve(entitySet);
            });
        });
    }

    public async getEntityTypeKeys(): Promise<IEntityType[]> {
        const entityType = await this.getEntityType();
        const entityTypeProperties = await this.getEntityTypeProperties();

        return entityType.key.propertyRef.map((key) => {
            const entityTypeProperty = entityTypeProperties.find(prop => prop.propertyName === key.name) as IEntityType;
            const property: IEntityType = {
                propertyName: key.name,
                propertyType: entityTypeProperty.propertyType,
                nullable: entityTypeProperty.nullable,
                precision: entityTypeProperty.precision,
                scale: entityTypeProperty.scale,
                annotationLabel: entityTypeProperty.annotationLabel,
                displayFormat: entityTypeProperty.displayFormat
            };

            return property;
        });
    }

    public async getEntityTypeProperties(): Promise<IEntityType[]> {
        const entityType = await this.getEntityType();

        if (!entityType.property) {
            throw new Error(`${entityType.name} EntityType has no property in the OData metadata!`);
        }

        return entityType.property.map((prop) => {
            const property: IEntityType = {
                propertyName: prop.name,
                propertyType: prop.type,
                nullable: prop.nullable
            };

            if (prop.type === "Edm.Decimal") {
                property.precision = prop.precision;
                property.scale = prop.scale;
            }

            if (prop.extensions) {
                const label = prop.extensions.find(ext => ext.name === "label");
                const displayFormat = prop.extensions.find(ext => ext.name === "display-format");

                if (label) {
                    property.annotationLabel = label.value;
                }

                if (displayFormat) {
                    property.displayFormat = displayFormat.value;
                }
            } else {
                if (prop.hasOwnProperty("com.sap.vocabularies.Common.v1.Label")) {
                    const label = prop["com.sap.vocabularies.Common.v1.Label" as keyof typeof prop] as object;
                    property.annotationLabel = label["String" as keyof typeof label];
                }
            }

            return property;
        });
    }

    public getEntityTypePropLabel(property: string): string {
        const resourceBundle = this.getResourceBundle();

        if (resourceBundle) {
            if (resourceBundle.hasText(`${this.resourceBundlePrefix}${this.entityName}${property}`)) {
                return resourceBundle.getText(`${this.resourceBundlePrefix}${this.entityName}${property}`) as string;
            } else {
                return Util.getGeneratedLabel(property, this.namingStrategy);
            }
        } else {
            return Util.getGeneratedLabel(property, this.namingStrategy);
        }
    }
}