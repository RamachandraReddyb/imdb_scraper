import axios from "axios";
import request from "request";
import { encaseP, fork } from "fluture";

import { loadDom, getValuesFromDomNodes } from "./src/cheerio";

// Wrap Axios in a Future monad
const flAxios = encaseP(axios);

const requestPosts = () =>
  flAxios(("GET", "https://www.imdb.com/search/title/?title=The+Godfather"));

const getHtml = () => {
  const opts = {
    method: "GET",
    uri: "https://www.imdb.com/search/title/?title=The+Godfather",
  };
  request(opts, (error, response, html) => {
    if (error) {
      console.log(error);
    } else {
      const dom = loadDom(html);
      getValuesFromDomNodes(dom);
    }
  });
};

// Flutures will not be consumed (run) until they are "forked".
const execute = fork((rej) => console.log("reject", rej))((res) =>
  console.log("resolve", getHtml())
);

// Fluture monads can be cancelled, something we will not dig into
requestPosts().pipe(execute);
