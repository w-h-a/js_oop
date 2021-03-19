class Animal {
  move() {}
}

class Fish extends Animal {
  move() {
    console.log("swimming");
  }
}

class Cat extends Animal {
  move() {
    console.log("walking");
  }
}

// Sponges and Corals don't have a separate move method - they don't move
class Sponge extends Animal {}
class Coral extends Animal {}

let animals = [new Fish(), new Cat(), new Sponge(), new Coral()];
animals.forEach(animal => animal.move());
console.log(animals[0].hasOwnProperty("move"));
animals[0].move();
console.log(typeof Fish);

console.log(Object.getPrototypeOf(animals[0]));
console.log(animals[0].constructor);
