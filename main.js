let booksDiv = document.querySelector(".books");
let showBtn = document.querySelector(".show");
let wrapper = document.querySelector(".wrapper");
let form = document.querySelector(".form");

let myLibrary = [];
let book1 = new Book("Sapiens", "Yuval Hoah Farari", 200, false);
let book2 = new Book("Ishmael", "Daniel Quinn", 282, true);
myLibrary.push(book1, book2);

function Book(title, author, numOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, numOfPages, isRead) {
  let book = new Book(title, author, numOfPages, isRead);
  myLibrary.push(book);
}

for (const book of myLibrary) {
  const div = document.createElement("div");
  const paraTitle = document.createElement("p");
  const paraAuthor = document.createElement("p");
  const paraPages = document.createElement("p");
  const paraDidRead = document.createElement("p");
  div.appendChild(paraTitle);
  div.appendChild(paraAuthor);
  div.appendChild(paraPages);
  div.appendChild(paraDidRead);

  paraTitle.textContent = book.title;
  paraAuthor.textContent = book.author;
  paraPages.textContent = book.numOfPages;
  paraDidRead.textContent = book.isRead;
  booksDiv.appendChild(div);
}

showBtn.addEventListener("click", (e) => {
  wrapper.classList.toggle("active");
  form.classList.toggle("active");
});