const {Persistent} = require('../src/main')

const Num = class extends Persistent {
  constructor(i) { return super({i:i})}
  increment() {return this.set({i:this.i + 1})}
}

const Tuple = class extends Persistent {
  setCar (val) {
    return this.set({car:val})
  }
  setCdr (val) {
    return this.set({cdr:val})
  }
}


exports.constructor = (test) => {

  const obj = new Num(1)

  test.equal(obj.i, 1, "Instantiate a value by passing a generic JSON object and stuff")

  test.equal( obj.increment().i, 2, "Manipulate value with methods and stuff")

  test.done()
}

exports.extend = (test) => {

  const ExtendedNum = class extends Num {decrement () {return this.set({i:this.i - 1})}}

  test.equal(new ExtendedNum(1).decrement().i, 0, "Add methods at runtime and stuff")

  test.equal(new Num(1).decrement, undefined, "The old constructor is not affected")

  test.done()
}

exports.extendConstructor = (test) => {
  NTuple = class extends Tuple{
    constructor (car, cdr) { return super({car, cdr}) }
  }

  test.equal(new NTuple('foo','bar').car, 'foo', 'Constructor can be added upon extending')

  NumTuple = class extends NTuple {
    setCar(car) { return this.set({car: "car="+car})}
  }

  test.equal(new NumTuple(1, 2).setCar(1).car, "car=1")

  test.done()
}
exports.defaultConstructor = (test) => {
  test.equal(new Tuple({car:'foo', cdr:'bar'}).setCar(1).car, 1)
  test.done()
}

exports.fluent = (test) => {

  test.equal(new Num(1).increment().increment().i, 3, "Methods return a wrapped instance")

  test.done()
}

exports.persistency  = (test) => {

  const one = new Num(1)

  const two = one.increment()

  test.equal(one.i, 1, "The values are persistent")

  test.done()
}

exports.deltas = (test) => {
  const t = new Tuple({car:"foo", cdr:"bar"})
  test.deepEqual(t.setCdr("baz"), {car:"foo", cdr:"baz"}, "You can update just one key and stuff")
  test.done()
}

const Functor = class extends Persistent { 
  constructor (val) {return super({val:val}) }
  map(f) {return this.set({val:f(this.val)})} 
}

exports.general = (test) => {
  test.equal(new Functor(4).map((val)=> val + 1).val, 5)
  test.done()
}
