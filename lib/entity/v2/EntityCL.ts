import BaseObject from "sap/ui/base/Object";
import ODataMetaModel, { EntitySet, EntityType } from "sap/ui/model/odata/ODataMetaModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @namespace ui5.antares.entity.v2
 */
export default class EntityCL extends BaseObject {
    private entityName: string;
    private metaModel: ODataMetaModel;

    constructor(oDataModel: ODataModel, entityName: string) {
        super();
        this.metaModel = oDataModel.getMetaModel();
        this.entityName = entityName;
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
}