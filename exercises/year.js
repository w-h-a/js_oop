// OLOO

const vehicleHub = {
  init: function(year) {
    this.year = year;
    return this;
  }
};

const linkedTruck = Object.create(vehicleHub).init(2003);
console.log(linkedTruck.year);

const linkedCar = Object.create(vehicleHub).init(2015);
console.log(linkedCar.year);

// with "constructors"

const VehicleConstructor = function(year) {
  this.year = year;
};

const TruckConstructor = function(year) {
  VehicleConstructor.call(this, year);
};

const CarConstructor = function(year) {
  VehicleConstructor.call(this, year);
};

Object.setPrototypeOf(TruckConstructor.prototype, VehicleConstructor.prototype);

Object.setPrototypeOf(CarConstructor.prototype, VehicleConstructor.prototype);

const constructedTruck = new TruckConstructor(2003);
console.log(constructedTruck.year);

const constructedCar = new CarConstructor(2015);
console.log(constructedCar.year);

// with "classes"

class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {

}

class Car extends Vehicle {

}

let truck = new Truck(2003);
console.log(truck.year); // 2003

let car = new Car(2015);
console.log(car.year); // 2015
