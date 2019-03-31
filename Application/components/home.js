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