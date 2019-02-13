class State {
    constructor() {
      this.map = new Map()
      this.applyPermanentValues()
    }
  
    applyPermanentValues() {
      for (let index = 0; index < localStorage.length; index++) {
        let key = localStorage.key(index)
        this.map.set(key, localStorage.getItem(key))
      }
    }
  
    setPermanent(key, value) {
      const entry = JSON.stringify(value)
      this.map.set(key, value)
      localStorage.setItem(key, entry)
    }
  
    set(key, value) {
      this.map.set(key, value)
    }
  
    get(key) {
      return this.map.get(key)
    }
  
    delete(key) {
      this.map.delete(key)
      localStorage.removeItem(key)
    }
  }
  
  export default new State()