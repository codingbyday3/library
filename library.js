const addBookBtn = document.querySelector(".add-book-btn")
const addBookForm = document.querySelector("dialog")

addBookBtn.addEventListener("click", ()=>{
  addBookForm.showModal()
})