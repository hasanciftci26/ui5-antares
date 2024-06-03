import Avatar from "sap/m/Avatar";
import Button from "sap/m/Button";
import FlexBox from "sap/m/FlexBox";
import Label from "sap/m/Label";
import Title from "sap/m/Title";
import { ButtonType } from "sap/m/library";
import BaseObject from "sap/ui/base/Object";
import Control from "sap/ui/core/Control";
import ObjectPageDynamicHeaderTitle from "sap/uxap/ObjectPageDynamicHeaderTitle";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import ObjectPageSection from "sap/uxap/ObjectPageSection";
import ObjectPageSubSection from "sap/uxap/ObjectPageSubSection";

/**
 * @namespace ui5.antares.ui
 */
export default class ObjectPageLayoutCL extends BaseObject {
    private objectPageLayout: ObjectPageLayout;

    constructor(headerText: string, avatarSrc: string, headerLabel: string) {
        super();

        const avatar = new Avatar({ src: avatarSrc });
        avatar.addStyleClass("sapUiTinyMarginEnd");

        const label = new Label({ text: headerLabel });
        label.addStyleClass("sapUiTinyMarginBegin");

        this.objectPageLayout = new ObjectPageLayout({
            id: "UI5AntaresObjectPageViewID--UI5AntaresObjectPageLayout",
            upperCaseAnchorBar: false,
            headerTitle: new ObjectPageDynamicHeaderTitle({
                expandedHeading: new Title({ text: headerText, wrapping: true }),
                snappedHeading: new FlexBox({
                    fitContainer: true,
                    alignItems: "Center",
                    items: [
                        avatar,
                        new Title({ text: headerText, wrapping: true })
                    ]
                })
            }),
            headerContent: new FlexBox({
                wrap: "Wrap",
                fitContainer: true,
                alignItems: "Center",
                items: [
                    new Avatar({ src: avatarSrc }),
                    label
                ]
            })
        });
    }

    public addCompleteButton(buttonText: string, buttonType: ButtonType) {
        const headerTitle = this.objectPageLayout.getHeaderTitle() as ObjectPageDynamicHeaderTitle;
        headerTitle.addAction(new Button({
            id: "UI5AntaresObjectPageViewID--UI5AntaresObjectPageCompleteButton",
            text: buttonText,
            type: buttonType
        }));
    }

    public addCancelButton(buttonText: string, buttonType: ButtonType) {
        const headerTitle = this.objectPageLayout.getHeaderTitle() as ObjectPageDynamicHeaderTitle;
        headerTitle.addAction(new Button({
            id: "UI5AntaresObjectPageViewID--UI5AntaresObjectPageCancelButton",
            text: buttonText,
            type: buttonType
        }));
    }

    public addSection(content: Control, sectionTitle: string) {
        const subSection = new ObjectPageSubSection({
            titleUppercase: false,
            blocks: content
        });

        const section = new ObjectPageSection({
            titleUppercase: false,
            title: sectionTitle,
            subSections: subSection
        });

        this.objectPageLayout.addSection(section);
    }

    public getObjectPageLayout(): ObjectPageLayout {
        return this.objectPageLayout;
    }
}