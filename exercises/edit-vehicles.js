// OLOO

const vehicleHub = {
  init: function(make, model) {
    this.make = make;
    this.model = model;
    return this;
  },
  info: function() {
    return `${this.make} ${this.model}`;
  }
}

const carHub = Object.create(vehicleHub);

carHub.getNumCarWheels = function() {
  return 4;
};

const motorcycleHub = Object.create(vehicleHub);

motorcycleHub.getNumMotorWheels = function() {
  return 2;
}

const truckHub = Object.create(vehicleHub);

truckHub.init = function(make, model, payload) {
  vehicleHub.init.call(this, make, model);
  this.payload = payload;
  return this;
}

truckHub.getNumTruckWheels = function() {
  return 6;
}

// with "constructors"

const VehicleConstructor = function(make, model) {
  this.make = make;
  this.model = model;
};

VehicleConstructor.prototype.info = function() {
  return `${this.make} ${this.model}`;
};

const CarConstructor = function(make, model) {
  VehicleConstructor.call(this, make, model);
};

Object.setPrototypeOf(CarConstructor.prototype, VehicleConstructor.prototype);

CarConstructor.prototype.getNumCarWheels = function() {
  return 4;
};

const MotorConstructor = function(make, model) {
  VehicleConstructor.call(this, make, model);
};

Object.setPrototypeOf(MotorConstructor.prototype, VehicleConstructor.prototype);

MotorConstructor.prototype.getNumMotorWheels = function() {
  return 2;
};

const TruckConstructor = function(make, model, payload) {
  VehicleConstructor.call(this, make, model);
  this.payload = payload;
};

Object.setPrototypeOf(TruckConstructor.prototype, VehicleConstructor.prototype);

TruckConstructor.prototype.getNumTruckWheels = function() {
  return 6;
}

// with "classes"

class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  getNumCarWheels() {
    return 4;
  }
}

class Motorcycle extends Vehicle {
  getNumMotorWheels() {
    return 2;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }
  getNumTruckWheels() {
    return 6;
  }
}
