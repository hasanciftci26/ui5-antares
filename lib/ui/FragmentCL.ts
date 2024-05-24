import Dialog from "sap/m/Dialog";
import Popover from "sap/m/Popover";
import BaseObject from "sap/ui/base/Object";
import Control from "sap/ui/core/Control";
import Fragment from "sap/ui/core/Fragment";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";

/**
 * @namespace ui5.antares.ui
 */
export default class FragmentCL extends BaseObject {
    private sourceController: Controller | UIComponent;
    private fragmentPath: string;
    private sourceView?: View;
    private openByControl?: Control;
    private fragment?: Control | Control[];

    constructor(controller: Controller | UIComponent, fragmentPath: string, openByControl?: Control) {
        super();
        this.sourceController = controller;
        this.fragmentPath = fragmentPath;
        this.openByControl = openByControl;

        if (controller instanceof Controller) {
            this.sourceView = controller.getView() as View;
        }
    }

    public async openAsync(): Promise<void> {
        const fragment = await this.load();

        if (fragment instanceof Dialog) {
            fragment.open();
            return;
        }

        if (fragment instanceof Popover) {
            if (!this.openByControl) {
                (this.fragment as Popover).destroy();
                throw new Error("Popover requires a control to be opened by. Provide the control through the class constructor.");
            }

            fragment.openBy(this.openByControl);
            return;
        }

        throw new Error("openAsync() method can only be used with fragments that contain Dialog or Popover.");
    }

    public open() {
        if (!this.fragment) {
            throw new Error("No fragment was found to open. Use load() method to initialize the fragment.");
        }

        if (this.fragment instanceof Dialog) {
            this.fragment.open();
            return;
        }

        if (this.fragment instanceof Popover) {
            if (!this.openByControl) {
                (this.fragment as Popover).destroy();
                throw new Error("Popover requires a control to be opened by. Provide the control through the class constructor.");
            }

            this.fragment.openBy(this.openByControl);
            return;
        }

        this.destroyFragmentContent();
        throw new Error("open() method can only be used with fragments that contain Dialog or Popover.");
    }

    public getFragmentContent(): Control | Control[] {
        if (!this.fragment) {
            throw new Error("No fragment was found to return. Use load() or openAsync() method to initialize the fragment.");
        }

        return this.fragment;
    }

    public close() {
        if (!this.fragment) {
            throw new Error("No fragment was found to close. Use load() or openAsync() method to initialize the fragment.");
        }

        if (this.fragment instanceof Dialog || this.fragment instanceof Popover) {
            if (this.fragment.isOpen()) {
                this.fragment.close();
            }
        } else {
            this.destroyFragmentContent();
            throw new Error("close() method can only be used with fragments that contain Dialog or Popover.");
        }
    }

    public destroyFragmentContent() {
        if (!this.fragment) {
            throw new Error("No fragment was found to destroy. Use load() or openAsync() method to initialize the fragment.");
        }

        if (Array.isArray(this.fragment)) {
            this.fragment.forEach((control) => {
                if (!control.isDestroyed()) {
                    control.destroy();
                }
            });
        } else {
            if (!this.fragment.isDestroyed()) {
                this.fragment.destroy();
            }
        }
    }

    public async load(): Promise<Control | Control[]> {
        const sourceView = this.sourceView;

        if (!sourceView) {
            throw new Error("FragmentCL methods can only be used in a controller!");
        }

        const fragment = await (Fragment.load({
            id: sourceView.getId(),
            name: this.fragmentPath,
            controller: this.sourceController
        }) as Promise<Control | Control[]>);

        this.fragment = fragment;
        return fragment;
    }
}