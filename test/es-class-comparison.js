const {Persistent, create} = require('../src/main')

const Point = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    moveX(amount) {
      this.x = this.x + amount;
      return this
    }
    moveY(amount) {
      this.y = this.y + amount;
      return this
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

const PersistentPoint = class extends Persistent {
    constructor(x, y) {
      return super({x, y}) 
    }
    moveX(amount) {
      return this.set({x: amount + this.x})
    }
    moveY(amount) {
      return this.set({y: amount + this.y})
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

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

const PersistentColorPoint = class extends PersistentPoint{
    constructor(x, y, color) {
        return super(x, y).set({color})
    }
    toString() {
        return super.toString() + ' in ' + this.color;
    }
}

exports.extend = (test) => {
  
  test.equal(new PersistentColorPoint(0, 2, 'blue').moveX(2).moveY(-1).toString(), '(2, 1) in blue')
  test.equal(new ColorPoint(1, 2, 'blue').toString(), new PersistentColorPoint(1, 2, 'blue').toString())
  test.done()
}

exports.prototype = (test) => {
  const pPoint = create({
    constructor(x, y) {
      return this.set({x, y}) 
    },
    moveX(amount) {
      return this.set({x: amount + this.x})
    },
    moveY(amount) {
      return this.set({y: amount + this.y})
    },
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
  })
  test.equal(pPoint(1,2).moveX(1).toString(), '(2, 2)')
  test.done()
}
