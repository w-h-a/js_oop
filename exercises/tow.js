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

const towMixin = {
  tow: function() {
    return "I can tow a truck!";
  }
};

// OLOO

const vehicleHub = {
  init: function(year) {
    this.year = year;
    return this;
  }
};

const truckHub = Object.create(vehicleHub);

mixup(truckHub, towMixin);

const linkedTruck = Object.create(truckHub).init(2002);
console.log(linkedTruck.year);
console.log(linkedTruck.tow());

const linkedCar = Object.create(vehicleHub).init(2015);
console.log(linkedCar.year);

// with "classes"

class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {

}

mixup(Truck.prototype, towMixin);

class Car extends Vehicle {

}

let truck = new Truck(2002);
console.log(truck.year);
console.log(truck.tow());

let car = new Car(2015);
console.log(car.year);
