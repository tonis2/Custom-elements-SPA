import Router from "https://unpkg.com/navigo@6.0.2/src/index.js";
import { HTML } from "https://unpkg.com/kelbas";

import * as component from "./components/index.js";

const router = new Router(window.location.origin);

for (let key in component) {
  component[key].prototype.router = router;
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

router.resolve();
