import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import { Property } from "sap/ui/model/odata/ODataMetaModel";
import EntityCL from "ui5/antares/entity/v2/EntityCL";
import { IEntityTypeLabel } from "ui5/antares/types/annotation/label";
import { IODataMetadata } from "ui5/antares/types/annotation/metadata";
import { NamingStrategies } from "ui5/antares/types/entry/enums";
import Util from "ui5/antares/util/Util";

/**
 * @namespace ui5.antares.annotation.v2
 */
export default class AnnotationCL extends EntityCL {
    private namingStrategy: NamingStrategies;
    private entityTypeLabels: IEntityTypeLabel[] = [];

    constructor(controller: Controller | UIComponent, entityName: string, namingStrategy: NamingStrategies, modelName?: string) {
        super(controller, entityName, modelName);
        this.namingStrategy = namingStrategy;
    }

    public async appendFormAnnotations(): Promise<void> {
        const entityType = this.getEntityType();
        this.populateFieldLabels(entityType.property);
        const xmlAnnotations = await this.getFormXMLAnnotations(entityType.name);

        this.getODataModel().metadataLoaded().then(() => {
            this.getODataModel().addAnnotationXML(xmlAnnotations);
        });
    }

    private populateFieldLabels(properties?: Property[]): void {
        if (!properties) {
            throw new Error(`EntitySet ${this.getEntityName()} does not contain any property!`);
        }

        properties.forEach((property) => {
            let label = property.name;

            switch (this.namingStrategy) {
                case NamingStrategies.CAMEL_CASE:
                    label = Util.getCamelCaseLabel(property.name);
                    break;
                case NamingStrategies.PASCAL_CASE:
                    label = Util.getPascalCaseLabel(property.name);
                    break;
                case NamingStrategies.SNAKE_CASE:
                    label = Util.getSnakeCaseLabel(property.name);
                    break;
                case NamingStrategies.CONSTANT_CASE:
                    label = Util.getConstantCaseLabel(property.name);
                    break;
                case NamingStrategies.KEBAB_CASE:
                    label = Util.getKebabCaseLabel(property.name);
                    break;
            }

            this.entityTypeLabels.push({
                originalProperty: property.name,
                generatedLabel: label
            });
        });
    }

    private async getFormXMLAnnotations(entityTypeName: string): Promise<string> {
        const edmxNamespace = "http://docs.oasis-open.org/odata/ns/edmx";
        const xmlDoc = document.implementation.createDocument(edmxNamespace, "edmx:Edmx");
        const edmxElement = xmlDoc.documentElement;
        const uris = [
            this.getMetadataUrl(),
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
            this.getODataModel().metadataLoaded().then(() => {
                const metadata = this.getODataModel().getServiceMetadata() as IODataMetadata;

                if (metadata.dataServices.schema.length) {
                    resolve(metadata.dataServices.schema[0].namespace || "");
                }
            });
        });
    }
}