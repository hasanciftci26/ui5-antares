import DatePicker from "sap/m/DatePicker";
import DateTimePicker from "sap/m/DateTimePicker";
import Input from "sap/m/Input";
import { ButtonType } from "sap/m/library";
import SmartField from "sap/ui/comp/smartfield/SmartField";
import GroupElement from "sap/ui/comp/smartform/GroupElement";
import SmartForm from "sap/ui/comp/smartform/SmartForm";
import BusyIndicator from "sap/ui/core/BusyIndicator";
import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import Context from "sap/ui/model/Context";
import ModelCL from "ui5/antares/base/v2/ModelCL";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";
import { FormTypes, NamingStrategies } from "ui5/antares/types/entry/enums";
import { ISubmitResponse, ISubmitChangeResponse } from "ui5/antares/types/entry/submit";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import CustomControlCL from "ui5/antares/ui/CustomControlCL";
import DialogCL from "ui5/antares/ui/DialogCL";
import ResponseCL from "ui5/antares/entry/v2/ResponseCL";
import ValueHelpCL from "ui5/antares/ui/ValueHelpCL";

/**
 * @namespace ui5.antares.entry.v2
 */
export default abstract class EntryCL<EntityT extends object = object> extends ModelCL {
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
    private entryContext: Context;
    private entryDialog: DialogCL;
    private submitCompleted?: (response: ResponseCL<EntityT>) => void;
    private submitCompletedListener?: object;
    private submitFailed?: (response: ResponseCL<ISubmitResponse>) => void;
    private submitFailedListener?: object;
    private valueHelps: ValueHelpCL[] = [];

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

    public addValueHelp(valueHelp: ValueHelpCL) {
        this.valueHelps.push(valueHelp);
    }

    public getValueHelps(): ValueHelpCL[] {
        return this.valueHelps;
    }

    public getValueHelp(propertyName: string): ValueHelpCL | undefined {
        const valueHelp = this.valueHelps.find(vh => vh.getPropertyName() === propertyName);
        return valueHelp;
    }

    public attachSubmitCompleted(submitCompleted: (response: ResponseCL<EntityT>) => void, listener?: object) {
        this.submitCompleted = submitCompleted;

        if (listener) {
            this.submitCompletedListener = listener;
        } else {
            this.submitCompletedListener = this.getSourceController();
        }
    }

    public attachSubmitFailed(submitFailed: (response: ResponseCL<ISubmitResponse>) => void, listener: object) {
        this.submitFailed = submitFailed;

        if (listener) {
            this.submitFailedListener = listener;
        } else {
            this.submitFailedListener = this.getSourceController();
        }
    }

    protected createEntryContext(data?: EntityT) {
        const entry = new ODataCreateCL<EntityT>(this.getSourceController(), this.entityPath, this.getModelName());

        if (data) {
            entry.setData(data);
        }

        this.entryContext = entry.createEntry();
    }

    protected getEntryContext(): Context {
        return this.entryContext;
    }

    protected createEntryDialog(dialogId: string) {
        this.entryDialog = new DialogCL(dialogId);
    }

    protected getEntryDialog(): DialogCL {
        return this.entryDialog;
    }

    protected closeEntryDialog() {
        this.entryDialog.getDialog().close();
    }

    protected destroyEntryDialog() {
        this.entryDialog.getDialog().destroy();
    }

    protected mandatoryFieldCheck(): boolean {
        if (this.formType === FormTypes.SMART) {
            return this.checkSmartMandatory();
        } else {
            return this.checkSimpleMandatory();
        }
    }

    private checkSmartMandatory(): boolean {
        let checkFailed = false;
        const smartGroupElements = (this.entryDialog.getDialog().getContent()[0] as SmartForm).getGroups()[0].getGroupElements() as GroupElement[];

        smartGroupElements.forEach((element) => {
            const control = element.getElements()[0];
            const customData = control.getCustomData().find(data => data.getKey() === "UI5AntaresCustomControlName");

            if (customData) {
                const customControl = this.getCustomControl(customData.getValue());

                if (customControl) {
                    if (customControl.getMandatoryHandler()?.call(customControl.getListener(), customControl.getControl())) {
                        checkFailed = true;
                    }
                }
            } else {
                if ((control as SmartField).getMandatory() && !(control as SmartField).getValue()) {
                    (control as SmartField).setValueState("Error");
                    checkFailed = true;
                }
            }
        });

        return checkFailed;
    }

