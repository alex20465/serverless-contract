#!/usr/bin/env node

import * as commander from "commander";
import { generateContract } from "../index";

commander
    .command("generate <input> <name> <output>")
    .action(async (input: string, name: string, output: string) => {
        return await generateContract({
            outputName: name,
            inputPath: input,
            outputPath: output
        });
    });

commander.parse(process.argv);
