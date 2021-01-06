import cheerio from "cheerio";

export const loadDom = (html) => cheerio.load(html);

let movieData = [];

export const getValuesFromDomNodes = (dom) => {
  let $ = dom;
  $(".lister-list .lister-item").each(function (i, elm) {
    let title = $(elm).find(".lister-item-header > a").text();
    let year = $(elm).find(".lister-item-year").text();
    let certificate = $(elm)
      .find(".lister-item-content .text-muted > .certificate")
      .text();
    let duration = $(elm).find(".text-muted > .runtime").text();
    let obj = {
      item: i,
      title,
      year,
      certificate,
      duration,
    };
    movieData.push(obj);
  });

  return console.log(JSON.stringify(movieData));
};
