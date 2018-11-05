import {
    ServerlessFunction,
    IServerlessFunctionOptions
} from "./ServerlessFunction";
import { resolve, join, isAbsolute } from "path";
import { statSync, existsSync, readFileSync } from "fs";
import { load } from "js-yaml";

export class Project {
    private basepath: string;

    private requiredProjectFiles: string[] = [
        "serverless.yml",
        "package.json",
        "tsconfig.json"
    ];

    constructor(basepath: string) {
        if (isAbsolute(basepath)) {
            this.basepath = basepath;
        } else {
            this.basepath = resolve(join(process.cwd(), basepath));
        }
    }

    /**
     * Check project sturcture.
     */
    check() {
        if (!existsSync(this.basepath)) {
            throw new Error(`Project folder '${this.basepath}' does not exist`);
        }

        if (!statSync(this.basepath).isDirectory()) {
            throw new Error(
                `Project folder '${this.basepath}' is not a directory`
            );
        }

        this.requiredProjectFiles.forEach(filename => {
            if (!existsSync(join(this.basepath, filename))) {
                throw new Error(`Project does not provide a ${filename}`);
            }
        });
        const { service, functions } = this.getServerlessYML();

        if (!service) {
            throw new Error(
                "serverless.yml does not provide a service definition"
            );
        }

        if (!service.name) {
            throw new Error(
                `Project serverless.yml does not provide a name definition`
            );
        }

        if (!functions || !Object.keys(functions).length) {
            console.warn(`Project does not provide any functions`);
        }
    }

    private getServerlessYML() {
        try {
            return load(
                readFileSync(join(this.basepath, "serverless.yml")).toString()
            );
        } catch ({ message }) {
            throw Error("failed to read serverless.yml, " + message);
        }
    }

    getName() {
        return this.getServerlessYML().service.name;
    }

    getFunctions(): ServerlessFunction[] {
        const { functions } = this.getServerlessYML();
        return Object.keys(functions).map((key: string) => {
            return new ServerlessFunction(
                key,
                functions[key] as IServerlessFunctionOptions,
                this
            );
        });
    }

    getCompilerOptions() {
        return JSON.parse(
            readFileSync(join(this.basepath, "tsconfig.json")).toString()
        );
    }

    getBasePath() {
        return this.basepath;
    }
}
