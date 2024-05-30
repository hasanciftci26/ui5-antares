import Button from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import { ButtonType } from "sap/m/library";
import BaseObject from "sap/ui/base/Object";
import Control from "sap/ui/core/Control";

/**
 * @namespace ui5.antares.ui
 */
export default class DialogCL extends BaseObject {
    private dialogId: string;
    private dialog: Dialog;

    constructor(dialogId: string) {
        super();
        this.dialogId = dialogId;

        this.dialog = new Dialog(this.dialogId, {
            showHeader: false
        });
    }

    public addBeginButton(buttonText: string, buttonType: ButtonType, pressEventHandler: () => void, listener: object) {
        this.dialog.setBeginButton(new Button({
            text: buttonText,
            type: buttonType,
            press: pressEventHandler.bind(listener)
        }));
    }

    public addEndButton(buttonText: string, buttonType: ButtonType, pressEventHandler: () => void, listener: object) {
        this.dialog.setEndButton(new Button({
            text: buttonText,
            type: buttonType,
            press: pressEventHandler.bind(listener)
        }));
    }

    public addEscapeHandler(escapeHandler: (event: { resolve: Function; reject: Function; }) => void, listener: object) {
        this.dialog.setEscapeHandler(escapeHandler.bind(listener));
    }

    public addContent(content: Control) {
        this.dialog.addContent(content);
    }

    public getDialog(): Dialog {
        return this.dialog;
    }
}