import BaseObject from "sap/ui/base/Object";
import { ICorrectedValues, IValidationSettings, ValidatorValue, ValidatorValueParameter } from "ui5/antares/types/ui/validation";
import { ValidationOperator } from "ui5/antares/types/ui/enums";
import Control from "sap/ui/core/Control";
import NumberFormat from "sap/ui/core/format/NumberFormat";
import { PropertyType } from "ui5/antares/types/entity/type";
import MessageBox from "sap/m/MessageBox";

/**
 * @namespace ui5.antares.ui
 */
export default class ValidationLogicCL extends BaseObject {
    private propertyName: string;
    private validator?: (value: ValidatorValueParameter) => boolean;
    private listener?: object;
    private value1?: ValidatorValue;
    private value2?: ValidatorValue;
    private message: string;
    private operator: ValidationOperator;
    private showMessageBox: boolean;
    private invalidValueMessage: string;
    private readonly stringMethods: ValidationOperator[] = [
        ValidationOperator.Contains, ValidationOperator.EndsWith, ValidationOperator.NotContains,
        ValidationOperator.NotEndsWith, ValidationOperator.NotStartsWith, ValidationOperator.StartsWith
    ];
    private readonly numberTypes: string[] = [
        "Edm.Decimal", "Edm.Double", "Edm.Int16", "Edm.Int32", "Edm.Int64"
    ];

    constructor(settings: IValidationSettings) {
        super();
        this.propertyName = settings.propertyName;
        this.validator = settings.validator;
        this.listener = settings.listener;
        this.value1 = settings.value1;
        this.value2 = settings.value2;
        this.operator = settings.operator || ValidationOperator.EQ;
        this.message = settings.message || `Validation failed for ${this.propertyName}`;
        this.showMessageBox = settings.showMessageBox || true;
        this.invalidValueMessage = settings.invalidValueMessage || `Invalid value for ${this.propertyName}`;
    }

    public getPropertyName(): string {
        return this.propertyName;
    }

    public getValidationMessage(): string {
        return this.message;
    }

    public getValidatorMethod(): ((value: ValidatorValueParameter) => boolean) | undefined {
        return this.validator;
    }

    public validate(value: ValidatorValueParameter, type: PropertyType | "UNKNOWN"): boolean {
        if (this.validator) {
            return this.validator.call(this.listener || this, value);
        }

        if (value instanceof Control) {
            throw new Error("Validator method must be provided.");
        }

        this.valueControl(value);
        const correctedValues = this.valueCorrection(value, type);

        switch (this.operator) {
            case ValidationOperator.BT:
                return correctedValues.originalValue >= correctedValues.value1 && correctedValues.originalValue <= correctedValues.value2!;
            case ValidationOperator.Contains:
                return (correctedValues.originalValue as string).includes(correctedValues.value1 as string);
            case ValidationOperator.EndsWith:
                return (correctedValues.originalValue as string).endsWith(correctedValues.value1 as string);
            case ValidationOperator.GE:
                return correctedValues.originalValue >= correctedValues.value1;
            case ValidationOperator.GT:
                return correctedValues.originalValue > correctedValues.value1;
            case ValidationOperator.LE:
                return correctedValues.originalValue <= correctedValues.value1;
            case ValidationOperator.LT:
                return correctedValues.originalValue < correctedValues.value1;
            case ValidationOperator.NB:
                return !(correctedValues.originalValue >= correctedValues.value1 && correctedValues.originalValue <= correctedValues.value2!);
            case ValidationOperator.NE:
                return correctedValues.originalValue !== correctedValues.value1;
            case ValidationOperator.NotContains:
                return !((correctedValues.originalValue as string).includes(correctedValues.value1 as string));
            case ValidationOperator.NotEndsWith:
                return !((correctedValues.originalValue as string).endsWith(correctedValues.value1 as string));
            case ValidationOperator.NotStartsWith:
                return !((correctedValues.originalValue as string).startsWith(correctedValues.value1 as string));
            case ValidationOperator.StartsWith:
                return (correctedValues.originalValue as string).startsWith(correctedValues.value1 as string);
            default:
                return correctedValues.originalValue === correctedValues.value1;
        }
    }

