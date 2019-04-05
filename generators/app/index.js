"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to ${chalk.red("generator-sited-plugin")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "插件名称",
        required: true
      },
      {
        type: "input",
        name: "desc",
        message: "插件介绍",
        required: true
      },
      {
        type: "input",
        name: "author",
        message: "插件作者",
        required: true
      },
      {
        type: "input",
        name: "url",
        message: "网址",
        required: true
      },
      {
        type: "input",
        name: "expr",
        message: "网址过滤正则",
        required: true
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("index.xml"),
      this.destinationPath("index.xml"),
      {
        packageVersion: "0.0.1",
        app: {
          name: this.answers.name,
          intro: this.answers.intro
        },
        js: "<%-js%>"
      }
    );
  }

  install() {
    this.npmInstall();
  }
};
