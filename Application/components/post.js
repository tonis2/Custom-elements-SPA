import { HTML } from "https://unpkg.com/kelbas"
import Element from "../modules/Element.js"


export default class Post extends Element {
    async getPost() {
        //this.post is defined at main.js
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
