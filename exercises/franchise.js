// callback

const concatWithNum = function(number) {
  return this.name + " " + number;
}

// alternative to bind

const bindAlt = function(fn, context, ...initials) {
  return function (...additionals) {
    args = initials.concat(additionals);
    return fn.call(context, ...args);
  }
};

// option 1

const franchise1 = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(franchise1BoundedConcatWithNum);
  },
};

const franchise1BoundedConcatWithNum = bindAlt(concatWithNum, franchise1);

console.log(franchise1.allMovies());

// option 2

const franchise2 = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(franchise2BoundedConcatWithNum);
  },
};

const franchise2BoundedConcatWithNum = concatWithNum.bind(franchise2);

console.log(franchise2.allMovies());
