"use strict";

Object.assign = Object.assign || require('assign');

//Creates a constructor function from a 'spec' object, containing the methods
var createConstructor = function createConstructor(spec) {

  //A function which elevates the spec to a full-blown prototype
  var toPrototype = function toPrototype(obj) {
    //Iterate and augment all spec methods:
    return Object.keys(obj).reduce(function (proto, key) {
      //Retrieve the method
      var method = obj[key];
      //From it, construct the real method
      proto[key] = function () {
        var propsLength = Object.keys(this).length;
        //Exec the method

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var result = method.apply(this, args);
        //If the returned object contains all keys that the original object, wrap it and return it
        if (propsLength === 1 || Object.keys(result).length === propsLength) {
          return baseConstructor(result);
        } else {
          //else merge the result with the original object
          return baseConstructor(Object.assign({}, this, result));
        }
      };
      return proto;
    }, {});
  };

  //Transform the spec (do it once when the constructor is initialized
  var proto = toPrototype(spec);

  //Create the base constructor
  var baseConstructor = function baseConstructor(val) {
    return Object.assign(Object.create(proto), val);
  };
  //If the object has a constructor, use it, else use the base constructor
  var constructor = proto.hasOwnProperty("constructor") ? proto.constructor : baseConstructor;
  //Add function for extending the object
  constructor.extend = function (newSpec) {
    return createConstructor(Object.assign({}, spec, newSpec));
  };
  return constructor;
};

module.exports = createConstructor({}).extend;
