const carHub = {
  start: function() {
    this.started = true;
  },
  stop: function() {
    this.started = false;
  },
  init: function(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    return this;
  }
};

const car1 = Object.create(carHub).init("Toyota", "Corolla", 2018);

console.log(car1);




const petHub = {
  sleep: function() {
    console.log("I am sleeping");
  },
  wake: function() {
    console.log("I am awake");
  },
  init: function(animal, name) {
    this.name = name;
    this.animal = animal;
    return this;
  }
};

const pudding = Object.create(petHub).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

const neptune = Object.create(petHub).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
