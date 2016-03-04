const persistentClass = require('../src/main')

const Num = persistentClass({
  constructor(i) { return {i:i}},
  increment() {return {i:this.i + 1}}
})

const Tuple = persistentClass({
  setCar (val) {
    return {car:val}
  },
  setCdr (val) {
    return {cdr:val}
  }
})

exports.constructor = (test) => {

  const obj = Num(1)

  test.equal(obj.i, 1, "Instantiate a value by passing a generic JSON object and stuff")

  test.equal( obj.increment().i, 2, "Manipulate value with methods and stuff")

  test.done()
}

exports.extend = (test) => {

  ExtendedNum = Num.extend({decrement () {return {i:this.i - 1}}})

  test.equal(ExtendedNum(1).decrement().i, 0, "Add methods at runtime and stuff")

  test.equal(Num(1).decrement, undefined, "The old constructor is not affected")

  test.done()
}

exports.extendConstructor = (test) => {
  NTuple = Tuple.extend({
    constructor (car, cdr) { return {car, cdr} }
  })

  test.equal(NTuple('foo','bar').car, 'foo', 'Constructor can be added upon extending')

  NumTuple = NTuple.extend({
    setCar(car) { return {car: "car="+car}}
  })

  test.equal(NumTuple(1, 2).setCar(1).car, "car=1")

  test.done()
}

exports.fluent = (test) => {

  test.equal(Num(1).increment().increment().i, 3, "Methods return a wrapped instance")

  test.done()
}

exports.persistency  = (test) => {

  const one = Num(1)

  const two = one.increment()

  test.equal(one.i, 1, "The values are persistent")

  test.done()
}

exports.deltas = (test) => {
  const t = Tuple({car:"foo", cdr:"bar"})
  test.deepEqual(t.setCdr("baz"), {car:"foo", cdr:"baz"}, "You can update just one key and stuff")
  test.done()
}
