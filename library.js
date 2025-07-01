const addBookBtn = document.querySelector(".add-book-btn")
const addBookForm = document.querySelector("dialog")
const closeBookForm = document.querySelector(".icon")
const bookContainer = document.querySelector("main")
const submitBtn = document.querySelector(".submit-btn")
const form = document.querySelector('form');
const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
let bookComment = document.querySelector("#comment")
let books = []


class Book{

  constructor(title, author,comment){
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.read = false
    this.comment = comment
  }

  changeReadStatus(){
    this.read = !this.read
  }

}



function main(){
  displayDialog()

  bookContainer.addEventListener("click", (e)=>{
    if(e.target.classList.contains("delete-btn")){
      handleDeleteBtn(e)
    }
    if(e.target.classList.contains("is-read")){
      handleToggleReadBtn(e)
    }
  })


  form.addEventListener("submit", (e) => {

    if(!bookTitle.validity.valid){
      showError()
      bookTitle.reportValidity()
      e.preventDefault(); 

    }else if(!bookAuthor.validity.valid){
      showError()
      bookAuthor.reportValidity()
      e.preventDefault(); 
    }else{
      
      handleSubmitBtn();
    }
  });

  bookTitle.addEventListener("input", ()=>{
    bookTitle.setCustomValidity("")
  })

  bookAuthor.addEventListener("input", ()=>{
    bookAuthor.setCustomValidity("")
  })


}

function createLabeledParagraph(label, value) {
  if(label == "Read:"){
    value = value ? "did read":"didn't read"
  }
  const para = document.createElement("p");
  const span = document.createElement("span");
  span.className = "book-label";
  span.textContent = label;
  para.appendChild(span);
  para.append(` ${value}`);
  return para;
}

function displayBook(bookDetails) {
  const bookDiv = document.createElement("div");
  bookDiv.className = "book"
  bookDiv.dataset.id = bookDetails.id

  const h2 = document.createElement("h2");
  h2.textContent = bookDetails.title;
  bookDiv.appendChild(h2);


  for(let bookDetail in bookDetails){
    if (bookDetail != "id" && bookDetail != "changeReadStatus"){
      label = bookDetail.charAt(0).toUpperCase() + bookDetail.slice(1) + ":"
      bookDiv.appendChild(createLabeledParagraph(label, bookDetails[bookDetail]));
    }
  }
  const buttonDiv = document.createElement("div")
  const deleteBtn = document.createElement("button")
  deleteBtn.className = "delete-btn"
  deleteBtn.textContent = "Delete"
  buttonDiv.appendChild(deleteBtn)

  const readButton = document.createElement("button")
  readButton.className = "is-read"
  readButton.textContent = "Read"
  buttonDiv.appendChild(readButton)

  bookDiv.appendChild(buttonDiv)
  bookContainer.prepend(bookDiv);
}

function displayDialog(){
  addBookBtn.addEventListener("click", ()=>{
    addBookForm.showModal()
  })

  closeBookForm.addEventListener("click", () =>{
    addBookForm.close()
  })

}

function handleSubmitBtn(){


  const book = new Book(bookTitle.value, bookAuthor.value,bookComment.value)
  books.push(book)
  displayBook(book)
  document.querySelector('form').reset()
  document.querySelector('dialog').close()
}

function handleDeleteBtn(e){

  const bookDiv = e.target.closest("div[data-id]");
  if (bookDiv) {
    const bookId = bookDiv.dataset.id;
    for(let i = 0; i < books.length; i++){
      if (books[i].id === bookId){
        books.splice(i,1)
        break
      } 
    }
    bookDiv.remove()
  }
}

function handleToggleReadBtn(e){
  const bookDiv = e.target.closest("div[data-id]");
  if (bookDiv) {
    const bookId = bookDiv.dataset.id;
    for(let book of books){
      if (book.id === bookId){
        book.changeReadStatus()
        bookDiv.remove()
        displayBook(book)
        break
      } 
    }
    
  }
}

function showError(){
  if(bookTitle.validity.valueMissing){
    bookTitle.setCustomValidity("You must enter the title of the book")

  }else if(bookAuthor.validity.valueMissing){
    bookAuthor.setCustomValidity("You must enter the author of the book")

  }
}

main()