Object.assign = Object.assign || require('assign')

//Creates a constructor function from a 'spec' object, containing the methods
const createConstructor = (spec) => {

  //A function which elevates the spec to a full-blown prototype
  const toPrototype = (obj) => {
    //Iterate and augment all spec methods:
    return Object.keys(obj).reduce((proto, key) => {
      //Retrieve the method
      const method = obj[key]
      //From it, construct the real method
      proto[key] = function (...args) {
        const propsLength = Object.keys(this).length
        //Exec the method
        const result = method.apply(this, args)
        //If the returned object contains all keys that the original object, wrap it and return it
        if (propsLength === 1 || Object.keys(result).length === propsLength) {
          return baseConstructor(result)
        } else {
          //else merge the result with the original object
          return baseConstructor(Object.assign({}, this, result))
        }
      }
      return proto
    }, {})
  }
  
  //Transform the spec (do it once when the constructor is initialized
  const proto = toPrototype(spec)

  //Create the base constructor
  const baseConstructor = (val) => Object.assign(Object.create(proto), val)
  //If the object has a constructor, use it, else use the base constructor
  const constructor = proto.hasOwnProperty("constructor") ? proto.constructor : baseConstructor
  //Add function for extending the object
  constructor.extend = (newSpec) => createConstructor(Object.assign({}, spec, newSpec))
  return constructor
}

module.exports = createConstructor({}).extend