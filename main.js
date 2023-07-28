const booksDiv = document.querySelector(".books");
const showBtn = document.querySelector(".show");
const wrapper = document.querySelector(".wrapper");
const form = document.querySelector(".form");
const addBtn = document.querySelector(".btn.add");

const myLibrary = [];
const book1 = new Book("Sapiens", "Yuval Hoah Farari", 200, false);
const book2 = new Book("Lord of the flies", "William Golding", 103, true);
const book3 = new Book("Ishamel", "Daniel Quinn", 285, true);
myLibrary.push(book1, book2, book3);
populateBooks();

// fetch buttons after populating books, otherwise they dont exist yet
let deleteBtns = booksDiv.querySelectorAll(".remove");
let checkmarkBtns = booksDiv.querySelectorAll(".check-read");
deleteBtns.forEach((btn) => btn.addEventListener("click", handleDelete));
checkmarkBtns.forEach((btn) => btn.addEventListener("click", handleCheckmark));
showBtn.addEventListener("click", toggleForm);
form.addEventListener("submit", handleSubmit);

function handleCheckmark(e) {
  const bookIdx = e.target.parentNode.dataset.index;
}

function handleDelete(e) {
  const bookIdx = e.target.parentNode.dataset.index;
  console.log(bookIdx);
  myLibrary.splice(bookIdx, 1);
  populateBooks();
  deleteBtns = booksDiv.querySelectorAll(".remove");
  deleteBtns.forEach((btn) => btn.addEventListener("click", handleDelete));
}

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
  removeChildren(booksDiv);

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

  addBookToLibrary(title, author, numPages, isRead === "yes");
  populateBooks();
  deleteBtns = booksDiv.querySelectorAll(".remove");
  deleteBtns.forEach((btn) => btn.addEventListener("click", handleDelete));
  // reset form
  form.reset();
}
