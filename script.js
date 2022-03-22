// DOM selectors
const toDoList = document.getElementsByClassName("todo")[0].children[0]
const toDoInput = document.getElementsByClassName("user-input")[0]
const templateNote = document.getElementsByClassName("template")[0]
const currentFilter = document.querySelectorAll(".options button")

// Functions
function addNote(e) {
    if (e.code != "Enter" || toDoInput.value.length == 0) {
        return null
    }
    // Copying node from template
    let note = templateNote.cloneNode(true)
    note.classList.remove("template")
    // Getting value from inpput and clearing it
    note.getElementsByTagName("p")[0].textContent = toDoInput.value
    toDoInput.value = ""
    toDoList.appendChild(note)
    setTimeout(()=>{
        note.children[0].classList.add('show')
    },15)

    save()
}

function markDone(entry) {
    entry.classList.toggle("is-completed")
    entry.classList.toggle("unfinshed")
    save()
}

function deleteNote(entry) {
    
    entry.classList.remove("show")
    entry.children[0].classList.remove("show")
    entry.style.bottomMargin = '-15px'
    
    // -80px to cover upper 
    setTimeout(()=>{
        entry.remove()
        save()
    },1500)

}

function filterNotes(button) {
    // Styling this and other buttons
    for (let element of currentFilter) {
        element.classList.remove("choosen-filter")
    }
    button.classList.add("choosen-filter")
    // Manipulating visibility of notes
    let allNotes = toDoList.children
    for (let i = 1; i < allNotes.length; i++) {
        if (!allNotes[i].classList.contains(button.value)) {
            allNotes[i].style.display = "none"
        } else {
            allNotes[i].style.display = "flex"
        }
    }
}

function save() {
    localStorage.setItem("notes", toDoList.innerHTML)
}

function load() {
    let saved = localStorage.getItem("notes")
    if (saved) {
        toDoList.innerHTML = saved
    }
}

// Event listeners
toDoInput.addEventListener("keydown", addNote)
window.onload = load


// smooth deletion 
// drag and drop lists