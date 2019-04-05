"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-sited-plugin:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      name: "名称",
      desc: "插件介绍",
      author: "张三",
      url: "http://baidu.com",
      expr: "\\.baidu\\.com"
    });
  });

  it("creates files", () => {
    assert.file(["index.xml"]);
    assert.fileContent("index.xml", "名称");
  });
});
