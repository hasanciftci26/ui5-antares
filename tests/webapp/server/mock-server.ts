import MockServer from "sap/ui/core/util/MockServer";
import MockServerCL from "./MockServerCL";
import { IMockRequest, IPOSTRequest } from "../types/mockserver";

export default {
    init: function () {
        const server = new MockServerCL();

        server.simulate("../localService/metadata.xml", {
            sMockdataBaseUrl: "../localService/data/",
            bGenerateMissingMockData: true
        });

        // server.attachAfter(MockServer.HTTPMETHOD.POST, function (event: IPOSTRequest) {
        //     const oXhr = event.getParameter("oXhr") as IMockRequest;
        //     oXhr.respondJSON(400, {}, JSON.stringify({ message: "Entity Exists" }));
        //     Object.assign(oXhr, { readyState: 1 });
        // }, "Categories");

        server.start();
    }
};