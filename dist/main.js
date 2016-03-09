'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.assign = Object.assign || require('assign');

exports.Persistent = function () {
  function _class(obj) {
    _classCallCheck(this, _class);

    return this.set(obj);
  }

  _createClass(_class, [{
    key: 'set',
    value: function set(diff) {
      return Object.freeze(Object.assign(Object.create(Object.getPrototypeOf(this)), this, diff));
    }
  }]);

  return _class;
}();

exports.proto = Object.getPrototypeOf(new exports.Persistent());
exports.create = function (proto) {
  var objectProto = Object.assign(Object.create(exports.proto), proto);
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return objectProto.constructor.apply(Object.create(objectProto), args);
  };
};