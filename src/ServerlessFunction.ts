import { Project } from "./Project";
import { join } from "path";
import * as pascalcase from "pascalcase";

export interface IServerlessFunctionOptions {
    handler: string;
}

export class ServerlessFunction {
    constructor(
        private name: string,
        private options: IServerlessFunctionOptions,
        private parent: Project
    ) {}

    getName() {
        return this.name;
    }

    getHandler() {
        const [path, handlerName] = this.options.handler.split(".");
        return handlerName;
    }

    getNamespace(suffix: string = "") {
        return `/${`ServiceContract/${pascalcase(
            this.parent.getName()
        )}`}/${pascalcase(this.getName())}/${pascalcase(suffix)}`;
    }

    getPath() {
        const [path] = this.options.handler.split(".");
        return join(this.parent.getBasePath(), path);
    }

    getProject() {
        return this.parent;
    }
}
