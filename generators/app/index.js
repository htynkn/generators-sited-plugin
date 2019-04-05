"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(`Welcome to ${chalk.red("generator-sited-plugin")} generator!`)
    );

    this.answers = await this.prompt([
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
    ]);
  }

  writing() {
    this.log("cool feature", this.answers);
    this.fs.copy(
      this.templatePath("index.xml"),
      this.destinationPath("index.xml")
    );
  }

  install() {
    this.npmInstall();
  }
};
