class Home extends Soo {
    constructor() {
        super()
        this.router = this.utils.get("router")
    }

    changePage(route) {
        this.router.navigate(route)
    }

    render() {
        return FRAGMENT`<div class="type-choice" onclick="${this.changePage.bind(this, "supplier")}">Supplier</div>
                        <div class="type-choice" onclick="${this.changePage.bind(this, "buyer")}">Buyer</div>`
    }
}

Home.prototype.noShadow = true;
export default Home