    private valueControl(value: ValidatorValue) {
        if ((this.operator === ValidationOperator.BT || this.operator === ValidationOperator.NB) && (this.value1 == null || this.value2 == null)) {
            throw new Error("value1 and value2 must be set with ValidationOperator.BT and ValidationOperator.NB");
        }

        if (this.value1 == null) {
            throw new Error("value1 must be set.");
        }

        if (this.stringMethods.includes(this.operator) && (typeof this.value1 !== "string" || typeof value !== "string")) {
            throw new Error(`Following operators can only be used with a string type: ${this.stringMethods.join(", ")}`);
        }
    }

    private valueCorrection(value: ValidatorValue, type: PropertyType | "UNKNOWN"): ICorrectedValues {
        const correctedValues: ICorrectedValues = {
            originalValue: value,
            value1: this.value1!,
            value2: this.value2
        };

        if (type === "UNKNOWN") {
            return correctedValues;
        }

        if (this.numberTypes.includes(type)) {
            this.numberCorrection(correctedValues);
        } else if (type === "Edm.DateTime" || type === "Edm.DateTimeOffset") {
            this.dateCorrection(correctedValues);
        }

        return correctedValues;
    }

    private numberCorrection(correctedValues: ICorrectedValues) {
        this.numberPropertyCorrection(correctedValues);
        this.numberValue1Correction(correctedValues);
        this.numberValue2Correction(correctedValues);
    }

    private numberPropertyCorrection(correctedValues: ICorrectedValues) {
        if (!(typeof correctedValues.originalValue === "number")) {
            const float = NumberFormat.getFloatInstance();
            const parsedValue = float.parse(correctedValues.originalValue as string);

            if (typeof parsedValue === "number") {
                if (isNaN(parsedValue)) {
                    this.showErrorMessageBox();
                    throw new Error(`Invalid number for property: ${this.propertyName}`);
                }

                correctedValues.originalValue = parsedValue;
            } else {
                this.showErrorMessageBox();
                throw new Error(`Invalid number for property: ${this.propertyName}`);
            }
        }
    }

    private numberValue1Correction(correctedValues: ICorrectedValues) {
        if (!(typeof correctedValues.value1 === "number")) {
            const float = NumberFormat.getFloatInstance();
            const parsedValue = float.parse(correctedValues.value1 as string);

            if (typeof parsedValue === "number") {
                if (isNaN(parsedValue)) {
                    throw new Error(`Invalid number for property: ${this.propertyName}`);
                }

                correctedValues.value1 = parsedValue;
            } else {
                throw new Error(`Invalid number for property: ${this.propertyName}`);
            }
        }
    }

    private numberValue2Correction(correctedValues: ICorrectedValues) {
        if (!correctedValues.value2) {
            return correctedValues;
        }

        if (!(typeof correctedValues.value2 === "number")) {
            const float = NumberFormat.getFloatInstance();
            const parsedValue = float.parse(correctedValues.value2 as string);

            if (typeof parsedValue === "number") {
                if (isNaN(parsedValue)) {
                    throw new Error(`Invalid number for property: ${this.propertyName}`);
                }

                correctedValues.value2 = parsedValue;
            } else {
                throw new Error(`Invalid number for property: ${this.propertyName}`);
            }
        }
    }

    private dateCorrection(correctedValues: ICorrectedValues) {
        this.datePropertyCorrection(correctedValues);
        this.dateValue1Correction(correctedValues);
        this.dateValue2Correction(correctedValues);
    }

    private datePropertyCorrection(correctedValues: ICorrectedValues) {
        if (correctedValues.originalValue instanceof Date) {
            return;
        }

        const correctedDate = new Date(correctedValues.originalValue);

        if (!isNaN(correctedDate.getTime())) {
            correctedValues.originalValue = correctedDate;
            return;
        }

        this.showErrorMessageBox();
        throw new Error(`Invalid date for property: ${this.propertyName}`);
    }

    private dateValue1Correction(correctedValues: ICorrectedValues) {
        if (correctedValues.value1 instanceof Date) {
            return;
        }

        throw new Error(`value1 must be an instance of Date or UI5Date for property ${this.propertyName}`);
    }

    private dateValue2Correction(correctedValues: ICorrectedValues) {
        if (!correctedValues.value2) {
            return;
        }

        if (correctedValues.value2 instanceof Date) {
            return;
        }

        throw new Error(`value1 must be an instance of Date or UI5Date for property ${this.propertyName}`);
    }

    private showErrorMessageBox() {
        if (this.showMessageBox) {
            MessageBox.error(this.invalidValueMessage);
        }
    }
}