    private checkSimpleMandatory(): boolean {
        let checkFailed = false;
        const simpleFormElements = (this.entryDialog.getDialog().getContent()[0] as SimpleForm).getContent();

        for (const element of simpleFormElements) {
            const customData = element.getCustomData().find(data => data.getKey() === "UI5AntaresCustomControlName");

            if (customData) {
                const customControl = this.getCustomControl(customData.getValue());

                if (customControl) {
                    if (customControl.getMandatoryHandler()?.call(customControl.getListener(), customControl.getControl())) {
                        checkFailed = true;
                    }
                }
            } else {
                if (element.getMetadata().getName() === "sap.m.Label" || element.getMetadata().getName() === "sap.m.CheckBox") {
                    continue;
                }

                switch (element.getMetadata().getName()) {
                    case "sap.m.Input":
                        if ((element as Input).getRequired() && !(element as Input).getValue()) {
                            (element as Input).setValueState("Error");
                            checkFailed = true;
                        }
                        break;
                    case "sap.m.DatePicker":
                        if ((element as DatePicker).getRequired() && !(element as DatePicker).getValue()) {
                            (element as DatePicker).setValueState("Error");
                            checkFailed = true;
                        }
                        break;
                    case "sap.m.DateTimePicker":
                        if ((element as DateTimePicker).getRequired() && !(element as DateTimePicker).getValue()) {
                            (element as DateTimePicker).setValueState("Error");
                            checkFailed = true;
                        }
                        break;
                }
            }
        }

        return checkFailed;
    }

    public reset(resetAll: boolean = false) {
        if (this.getODataModel().hasPendingChanges()) {
            if (resetAll) {
                this.getODataModel().resetChanges();
            } else {
                this.getODataModel().resetChanges([this.entryContext.getPath()]);
            }
        }
        this.setOldBindingMode();
    }

    public submit(resetAllOnFail: boolean = false) {
        if (this.getODataModel().hasPendingChanges()) {
            BusyIndicator.show(1);

            this.getODataModel().submitChanges({
                success: (response?: ISubmitChangeResponse<EntityT>) => {
                    BusyIndicator.hide();

                    if (response?.__batchResponses) {
                        let statusCode = response.__batchResponses[0].response?.statusCode;

                        if (!statusCode && response.__batchResponses[0].__changeResponses) {
                            statusCode = response.__batchResponses[0].__changeResponses[0].statusCode ||
                                response.__batchResponses[0].__changeResponses[0].response?.statusCode;
                        }

                        if (statusCode) {
                            if (statusCode.startsWith("4") || statusCode.startsWith("5")) {
                                this.reset(resetAllOnFail);

                                if (this.submitFailed) {
                                    let responseObject = response.__batchResponses[0].response;

                                    if (!responseObject && response.__batchResponses[0].__changeResponses) {
                                        responseObject = response.__batchResponses[0].__changeResponses[0].response;
                                    }
                                    const errorResponse = new ResponseCL<ISubmitResponse>(responseObject, statusCode);
                                    this.submitFailed.call(this.submitFailedListener, errorResponse);
                                }
                            } else {
                                if (this.submitCompleted) {
                                    let responseData: EntityT | undefined;

                                    if (response.__batchResponses[0].__changeResponses) {
                                        responseData = response.__batchResponses[0].__changeResponses[0].data;
                                    }

                                    const successResponse = new ResponseCL<EntityT>(responseData, statusCode);
                                    this.submitCompleted.call(this.submitCompletedListener, successResponse);
                                }
                            }
                        } else {
                            this.reset();
                            if (this.submitFailed) {
                                const responseObject: ISubmitResponse = {
                                    statusCode: "422",
                                    statusText: "Status Code was not found!"
                                };
                                const errorResponse = new ResponseCL<ISubmitResponse>(responseObject, "422");
                                this.submitFailed.call(this.submitFailedListener, errorResponse);
                            }
                        }
                    }
                },
                error: () => {
                    BusyIndicator.hide();
                    this.reset();
                    if (this.submitFailed) {
                        const responseObject: ISubmitResponse = {
                            statusCode: "500",
                            statusText: "An unknown error occured!"
                        };
                        const errorResponse = new ResponseCL<ISubmitResponse>(responseObject, "500");
                        this.submitFailed.call(this.submitFailedListener, errorResponse);
                    }
                }
            });
        }

        this.setOldBindingMode();
        this.closeEntryDialog();
        this.destroyEntryDialog();
    }
}