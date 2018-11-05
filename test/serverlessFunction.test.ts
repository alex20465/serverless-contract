import { Project } from "../src/Project";
import { expect } from "chai";
import { ServerlessFunction } from "../src/ServerlessFunction";

describe("ServerlessFunction", () => {
    let project: Project;
    let func: ServerlessFunction;

    beforeEach(() => {
        project = new Project("./test/data/foo");
        project.check();

        func = project.getFunctions().pop();
    });

    describe("getName", () => {
        it('should return "hello"', () => {
            expect(func.getName()).to.be.eq("hello");
        });
    });
    describe("getHandler", () => {
        it('should return "hello"', () => {
            expect(func.getHandler()).to.be.eq("hello");
        });
    });
});
