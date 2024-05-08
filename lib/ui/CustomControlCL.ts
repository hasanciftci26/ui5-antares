import BaseObject from "sap/ui/base/Object";
import Control from "sap/ui/core/Control";
import CustomData from "sap/ui/core/CustomData";
import ValidationLogicCL from "ui5/antares/ui/ValidationLogicCL";

/**
 * @namespace ui5.antares.ui
 */
export default class CustomControlCL extends BaseObject {
    private control: Control;
    private propertyName: string;
    private validator?: ValidationLogicCL;

    constructor(control: Control, propertyName: string, validator?: ValidationLogicCL) {
        super();
        this.control = control;
        this.propertyName = propertyName;
        this.validator = validator;
        this.control.addCustomData(new CustomData({ key: "UI5AntaresCustomControlName", value: propertyName }));
    }

    public getControl(): Control {
        return this.control;
    }

    public getPropertyName(): string {
        return this.propertyName;
    }

    public getValidator(): ValidationLogicCL | undefined {
        return this.validator;
    }
}