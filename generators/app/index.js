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
        required: true,
        default: "默认插件名称"
      },
      {
        type: "input",
        name: "desc",
        message: "插件介绍",
        required: true,
        default: "默认插件介绍"
      },
      {
        type: "input",
        name: "author",
        message: "插件作者",
        required: true,
        default: "无名"
      },
      {
        type: "input",
        name: "url",
        message: "网址",
        required: true,
        default: "https://www.baidu.com"
      },
      {
        type: "input",
        name: "expr",
        message: "网址过滤正则",
        default: "\\.baidu\\.com",
        required: true
      }
    ];

    return this.prompt(prompts).then(answers => {
      this.answers = answers;
    });
  }

  writing() {
    this.path = this.answers.name;

    this.fs.copyTpl(
      this.templatePath("index.xml"),
      this.destinationPath(this.path + "/index.xml"),
      {
        packageVersion: "<%= packageVersion %>",
        app: {
          name: this.answers.name,
          intro: this.answers.intro,
          url: this.answers.url,
          expr: this.answers.expr,
          author: this.answers.author
        },
        js: "<%-js%>"
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/index.js"),
      this.destinationPath(this.path + "/src/index.js"),
      {
        app: {
          url: this.answers.url
        }
      }
    );

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath(this.path + "/package.json"),
      {
        app: {
          url: this.answers.url
        }
      }
    );

    this.fs.copy(
      this.templatePath("gulpfile.js"),
      this.destinationPath(this.path + "/gulpfile.js")
    );
  }

  install() {
    this.npmInstall();
  }
};
