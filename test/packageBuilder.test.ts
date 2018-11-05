import { expect } from "chai";
import { PackageBuilder } from "../src/PackageBuilder";
import { removeSync, readFileSync } from "fs-extra";

describe("PackageBuilder", () => {
    let builder: PackageBuilder;

    beforeEach(() => {
        builder = new PackageBuilder("package-builder-test", "/tmp");
    });

    afterEach(() => {
        removeSync("/tmp/package-builder-test");
    });

    describe("write", () => {
        beforeEach(async () => {
            return await builder.write({
                properties: {
                    test: { type: "string" }
                }
            });
        });

        describe("package.json", () => {
            let pkg = null;

            beforeEach(() => {
                pkg = JSON.parse(
                    readFileSync(
                        "/tmp/package-builder-test/package.json"
                    ).toString()
                );
            });

            it('should have own property "name"', () => {
                expect(pkg).haveOwnProperty("name");
            });
            it('should have own property "main"', () => {
                expect(pkg).haveOwnProperty("main");
            });
            it('should have own property "dependencies"', () => {
                expect(pkg).haveOwnProperty("dependencies");
            });

            it('should have "name" EQUAL "serverless-contractor-package-builder-test"', () => {
                expect(pkg.name).to.be.equal(
                    "serverless-contractor-package-builder-test"
                );
            });
        });

        describe("schema.json", () => {
            let schema = null;

            beforeEach(() => {
                schema = JSON.parse(
                    readFileSync(
                        "/tmp/package-builder-test/schema.json"
                    ).toString()
                );
            });

            it('should have "properties"', () => {
                expect(schema).haveOwnProperty("properties");
            });
        });
    });
});
