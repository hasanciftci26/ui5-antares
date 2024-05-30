import CheckBox from "sap/m/CheckBox";
import DatePicker from "sap/m/DatePicker";
import DateTimePicker from "sap/m/DateTimePicker";
import Input from "sap/m/Input";
import Label from "sap/m/Label";
import BaseObject from "sap/ui/base/Object";
import CustomData from "sap/ui/core/CustomData";
import UI5Element from "sap/ui/core/Element";
import { IValueValidation } from "ui5/antares/types/entry/submit";
import CustomControlCL from "ui5/antares/ui/CustomControlCL";
import ValidationLogicCL from "ui5/antares/ui/ValidationLogicCL";

/**
 * @namespace ui5.antares.entry.v2
 */
export default class SimpleValidatorCL extends BaseObject {
    private simpleFormElements: UI5Element[];
    private customControls: CustomControlCL[];
    private validationLogics: ValidationLogicCL[];
    private mandatoryErrorMessage: string;

    constructor(simpleFormElements: UI5Element[], customControls: CustomControlCL[], validationLogics: ValidationLogicCL[], mandatoryErrorMessage: string) {
        super();
        this.simpleFormElements = simpleFormElements;
        this.customControls = customControls;
        this.validationLogics = validationLogics;
        this.mandatoryErrorMessage = mandatoryErrorMessage;
    }

    public validate(): IValueValidation {
        const validation: IValueValidation = {
            validated: true,
            message: this.mandatoryErrorMessage,
            type: "MANDATORY"
        };

        for (const element of this.simpleFormElements) {
            const customControlData = element.getCustomData().find(data => data.getKey() === "UI5AntaresCustomControlName");

            if (customControlData) {
                this.customControlValidation(customControlData, validation);
            } else {
                this.standardControlValidation(element, validation);
            }

            if (!validation.validated) {
                break;
            }
        }

        return validation;
    }

    private customControlValidation(customControlData: CustomData, validation: IValueValidation) {
        const customControl = this.getCustomControl(customControlData.getValue());

        if (!customControl) {
            return;
        }

        const validator = customControl.getValidator();

        if (!validator) {
            return;
        }

        if (!validator.getValidatorMethod()) {
            throw new Error("Validator method must be provided for custom controls!");
        }

        if (!validator.validate(customControl.getControl(), "UNKNOWN")) {
            validation.validated = false;
            validation.type = "VALIDATION";
            validation.message = validator.getValidationMessage();

        }
    }

    private getCustomControl(propertyName: string): CustomControlCL | undefined {
        const customControl = this.customControls.find(control => control.getPropertyName() === propertyName);
        return customControl;
    }

    private standardControlValidation(control: UI5Element, validation: IValueValidation) {
        if (control instanceof CheckBox || control instanceof Label) {
            return;
        }

        const standardControlName = control.getCustomData().find(data => data.getKey() === "UI5AntaresStandardControlName");

        if (control instanceof Input) {
            this.inputValidation(control, validation, standardControlName);
        } else if (control instanceof DatePicker) {
            this.datePickerValidation(control, validation, standardControlName)
        } else if (control instanceof DateTimePicker) {
            this.dateTimePickerValidation(control, validation, standardControlName);
        }
    }

    private inputValidation(input: Input, validation: IValueValidation, standardControlName?: CustomData) {
        if (input.getRequired() && !input.getValue()) {
            input.setValueState("Error");
            validation.validated = false;
            validation.type = "MANDATORY";
            validation.message = this.mandatoryErrorMessage;
        }

        if (!standardControlName) {
            return;
        }

        const validator = this.getValidationLogic(standardControlName.getValue());

        if (!validator) {
            return;
        }

        const standardControlType = input.getCustomData().find(data => data.getKey() === "UI5AntaresStandardControlType");

        if (!standardControlType) {
            return;
        }

        if (!validator.validate(input.getValue() || "", standardControlType.getValue())) {
            validation.validated = false;
            validation.type = "VALIDATION";
            validation.message = validator.getValidationMessage();
        }
    }

    private datePickerValidation(datePicker: DatePicker, validation: IValueValidation, standardControlName?: CustomData) {
        if (datePicker.getRequired() && !datePicker.getDateValue()) {
            datePicker.setValueState("Error");
            validation.validated = false;
            validation.type = "MANDATORY";
            validation.message = this.mandatoryErrorMessage;
        }

        if (!standardControlName) {
            return;
        }

        const validator = this.getValidationLogic(standardControlName.getValue());

        if (!validator) {
            return;
        }

        const standardControlType = datePicker.getCustomData().find(data => data.getKey() === "UI5AntaresStandardControlType");

        if (!standardControlType) {
            return;
        }

        if (!validator.validate(datePicker.getDateValue() as Date || "", standardControlType.getValue())) {
            validation.validated = false;
            validation.type = "VALIDATION";
            validation.message = validator.getValidationMessage();
        }
    }

    private dateTimePickerValidation(dateTimePicker: DateTimePicker, validation: IValueValidation, standardControlName?: CustomData) {
        if (dateTimePicker.getRequired() && !dateTimePicker.getDateValue()) {
            dateTimePicker.setValueState("Error");
            validation.validated = false;
            validation.type = "MANDATORY";
            validation.message = this.mandatoryErrorMessage;
        }

        if (!standardControlName) {
            return;
        }

        const validator = this.getValidationLogic(standardControlName.getValue());

        if (!validator) {
            return;
        }

        const standardControlType = dateTimePicker.getCustomData().find(data => data.getKey() === "UI5AntaresStandardControlType");

        if (!standardControlType) {
            return;
        }

        if (!validator.validate(dateTimePicker.getDateValue() as Date || "", standardControlType.getValue())) {
            validation.validated = false;
            validation.type = "VALIDATION";
            validation.message = validator.getValidationMessage();
        }
    }

    private getValidationLogic(propertyName: string): ValidationLogicCL | undefined {
        const validationLogic = this.validationLogics.find(logic => logic.getPropertyName() === propertyName);
        return validationLogic;
    }
}