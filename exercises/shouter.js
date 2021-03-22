// OLOO

const person = {
  greeting: function(text) {
    console.log(text);
  }
};

const shouter = Object.create(person);

shouter.shout = function(text) {
  person.greeting.call(this, text.toUpperCase());
};

person.greeting("Hello. My name is Inigo Montoya. You killed my father. Prepare to die.");
shouter.shout("Hello. My name is Inigo Montoya. You killed my father. Prepare to die.");

// with "classes"

class Person {
  greeting(text) {
    console.log(text);
  }
}

class Shouter extends Person {
  greeting(text) {
    super.greeting(text.toUpperCase());
  }
}

const personInstance = new Person();
const shouterInstance = new Shouter();

personInstance.greeting("Hello. My name is Inigo Montoya. You killed my father. Prepare to die.");
shouterInstance.greeting("Hello. My name is Inigo Montoya. You killed my father. Prepare to die.");
