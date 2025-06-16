const addBookBtn = document.querySelector(".add-book-btn")
const addBookForm = document.querySelector("dialog")
const closeBookForm = document.querySelector(".icon")
const bookContainer = document.querySelector("main")
books = [{
  id:crypto.randomUUID(),
  title:"Harry Potter",
  author:"J. K. Rowling",
  year:1997,
  comment:"Book was really good I can't wait to read it again!"
},{
  id:crypto.randomUUID(),
  title:"The Lord of the Rings",
  author:"J.R.R. Tolkien",
  year:1954,
  comment:"Book was really good I can't wait to read it again!"
},{
  id:crypto.randomUUID(),
  title:"The Da Vinci Code",
  author:"Dan Brown",
  year:2003,
  comment:"Book was really good I can't wait to read it again!"
}]

function main(){
  displayDialog()
  for (book of books){
    displayBook(book)
  }
}

function displayBook(bookDetails){
  createHtml(bookDetails)
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

function createHtml(bookDetails) {
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

main()