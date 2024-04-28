import Controller from "sap/ui/core/mvc/Controller";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import { FormTypes } from "ui5/antares/types/entry/enums";

export default class EntryCreateCL<EntityT extends object> extends ODataCreateCL<EntityT> {
    private fragmentPath?: string;
    private formType: FormTypes = FormTypes.SMART;
    private formId?: string;

    constructor(controller: Controller, entityName: string) {
        super(controller, entityName);
    }

    public setFragmentPath(fragmentPath: string) {
        this.fragmentPath = fragmentPath;
    }

    public setForm(formId: string, formType: FormTypes) {
        this.formType = formType;
        this.formId = formId;
    }

    public createNewEntry() {
        this.getODataModel().getServiceMetadata();
    }
}