import BaseObject from "sap/ui/base/Object";
import { NamingStrategies } from "ui5/antares/types/entry/enums";

/**
 * @namespace ui5.antares.annotation.v2
 */
export default class Util extends BaseObject {
    public static getGeneratedLabel(property: string, namingStrategy: NamingStrategies): string {
        let label = property;

        switch (namingStrategy) {
            case NamingStrategies.CAMEL_CASE:
                label = this.getCamelCaseLabel(property);
                break;
            case NamingStrategies.CONSTANT_CASE:
                label = this.getConstantCaseLabel(property);
                break;
            case NamingStrategies.KEBAB_CASE:
                label = this.getKebabCaseLabel(property);
                break;
            case NamingStrategies.PASCAL_CASE:
                label = this.getPascalCaseLabel(property);
                break;
            case NamingStrategies.SNAKE_CASE:
                label = this.getSnakeCaseLabel(property);
                break;
        }

        return label;
    }

    private static getCamelCaseLabel(name: string): string {
        return name.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, function (str) {
            return str.toUpperCase();
        });
    }

    private static getPascalCaseLabel(name: string): string {
        return name.replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\b(Id|Uid|Url)\b/g, function (match) { return match.toUpperCase(); })
            .replace(/^./, function (str) { return str.toUpperCase(); });
    }

    private static getSnakeCaseLabel(name: string): string {
        return name.replace(/_/g, " ").replace(/\b\w/g, function (str) {
            return str.toUpperCase();
        });
    }

    private static getConstantCaseLabel(name: string): string {
        return name.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, function (str) {
            return str.toUpperCase();
        });
    }

    private static getKebabCaseLabel(name: string): string {
        return name.split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
}