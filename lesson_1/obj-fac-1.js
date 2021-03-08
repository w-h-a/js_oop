/*
Attributes
  Title: Mythos
  Author: Stephen Fry

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Me Talk Pretty One Day
  Author: David Sedaris

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Aunts aren't Gentlemen
  Author: PG Wodehouse

Behavior:
  Get Description
*/

const bookFactory = function(title, author, read) {
  return {
    title: title,
    author: author,
    read: read,
    getDescription: function() {
      return `${this.title} was written by ${this.author}. I ${this.read === true ? 'have' : "haven't"} read this book.`;
    },
    readBook: function() {
      this.read = true;
    }
  };
}

const mythosForm = bookFactory('Mythos', 'Stephen Fry', false);
console.log(mythosForm);
console.log(mythosForm.getDescription());
console.log(mythosForm.readBook());
console.log(mythosForm);
console.log(mythosForm.getDescription());


const meTalkPrettyForm = bookFactory('Me Talk Pretty One Day', 'David Sedaris', true);
const auntsAreNotForm = bookFactory("Aunts Aren't Genetlemen", 'PG Wodehouse', true);
console.log(auntsAreNotForm);
console.log(auntsAreNotForm.getDescription());
