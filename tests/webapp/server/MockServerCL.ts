import MockServer from "sap/ui/core/util/MockServer";

/**
 * @namespace test.ui5.antares.mock.server
 */
export default class MockServerCL extends MockServer {
    constructor() {
        super({
            rootUri: "/mock/v2/antares/"
        });
    }
}