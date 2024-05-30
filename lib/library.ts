import Lib from "sap/ui/core/Lib";

const library = Lib.init({
    name: "ui5.antares",
    dependencies: [
        "sap.m",
        "sap.ui.core",
        "sap.ui.comp",
        "sap.ui.table",
        "sap.ui.layout"
    ],
    controls: [
        "ui5.antares.base.v2.ModelCL",
        "ui5.antares.entity.v2.EntityCL",
        "ui5.antares.entry.v2.EntryCL",
        "ui5.antares.entry.v2.EntryCreateCL",
        "ui5.antares.entry.v2.EntryDeleteCL",
        "ui5.antares.entry.v2.EntryReadCL",
        "ui5.antares.entry.v2.EntryUpdateCL",
        "ui5.antares.entry.v2.ResponseCL",
        "ui5.antares.entry.v2.SimpleValidatorCL",
        "ui5.antares.entry.v2.SmartValidatorCL",
        "ui5.antares.odata.v2.ODataCL",
        "ui5.antares.odata.v2.ODataCreateCL",
        "ui5.antares.odata.v2.ODataDeleteCL",
        "ui5.antares.odata.v2.ODataReadCL",
        "ui5.antares.odata.v2.ODataUpdateCL",
        "ui5.antares.ui.ContentCL",
        "ui5.antares.ui.CustomControlCL",
        "ui5.antares.ui.DialogCL",
        "ui5.antares.ui.FragmentCL",
        "ui5.antares.ui.ValidationLogicCL",
        "ui5.antares.ui.ValueHelpCL",
        "ui5.antares.util.Util"
    ],
    noLibraryCSS: true,
    version: "1.120.1001"
});

export default library