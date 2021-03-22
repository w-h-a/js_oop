// OLOO

const petHub = {
  init: function(name, age) {
    this.name = name;
    this.age = age;
    return this;
  }
};

const catHub = Object.create(petHub);

catHub.init = function(name, age, colors) {
  petHub.init.call(this, name, age);
  this.colors = colors;
  return this;
}

catHub.info = function() {
  return `My cat ${this.name} is ${this.age} and has ${this.colors} fur.`;
}

const linkedPudding = Object.create(catHub).init('Pudding', 7, 'black and white');
const linkedButterscotch = Object.create(catHub).init('Butterscotch', 10, 'tan and white');

// w/ constructor calls

const PetConstructor = function(name, age) {
  this.name = name;
  this.age = age;
};

const CatConstructor = function(name, age, colors) {
  PetConstructor.call(this, name, age);
  this.colors = colors;
};

Object.setPrototypeOf(CatConstructor.prototype, PetConstructor.prototype);

CatConstructor.prototype.info = function() {
  return `My cat ${this.name} is ${this.age} and has ${this.colors} fur.`;
};

const constructedPudding = new CatConstructor('Pudding', 7, 'black and white');
const constructedButterscotch = new CatConstructor('Butterscotch', 10, 'tan and white');

// w/ "classes"

class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Cat extends Pet {
  constructor(name, age, colors) {
    super(name, age);
    this.colors = colors;
  }
  info() {
    return `My cat ${this.name} is ${this.age} and has ${this.colors} fur.`;
  }
}

let puddingInstance = new Cat('Pudding', 7, 'black and white');
let butterscotchInstance = new Cat('Butterscotch', 10, 'tan and white');

console.log(linkedPudding.info());
console.log(linkedButterscotch.info());
console.log(constructedPudding.info());
console.log(constructedButterscotch.info());
console.log(puddingInstance.info());
console.log(butterscotchInstance.info());
