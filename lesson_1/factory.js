const createCar = function(make, fuelLevel, engineOn) {
  return {
    make: make,
    fuelLevel: fuelLevel,
    engineOn: engineOn,

    startEngine: function() {
      this.engineOn = true;
    },

    drive: function() {
      this.fuelLevel -= 0.1;
    },

    stopEngine: function() {
      this.engineOn = false;
    },

    refuel: function(percent) {
      if ((this.fuelLevel + (percent / 100)) <= 1) {
        this.fuelLevel += (percent / 100);
      } else {
        this.fuelLevel = 1;
      }
    }
  };
}

const raceCar1 = createCar('BMW', 0.5, false);
console.log(raceCar1);
raceCar1.drive();
console.log(raceCar1);

const raceCar2 = createCar('Ferrari', 0.7, true);
console.log(raceCar2);
raceCar2.drive();
console.log(raceCar2);

const raceCar3 = createCar('Jaguar', 0.4, false);
console.log(raceCar3);
raceCar3.drive();
console.log(raceCar3);
