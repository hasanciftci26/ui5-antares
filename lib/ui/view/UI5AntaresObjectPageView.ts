import Control from "sap/ui/core/Control";
import View from "sap/ui/core/mvc/View";
import { IObjectPageViewData } from "ui5/antares/types/entry/common";

/**
 * @namespace ui5.antares.ui.view
 */
export default class UI5AntaresObjectPageView extends View {
    public getControllerName(): string {
        return "ui5.antares.ui.view.UI5AntaresObjectPage";
    }

    createContent(): Control | Control[] | Promise<Control | Control[]> {
        const viewData = this.getViewData() as IObjectPageViewData;
        return viewData.entry.getObjectPageInstance().getObjectPageLayout();
    }
}