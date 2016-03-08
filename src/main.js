Object.assign = Object.assign || require('assign')

module.exports = class {
  constructor(obj){
    return this.set(obj)
  }
  set(diff) {
    return Object.freeze(Object.assign(Object.create(Object.getPrototypeOf(this)), this, diff))
  }
}
