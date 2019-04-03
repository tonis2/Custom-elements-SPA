
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