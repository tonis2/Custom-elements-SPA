class Header extends Soo {
    constructor() {
        super()
        this.router = this.utils.get("router")
    }

    changeRoute(event) {
        const link = event.target.attributes.link.value
        this.router.navigate(link)
    }

    render() {
        return HTML`<section id="menu-links">
                        <img class="menu-link" onclick="${this.changeRoute.bind(this)}" link="/" src="/assets/images/home.svg"/>
                    </section>`
    }
}

Header.prototype.noShadow = true;
export default Header