import { Project } from "../src/Project";
import { expect } from "chai";
import { Generator } from "../src/Generator";
import { join } from "path";

describe("Generator", () => {
    let generator: Generator;
    let project: Project;
    beforeEach(() => {
        project = new Project(join(__dirname, "data", "foo"));
        generator = new Generator({});

        project.check();
    });

    describe("generateFunction", () => {
        it("should generate correct function schema", function() {
            this.timeout(4000);
            const [helloFunction] = project.getFunctions();
            const schema = generator.generateFunction(helloFunction);

            expect(schema).to.deep.equal([
                {
                    id:
                        "/ServiceContract/ServerlessContractorFooTest/Hello/Event",
                    type: "object",
                    properties: { name: { type: "string" } }
                },
                {
                    id:
                        "/ServiceContract/ServerlessContractorFooTest/Hello/Result",
                    type: "object",
                    properties: { id: { type: "string" } }
                }
            ]);
        });
    });
});
