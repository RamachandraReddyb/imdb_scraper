import cheerio from "cheerio";

export const loadDom = (html) => cheerio.load(html);

export const getValuesFromDomNodes = (dom) => {
  let $ = dom;
  let base = $(".lister-list");
  let title = base.find(".lister-item-header > a").html();
  let year = base.find(".lister-item-year").html();

  return console.log({ title, year });
};
