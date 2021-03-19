class Parent {
  method() {
    console.log('parent method');
  }
}

class Child extends Parent {
  method() {
    //super.method();
    Object.getPrototypeOf(Object.getPrototypeOf(this)).method.call(this);
  }
}

const child1 = new Child();
child1.method(); // logs "parent method"

const obj1 = {
  method: function() {
    console.log('obj1 method');
  }
}

const obj2 = {
  method: Child.prototype.method
}

Object.setPrototypeOf(obj2, obj1);

const obj3 = Object.create(obj2);
obj3.method();
