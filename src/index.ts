#!/usr/bin/env node

import { TEMPLATE_PATH } from "constants/common";
import inquirer from "inquirer";
import { questions } from "./constants/questions";
import { generate } from "./lib/generate";
import { readTemplates } from "./lib/readTemplates";

inquirer.registerPrompt("fuzzypath", require("inquirer-fuzzy-path"));

const main = async () => {
  const { templateList, configFile } = readTemplates();

  const { name, template, outputPath } = await inquirer.prompt<Common.UserInput>(
    questions(templateList, configFile.output)
  );

  generate({
    name,
    templatePath: `${TEMPLATE_PATH}/${template}`,
    prefix: configFile.prefix,
    outputPath
  });
};

main();
