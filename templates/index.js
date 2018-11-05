const { Validator } = require("jsonschema");
const { readFileSync } = require("fs");
const { join } = require("path");

function getInstance() {
    const instance = new Validator();
    console.log(readSchemaDefinition())
}

function readSchemaDefinition() {
    return JSON.parse(readFileSync(join(__dirname, "schema.json")));
}
