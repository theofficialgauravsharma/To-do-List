console.log("Hello Mr. Sharma");
showNotes();
// TO ADD A NOTE
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addText");
    let addTitle=document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value="";
    console.log(notesObj);
    showNotes();
});
// to show localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        let moment= new Date();
       
        html += `<div class="noteCard my-3 mx-3 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${element.title}, ${moment.getDate()}/${moment.getMonth()}/${moment.getFullYear()} </h5>
         
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Remove Note</button>
        </div>
      </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = 'Oops, Nothing to show!! To add notes please go to the ADD NOTES section';
    }

}
//to delete note.
function deleteNotes(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    notes = localStorage.getItem("notes");
}
//adding search functionality
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){   
    let inputval = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
// clearing all notes at once
let clear= document.getElementById("clearAll");
clear.addEventListener("click", function(){
    
    alert("You sure wish to remove all your notes?");
    notesObj=[];    
    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNotes();
})