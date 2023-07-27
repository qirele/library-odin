let booksDiv = document.querySelector(".books");
let showBtn = document.querySelector(".show");
let wrapper = document.querySelector(".wrapper");
let form = document.querySelector(".form");
let addBtn = document.querySelector(".btn.add");

let myLibrary = [];
let book1 = new Book("Sapiens", "Yuval Hoah Farari", 200, false);
myLibrary.push(book1);
populateBooks();

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

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

function populateBooks() {
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

    div.className = "book";
    paraTitle.textContent = book.title;
    paraAuthor.textContent = book.author;
    paraPages.textContent = book.numOfPages;
    paraDidRead.textContent = book.isRead;
    booksDiv.appendChild(div);
  }
}

showBtn.addEventListener("click", (e) => {
  wrapper.classList.toggle("active");
  form.classList.toggle("active");
  showBtn.textContent = `${showBtn.textContent === "Show form" ? "Close form" : "Show form"}`;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = e.target.title.value;
  let author = e.target.author.value;
  let numPages = e.target.numOfPages.value;
  let isRead = e.target.isRead.value;

  addBookToLibrary(title, author, numPages, isRead);
  removeChildren(booksDiv);
  populateBooks();
});
