import Router from "https://unpkg.com/navigo@6.0.2/src/index.js";
import { HTML } from "https://unpkg.com/kelbas";

//Lets import all our components
import * as component from "./components/index.js";

//Create a new router
const router = new Router();

for (let key in component) {
  //Add our router to all our components
  component[key].prototype.router = router;
  
  //Register our components
  customElements.define(`${key}-element`, component[key]);
}

// Attach routes
router.on("/", () => {
  const element = HTML`<home-element id="root"></home-element>`;
  document.querySelector("#root").replaceWith(element);
});

router.on("/post/:id", params => {
  const element = HTML`<post-element id="root"></post-element>`;
        element.post = params.id
  document.querySelector("#root").replaceWith(element);
});
//Run our router
router.resolve();
