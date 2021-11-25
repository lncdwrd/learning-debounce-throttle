const debounce = (func, delay) => {
  let timerId;
  return function () {
      clearTimeout(timerId)
      timerId = setTimeout(() => func.apply(this, arguments), delay)
  };
};

const throttle = (func, delay) => {
  let toThrottle = false;
  return function () {
      if (!toThrottle) {
          toThrottle = true;
          func.apply(this, arguments)
          setTimeout(() => {
              toThrottle = false
          }, delay);
      }
  };
};



// How func.apply works
const obj = {
  name: 'foo',
  sayMyName() {
    console.log(this);
    console.log('My name is', this.name)
  },

  /**
   * Step 1.1
   * - obj.deb = debounce() adds obj.deb as a method in obj, so 'this' refers to obj
   * 
   * deb() {
   *   // has access to func inside exe, closures
   *   func();
   * }
   * 
   */
}


function exe(func) {
  /**
   * Step 1.2
   * - func is created inside exe
   * - no access to 'this' of obj
   * - note: parameters passed as an arguments create its own copy
   * 
   * const func = function () {
   *   console.log('My name is', this.name);
   * }
   * 
   */

  return function () {
    func.apply(this, arguments);
  }
}

obj.deb = exe(obj.sayMyName);

/**
 * Step 2
 * - invoking obj.deb will execute func stored in exe so it does not have reference to 'this' inside obj
 * - func.apply(this, arguments) will bind obj.deb's 'this' to func 
 */
obj.deb();
