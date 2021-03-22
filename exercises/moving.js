// OLOO

const animateHub = {
  init: function(name) {
    this.name = name;
    return this;
  },
  walk: function() {
    return `${this.name} ${this.gait()} forward.`;
  }
}

const linkedPerson = Object.create(animateHub).init("Mike");

linkedPerson.gait = function() {
  return "strolls";
};

const linkedCat = Object.create(animateHub).init("Kitty");

linkedCat.gait = function() {
  return "saunters";
};

const linkedCheetah = Object.create(animateHub).init("Flash");

linkedCheetah.gait = function() {
  return "sprints";
};

console.log(linkedPerson.walk());
console.log(linkedCat.walk());
console.log(linkedCheetah.walk());

// with "constructors"

const Animator = function(name) {
  this.name = name;
};

Animator.prototype.walk = function() {
  return `${this.name} ${this.gait()} forward.`;
};

const Personator = function(name) {
  Animator.call(this, name);
};

Object.setPrototypeOf(Personator.prototype, Animator.prototype);

Personator.prototype.gait = function() {
  return "strolls";
};

const Catator = function(name) {
  Animator.call(this, name);
};

Object.setPrototypeOf(Catator.prototype, Animator.prototype);

Catator.prototype.gait = function() {
  return "saunters";
};

const Cheetahator = function(name) {
  Animator.call(this, name);
};

Object.setPrototypeOf(Cheetahator.prototype, Animator.prototype);

Cheetahator.prototype.gait = function() {
  return "sprints";
};

const constructedPerson = new Personator("Mike");
const constructedCat = new Catator("Kitty");
const constructedCheetah = new Cheetahator("Flash");

console.log(constructedPerson.walk());
console.log(constructedCat.walk());
console.log(constructedCheetah.walk());

// with "classes"

class AnimateObjects {
  constructor(name) {
    this.name = name;
  }
  walk() {
    return `${this.name} ${this.gait()} forward.`;
  }
}

class Person extends AnimateObjects {
  gait() {
    return "strolls";
  }
}

class Cat extends AnimateObjects {
  gait() {
    return "saunters";
  }
}

class Cheetah extends AnimateObjects {
  gait() {
    return "sprints";
  }
}

const personInstance = new Person("Mike");
const catInstance = new Cat("Kitty");
const cheetahInstance = new Cheetah("Flash");

console.log(personInstance.walk());
console.log(catInstance.walk());
console.log(cheetahInstance.walk());
