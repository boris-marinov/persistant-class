const persistentClass = require('../src/main')

const Point = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    moveX(x) {
      this.x = this.x + x;
      return this
    }
    moveY(y) {
      this.y = this.y + y;
      return this
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

const PersistentPoint = persistentClass({
    constructor(x, y) {
      return { x, y }
    },
    moveX(x) {
      return {x: x + this.x}
    },
    moveY(y) {
      return {y: y + this.y}
    },
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
})

exports.base = (test) => {
  test.equal(new Point(1, 2).toString(), new PersistentPoint(1, 2).toString())
  test.done()
}

exports.persistent = (test) => {
  const point = new Point(1, 2)
  const persistentPoint = new PersistentPoint(1, 2)
  test.equal(point.moveX(1).toString(), persistentPoint.moveX(1).toString())
  test.equal(point.toString(), '(2, 2)')
  test.equal(persistentPoint.toString(), '(1, 2)')
  test.done()
  
}

const ColorPoint = class extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
    }
    toString() {
        return super.toString() + ' in ' + this.color;
    }
} 

const PersistentColorPoint = PersistentPoint.extend({
    constructor(x, y, color) {
        return { x, y, color }
    },
    toString() {
        return this._super_toString() + ' in ' + this.color;
    }
})

exports.extend = (test) => {
  test.equal(new ColorPoint(1, 2, 'blue').toString(), new PersistentColorPoint(1, 2, 'blue').toString())
  test.done()
}

