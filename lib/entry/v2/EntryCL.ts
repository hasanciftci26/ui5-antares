import { ButtonType } from "sap/m/library";
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
import { DialogStrategies, FormTypes, GuidStrategies, NamingStrategies } from "ui5/antares/types/entry/enums";
import { ISubmitResponse, ISubmitChangeResponse, IValueValidation } from "ui5/antares/types/entry/submit";
import { ODataMethods } from "ui5/antares/types/odata/enums";
import CustomControlCL from "ui5/antares/ui/CustomControlCL";
import DialogCL from "ui5/antares/ui/DialogCL";
import ResponseCL from "ui5/antares/entry/v2/ResponseCL";
import ValueHelpCL from "ui5/antares/ui/ValueHelpCL";
import FragmentCL from "ui5/antares/ui/FragmentCL";
import EntityCL from "ui5/antares/entity/v2/EntityCL";
import MessageBox from "sap/m/MessageBox";
import Table from "sap/m/Table";
import SmartTable from "sap/ui/comp/smarttable/SmartTable";
import View from "sap/ui/core/mvc/View";
import UITable from "sap/ui/table/Table";
import TreeTable from "sap/ui/table/TreeTable";
import AnalyticalTable from "sap/ui/table/AnalyticalTable";
import ValidationLogicCL from "ui5/antares/ui/ValidationLogicCL";
import SmartValidatorCL from "ui5/antares/entry/v2/SmartValidatorCL";
import SimpleValidatorCL from "ui5/antares/entry/v2/SimpleValidatorCL";

/**
 * @namespace ui5.antares.entry.v2
 */
export default abstract class EntryCL<EntityT extends object = object, EntityKeysT extends object = object> extends ModelCL {
    private fragmentPath?: string;
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
    private readonlyProperties: string[] = [];
    private resourceBundlePrefix: string = "antares";
    private useMetadataLabels: boolean = false;
    private mandatoryErrorMessage: string = "Please fill in all required fields.";
    private selectRowMessage: string = "Please select a row from the table.";
    private customControls: CustomControlCL[] = [];
    private customContents: Control[] = [];
    private entryContext: Context;
    private entryDialog: DialogCL | FragmentCL;
    private submitCompleted?: (response: ResponseCL<EntityT>) => void;
    private submitCompletedListener?: object;
    private submitFailed?: (response: ResponseCL<ISubmitResponse>) => void;
    private submitFailedListener?: object;
    private valueHelps: ValueHelpCL[] = [];
    private dialogStrategy: DialogStrategies = DialogStrategies.CREATE;
    private containsSmartForm: boolean = false;
    private autoMandatoryCheck: boolean = true;
    private readonly tableModes: string[] = ["SingleSelect", "SingleSelectLeft", "SingleSelectMaster"];
    private uiTableModes: string[] = ["Single"];
    private tableId?: string;
    private readonly supportedTableTypes: string[] = [
        "sap.m.Table", "sap.ui.table.Table", "sap.ui.comp.smarttable.SmartTable",
        "sap.ui.table.TreeTable", "sap.ui.table.AnalyticalTable"
    ];
    private entityKeys?: EntityKeysT;
    private validationLogics: ValidationLogicCL[] = [];
    private displayGuidProperties: GuidStrategies = GuidStrategies.ONLY_NON_KEY;
    private generateRandomGuid: GuidStrategies = GuidStrategies.ONLY_KEY;

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

