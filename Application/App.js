import "https://unpkg.com/soo.js@1.1.2/build/soo.esm.js";
import Navigo from "/modules/navigo.js";
import Observer from "/modules/observer.js";
import * as util from "./utils/index.js";
import * as component from "./components/index.js";

import "./helpers/formTemplate.js"

const container = new Map();

const router = new Navigo(window.location.origin, false);

container.set("router", router)

for (let key in util) {
  container.set(key, util[key]);
}

for (let key in component) {
  component[key].prototype.utils = container;
  customElements.define(`${key}-element`, component[key]);
}

fetch("../config.json")
  .then(res => res.json())
  .then(data => (window.settings = data));

router
  .on('/', () => {
    document.body.querySelector("[key='container']").replaceWith("<account-element key='container'></account-element>".html())
  })
  .on('/buyer', () => {
    document.body.querySelector("[key='container']").replaceWith("<h2 key='container'>title</h2>".html())
  })
  .on('/supplier', () => {
    document.body.querySelector("[key='container']").replaceWith("<h2 key='container'>supplier</h2>".html())
  })
  .notFound(() => {
    document.body.querySelector("[key='container']").replaceWith("<home-element key='container'></home-element>".html())
  })
  .resolve();