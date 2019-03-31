
export default class Element extends HTMLElement {
    async connectedCallback() {
        this.install.apply(this)
        this.beforeRender()

        if (this.render) {
            const element = await this.render()
            this.appendChild(element)
        }

        this.installed()
    }

    disconnectedCallback() {
        this.uninstall()
    }

    fire(name, data) {
        this.dispatchEvent(new CustomEvent(name, { detail: data }))
    }

    fireGlobal(name, data) {
        document.dispatchEvent(new CustomEvent(name, { detail: data }))
    }

    //Update element
    async update() {

        this.beforeUpdate()

        if (this.render) {
            const element = await this.render()

            //If we have fragment element, delete children and add new fragment
            if (element.nodeType === 11) {
                while (this.hasChildNodes()) {
                    this.removeChild(this.lastChild);
                }
                this.appendChild(element)
            } else {
                //Refresh rendered element with new one
                this.replaceWith(element)
            }
        }

        this.afterUpdate()
    }

    install() { }

    installed() { }

    uninstall() { }

    beforeUpdate() { }

    afterUpdate() { }

    beforeRender() { }
}