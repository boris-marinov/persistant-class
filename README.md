##Deprecated. See https://github.com/boris-marinov/persistent-clazz

# persistent-class
Persistent datastructures. Loosely based on the ES2015 class specification.


## About

This is an opinionated tool for constructing lightweight persistent data structures, 
kinda like the Records from ImmutableJS, made using ECMAScript 6 Classes.

You can define and extend them. What you get will always be immutable.

## Example

Here is a little comparison between using a persistent class compared to a plain one:

    const point = new Point(1, 2)
    
    const persistentPoint = new PersistentPoint(1, 2)

    persistentPoint.x = 3 // Does not mutate the object. Throws error in strict mode

    point.moveX(1).toString() === persistentPoint.moveX(1).toString() //Both implementation support fluent API

    point.toString() //'(2, 2)' // The Value is mutated in the operation above

    persistentPoint.toString() //'(1, 2)' // Values remain unchanged

## Tutorial

The library exports a Persistent Class Constructor:

    const Persistent = require('persistent-class').Persistent

Define a persistent class by extending it:

    const PersistentPoint = class extends Persistent {

### Addding a constructor

Create a constructor for your persistent class by calling the super function with a plain object containing the object's properties and returning the result:

#### Plain:

    const Point = class {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        ...

#### Persistent:

    const PersistentPoint = class extends Persistent {
        constructor(x, y) {
          return super({x, y}) 
        }
        ...

### Defining methods

Methods can apply modifications to the object's properties by calling the low level `set` method with a modification object containing the new values of changed properties. This method generates a new version of the object. Return the result to create a fluent API.
        
#### Plain:

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
    })

#### Persistent:

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

### Using Custom factory Functions

You can create persistent objects with vanilla prototype-based inheritance.
Just create your object using the provided `prototype` or use the `create` function to create a class-like record structure.

    const create = require('persistent-class').create

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

[View source](test/es-class-comparison.js)

##Project Status

It is just [a few lines of code](src/main.js) and is [well](test/test.js)-[tested](test/es-class-comparison.js).


