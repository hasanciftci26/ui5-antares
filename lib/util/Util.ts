import BaseObject from "sap/ui/base/Object";

/**
 * @namespace ui5.antares.annotation.v2
 */
export default class Util extends BaseObject {
    public static getCamelCaseLabel(name: string): string {
        return name.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
            return str.toUpperCase();
        });
    }

    public static getPascalCaseLabel(name: string): string {
        return name.replace(/([A-Z])/g, " $1").trim();
    }

    public static getSnakeCaseLabel(name: string): string {
        return name.replace(/_/g, " ").replace(/\b\w/g, function (str) {
            return str.toUpperCase();
        });
    }

    public static getConstantCaseLabel(name: string): string {
        return name.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, function (str) {
            return str.toUpperCase();
        });
    }

    public static getKebabCaseLabel(name: string): string {
        return name.split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
}