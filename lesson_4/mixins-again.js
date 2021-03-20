const ParentA = {
  firstName: 'Zab',
  lastName: 'Xuq',
  getMemory: function() {
    console.log(this.firstName + ' ' + this.lastName + " is recalling fav sports...");
  },
  getSports: function() {
    this.getMemory();
    console.log(this.firstName + ' ' + this.lastName + " likes Football!");
  }
};

const ParentB = {
  firstName: 'Rab',
  lastName: 'Yuq',
  getSports: function() {
    console.log(this.firstName + ' ' + this.lastName + " likes Track & Field!");
  }
};

const Kid = Object.assign({
  firstName: 'Oof',
  getSports: function() {
    ParentA.getSports.call(this);
    ParentB.getSports.call(this);
    console.log(this.firstName + ' ' + this.lastName + " likes Basketball!");
  }
}, ParentA, ParentB);

Kid.getSports(); // Rab Yuq likes Track & Field!

const mixup = function(target, ...sources) {
  for (let idx = 0; idx < sources.length; idx += 1) {
    for (let key in sources[idx]) {
      if (!(key in target)) {
        target[key] = sources[idx][key];
      }
    }
  }
  return target;
};

const Parent1 = {
  firstName: 'Baz',
  lastName: 'Qux',
  getMemory: function() {
    console.log(this.firstName + ' ' + this.lastName + " is recalling fav sports...");
  },
  getSports: function() {
    this.getMemory();
    console.log(this.firstName + ' ' + this.lastName + " likes Football!");
  }
};

const Parent2 = {
  firstName: 'Bar',
  lastName: 'Quy',
  getSports: function() {
    console.log(this.firstName + ' ' + this.lastName + " likes Track & Field!");
  }
};

const ChildProt = {
  lastName: 'Foo'
}

const Child = mixup(Object.setPrototypeOf({
  firstName: 'Foo',
  getSports: function() {
    Parent1.getSports.call(this);
    Parent2.getSports.call(this);
    console.log(this.firstName + ' ' + this.lastName + " likes Basketball!");
  }
}, ChildProt), Parent1, Parent2);

Child.getSports();
// Foo Foo is recalling fav sports...
// Foo Foo likes Football!
// Foo Foo likes Track & Field!
// Foo Foo likes Basketball!

const Kid2 = Object.assign(Object.setPrototypeOf({
  firstName: 'Oof',
  getSports: function() {
    Parent1.getSports.call(this);
    Parent2.getSports.call(this);
    console.log(this.firstName + ' ' + this.lastName + " likes Basketball!");
  }
}, ChildProt), ParentA, ParentB);

Kid2.getSports(); // Rab Yuq likes Track & Field!
