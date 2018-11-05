import { JSONSchema4, JSONSchema6, JSONSchema7 } from "json-schema";
import {
    readdirSync,
    mkdirSync,
    existsSync,
    readFileSync,
    lstatSync,
    writeFileSync
} from "fs";
import { join, resolve } from "path";
import * as Handlebars from "handlebars";

export class PackageBuilder {
    constructor(private name: string, private path: string) {}

    async write(schema: JSONSchema4 | JSONSchema6 | JSONSchema7): Promise<any> {
        const packagePath = this.getPackagePath();
        const templateFiles = this.getTemplateFiles();

        if (!existsSync(packagePath)) {
            mkdirSync(packagePath);
        }

        templateFiles.forEach(filename => {
            const templateContent = readFileSync(
                join(this.getTemplatePath(), filename)
            ).toString();

            const template = Handlebars.compile(templateContent);
            const rendered = template({
                name: this.name
            });

            writeFileSync(join(packagePath, filename), rendered);
        });

        const schemaContent = JSON.stringify(schema, null, 4);
        writeFileSync(join(packagePath, "schema.json"), schemaContent);
    }

    private getTemplateFiles() {
        return readdirSync(this.getTemplatePath()).filter(filename => {
            return lstatSync(join(this.getTemplatePath(), filename)).isFile();
        });
    }

    private getTemplatePath() {
        return resolve(join(__dirname, "../", "templates"));
    }

    private getPackagePath() {
        return resolve(join(this.path, this.name));
    }
}
