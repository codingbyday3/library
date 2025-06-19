const addBookBtn = document.querySelector(".add-book-btn")
const addBookForm = document.querySelector("dialog")
const closeBookForm = document.querySelector(".icon")
const bookContainer = document.querySelector("main")
const submitBtn = document.querySelector(".submit-btn")
const form = document.querySelector('form');
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
    e.preventDefault(); 
    handleSubmitBtn();
  });

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
  const bookTitle = document.querySelector("#title").value
  const bookAuthor = document.querySelector("#author").value
  let bookComment = document.querySelector("#comment").value


  if(!bookTitle || !bookAuthor){
    alert("Fill all empty fields!");
    return;
  }else if(bookComment.length > 20){
    alert("Comment is too long");
    return;
  }else if(!bookComment){
    bookComment = "No comment";
  }


  const book = new Book(bookTitle, bookAuthor,bookComment)
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


main()