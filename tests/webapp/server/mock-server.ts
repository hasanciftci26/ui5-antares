import MockServer from "sap/ui/core/util/MockServer";
import MockServerCL from "./MockServerCL";
import { IPOSTRequest } from "../types/mockserver";
import { SinonFakeXMLHttpRequest } from "sinon";

export default {
    init: function () {
        const server = new MockServerCL();

        server.simulate("../localService/metadata.xml", {
            sMockdataBaseUrl: "../localService/data/",
            bGenerateMissingMockData: true
        });

        server.attachBefore(MockServer.HTTPMETHOD.POST, function (event: IPOSTRequest) {
            const oXhr = event.getParameter("oXhr") as SinonFakeXMLHttpRequest;
            oXhr.respond(500, { message: "test" }, "Entity Exists");
            Object.assign(oXhr, { readyState: 1 });
        }, "Categories");

        server.start();
    }
};