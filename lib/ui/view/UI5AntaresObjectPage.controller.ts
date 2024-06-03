import Button from "sap/m/Button";
import MessageBox from "sap/m/MessageBox";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Targets from "sap/ui/core/routing/Targets";
import { IObjectPageViewData } from "ui5/antares/types/entry/common";

/**
 * @namespace ui5.antares.ui.view
 */
export default class UI5AntaresObjectPage extends Controller {
    private completeTriggered: boolean = false;

    public onInit(): void {
        const view = this.getView() as View;
        const viewData = view.getViewData() as IObjectPageViewData;

        view.addEventDelegate({
            onAfterHide: () => {
                if (this.completeTriggered) {
                    viewData.entry.reset();
                }
                view.destroy();
            }
        });

        if (view.byId("UI5AntaresObjectPageCompleteButton")) {
            (view.byId("UI5AntaresObjectPageCompleteButton") as Button).attachPress({}, this.onComplete, this);
        }

        (view.byId("UI5AntaresObjectPageCancelButton") as Button).attachPress({}, this.onCancel, this);
    }

    public onComplete(): void {
        this.completeTriggered = true;
        const view = this.getView() as View;
        const viewData = view.getViewData() as IObjectPageViewData;
        const validation = viewData.entry.valueValidation();

        if (!validation.validated) {
            MessageBox.error(validation.message);
            return;
        }

        viewData.entry.submit();
        (viewData.router.getTargets() as Targets).display(viewData.entry.getFromTarget());
    }

    public onCancel(): void {
        const view = this.getView() as View;
        const viewData = view.getViewData() as IObjectPageViewData;
        (viewData.router.getTargets() as Targets).display(viewData.entry.getFromTarget());
    }
}