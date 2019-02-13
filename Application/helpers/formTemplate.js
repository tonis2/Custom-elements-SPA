class Form extends Soo {
    constructor() {
        super();
        this.setInputs = this.setInputs.bind(this);
    }
    css() {
        return `:host {
                      display:grid;
                      z-index:5;
                      width:100%;
                      justify-content:center;
                      align-content:center;
                      font-family: Lato;
                      
                    }
                    
                    form {
                        display:grid;
                        grid-row-gap:10px;
                    }

                    form input {
                        padding:5px 8px;
                        border:solid 1px var(--white);
                        background:var(--black);
                        color:var(--white);
                    }

                    form input::placeholder {
                        color:var(--white);
                    }

                    button {
                        background:var(--yellow);
                        border:none;
                        outline:none;
                        padding:5px 8px;
                        color:var(--black);
                        cursor:pointer;
                        font-weight:bold;
                    }
                  `
    }


    installed() {
        this.shadowRoot.querySelector("#entry-form").addEventListener("submit", this.submit.bind(this), false)
        this.onkeydown = event => {
            if (event.keyCode == 13) {
                this.submit()
                return false
            }
        }
    }

    async setInputs(list) {
        await this.render
        
        const entries = list.map(data => {
            return `<div class="form-input">
                        <input placeholder="${data.name}..." name="${data.name}" type="${data.type}" value="${data.value || ""}" required/>
                    </div>`.html()
        })
        this.shadowRoot.querySelector("form").prepend(...entries)
    }

    submit(event) {
        if (event) event.preventDefault()
        if (event.target.checkValidity()) {
            const inputs = Array.from(this.shadowRoot
                .querySelectorAll("input"))
                .map(node => {
                    return { [node.attributes.name.value]: node.value }
                })
                .filter(entry => entry)

            this.fire("submit", Object.assign(...inputs))
        }

    }

    render() {
        return HTML`<form id="entry-form">
                      <button type="submit">Submit</button>
                    </form>`
    }
}

customElements.define("default-form", Form)