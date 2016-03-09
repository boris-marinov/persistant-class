Object.assign = Object.assign || require('assign')

exports.Persistent = class {
  constructor(obj){
    return this.set(obj)
  }
  set(diff) {
    return Object.freeze(Object.assign(Object.create(Object.getPrototypeOf(this)), this, diff))
  }
}

exports.proto = Object.getPrototypeOf(new exports.Persistent())
exports.create = (proto) => {
  const objectProto = Object.assign(Object.create(exports.proto), proto)
  return (...args) => objectProto.constructor.apply(Object.create(objectProto), args)
}
