class API {
    constructor() {
      this.settings = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
      }
      this.post = this.post.bind(this)
      this.get = this.get.bind(this)
    }
  
    async get(url) {
      let method = "GET",
        settings = this.settings
      settings.method = method
      delete settings.body
      let response = await fetch(url, settings).catch(err => console.log(err))
      return await response.json()
    }
  
    async post(url, data) {
      let method = "POST",
        settings = this.settings
      settings.method = method
      settings.body = JSON.stringify(data)
      let response = await fetch(url, settings).catch(err => console.log(err))
      return await response.json()
    }
  
    async query(url, data) {
      let method = "POST",
        settings = this.settings
      settings.headers["Content-Type"] = "text/plain"
      settings.method = method
      settings.body = data
      let response = await fetch(url, settings).catch(err => console.log(err))
      return await response.json()
    }
  }
  
  export default new API()