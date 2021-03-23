// Object.assign alternative

const mixup = function(target, ...sources) {
  for (let idx = 0; idx < sources.length; idx += 1) {
    for (let key in sources[idx]) {
      if (!(key in target)) { // Object.assign lacks this
        target[key] = sources[idx][key];
      }
    }
  }
  return target;
};

// mixin

const swimMixin = {
  swim() {
    return `${this.name} is swimming.`;
  }
};

// OLOO

const fishHub = {
  init: function(name) {
    this.name = name;
    mixup(this, swimMixin); // getting more memory intensive
    return this;
  }
};

const dogHub = {
  init: function(name) {
    this.name = name;
    return this;
  }
};

const malteseHub = Object.create(dogHub);

mixup(malteseHub, swimMixin);

let linkedDog1 = Object.create(malteseHub).init("Buddy");
let linkedFish1 = Object.create(fishHub).init("Nemo");

console.log(linkedDog1.swim());
console.log(linkedFish1.swim());
console.log(linkedDog1.hasOwnProperty("swim")); // false
console.log(linkedFish1.hasOwnProperty("swim")); // true

// with "constructors"

const FishConstructor = function(name) {
  this.name = name;
  mixup(this, swimMixin);
};

const DogConstructor = function(name) {
  this.name = name;
};

const MalteseConstructor = function(name) {
  DogConstructor.call(this, name);
};

Object.setPrototypeOf(MalteseConstructor.prototype, DogConstructor.prototype);

mixup(MalteseConstructor.prototype, swimMixin);

let constructedDog1 = new MalteseConstructor("Buddy");
let constructedFish1 = new FishConstructor("Nemo");

console.log(constructedDog1.swim());
console.log(constructedFish1.swim());
console.log(constructedDog1.hasOwnProperty("swim")); // false
console.log(constructedFish1.hasOwnProperty("swim")); // true

// with "classes"

class Fish {
  constructor(name) {
    this.name = name;
    mixup(this, swimMixin);
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

class Maltese extends Dog {
  constructor(name) {
    super(name);
  }
}

mixup(Maltese.prototype, swimMixin);

let dog1 = new Maltese("Buddy");
let fish1 = new Fish("Nemo");

console.log(dog1.swim());
console.log(fish1.swim());
console.log(dog1.hasOwnProperty("swim")); // false
console.log(fish1.hasOwnProperty("swim")); // true