    public setFragmentPath(fragmentPath: string, containsSmartForm: boolean = false) {
        this.fragmentPath = fragmentPath;
        this.containsSmartForm = containsSmartForm;
        this.setDialogStrategy(DialogStrategies.LOAD);
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

    public getMandatoryErrorMessage(): string {
        return this.mandatoryErrorMessage;
    }

    public setMandatoryErrorMessage(message: string) {
        this.mandatoryErrorMessage = message;
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

    protected setDialogStrategy(strategy: DialogStrategies) {
        this.dialogStrategy = strategy;
    }

    protected getDialogStrategy(): DialogStrategies {
        return this.dialogStrategy;
    }

    protected getContainsSmartForm(): boolean {
        return this.containsSmartForm;
    }

    public setAutoMandatoryCheck(autoMandatoryCheck: boolean) {
        this.autoMandatoryCheck = autoMandatoryCheck;
    }

    public getAutoMandatoryCheck(): boolean {
        return this.autoMandatoryCheck;
    }

    public setEntityKeys(keys: EntityKeysT) {
        this.entityKeys = keys;
    }

    public getEntityKeys(): EntityKeysT | undefined {
        return this.entityKeys;
    }

    public setSelectRowMessage(message: string) {
        this.selectRowMessage = message;
    }

    public getSelectRowMessage(): string {
        return this.selectRowMessage;
    }

    public addValidationLogic(logic: ValidationLogicCL) {
        this.validationLogics.push(logic);
    }

    public getValidationLogics(): ValidationLogicCL[] {
        return this.validationLogics;
    }

    public getValidationLogic(propertyName: string): ValidationLogicCL | undefined {
        const logic = this.validationLogics.find(logic => logic.getPropertyName() === propertyName);
        return logic;
    }

    public setDisplayGuidProperties(strategy: GuidStrategies) {
        this.displayGuidProperties = strategy;
    }

    public getDisplayGuidProperties(): GuidStrategies {
        return this.displayGuidProperties;
    }

    public setGenerateRandomGuid(strategy: GuidStrategies) {
        this.generateRandomGuid = strategy;
    }

    public getGenerateRandomGuid(): GuidStrategies {
        return this.generateRandomGuid;
    }

    public setReadonlyProperties(properties: string[]) {
        this.readonlyProperties = properties;
    }

    public getReadonlyProperties(): string[] {
        return this.readonlyProperties;
    }

    public async addControlFromFragment(fragment: FragmentCL) {
        await fragment.load();
        const content = fragment.getFragmentContent();

        if (Array.isArray(content)) {
            for (const control of content) {
                const customControlData = control.getCustomData().find(data => data.getKey() === "UI5AntaresEntityPropertyName");
                const controlName = control.getMetadata().getName();

                if (!customControlData) {
                    throw new Error(`Custom Data with key UI5AntaresEntityPropertyName is missing in the control: ${controlName}`);
                }

                const propertyName = customControlData.getValue();
                const validationMessage = this.getValidationLogicMessage(control);
                const validationLogic = this.getValidationLogicMethod(control, propertyName, validationMessage);
                const customControl = new CustomControlCL(control, propertyName, validationLogic);
                this.customControls.push(customControl);
            }
        } else {
            const customControlData = content.getCustomData().find(data => data.getKey() === "UI5AntaresEntityPropertyName");
            const controlName = content.getMetadata().getName();

            if (!customControlData) {
                throw new Error(`Custom Data with key UI5AntaresEntityPropertyName is missing in the control: ${controlName}`);
            }

            const propertyName = customControlData.getValue();
            const validationMessage = this.getValidationLogicMessage(content);
            const validationLogic = this.getValidationLogicMethod(content, propertyName, validationMessage);
            const customControl = new CustomControlCL(content, propertyName, validationLogic);
            this.customControls.push(customControl);
        }
    }

    public async addContentFromFragment(fragment: FragmentCL) {
        await fragment.load();
        const content = fragment.getFragmentContent();

        if (Array.isArray(content)) {
            content.forEach(control => this.customContents.push(control));
        } else {
            this.customContents.push(content);
        }
    }

    protected async addNonNullableProperties() {
        const entity = new EntityCL(this.getSourceController(), this.entityName, this.getResourceBundlePrefix(), this.namingStrategy, this.getModelName());
        const entityTypeProperties = await entity.getEntityTypeProperties();

        for (const property of entityTypeProperties) {
            if (this.mandatoryProperties.includes(property.propertyName)) {
                continue;
            }

            if (property.nullable === "false") {
                this.mandatoryProperties.push(property.propertyName);
            }
        }
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

    public getEntryContext(): Context {
        return this.entryContext;
    }

    protected createEntryDialog(dialogId?: string) {
        if (dialogId) {
            this.entryDialog = new DialogCL(dialogId);
        } else {
            this.entryDialog = new FragmentCL(this.getSourceController(), this.fragmentPath!);
        }
    }

    protected getEntryDialog(): DialogCL | FragmentCL {
        return this.entryDialog;
    }

    protected closeEntryDialog() {
        if (this.entryDialog instanceof DialogCL) {
            this.entryDialog.getDialog().close();
        } else {
            this.entryDialog.close();
        }
    }

    protected destroyEntryDialog() {
        if (this.entryDialog instanceof DialogCL) {
            this.entryDialog.getDialog().destroy();
        } else {
            this.entryDialog.destroyFragmentContent();
        }
    }

    protected valueValidation(): IValueValidation {
        if (this.formType === FormTypes.SMART) {
            return this.validateSmartValues();
        } else {
            return this.validateSimpleValues();
        }
    }

    private validateSmartValues(): IValueValidation {
        const smartGroupElements = ((this.entryDialog as DialogCL).getDialog().getContent()[0] as SmartForm).getGroups()[0].getGroupElements() as GroupElement[];
        const validator = new SmartValidatorCL(smartGroupElements, this.customControls, this.validationLogics, this.mandatoryErrorMessage);
        return validator.validate();
    }

    private validateSimpleValues(): IValueValidation {
        const simpleFormElements = ((this.entryDialog as DialogCL).getDialog().getContent()[0] as SimpleForm).getContent();
        const validator = new SimpleValidatorCL(simpleFormElements, this.customControls, this.validationLogics, this.mandatoryErrorMessage);
        return validator.validate();
    }

    private checkContextMandatory(): boolean {
        const entryObject = this.entryContext.getObject();
        const objectKeys = Object.keys(entryObject);
        return this.mandatoryProperties.every(prop => objectKeys.includes(prop));
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

        if (this.getDialogStrategy() === DialogStrategies.LOAD) {
            this.closeEntryDialog();
            this.destroyEntryDialog();
        }
    }

    public submit(resetAllOnFail: boolean = false) {
        if (this.getODataModel().hasPendingChanges()) {
            if (this.dialogStrategy === DialogStrategies.LOAD && this.autoMandatoryCheck) {
                if (!this.checkContextMandatory()) {
                    MessageBox.error(this.mandatoryErrorMessage);
                    return;
                }
            }

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
                                    statusText: "Status Code not found!"
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

    protected async initializeContext(initializer?: string | Context) {
        if (initializer) {
            this.setInitializer(initializer);

            if (this.tableId) {
                this.initContextFromTable();
            }
        } else {
            await this.createBindingContext();
        }
    }

    private setInitializer(initializer: string | Context) {
        if (initializer instanceof Context) {
            this.entryContext = initializer;
        } else {
            this.tableId = initializer;
        }
    }

    private initContextFromTable() {
        const table = (this.getSourceView() as View).byId(this.tableId!);

        if (!table) {
            throw new Error(`Table with ID: ${this.tableId} not found!`);
        }

        if (table instanceof Table) {
            this.tableContext(table);
        } else if (table instanceof UITable) {
            this.uiTableContext(table);
        } else if (table instanceof SmartTable) {
            const innerTable = table.getTable();

            if (innerTable instanceof Table) {
                this.tableContext(innerTable);
            } else if (innerTable instanceof UITable) {
                this.uiTableContext(innerTable);
            } else if (innerTable instanceof TreeTable) {
                this.uiTableContext(innerTable);
            } else if (innerTable instanceof AnalyticalTable) {
                this.uiTableContext(innerTable);
            }
        } else if (table instanceof TreeTable) {
            this.uiTableContext(table);
        } else if (table instanceof AnalyticalTable) {
            this.uiTableContext(table);
        } else {
            throw new Error(`Supported table types: ${this.supportedTableTypes.join(", ")}`);
        }
    }

    private tableContext(table: Table) {
        const selectionMode = table.getMode();

        if (!this.tableModes.includes(selectionMode)) {
            throw new Error(`Please activate one of the following selection modes: ${this.tableModes.join(", ")}`);
        }

        const selectedItem = table.getSelectedItem();

        if (!selectedItem) {
            MessageBox.error(this.selectRowMessage);
            throw new Error("No row selected by the end user!");
        }

        const bindingContext = selectedItem.getBindingContext();

        if (!bindingContext) {
            throw new Error("Only OData binding is supported!");
        }

        this.entryContext = bindingContext;
    }

    private uiTableContext(table: UITable | TreeTable | AnalyticalTable) {
        const selectionMode = table.getSelectionMode();

        if (!this.uiTableModes.includes(selectionMode)) {
            throw new Error(`Please activate one of the following selection modes: ${this.uiTableModes.join(", ")}`);
        }

        const selectedIndices = table.getSelectedIndices();

        if (!selectedIndices.length) {
            MessageBox.error(this.selectRowMessage);
            throw new Error("No row selected by the end user!");
        }

        const bindingContext = table.getContextByIndex(selectedIndices[0]);

        if (!bindingContext) {
            throw new Error("Only OData binding is supported!");
        }

        this.entryContext = bindingContext;
    }

    private createBindingContext(): Promise<void> {
        return new Promise((resolve, reject) => {
            const entityKeys = this.getEntityKeys();

            if (!entityKeys) {
                throw new Error("Entity key values must be provided through setEntityKeys() method!");
            }

            const path = this.getODataModel().createKey(this.entityPath, entityKeys);
            this.getODataModel().createBindingContext(path, (context: Context | null) => {
                if (!context) {
                    throw new Error(`No data found for the following path: ${path}`);
                }

                this.entryContext = context;
                resolve();
            });
        });
    }

    private getValidationLogicMethod(control: Control, propertyName: string, validationMessage?: string): ValidationLogicCL | undefined {
        let validationLogic: ValidationLogicCL | undefined;
        const validationLogicData = control.getCustomData().find(data => data.getKey() === "UI5AntaresValidationLogic");

        if (validationLogicData) {
            const methodName = validationLogicData.getValue() as string;
            const sourceController = this.getSourceController() as any;

            if (methodName in sourceController) {
                if (typeof sourceController[methodName] === "function") {
                    validationLogic = new ValidationLogicCL({
                        propertyName: propertyName,
                        validator: sourceController[methodName],
                        listener: this.getSourceController(),
                        message: validationMessage
                    });
                }
            }
        }

        return validationLogic;
    }

    private getValidationLogicMessage(control: Control): string | undefined {
        control.setModel(this.getResourceModel(), "i18n");
        const validationLogicData = control.getCustomData().find(data => data.getKey() === "UI5AntaresValidationMessage");

        if (!validationLogicData) {
            return;
        }

        return validationLogicData.getValue();
    }
}