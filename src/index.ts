import { Generator } from "./Generator";
import { PackageBuilder } from "./PackageBuilder";
import { Project } from "./Project";

interface IOptions {
    /**
     * The contract package name
     */
    outputName: string;

    /**
     * The output folder of the contract
     */
    outputPath: string;

    /**
     * The serverless project root path
     */
    inputPath: string;
}

export async function generateContract(options: IOptions) {
    const { inputPath, outputName, outputPath } = options;

    const generator = new Generator({});
    const builder = new PackageBuilder(outputName, outputPath);
    const project = new Project(inputPath);

    project.check();

    const funcs = project.getFunctions();

    const schema = generator.generateFunctions(funcs);

    await builder.write(schema);
}
