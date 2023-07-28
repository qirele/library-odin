let booksDiv = document.querySelector(".books");
let showBtn = document.querySelector(".show");
let wrapper = document.querySelector(".wrapper");
let form = document.querySelector(".form");
let addBtn = document.querySelector(".btn.add");

let myLibrary = [];
let book1 = new Book("Sapiens", "Yuval Hoah Farari", 200, false);
let book2 = new Book("Lord of the flies", "William Golding", 103, true);
let book3 = new Book("Ishamel", "Daniel Quinn", 285, true);
myLibrary.push(book1, book2, book3);
populateBooks();

showBtn.addEventListener("click", toggleForm);
form.addEventListener("submit", handleSubmit);

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
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    const div = document.createElement("div");
    const paraTitle = document.createElement("p");
    const paraAuthor = document.createElement("p");
    const paraPages = document.createElement("p");
    const paraDidRead = document.createElement("p");
    const removeBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    div.appendChild(paraTitle);
    div.appendChild(paraAuthor);
    div.appendChild(paraPages);
    div.appendChild(paraDidRead);
    div.appendChild(removeBtn);
    div.appendChild(checkBtn);

    div.className = "book";
    div.setAttribute("data-index", i);
    paraTitle.textContent = book.title;
    paraAuthor.textContent = book.author;
    paraPages.textContent = book.numOfPages;
    paraDidRead.textContent = `${book.isRead ? "read :)" : "DIDN'T READ"}`;
    removeBtn.classList.add("remove");
    checkBtn.classList.add("check-read");
    paraDidRead.classList.add(`${book.isRead ? "read" : "didnt-read"}`);
    booksDiv.appendChild(div);
  }
}

function toggleForm() {
  form.classList.toggle("active");
  showBtn.textContent = `${showBtn.textContent === "Show form" ? "Close form" : "Show form"}`;
}

function handleSubmit(e) {
  e.preventDefault();

  let title = e.target.title.value;
  let author = e.target.author.value;
  let numPages = e.target.numOfPages.value;
  let isRead = e.target.isRead.value;

  addBookToLibrary(title, author, numPages, isRead);
  removeChildren(booksDiv);
  populateBooks();
  // reset form
  form.reset();
}
