import BaseObject from "sap/ui/base/Object";

/**
 * @namespace ui5.antares.entry.v2
 */
export default class ResponseCL<ResponseT = object> extends BaseObject {
    private response?: ResponseT;
    private statusCode?: string;

    constructor(response?: ResponseT, statusCode?: string) {
        super();
        this.statusCode = statusCode;
        this.response = response;
    }

    public getStatusCode(): string | undefined {
        return this.statusCode;
    }

    public getResponse(): ResponseT | undefined {
        return this.response;
    }
}