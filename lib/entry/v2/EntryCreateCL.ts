import Controller from "sap/ui/core/mvc/Controller";
import AnnotationCL from "ui5/antares/annotation/v2/AnnotationCL";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import { FormTypes, NamingStrategies } from "ui5/antares/types/entry/enums";

export default class EntryCreateCL<EntityT extends object> extends ODataCreateCL<EntityT> {
    private fragmentPath?: string;
    private namingStrategy: NamingStrategies = NamingStrategies.CAMEL_CASE;
    private formType: FormTypes = FormTypes.SMART;
    private formId?: string;

    constructor(controller: Controller, entityName: string) {
        super(controller, entityName);
    }

    public setFragmentPath(fragmentPath: string) {
        this.fragmentPath = fragmentPath;
    }

    public setFormId(formId: string) {
        this.formId = formId;
    }

    public setFormType(formType: FormTypes) {
        this.formType = formType;
    }

    public setNamingStrategy(strategy: NamingStrategies) {
        this.namingStrategy = strategy;
    }

    public createNewEntry() {
        if (!this.fragmentPath) {
            this.generateDialog();
        }
    }

    private generateDialog() {
        const annotation = new AnnotationCL(this.namingStrategy, this.getODataModel(), this.getEntityName(), this.getMetadataUrl());
        annotation.generateFormAnnotations().then((resolve) => {
            let test = "x";
        });
    }
}