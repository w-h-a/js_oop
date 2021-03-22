// OLOO

const animalHub = {
  init: function(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
    return this;
  },
  introduce: function() {
    return `Hello, my name is ${this.name} and I am ${this.age} and ${this.status}.`;
  }
};

const catHub = Object.create(animalHub);

catHub.init = function(name, age, status) {
  animalHub.init.call(this, name, age, 4, "cat", status);
  return this;
};

catHub.introduce = function() {
  return animalHub.introduce.call(this) + " " + "Meow meow!";
}

const dogHub = Object.create(animalHub);

dogHub.init = function(name, age, status, master) {
  animalHub.init.call(this, name, age, 4, "dog", status);
  this.master = master;
  return this;
}

dogHub.greetMaster = function() {
  return `Hello ${this.master}! Woof, woof!`;
}

const linkedCat = Object.create(catHub).init("Pepe", 2, "happy");
console.log(linkedCat.introduce());
const linkedDog = Object.create(dogHub).init("Colorless", 2, "free", "myself");
console.log(linkedDog.introduce());
console.log(linkedDog.greetMaster());

// with constructor calls

const AnimalConstructor = function(name, age, legs, species, status) {
  this.name = name;
  this.age = age;
  this.legs = legs;
  this.species = species;
  this.status = status;
};

AnimalConstructor.prototype.introduce = function() {
  return `Hello, my name is ${this.name} and I am ${this.age} and ${this.status}.`;
};

const CatConstructor = function(name, age, status) {
  AnimalConstructor.call(this, name, age, 4, "cat", status);
};

Object.setPrototypeOf(CatConstructor.prototype, AnimalConstructor.prototype);

CatConstructor.prototype.introduce = function() {
  return AnimalConstructor.prototype.introduce.call(this) + " " + "Meow meow!";
};

const DogConstructor = function(name, age, status, master) {
  AnimalConstructor.call(this, name, age, 4, "dog", status);
  this.master = master;
};

Object.setPrototypeOf(DogConstructor.prototype, AnimalConstructor.prototype);

DogConstructor.prototype.greetMaster = function() {
  return `Hello ${this.master}! Woof, woof!`;
};

const constructedCat = new CatConstructor("Pepe", 2, "happy");
console.log(constructedCat.introduce());
const constructedDog = new DogConstructor("Colorless", 2, "free", "myself");
console.log(constructedDog.introduce());
console.log(constructedDog.greetMaster());

// with "classes"

class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, "cat", status);
  }
  introduce() {
    return super.introduce() + " " + "Meow meow!";
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, "dog", status);
    this.master = master;
  }
  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`;
  }
}

const catInstance = new Cat("Pepe", 2, "happy");
console.log(catInstance.introduce());
const dogInstance = new Dog("Colorless", 2, "free", "myself");
console.log(dogInstance.introduce());
console.log(dogInstance.greetMaster());
