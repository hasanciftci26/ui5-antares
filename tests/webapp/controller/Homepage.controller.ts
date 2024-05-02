import BaseController from "unit/ui5/antares/controller/BaseController";
import ODataReadCL from "ui5/antares/odata/v2/ODataReadCL";
import ODataCreateCL from "ui5/antares/odata/v2/ODataCreateCL";

/**
 * @namespace unit.ui5.antares.controller
 */
QUnit.config.autostart = false;
export default class Homepage extends BaseController {

    /* ======================================================================================================================= */
    /* Lifecycle methods                                                                                                       */
    /* ======================================================================================================================= */

    public onInit(): void {

    }

    /* ======================================================================================================================= */
    /* Event Handlers                                                                                                          */
    /* ======================================================================================================================= */

    public async onGetData(): Promise<void> {
        QUnit.module("ODataReadCL", () => {
            QUnit.test("read", (assert: Assert) => {
                const reader = new ODataReadCL(this, "Categories");
                assert.equal(1, 1);
            });
        });
    }

    /* ======================================================================================================================= */
    /* Internal methods                                                                                                        */
    /* ======================================================================================================================= */
}