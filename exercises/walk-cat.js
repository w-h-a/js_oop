// Object.assign alternative

const mixup = function(target, ...sources) {
  for (let idx = 0; idx < sources.length; idx += 1) {
    for (let key in sources[idx]) {
      if (!(key in target)) {
        target[key] = sources[idx][key];
      }
    }
  }
  return target;
};

// mixin

const walkMixin = {
  walk: function() {
    return "Let's go for a walk!";
  }
};

// OLOO

const catHub = {
  init: function(name) {
    this.name = name;
    return this;
  },
  greet: function() {
    return `Hello! My name is ${this.name}!`;
  }
};

mixup(catHub, walkMixin);

const linkedKitty = Object.create(catHub).init("Sophie");
console.log(linkedKitty.greet());
console.log(linkedKitty.walk());

// with "constructors"

const CatConstructor = function(name) {
  this.name = name;
};

CatConstructor.prototype.greet = function() {
  return `Hello! My name is ${this.name}`;
};

mixup(CatConstructor.prototype, walkMixin);

const constructedKitty = new CatConstructor("Sophie");
console.log(constructedKitty.greet());
console.log(constructedKitty.walk());

// with "classes"
// the following yields same result as Launch solution.
// however, `mixup` does not pave over extant properties in
// the [[Prototype]] chain like `Object.assign`;

class Cat {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

mixup(Cat.prototype, walkMixin);

let kitty = new Cat("Sophie");
console.log(kitty.greet());
console.log(kitty.walk());
