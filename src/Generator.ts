import { Program, Args, CompilerOptions } from "typescript-json-schema";
import { ServerlessFunction } from "./ServerlessFunction";
import { JSONSchema7Array } from "json-schema";

import * as TJS from "typescript-json-schema";

interface IOptions {
    compilerOptions?: CompilerOptions;
    args?: Partial<Args>;
}

export class Generator {
    constructor(private options: IOptions) {}

    generateFunction(func: ServerlessFunction): JSONSchema7Array {
        const program = this.initProgram(func);
        const eventNamespace = func.getNamespace("Event");
        const resultNamespace = func.getNamespace("Result");

        const eventSchema = this.generateSchema("IEvent", program);
        const resultSchema = this.generateSchema("IResult", program);

        return [
            {
                id: eventNamespace,
                ...eventSchema
            },
            {
                id: resultNamespace,
                ...resultSchema
            }
        ];
    }

    generateFunctions(funcs: ServerlessFunction[]): JSONSchema7Array {
        let schemas: JSONSchema7Array = [];
        funcs.forEach(func => {
            schemas = schemas.concat(this.generateFunction(func));
        });
        return schemas;
    }

    private generateSchema(namespace: string, program: Program) {
        const schema = TJS.generateSchema(program, namespace, {
            ignoreErrors: true,
            ...this.options.args
        });
        delete schema["$schema"];
        return schema;
    }

    private initProgram(func: ServerlessFunction): Program {
        const basepath = func.getProject().getBasePath();
        return TJS.getProgramFromFiles(
            [func.getPath()],
            this.options.compilerOptions,
            basepath
        );
    }
}
