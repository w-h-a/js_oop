const cat = {
  name: 'Chuckles',
  makeNoise: function() {
    console.log('Meow! Chuckle!');
  }
};

const wes = {
  name: 'Wes',
  printNames: function() {
    console.log(`My name is ${this.name}!`);
  }
};

cat.makeNoise();
wes.printNames();
