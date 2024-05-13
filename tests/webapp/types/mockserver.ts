import { SinonFakeXMLHttpRequest } from "sinon";

export interface IMockRequest extends SinonFakeXMLHttpRequest {
    respondJSON: (status: number | string, headers: object, body: string) => void;
}

export interface IPOSTRequest {
    getParameter: (parameter: string) => string | IMockRequest;
}