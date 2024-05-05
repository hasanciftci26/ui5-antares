import BaseObject from "sap/ui/base/Object";
import Control from "sap/ui/core/Control";
import CustomData from "sap/ui/core/CustomData";

/**
 * @namespace ui5.antares.ui
 */
export default class CustomControlCL extends BaseObject {
    private control: Control;
    private propertyName: string;
    private mandatoryHandler?: (control: Control) => boolean;
    private listener?: object;

    constructor(control: Control, propertyName: string, mandatoryHandler?: (control: Control) => boolean, listener?: object) {
        super();
        this.control = control;
        this.propertyName = propertyName;
        this.mandatoryHandler = mandatoryHandler;
        this.listener = listener;
        this.control.addCustomData(new CustomData({ key: "UI5AntaresCustomControlName", value: propertyName }));
    }

    public getControl(): Control {
        return this.control;
    }

    public getPropertyName(): string {
        return this.propertyName;
    }

    public getMandatoryHandler(): ((control: Control) => boolean) | undefined {
        return this.mandatoryHandler;
    }

    public getListener(): object | undefined {
        return this.listener;
    }
}