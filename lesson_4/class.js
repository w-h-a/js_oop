const swimOrFlyHub = {
  swim: function() {
    this.swims === true ? console.log("I'm swimming!") : console.log("I can't swim!");
  },
  fly: function() {
    this.flies === true ? console.log("I'm flying!") : console.log("I can't fly!");
  },
  init: function(swims, flies) {
    this.swims = swims;
    this.flies = flies;
    return this;
  }
}

const stork = Object.create(swimOrFlyHub).init(false, true);

const penguin = Object.create(swimOrFlyHub).init(true, false);

const duck = Object.create(swimOrFlyHub).init(true, true);
