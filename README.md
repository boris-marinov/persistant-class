# persistant-class
Persistent datastructures. Loosely based on the ES2015 class specification.

## Using the library



## Example
    const persistentClass = require('persistent-class')
    // Define a class
    const Tuple = persistentClass({
      //Defining a constructor is supported.
      //Constructor must return a plain object
      constructor (car, cdr) { return {car, cdr} },
      //Methods can return just the diff
      setCar (val) {
        return {car:val}
      },
      setCdr (val) {
        return {cdr:val}
      }
    })
    //Use it
    Tuple('foo','bar').car // 'foo'
    Tuple('foo','bar').setCar('baz').car //'baz'
