const booksDiv = document.querySelector(".books");
const showBtn = document.querySelector(".show");
const form = document.querySelector(".form");
const addBtn = document.querySelector(".btn.add");
const titleErrorPara = document.querySelector(`label[for="title"] .error`);
const authorErrorPara = document.querySelector(`label[for="author"] .error`);
const numberErrorPara = document.querySelector(`label[for="numOfPages"] .error`);
const didreadErrorPara = document.querySelector(`.label-didread .error`);

const myLibrary = [];
const book1 = new Book("Sapiens", "Yuval Noah Harari", 200, false);
const book2 = new Book("Lord of the flies", "William Golding", 103, true);
const book3 = new Book("Ishmael", "Daniel Quinn", 285, true);
let deleteBtns, checkmarkBtns; // we get these values right at the end of populateBooks() call
myLibrary.push(book1, book2, book3);
populateBooks();

showBtn.addEventListener("click", toggleForm);
form.addEventListener("submit", handleSubmit);
form.title.addEventListener("input", handleInputTitle);
form.author.addEventListener("input", handleInputAuthor);
form.numOfPages.addEventListener("input", handleInputNumber);
form.isRead.forEach(radio => radio.addEventListener("input", handleInputIsRead));

function handleCheckmark(e) {
  const bookIdx = e.target.parentNode.dataset.index;
  myLibrary[bookIdx].toggleReadStatus();
  populateBooks();
}

function handleDelete(e) {
  const bookIdx = e.target.parentNode.dataset.index;
  myLibrary.splice(bookIdx, 1);
  populateBooks();
}

function Book(title, author, numOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

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
    const bookDiv = document.createElement("div");
    const divTitle = document.createElement("div");
    const paraTitleLabel = document.createElement("p");
    const paraTitleText = document.createElement("p");
    const divAuthor = document.createElement("div");
    const paraAuthorLabel = document.createElement("p");
    const paraAuthorText = document.createElement("p");
    const divPages = document.createElement("div");
    const paraPagesNum = document.createElement("p");
    const paraPagesLabel = document.createElement("p");
    const divRead = document.createElement("div");
    const paraReadLabel = document.createElement("p");
    const paraReadText = document.createElement("p");
    const removeBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    divTitle.appendChild(paraTitleLabel);
    divTitle.appendChild(paraTitleText);
    divAuthor.appendChild(paraAuthorLabel);
    divAuthor.appendChild(paraAuthorText);
    divPages.appendChild(paraPagesLabel);
    divPages.appendChild(paraPagesNum);
    divRead.appendChild(paraReadLabel);
    divRead.appendChild(paraReadText);
    bookDiv.appendChild(divTitle);
    bookDiv.appendChild(divAuthor);
    bookDiv.appendChild(divPages);
    bookDiv.appendChild(divRead);
    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(checkBtn);
    bookDiv.className = "book";
    bookDiv.setAttribute("data-index", i);

    paraTitleLabel.textContent = "Title";
    paraTitleText.textContent = book.title;
    paraAuthorLabel.textContent = "Author";
    paraAuthorText.textContent = book.author;
    paraPagesLabel.textContent = "Number of pages";
    paraPagesNum.textContent = book.numOfPages;
    paraReadText.textContent = `${book.isRead ? "read :)" : "DIDN'T READ"}`;
    paraReadLabel.textContent = "Status";

    removeBtn.className = "remove";
    checkBtn.className = "check-read";
    divRead.className = `${book.isRead ? "read" : "didnt-read"}`;
    paraPagesLabel.className = "label";
    paraTitleLabel.className = "label";
    paraAuthorLabel.className = "label";
    paraReadLabel.className = "label";

    booksDiv.appendChild(bookDiv);
  }
  // gotta recalculate the delete and check buttons after user interacts with books
  deleteBtns = booksDiv.querySelectorAll(".remove");
  checkmarkBtns = booksDiv.querySelectorAll(".check-read");
  deleteBtns.forEach((btn) => btn.addEventListener("click", handleDelete));
  checkmarkBtns.forEach((btn) => btn.addEventListener("click", handleCheckmark));
}

function toggleForm() {
  form.classList.toggle("active");
  showBtn.textContent = `${showBtn.textContent === "Add book" ? "Close form" : "Add book"}`;
}

function handleSubmit(e) {
  e.preventDefault();

  console.log(form.isRead.validity);

  let shouldSubmit = true;

  if (!form.title.validity.valid) {
    showTitleError();
    shouldSubmit = false;
  }

  if (!form.author.validity.valid) {
    showAuthorError();
    shouldSubmit = false;
  }

  if (!form.numOfPages.validity.valid) {
    showNumberError();
    shouldSubmit = false;
  }

  if (!areRadioBtnsValid()) {
    showDidreadError();
    shouldSubmit = false;
  }

  if (!shouldSubmit) return;

  let title = e.target.title.value;
  let author = e.target.author.value;
  let numPages = e.target.numOfPages.value;
  let isRead = e.target.isRead.value;

  addBookToLibrary(title, author, numPages, isRead === "yes");
  populateBooks();
  form.reset(); // reset fields
}

function showTitleError() {
  if (form.title.validity.valueMissing)
    titleErrorPara.textContent = "You gotta provide a title brochocho";

  titleErrorPara.className = "error active";
}

function showAuthorError() {
  if (form.author.validity.valueMissing)
    authorErrorPara.textContent = "You gotta provide an author buddy";

  authorErrorPara.className = "error active";
}

function showNumberError() {
  if (form.numOfPages.validity.valueMissing)
    numberErrorPara.textContent = "Forget much? Provide a number of pages pal";

  numberErrorPara.className = "error active";

}

function showDidreadError() {
  didreadErrorPara.textContent = "Hey, hey. Just answer yes or no";
  didreadErrorPara.className = "error active";
}

function handleInputTitle(e) {
  if (form.title.validity.valid) {
    titleErrorPara.textContent = "";
    titleErrorPara.className = "error";
  } else {
    showTitleError();
  }
}

function handleInputAuthor(e) {
  if (form.author.validity.valid) {
    authorErrorPara.textContent = "";
    authorErrorPara.className = "error";
  } else {
    showAuthorError();
  }
}

function handleInputNumber(e) {
  if (form.numOfPages.validity.valid) {
    numberErrorPara.textContent = "";
    numberErrorPara.className = "error";
  } else {
    showNumberError();
  }
}

function handleInputIsRead(e) {
  if (e.target.checked) {
    didreadErrorPara.textContent = "";
    didreadErrorPara.className = "error";
  } else {
    showDidreadError();
  }
}

function areRadioBtnsValid() {
  for (const radio of form.isRead) {
    if (radio.checked) return true;
  }
  return false;
}