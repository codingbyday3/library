const addBookBtn = document.querySelector(".add-book-btn")
const addBookForm = document.querySelector("dialog")
const closeBookForm = document.querySelector(".icon")
const bookContainer = document.querySelector("main")
const submitBtn = document.querySelector(".submit-btn")

function Book(title, author, year, comment){
  this.title = title
  this.author = author
  this.year = year
  this.comment = comment
}



function main(){
  displayDialog()
  submitBtn.addEventListener("click", ()=>{
    handleSubmitBtn()
  })

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


  for(bookDetail in bookDetails){
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
  const bookComment = document.querySelector("#comment").value
  checkErrors()
  
}

function checkErrors(){
  if(!bookTitle || !bookAuthor || !bookPublicationYear){
    alert("Fill all empty fields!")
  }else if(Math.abs(bookPublicationYear).toString().length > 4){
    alert("Invalid year")
  }else if(bookComment.length > 60){
    alert("Comment is to long")
  }
}

main()