import { SinonFakeXMLHttpRequest } from "sinon";

export interface IPOSTRequest {
    getParameter: (parameter: string) => string | SinonFakeXMLHttpRequest;
}