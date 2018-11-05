import { generateContract } from "../src";
import { join } from "path";
import { expect } from "chai";
import { readFileSync } from "fs";
import { removeSync } from "fs-extra";

describe.only("generate contract", () => {
    beforeEach(async function() {
        this.timeout(4000);
        await generateContract({
            inputPath: join(__dirname, "data", "foo"),
            outputName: "foo",
            outputPath: "/tmp"
        });
    });

    afterEach(() => {
        removeSync("/tmp/foo");
    });

    it("should generate a foo service contract", function() {
        const schema = JSON.parse(
            readFileSync(join("/tmp", "foo", "schema.json")).toString()
        );

        expect(schema).to.deep.equal([
            {
                id: "/ServiceContract/ServerlessContractorFooTest/Hello/Event",
                type: "object",
                properties: { name: { type: "string" } }
            },
            {
                id: "/ServiceContract/ServerlessContractorFooTest/Hello/Result",
                type: "object",
                properties: { id: { type: "string" } }
            }
        ]);
    });
});
