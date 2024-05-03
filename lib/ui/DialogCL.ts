import Button, { Button$PressEvent } from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import BaseObject from "sap/ui/base/Object";

/**
 * @namespace ui5.antares.ui
 */
export default class DialogCL extends BaseObject {
    private dialogId: string;
    private beginButtonText: string;
    private endButtonText: string;
    private beginButtonPressed?: (event: Button$PressEvent) => void;
    private endButtonPressed?: (event: Button$PressEvent) => void;
    private escapeHandler?: (event: { resolve: Function; reject: Function; }) => void;
    private beginButtonListener?: object;
    private endButtonListener?: object;
    private escapeListener?: object;

    constructor(dialogId: string, beginButtonText: string, endButtonText: string) {
        super();
        this.dialogId = dialogId;
        this.beginButtonText = beginButtonText;
        this.endButtonText = endButtonText;
    }

    public attachOnBeginButton(beginButtonPressed: (event: Button$PressEvent) => void, listener: object) {
        this.beginButtonPressed = beginButtonPressed;
        this.beginButtonListener = listener;
    }

    public attachOnEndButton(endButtonPressed: (event: Button$PressEvent) => void, listener: object) {
        this.endButtonPressed = endButtonPressed;
        this.endButtonListener = listener;
    }

    public attachEscapeHandler(escapeHandler: (event: { resolve: Function; reject: Function; }) => void, listener: object) {
        this.escapeHandler = escapeHandler;
        this.escapeListener = listener;
    }

    public createEntryDialog(): Dialog {
        if (!this.beginButtonPressed || !this.endButtonPressed) {
            throw new Error("Please attach begin button and end button pressed!");
        }

        const dialog = new Dialog({
            id: this.dialogId,
            showHeader: false,
            beginButton: new Button({
                text: this.beginButtonText,
                type: "Success",
                press: this.beginButtonPressed.bind(this.beginButtonListener)
            }),
            endButton: new Button({
                text: this.endButtonText,
                type: "Negative",
                press: this.endButtonPressed.bind(this.endButtonListener)
            })
        });

        if (this.escapeHandler && this.escapeListener) {
            dialog.setEscapeHandler(this.escapeHandler.bind(this.escapeListener));
        }

        return dialog;
    }
}