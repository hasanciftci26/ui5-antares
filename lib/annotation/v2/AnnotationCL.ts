import BaseObject from "sap/ui/base/Object";
import ODataMetaModel, { EntitySet, EntityType, Property } from "sap/ui/model/odata/ODataMetaModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import EntityCL from "ui5/antares/entity/v2/EntityCL";
import { IEntityTypeLabel } from "ui5/antares/types/annotation/label";
import { IODataMetadata } from "ui5/antares/types/annotation/metadata";
import { NamingStrategies } from "ui5/antares/types/entry/enums";

/**
 * @namespace ui5.antares.annotation.v2
 */
export default class AnnotationCL extends BaseObject {
    private namingStrategy: NamingStrategies;
    private oDataModel: ODataModel;
    private entityName: string;
    private metadataUrl: string;
    private entityTypeLabels: IEntityTypeLabel[] = [];

    constructor(namingStrategy: NamingStrategies, oDataModel: ODataModel, entityName: string, metadataUrl: string) {
        super();
        this.namingStrategy = namingStrategy;
        this.oDataModel = oDataModel;
        this.entityName = entityName;
        this.metadataUrl = metadataUrl;
    }

    public async generateFormAnnotations(): Promise<string> {
        const entity = new EntityCL(this.oDataModel, this.entityName);

        try {
            const entityType = entity.getEntityType();
            this.populateFieldLabels(entityType.property);
            return this.generateFormXMLAnnotations(entityType.name);
        } catch (error) {
            throw error;
        }
    }

    private populateFieldLabels(properties?: Property[]): void {
        if (!properties) {
            throw new Error(`EntitySet ${this.entityName} does not contain any property!`);
        }

        properties.forEach((property) => {
            let label = property.name;

            switch (this.namingStrategy) {
                case NamingStrategies.CAMEL_CASE:
                    label = this.getCamelCaseLabel(property.name);
                    break;
                case NamingStrategies.PASCAL_CASE:
                    label = this.getPascalCaseLabel(property.name);
                    break;
                case NamingStrategies.SNAKE_CASE:
                    label = this.getSnakeCaseLabel(property.name);
                    break;
                case NamingStrategies.CONSTANT_CASE:
                    label = this.getConstantCaseLabel(property.name);
                    break;
                case NamingStrategies.KEBAB_CASE:
                    label = this.getKebabCaseLabel(property.name);
                    break;
            }

            this.entityTypeLabels.push({
                originalProperty: property.name,
                generatedLabel: label
            });
        });
    }

    private getCamelCaseLabel(name: string): string {
        return name.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
            return str.toUpperCase();
        });
    }

    private getPascalCaseLabel(name: string): string {
        return name.replace(/([A-Z])/g, " $1").trim();
    }

    private getSnakeCaseLabel(name: string): string {
        return name.replace(/_/g, " ").replace(/\b\w/g, function (str) {
            return str.toUpperCase();
        });
    }

    private getConstantCaseLabel(name: string): string {
        return name.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, function (str) {
            return str.toUpperCase();
        });
    }

    private getKebabCaseLabel(name: string): string {
        return name.split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    private async generateFormXMLAnnotations(entityTypeName: string): Promise<string> {
        const edmxNamespace = "http://docs.oasis-open.org/odata/ns/edmx";
        const xmlDoc = document.implementation.createDocument(edmxNamespace, "edmx:Edmx");
        const edmxElement = xmlDoc.documentElement;
        const uris = [
            this.metadataUrl,
            "https://sap.github.io/odata-vocabularies/vocabularies/Common.xml"
        ];

        let serviceNamespace = await this.getServiceNamespace();
        const includes = [
            { namespace: serviceNamespace, alias: "ModelEntityTypes" },
            { namespace: "com.sap.vocabularies.Common.v1", alias: "Common" }
        ];

        edmxElement.setAttributeNS(null, "Version", "4.0");

        for (let i = 0; i < uris.length; i++) {
            const referenceElement = xmlDoc.createElementNS(edmxNamespace, "edmx:Reference");
            referenceElement.setAttributeNS(null, "Uri", uris[i]);

            const includeElement = xmlDoc.createElementNS(edmxNamespace, "edmx:Include");
            includeElement.setAttributeNS(null, "Namespace", includes[i].namespace);
            includeElement.setAttributeNS(null, "Alias", includes[i].alias);

            referenceElement.appendChild(includeElement);
            edmxElement.appendChild(referenceElement);
        }

        const dataServicesElement = xmlDoc.createElementNS(edmxNamespace, "edmx:DataServices");
        const schemaElement = xmlDoc.createElementNS("http://docs.oasis-open.org/odata/ns/edm", "Schema");

        this.entityTypeLabels.forEach((label) => {
            const annotationsElement = xmlDoc.createElementNS(null, "Annotations");
            annotationsElement.setAttribute("Target", `ModelEntityTypes.${entityTypeName}/${label.originalProperty}`);

            const annotationElement = xmlDoc.createElement("Annotation");
            annotationElement.setAttribute("Term", "Common.Label");
            annotationElement.setAttribute("String", label.generatedLabel);

            annotationsElement.appendChild(annotationElement);
            schemaElement.appendChild(annotationsElement);
        });

        dataServicesElement.appendChild(schemaElement);
        edmxElement.appendChild(dataServicesElement);

        const xmlString = new XMLSerializer().serializeToString(xmlDoc);
        return xmlString;
    }

    private getServiceNamespace(): Promise<string> {
        return new Promise((resolve) => {
            this.oDataModel.metadataLoaded().then(() => {
                const metadata = this.oDataModel.getServiceMetadata() as IODataMetadata;

                if (metadata.dataServices.schema.length) {
                    resolve(metadata.dataServices.schema[0].namespace || "");
                }
            });
        });
    }
}