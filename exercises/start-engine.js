// OLOO

const vehicleHub = {
  init: function(year) {
    this.year = year;
    return this;
  },
  startEngine() {
    return "Ready to go!";
  }
};

const truckHub = Object.create(vehicleHub);

truckHub.init = function(year, bedType) {
  vehicleHub.init.call(this, year);
  this.bedType = bedType;
  return this;
};

truckHub.startEngine = function(speed) {
  return vehicleHub.startEngine() + " " + `Drive ${speed}, please!`;
}

const carHub = Object.create(vehicleHub);

const linkedTruck = Object.create(truckHub).init(2003, "Short");
console.log(linkedTruck.startEngine("fast"));
console.log(linkedTruck.startEngine("slow"));

// with "constructors"

const VehicleConstructor = function(year) {
  this.year = year;
};

VehicleConstructor.prototype.startEngine = function() {
  return "Ready to go!";
};

const TruckConstructor = function(year, bedType) {
  VehicleConstructor.call(this, year);
  this.bedType = bedType;
};

Object.setPrototypeOf(TruckConstructor.prototype, VehicleConstructor.prototype);

TruckConstructor.prototype.startEngine = function(speed) {
  return VehicleConstructor.prototype.startEngine() + " " + `Drive ${speed}, please!`;
};

const CarConstructor = function(year) {
  VehicleConstructor.call(this, year);
};

Object.setPrototypeOf(CarConstructor.prototype, VehicleConstructor.prototype);

const constructedTruck = new TruckConstructor(2003, "Short");
console.log(constructedTruck.startEngine("fast"));
console.log(constructedTruck.startEngine("slow"));

// with "classes"

class Vehicle {
  constructor(year) {
    this.year = year;
  }
  startEngine() {
    return "Ready to go!";
  }
}

class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year);
    this.bedType = bedType;
  }
  startEngine(speed) {
    return super.startEngine() + " " + `Drive ${speed}, please!`;
  }
}

class Car extends Vehicle {

}

let truck1 = new Truck(2003, 'Short');
console.log(truck1.startEngine("fast"));
console.log(truck1.startEngine("slow"));
