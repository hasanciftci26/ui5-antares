import Control from "sap/ui/core/Control";
import UI5Date from "sap/ui/core/date/UI5Date";
import { ValidationOperator } from "ui5/antares/types/ui/enums";

export type ValidatorValue = string | number | Date | UI5Date;
export type ValidatorValueParameter =  ValidatorValue | Control;

export interface IValidationSettings {
    propertyName: string;
    validator?: (value: ValidatorValueParameter) => boolean;
    listener?: object;
    value1?: ValidatorValue;
    value2?: ValidatorValue;
    operator?: ValidationOperator;
    message?: string;
    showMessageBox?: boolean;
    invalidValueMessage?: string;
}

export interface ICorrectedValues {
    originalValue: ValidatorValue;
    value1: ValidatorValue;
    value2?: ValidatorValue
}