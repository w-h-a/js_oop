// OLOO

const petHub = {
  init: function(kind, name) {
    this.kind = kind;
    this.name = name;
    return this;
  }
};

const ownerHub = {
  init: function(name) {
    this.name = name;
    this.adoptions = [];
    return this;
  },
  numberOfPets: function() {
    return this.adoptions.length;
  }
};

const shelterHub = {
  adopters: [],
  adopt: function(owner, pet) {
    if (!this.adopters.includes(owner)) this.adopters.push(owner);
    owner.adoptions.push(pet);
  },
  printAdoptions: function() {
    this.adopters.forEach(function(adopter) {
      console.log(`${adopter.name} has adopted the following:`);
      adopter.adoptions.forEach(function(adoption) {
        console.log(`a ${adoption.kind} named ${adoption.name}`);
      });
    });
  }
};

const linkButterscotch = Object.create(petHub).init('cat', 'butterscotch');
const linkPudding = Object.create(petHub).init('cat', 'pudding');
const linkDarwin = Object.create(petHub).init('bearded dragon', 'darwin');
const linkKennedy = Object.create(petHub).init('dog', 'kennedy');
const linkSweetie = Object.create(petHub).init('parakeet', 'sweetie');
const linkMolly = Object.create(petHub).init('dog', 'molly');
const linkChester = Object.create(petHub).init('fish', 'chester');

const linkHanson = Object.create(ownerHub).init('hanson');
const linkHolmes = Object.create(ownerHub).init('holmes');

shelterHub.adopt(linkHanson, linkButterscotch);
shelterHub.adopt(linkHanson, linkPudding);
shelterHub.adopt(linkHanson, linkDarwin);
shelterHub.adopt(linkHolmes, linkKennedy);
shelterHub.adopt(linkHolmes, linkSweetie);
shelterHub.adopt(linkHolmes, linkMolly);
shelterHub.adopt(linkHolmes, linkChester);

shelterHub.printAdoptions();

console.log(`${linkHanson.name} has ${linkHanson.numberOfPets()} adopted pets.`);
console.log(`${linkHolmes.name} has ${linkHolmes.numberOfPets()} adopted pets.`);


// with "constructors"

// with "classes"
/*
let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);

shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

*/

/*
P Hanson has adopted the following pets:
a cat named Butterscotch
a cat named Pudding
a bearded dragon named Darwin

B Holmes has adopted the following pets:
a dog named Molly
a parakeet named Sweetie Pie
a dog named Kennedy
a fish named Chester

P Hanson has 3 adopted pets.
B Holmes has 4 adopted pets.
*/
