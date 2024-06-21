import BusyDialog from "sap/m/BusyDialog";
import ColorPalettePopover from "sap/m/ColorPalettePopover";
import Dialog from "sap/m/Dialog";
import MessagePopover from "sap/m/MessagePopover";
import Popover from "sap/m/Popover";
import ResponsivePopover from "sap/m/ResponsivePopover";
import SelectDialog from "sap/m/SelectDialog";
import TableSelectDialog from "sap/m/TableSelectDialog";
import ViewSettingsDialog from "sap/m/ViewSettingsDialog";
import BaseObject from "sap/ui/base/Object";
import ValueHelpDialog from "sap/ui/comp/valuehelpdialog/ValueHelpDialog";
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
    private autoDestroyOnESC: boolean = false;
    private selectDialogSearchValue: string = "";

    constructor(controller: Controller | UIComponent, fragmentPath: string, openByControl?: Control) {
        super();
        this.sourceController = controller;
        this.fragmentPath = fragmentPath;
        this.openByControl = openByControl;

        if (controller instanceof Controller) {
            this.sourceView = controller.getView() as View;
        }
    }

    public async openAsync(viewDependent: boolean = false): Promise<
        Dialog | ValueHelpDialog | BusyDialog | SelectDialog | TableSelectDialog | ViewSettingsDialog |
        Popover | MessagePopover | ResponsivePopover | ColorPalettePopover
    > {
        const fragment = await this.load();

        if (fragment instanceof Dialog || fragment instanceof ValueHelpDialog || fragment instanceof BusyDialog || fragment instanceof ViewSettingsDialog) {
            if (this.sourceView && viewDependent) {
                this.sourceView.addDependent(fragment);
            }

            fragment.open();
            return fragment;
        }

        if (fragment instanceof SelectDialog || fragment instanceof TableSelectDialog) {
            if (this.sourceView && viewDependent) {
                this.sourceView.addDependent(fragment);
            }

            fragment.open(this.selectDialogSearchValue);
            return fragment;
        }

        if (fragment instanceof Popover || fragment instanceof MessagePopover || fragment instanceof ResponsivePopover || fragment instanceof ColorPalettePopover) {
            if (!this.openByControl) {
                (this.fragment as Popover).destroy();
                throw new Error("Popover requires a control to be opened by. Provide the control through the class constructor.");
            }

            if (this.sourceView && viewDependent) {
                this.sourceView.addDependent(fragment);
            }

            fragment.openBy(this.openByControl);
            return fragment;
        }

        throw new Error("openAsync() method can only be used with fragments that contain Dialog or Popover.");
    }

    public open(viewDependent: boolean = false): Dialog | ValueHelpDialog | BusyDialog | SelectDialog | TableSelectDialog | ViewSettingsDialog |
        Popover | MessagePopover | ResponsivePopover | ColorPalettePopover {
        if (!this.fragment) {
            throw new Error("No fragment was found to open. Use load() method to initialize the fragment.");
        }

        if (this.fragment instanceof Dialog || this.fragment instanceof ValueHelpDialog ||
            this.fragment instanceof BusyDialog || this.fragment instanceof ViewSettingsDialog
        ) {
            if (this.sourceView && viewDependent) {
                this.sourceView.addDependent(this.fragment);
            }

            this.fragment.open();
            return this.fragment;
        }

        if (this.fragment instanceof SelectDialog || this.fragment instanceof TableSelectDialog) {
            if (this.sourceView && viewDependent) {
                this.sourceView.addDependent(this.fragment);
            }

            this.fragment.open(this.selectDialogSearchValue);
            return this.fragment;
        }

        if (this.fragment instanceof Popover || this.fragment instanceof MessagePopover ||
            this.fragment instanceof ResponsivePopover || this.fragment instanceof ColorPalettePopover
        ) {
            if (!this.openByControl) {
                (this.fragment as Popover).destroy();
                throw new Error("Popover requires a control to be opened by. Provide the control through the class constructor.");
            }

            if (this.sourceView && viewDependent) {
                this.sourceView.addDependent(this.fragment);
            }

            this.fragment.openBy(this.openByControl);
            return this.fragment;
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

        if (this.fragment instanceof Dialog || this.fragment instanceof Popover || this.fragment instanceof MessagePopover ||
            this.fragment instanceof ResponsivePopover || this.fragment instanceof ValueHelpDialog
        ) {
            if (this.fragment.isOpen()) {
                this.fragment.close();
            }
        } else if (this.fragment instanceof BusyDialog) {
            this.fragment.close();
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

    public closeAndDestroy() {
        this.close();
        this.destroyFragmentContent();
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

        if (fragment instanceof Dialog && this.autoDestroyOnESC) {
            fragment.setEscapeHandler(this.onESCTriggered.bind(this));
        }

        this.fragment = fragment;
        return fragment;
    }

    public setAutoDestroyOnESC(destroy: boolean) {
        this.autoDestroyOnESC = destroy;
    }

    private onESCTriggered(event: { resolve: Function; reject: Function; }) {
        event.resolve();
        this.destroyFragmentContent();
    }

    public setSearchValue(value: string) {
        this.selectDialogSearchValue = value;
    }
}