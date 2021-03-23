let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let newPrice = this.price;
    let discount = newPrice * (percent / 100);
    newPrice -= discount;

    return newPrice;
  },
};

console.log(item.discount(20));   // should return 40 and does
console.log(item.discount(50));   // should return 25 but returns 20 instead
console.log(item.discount(25));   // should return 37.5 but returns 15 instead
