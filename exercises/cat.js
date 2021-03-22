const catHub = {
  init: function(name) {
    this.name = name;
    return this;
  },
  speaks: function() {
    return `${this.name} says meowww.`;
  }
};

const linkedFaker = Object.create(catHub).init();

const CatConstructor = function(name) {
  this.name = name;
};

CatConstructor.prototype.speaks = function() {
  return `${this.name} says meowww.`;
};

const constructedFaker = new CatConstructor();

class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowww.`;
  }
}

const fakerInstance = new Cat();

console.log(catHub.isPrototypeOf(linkedFaker)); // true
console.log(constructedFaker.constructor === CatConstructor); // true
console.log(fakerInstance instanceof Cat); // true

console.log(linkedFaker.name); // undefined
console.log(constructedFaker.name); // undefined
console.log(fakerInstance.name); // undefined

console.log(linkedFaker.speaks());
console.log(constructedFaker.speaks());
console.log(fakerInstance.speaks());
