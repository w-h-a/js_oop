const rectangleHub = {
  init: function(width, length) {
    this.width = width;
    this.length = length;
    return this;
  },
  getWidth: function() {
    return this.width;
  },
  getLength: function() {
    return this.length;
  },
  getArea: function() {
    return this.width * this.length;
  }
};

const squareHub = Object.create(rectangleHub);

squareHub.init = function(size) {
  rectangleHub.init.call(this, size, size);
  return this;
};

const linkedSquare = Object.create(squareHub).init(5);

const RectangleConstructor = function(width, length) {
  this.width = width;
  this.length = length;
};

RectangleConstructor.prototype.getWidth = function() {
  return this.width;
}

RectangleConstructor.prototype.getLength = function() {
  return this.length;
}

RectangleConstructor.prototype.getArea = function() {
  return this.width * this.length;
}

const SquareConstructor = function(size) {
  RectangleConstructor.call(this, size, size);
};

Object.setPrototypeOf(SquareConstructor.prototype, RectangleConstructor.prototype);

const constructedSquare = new SquareConstructor(5);

class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }
  getWidth() {
    return this.width;
  }
  getLength() {
    return this.length;
  }
  getArea() {
    return this.width * this.length;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
}

const squareInstance = new Square(5);

console.log(linkedSquare.getArea());
console.log(constructedSquare.getArea());
console.log(constructedSquare.constructor);
console.log(squareInstance.getArea());
