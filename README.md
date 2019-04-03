# Blog with custom elements

Browser engines have evolved enormously and i want to share some ideas how to quickly build a `JavaScript` Single Page Application,
using cool browser features like 

> [Async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) \
> [Custom elements V1](https://developers.google.com/web/fundamentals/web-components/customelements) \
> [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

This will be a very basic project, it will take maybe 15 minutes to get running and we wont need to install any `node_modules` just write the code and boom it's ready.

Also the `Application` will be super-light-weight, so the browser can load it quick and it's performance will be super.

You can view the `live` result [here](https://tonis2.github.io/Custom-elements-blog/)

And check the full `code` [here](https://github.com/tonis2/Custom-elements-blog)


Okay so lets start 

-----

## Basic setup

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
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-lite.js"></script>
<script type="module" src="Application/App.js"></script>
</html>

```

We have some basic stuff in it like, **title**, **stylesheet**, **root**, and our **script** tag, i have also included `webcomponents-lite.js` as a polyfill to increase the browser support for `webcomponents`, cause they still lack [support](https://caniuse.com/#search=custom%20elements) on some browsers.

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

-----
## JavaScript files setup

Our Application starts from `App.js` so let's go there and import our first `libraries` 

On top of the `App.js` file write

```JS
import Router from "https://unpkg.com/navigo@6.0.2/src/index.js";
import { HTML } from "https://unpkg.com/kelbas";
```

I will explain a bit what these libraries do.

For the `Router` we will be using [navigo](https://github.com/krasimir/navigo), it's a very light weight awesome routing library for the browsers.

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

 In our `index.js` lets just `export` the other 2 files, so we could easily import all our components later. 

> `index.js`
 ```JS
export { default as home } from "./home.js"
export { default as post } from "./post.js"
 ```


Before we can start building our *pages* we will add one more thing.


In our modules folder, lets create a file called `Element.js`

* Application
    * modules
        * Element.js

Our `Element.js` will be a wrapper for native `HTMLElement`, i would recommend using a simple wrapper so we supercharge our development with `Custom elements`

In the newly created `Element.js` add 

> `Element.js`
```JS
export default class Element extends HTMLElement {
    //Element is connected
    async connectedCallback() {
        this.install.apply(this)

        this.beforeRender()
        const element = await this.render()
        this.appendChild(element)

        this.installed()
    }

    //Element is removed
    disconnectedCallback() {
        this.uninstall()
    }

    //Update element
    async update() {
        this.beforeUpdate()
        this.replaceWith(element)
        this.afterUpdate()
    }

    install() { }
    installed() { }
    uninstall() { }
    beforeUpdate() { }
    afterUpdate() { }
    beforeRender() { }
}
```

-----

## Creating Web-component pages

Now we have our project fully setup and we can start implementing pages, as this is meant as a short tutorial i will be using [JSON-Placeholder](https://jsonplaceholder.typicode.com/) for my `data`.

We can pull `posts`  in by just calling 

```JS
fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(json => console.log(json))
```


Lets add some `JavaScript` to our `/components/home.js`


> `home.js`
```JS
import { HTML } from "https://unpkg.com/kelbas"
import Element from "../modules/Element.js"


export default class Home extends Element {
    async getPosts() {
       return await fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json())
    }

    open(id) {
        this.router.navigate(`/post/${id}`)
    }

    async render() {
        const posts = await this.getPosts()
        return HTML`<section id="posts-container">
                        ${posts.map((post) => {
                            return HTML`<div class="post" onclick=${this.open.bind(this, post.id)}>
                                                <h3 class="post-title">${post.title}</h3>
                                                <p class="post-body">${post.body}</p>
                                        </div>`
                         })}
                    </sectio>`
    }
}
```

First we add our required libraries, we `import` the `Element.js` that we created before and also the [HTML](https://github.com/tonis2/kelbas) parser that i talked about earlier.

If you have developed with `React.js` then this could seem quite familiar, which is awesome in my opinions cause we dont need to bundle `JSX` to render this and it has basically the same `API`.

We have an [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function to pull the `data`,
then in the `render` function first we wait for the data and then show the `data` retrieved, very simple. \
We could easily add a `Loading...` indicator here but i pass it this time for keeping things simple.

There is also the function `open`, just add it currently, we will implement `this.router` later in the `App.js`


Next lets add some `JavaScript` to our `/components/post.js`


> `post.js`
```JS
import { HTML } from "https://unpkg.com/kelbas"
import Element from "../modules/Element.js"


export default class Post extends Element {
    async getPost() {
       return await fetch(`https://jsonplaceholder.typicode.com/posts/${this.post}`).then(res => res.json())
    }

    async render() {
        const {title, body} = await this.getPost()

        return HTML`<section id="post-container">
                        <h2>${title}</h2>
                        <p>${body}</p>
                    </section>`
    }
}

```


This is basically the same as `home.js` but it will load a single post data, notice the `this.post` value in `getPost` function,
we will add this as an `id` in the `router` at `App.js`




Now lets go back to our `App.js`

First lets `import` all our `components` from `/Application/components/index.js`, add next line to your `App.js`

> `App.js`
```JS
import * as component from "./components/index.js";

```

Then we attach our `router` to all our `components` so we could easily change routes from inside the `component` \
and we also define the customElements as `file-name + element` so our `home.js` becomes `home-element`

After defining the `customElements` you can attach `<home-element></home-element>` to your `index.html` and it will work, how cool is that.

> `App.js`
```JS
for (let key in component) {
  component[key].prototype.router = router;
  customElements.define(`${key}-element`, component[key]);
}
```


Okay we are almost done, now lets finally finish our routes so when you arrive on the page you get all the posts when you click on a post you will get a single post page.

> `App.js`
```JS
router.on("/", () => {
  const element = HTML`<home-element id="root"></home-element>`;
  document.querySelector("#root").replaceWith(element);
});

router.on("/post/:id", params => {
  const element = HTML`<post-element id="root"></post-element>`;
        element.post = params.id
  document.querySelector("#root").replaceWith(element);
});

```
Whats happening there is that when `route` is fired, we will create our `HTML` `customElement` that we `imported` and then `defined` before.
and we will use [replaceWith](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith) on our ` <div id="root"></div>` element in `index.html`.

Also make sure to give your elements something to be `identified` with like `id` or `key`, so we can find the element that we want to replace each time route changes, thats why `home-element` and `post-element` have `id=root` also.


And now the final part add, lets add our designs.


## Add styles

In your `styles` folder at 

* Application
    * styles

Lets add `index.css` and fill it with some simple `css`

> `index.css`

```CSS
@import "https://unpkg.com/mustard-ui@latest/dist/css/mustard-ui.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css";

body {
  width: 60%;
  margin: 0 auto;
  background: #e67e22;
}
#posts-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  margin: 50px 0;
}

#posts-container .post {
  background: #ecf0f1;
  padding: 10px 15px;
  cursor: pointer;
}

#post-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  margin-top:50px;
}

#post-container h2 {
  color: #ecf0f1;
}

#post-container p {
  color: #ecf0f1;
  background: #d35400;
  padding: 20px;
}
```



Now serve your site from a `http-server` and you have a **Blog** , you can use whatever you like, for example with `node.js` you can use 
[http-server](https://www.npmjs.com/package/http-server)

If you got in trouble you can check the full-code [here](https://github.com/tonis2/Custom-elements-blog)

I hope my tutorial was helpful and give your thoughts about it in the comments. 
