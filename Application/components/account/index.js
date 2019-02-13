
const loginEntries = [
    {"name": "Login", "type":"text"},
    {"name": "Password", "type":"password"}
]

class Account extends Soo {
    constructor() {
        super();
    }

    install() {
        this.form = `<default-form></default-form>`.html()
        this.form.addEventListener("submit", this.submit.bind(this), false)

        this.onkeydown = event => {
            if (event.keyCode == 13) {
                this.submit()
                return false
            }
        }
    }

    installed() {
        this.form.setInputs(loginEntries)
    }

    submit(event) {
        if(event) event.preventDefault();
        console.log(event)
    }

    render() {
        return FRAGMENT`<section id="login-form">
                            ${this.form}
                        </section>
                        <img class="form-decoration" src="/assets/images/register_bg.jpg"></img>`
    }
}

Account.prototype.noShadow = true;
export default Account