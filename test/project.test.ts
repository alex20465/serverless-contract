import { Project } from "../src/Project";
import { expect } from "chai";
import { ServerlessFunction } from "../src/ServerlessFunction";

describe("project", () => {
    let project: Project;

    describe("check", () => {
        describe("not existing project", () => {
            beforeEach(() => {
                project = new Project("./test/data/notExisting");
            });
            it("should fail checking with 'does not exist'", () => {
                expect(() => {
                    project.check();
                }).to.throw("does not exist");
            });
        });

        describe("not existing project", () => {
            beforeEach(() => {
                project = new Project("./test/data/foo/tsconfig.json");
            });
            it("should fail checking with 'is not a directory'", () => {
                expect(() => {
                    project.check();
                }).to.throw("is not a directory");
            });
        });

        describe("without serverless.yml", () => {
            beforeEach(() => {
                project = new Project("./test/data/fooWithoutServerlessYML");
            });
            it("should fail checking with 'does not provide a serverless.yml'", () => {
                expect(() => {
                    project.check();
                }).to.throw("does not provide a serverless.yml");
            });
        });

        describe("with invalid serverless.yml", () => {
            beforeEach(() => {
                project = new Project(
                    "./test/data/fooWithInvalidServerlessYML"
                );
            });
            it("should fail checking with 'does not provide a service definition'", () => {
                expect(() => {
                    project.check();
                }).to.throw("does not provide a service definition");
            });
        });
    });

    describe("getFunctions", () => {
        beforeEach(() => {
            project = new Project("./test/data/foo");
        });
        it("should return a list with ONE item", () => {
            const funcs = project.getFunctions();
            expect(funcs).lengthOf(1);
        });

        it("should return the hello-world function instance", () => {
            const [func] = project.getFunctions();
            expect(func).is.instanceof(ServerlessFunction);
        });
    });

    describe("getCompilerOptions", () => {
        beforeEach(() => {
            project = new Project("./test/data/foo");
        });
        it("should return the foo tsconfig object", () => {
            const options = project.getCompilerOptions();
            expect(options).to.deep.eq({
                compilerOptions: {
                    sourceMap: true
                }
            });
        });
    });
});
