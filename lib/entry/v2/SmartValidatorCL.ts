import BaseObject from "sap/ui/base/Object";
import SmartField from "sap/ui/comp/smartfield/SmartField";
import GroupElement from "sap/ui/comp/smartform/GroupElement";
import CustomData from "sap/ui/core/CustomData";
import { IValueValidation } from "ui5/antares/types/entry/submit";
import CustomControlCL from "ui5/antares/ui/CustomControlCL";
import ValidationLogicCL from "ui5/antares/ui/ValidationLogicCL";

/**
 * @namespace ui5.antares.entry.v2
 */
export default class SmartValidatorCL extends BaseObject {
    private groupElements: GroupElement[];
    private customControls: CustomControlCL[];
    private validationLogics: ValidationLogicCL[];
    private mandatoryErrorMessage: string;

    constructor(groupElements: GroupElement[], customControls: CustomControlCL[], validationLogics: ValidationLogicCL[], mandatoryErrorMessage: string) {
        super();
        this.groupElements = groupElements;
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

        for (const element of this.groupElements) {
            const control = element.getElements()[0];
            const customControlData = control.getCustomData().find(data => data.getKey() === "UI5AntaresCustomControlName");

            if (customControlData) {
                this.customControlValidation(customControlData, validation);
            } else {
                this.standardControlValidation((control as SmartField), validation);
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

    private standardControlValidation(control: SmartField, validation: IValueValidation) {
        const standardControlName = control.getCustomData().find(data => data.getKey() === "UI5AntaresStandardControlName");
        const standardControlType = control.getCustomData().find(data => data.getKey() === "UI5AntaresStandardControlType");

        if (control.getMandatory() && !control.getValue()) {
            control.setValueState("Error");
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

        if (!standardControlType) {
            return;
        }

        if (!validator.validate(control.getValue() || "", standardControlType.getValue())) {
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