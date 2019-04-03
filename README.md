# Blog with custom elements

Browser engines have evolved enormously and i want to share some ideas how to quickly build a `JavaScript` Single Page Application,
using cool browser features like 

> [Async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) \
> [Custom elements V1](https://developers.google.com/web/fundamentals/web-components/customelements) \
> [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

This will be a very basic project, it will take maybe 5 minutes to get running and we wont need to install any `node_modules` just write the code and boom it's ready.

Okay so lets start

### Project setup

First lets create some base files, we need `index.html` for sure, so let's start with that.

In your project folder create a new file called `index.html`

And add some content to it

> `index.html`
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My blog</title>
    <link rel="stylesheet" href="Application/styles/index.css">
</head>
<body>
   <div id="root"></div>
</body>
<script type="module" src="Application/App.js"></script>
</html>

```

We have some basic stuff in it like, **title**, **stylesheet**, **root**, and our **script** tag

Lets focus on the `script` tag, we have `type=module` there, we need to use it if we want to activate `ES6 modules` support in our `JS` file, so dont forget it.
```HTML
<script type="module" src="Application/App.js"></script>
 ```

 Next lets create our folder structure.

 Lets make it like this 

* Application
    * components
    * modules
    * styles
    * App.js


Good lets now move on to writing `JavaScript`


### JavaScript components

Our Application starts from `App.js` so let's go there and import our first `libraries` 

On top of the `App.js` file write

```JS
import "https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-lite.js";
import Router from "https://unpkg.com/navigo@6.0.2/src/index.js";
import { HTML } from "https://unpkg.com/kelbas";
```

I will explain a bit what these libraries do.

Lets start with [webcomponents-lite](https://github.com/webcomponents/webcomponentsjs/), this will add `polyfills` to your Application so if we would like our App to work on a bit older browser we need to use the `polyfills` bundle. 

Next is the `Router` we will be using [navigo](https://github.com/krasimir/navigo), it's a very light weight awesome routing library for the browsers.

Then we have the [HTML](https://github.com/tonis2/kelbas) library and that's created by myself, it extends on the idea of using [ES6 template strings](https://wesbos.com/template-strings-html/) to create `HTML` elements.


Next we will create start our `Router` and start listening for routes `"/"` and `"/post/:id/"`

> `App.js`
```JS
const router = new Router();

// Attach routes
router.on("/", () => {});

router.on("/post/:id", params => {});

router.resolve();

```

If you would go on to page `"/"` it should fire a function but it's currently empty so lets show something, lets show a title *Hello*

> `App.js`
```JS
router.on("/", () => {
  const element = HTML`<h2>Hello</h2>`;
  document.querySelector("#root").replaceWith(element);
});
```

In our route `"/"` we create a `H2` element Hello and then replace our `root` with that, this is how basic routing works. 

But we want to create a **Blog** so we need a page that shows our posts and a page that shows a single post.

In our `components` folder lets create 3 files `home.js` , `post.js` and `index.js`

So our components folder looks like this 

* components
    * home.js
    * index.js
    * post.js

 In our `index.js` lets just `export` the other 2 files, so we could easily import all our components. 

> `index.js`
 ```JS
export { default as home } from "./home.js"
export { default as post } from "./post.js"
 ```





