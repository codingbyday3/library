const addBookBtn = document.querySelector(".add-book-btn")
const addBookForm = document.querySelector("dialog")
const closeBookForm = document.querySelector("dialog")

addBookBtn.addEventListener("click", ()=>{
  addBookForm.showModal()
})

closeBookForm.addEventListener("click", () =>{
  addBookForm.close()
})