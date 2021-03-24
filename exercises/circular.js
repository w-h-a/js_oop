// completed OLOO approach:

const circularQ = Object.create(Array.prototype);

circularQ.init = function(max) {
  this.max = max;
  return this;
};

circularQ.deq = function() {
  return this.length > 0 ? this.shift() : null;
};

circularQ.enq = function(obj) {
  if (this.length === this.max) {
    this.deq();
  }
  this.push(obj);
};

// beginnings of "constructor" approach:

const CircularQConstructor = function(max) {
  this.max = max;
};

Object.setPrototypeOf(CircularQConstructor.prototype, Array.prototype);

// beginnings of "classes" approach:

class CircularArray extends Array {
  constructor(max) {
    super();
    this.max = max;
  }
}




const q = Object.create(circularQ).init(3);
console.log(q.deq());

q.enq(1);
q.enq(2);
console.log(q.deq());

q.enq(3);
q.enq(4);
console.log(q.deq());

q.enq(5);
q.enq(6);
q.enq(7);
console.log(q.deq());
console.log(q.deq());
console.log(q.deq());
console.log(q.deq());

const p = Object.create(circularQ).init(4);
console.log(p.deq());

p.enq(1);
p.enq(2);
console.log(p.deq());

p.enq(3);
p.enq(4);
console.log(p.deq());

p.enq(5);
p.enq(6);
p.enq(7);
console.log(p.deq());
console.log(p.deq());
console.log(p.deq());
console.log(p.deq());
console.log(p.deq());




/*
let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1)
anotherQueue.enqueue(2)
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3)
anotherQueue.enqueue(4)
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5)
anotherQueue.enqueue(6)
anotherQueue.enqueue(7)
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);
*/
