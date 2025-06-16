const addBookBtn = document.querySelector(".add-book-btn")
const addBookForm = document.querySelector("dialog")
const closeBookForm = document.querySelector(".icon")
const bookContainer = document.querySelector("main")
const submitBtn = document.querySelector(".submit-btn")

function Book(title, author, year, comment){
  if(!new.target){
    throw Error("You must use 'new' operator")
  }
  this.id = crypto.randomUUID()
  this.title = title
  this.author = author
  this.year = year
  this.comment = comment
}

let books = []



function main(){
  displayDialog()
  submitBtn.addEventListener("click", ()=>{
    handleSubmitBtn()
  })
  console.log(books)

}

function createLabeledParagraph(label, value) {
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

  const h2 = document.createElement("h2");
  h2.textContent = bookDetails.title;
  bookDiv.appendChild(h2);


  for(let bookDetail in bookDetails){
    if (bookDetail != "id"){
      label = bookDetail.charAt(0).toUpperCase() + bookDetail.slice(1) + ":"
      bookDiv.appendChild(createLabeledParagraph(label, bookDetails[bookDetail]));
    }
  }
  

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
  const bookPublicationYear = document.querySelector("#year").value
  let bookComment = document.querySelector("#comment").value

  if(!bookTitle || !bookAuthor || !bookPublicationYear){
    alert("Fill all empty fields!")
  }else if(Math.abs(bookPublicationYear).toString().length > 4){
    alert("Invalid year!")
  }else if(bookComment.length > 60){
    alert("Comment is to long")
  }else if(bookComment === ""){
    bookComment = "No comment"
  }
  const book = new Book(bookTitle, bookAuthor, bookPublicationYear, bookComment)
  books.push(book)
  displayBook(book)
  document.querySelector('form').reset()
  document.querySelector('dialog').close()
}

main()