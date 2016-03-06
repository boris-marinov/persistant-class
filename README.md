# persistent-class
Persistent datastructures. Loosely based on the ES2015 class specification.


## About

This is an opinionated tool for constructing lightweight persistent data structures. 
A cross between the Records from ImmutableJS and the ECMAScript 6 Classes.

You can define and extend them. What you get will always be immutable.

      const point = new Point(1, 2)
      const persistentPoint = new PersistentPoint(1, 2)

      point.moveX(1).toString() === persistentPoint.moveX(1).toString() //true

      point.toString() //'(2, 2)'
      persistentPoint.toString() //'(1, 2)'


## Using the library

The library exports a Persistent Class Constructor:

    const persistentClass = require('persistent-class')

### Defining a class

Define a persistent class by creating a constructor function which returns a plain object with the class's properties:

#### ES6 API:

    const Point = class {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        ...

#### Persistent API:

    const PersistentPoint = persistentClass({
        constructor(x, y) {
          return { x, y }
        },
        ...

### Defining methods

Methods can apply modifications to the object's properties by returning a modification object containing the new values
of changed properties. The API is fluent by default so you don't need to return `this` explicitly:
        
#### ES6 API:

        moveX(x) {
          this.x = this.x + x;
          return this
        }
        moveY(y) {
          this.y = this.y + y;
          return this
        }

#### Persistent API:

        moveX(x) {
          return {x: x + this.x}
        },
        moveY(y) {
          return {y: y + this.y}
        },

Methods that do not return a plain object are threated the same:

#### ES6 API:

        toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }
    })
    
#### Persistent API:

        toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }
    }

### Inheritance

Inheritance for Persistent Classes works in much the same way as in ES6 Classes.
Calling `super` methods is supported via a prefix:

        
#### ES6 API:

    const ColorPoint = class extends Point {
        constructor(x, y, color) {
            super(x, y);
            this.color = color;
        }
        toString() {
            return super.toString() + ' in ' + this.color;
        }
    } 

#### Persistent API:

    const PersistentColorPoint = PersistentPoint.extend({
        constructor(x, y, color) {
            return { x, y, color }
        },
        toString() {
            return this._super_toString() + ' in ' + this.color;
        }
    })

[View source](test/es-class-comparison.js)
