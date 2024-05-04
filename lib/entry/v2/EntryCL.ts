import { ButtonType } from "sap/m/library";
import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import ModelCL from "ui5/antares/base/v2/ModelCL";
import { FormTypes, NamingStrategies } from "ui5/antares/types/entry/enums";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import CustomControlCL from "ui5/antares/ui/CustomControlCL";

/**
 * @namespace ui5.antares.entry.v2
 */
export default abstract class EntryCL extends ModelCL {
    private fragmentPath?: string;
    private formId?: string;
    private formTitle: string;
    private entityPath: string;
    private entityName: string;
    private formType: FormTypes = FormTypes.SMART;
    private namingStrategy: NamingStrategies = NamingStrategies.CAMEL_CASE;
    private beginButtonText: string;
    private endButtonText: string = "Close";
    private beginButtonType: ButtonType = ButtonType.Success;
    private endButtonType: ButtonType = ButtonType.Negative;
    private propertyOrder: string[] = [];
    private useAllProperties: boolean = true;
    private excludedProperties: string[] = [];
    private mandatoryProperties: string[] = [];
    private resourceBundlePrefix: string = "antares";
    private useMetadataLabels: boolean = false;
    private errorMessage: string = "Please fill in all required fields.";
    private customControls: CustomControlCL[] = [];
    private customContents: Control[] = [];

    constructor(controller: Controller | UIComponent, entityPath: string, method: ODataMethods, modelName?: string) {
        super(controller, modelName);
        this.entityPath = entityPath.startsWith("/") ? entityPath : `/${entityPath}`;
        this.entityName = this.entityPath.slice(1);

        switch (method) {
            case ODataMethods.CREATE:
                this.beginButtonText = "Create";
                this.formTitle = `Create New ${this.entityName}`;
                break;
            case ODataMethods.UPDATE:
                this.beginButtonText = "Update";
                this.formTitle = `Update ${this.entityName}`;
                break;
            case ODataMethods.DELETE:
                this.beginButtonText = "Delete";
                this.formTitle = `Delete ${this.entityName}`;
                break;
            case ODataMethods.READ:
                this.beginButtonText = "Read";
                this.formTitle = `Read ${this.entityName}`;
                break;
        }
    }

    public getEntityPath(): string {
        return this.entityPath;
    }

    public getEntityName(): string {
        return this.entityName;
    }

    public getFragmentPath(): string | undefined {
        return this.fragmentPath;
    }

    public setFragmentPath(fragmentPath: string) {
        this.fragmentPath = fragmentPath;
    }

    public getFormId(): string | undefined {
        return this.formId;
    }

    public setFormId(formId: string) {
        this.formId = formId;
    }

    public getFormType(): FormTypes {
        return this.formType;
    }

    public setFormType(formType: FormTypes) {
        this.formType = formType;
    }

    public getNamingStrategy(): NamingStrategies {
        return this.namingStrategy;
    }

    public setNamingStrategy(strategy: NamingStrategies) {
        this.namingStrategy = strategy;
    }

    public getFormTitle(): string | undefined {
        return this.formTitle;
    }

    public setFormTitle(title: string) {
        this.formTitle = title;
    }

    public getBeginButtonText(): string {
        return this.beginButtonText;
    }

    public setBeginButtonText(text: string) {
        this.beginButtonText = text;
    }

    public getEndButtonText(): string {
        return this.endButtonText;
    }

    public setEndButtonText(text: string) {
        this.endButtonText = text;
    }

    public getBeginButtonType(): ButtonType {
        return this.beginButtonType;
    }

    public setBeginButtonType(type: ButtonType) {
        this.beginButtonType = type;
    }

    public getEndButtonType(): ButtonType {
        return this.endButtonType;
    }

    public setEndButtonType(type: ButtonType) {
        this.endButtonType = type;
    }

    public getPropertyOrder(): string[] {
        return this.propertyOrder;
    }

    public getUseAllProperties(): boolean {
        return this.useAllProperties;
    }

    public setPropertyOrder(order: string[], useAllProperties: boolean = true) {
        this.propertyOrder = order;
        this.useAllProperties = useAllProperties;
    }

    public getExcludedProperties(): string[] {
        return this.excludedProperties;
    }

    public setExcludedProperties(properties: string[]) {
        this.excludedProperties = properties;
    }

    public getMandatoryProperties(): string[] {
        return this.mandatoryProperties;
    }

    public setMandatoryProperties(properties: string[]) {
        this.mandatoryProperties = properties;
    }

    public getResourceBundlePrefix(): string {
        return this.resourceBundlePrefix;
    }

    public setResourceBundlePrefix(prefix: string) {
        this.resourceBundlePrefix = prefix;
    }

    public getUseMetadataLabels(): boolean {
        return this.useMetadataLabels;
    }

    public setUseMetadataLabels(useMetadataLabels: boolean) {
        this.useMetadataLabels = useMetadataLabels;
    }

    public getErrorMessage(): string {
        return this.errorMessage;
    }

    public setErrorMessage(message: string) {
        this.errorMessage = message;
    }

    public addCustomControl(control: CustomControlCL) {
        this.customControls.push(control);
    }

    public getCustomControls(): CustomControlCL[] {
        return this.customControls;
    }

    public getCustomControl(propertyName: string): CustomControlCL | undefined {
        const customControl = this.customControls.find(control => control.getPropertyName() === propertyName);
        return customControl;
    }

    public addCustomContent(content: Control) {
        this.customContents.push(content);
    }

    public getCustomContents(): Control[] {
        return this.customContents;
    }
}