function hots_parse(url, html) {
  var $ = cheerio.load(html);
  var list = [];

  list.push({
    name: "漫画标题1",
    url: "<%= app.url %>",
    logo: "https://via.placeholder.com/468x300"
  });

  list.push({
    name: "漫画标题2",
    url: "<%= app.url %>",
    logo: "https://via.placeholder.com/468x300"
  });

  return JSON.stringify(list);
}

function book_parse(url, html) {
  var $ = cheerio.load(html);
  var data = {};

  data.name = "漫画标题";
  var sections = [];

  for (var index = 0; index < 10; index++) {
    sections.push({
      name: "章节" + index,
      url: "<%= app.url %>"
    });
  }

  data.sections = sections;

  return JSON.stringify(data);
}

function section_parse(url, html) {
  var $ = cheerio.load(html);
  var list = [];

  for (var index = 0; index < 30; index++) {
    list.push(
      "https://via.placeholder.com/468x300?text=picture-" + (index + 1)
    );
  }

  return JSON.stringify(list);
}
