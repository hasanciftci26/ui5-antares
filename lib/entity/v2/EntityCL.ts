import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import ODataMetaModel, { EntitySet, EntityType } from "sap/ui/model/odata/ODataMetaModel";
import ModelCL from "ui5/antares/base/v2/ModelCL";

/**
 * @namespace ui5.antares.entity.v2
 */
export default class EntityCL extends ModelCL {
    private entityName: string;
    private metaModel: ODataMetaModel;

    constructor(controller: Controller | UIComponent, entityName: string, modelName?: string) {
        super(controller, modelName);
        this.entityName = entityName;
        this.metaModel = this.getODataModel().getMetaModel();
    }

    protected getEntityName(): string {
        return this.entityName;
    }

    public getMetaModel(): ODataMetaModel {
        return this.metaModel;
    }

    public getEntityType(): EntityType {
        try {
            const entitySet = this.getEntitySet();
            const entityType: EntityType | undefined = this.metaModel.getODataEntityType(entitySet.entityType) as EntityType;

            if (!entityType) {
                throw new Error(`${entitySet.entityType} EntityType was not found in the OData metadata!`);
            }

            return entityType;
        } catch (error) {
            throw error;
        }
    }

    public getEntitySet(): EntitySet {
        const entitySet: EntitySet | undefined = this.metaModel.getODataEntitySet(this.entityName) as EntitySet;

        if (!entitySet) {
            throw new Error(`${this.entityName} EntitySet was not found in the OData metadata!`);
        }

        return entitySet;
    }

    public getEntityTypeKeys(): string[] {
        const entityType = this.getEntityType();
        return entityType.key.propertyRef.map(key => key.name);
    }

    public getEntityTypeProperties(): string[] {
        const entityType = this.getEntityType();

        if (!entityType.property) {
            throw new Error(`${entityType.name} EntityType has no property in the OData metadata!`);
        }

        return entityType.property.map(prop => prop.name);
    }
}