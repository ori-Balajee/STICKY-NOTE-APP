const butto = document.getElementsByClassName('Toggle_button')[0];
const content = document.body;

if(localStorage.getItem('togg')==='dark'){
    content.classList.toggle('dark');
}

butto.addEventListener('click', ()=>{
    content.classList.toggle('dark');

    if(content.classList.contains('dark')){
        localStorage.setItem('togg','dark');
    }else{
        localStorage.removeItem('togg');
    }
});

const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementsByClassName('notes')[0];

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem('stickyNotes')) || [];

// Render all notes
function renderNotes() {
  notesContainer.innerHTML = '';

  // note is the content of the current note.
  // note is a copy of the value at notes[index].
  // It does NOT change the original array.

  // When looping over an array with .forEach, the loop variable is a copy of the value (for primitives like strings, numbers). 
  // Changing it does not change the array itself.

  // index is the position of the note in the array (used for updating or deleting).
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    const textarea = document.createElement('textarea');
    textarea.value = note;

    // e is the event object that contains information about what happened.
    // e.target → the element that triggered the event (here, the textarea).
    // e.target.value → the current text inside that textarea.
    textarea.addEventListener('input', (e) => {
      notes[index] = e.target.value;
      localStorage.setItem('stickyNotes', JSON.stringify(notes));
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', () => {
      notes.splice(index, 1);
      localStorage.setItem('stickyNotes', JSON.stringify(notes));
      renderNotes();
    });

    noteDiv.appendChild(deleteBtn);
    noteDiv.appendChild(textarea);
    notesContainer.appendChild(noteDiv);
  });
}

// Add a new note
addNoteBtn.addEventListener('click', () => {
  notes.push('');
  localStorage.setItem('stickyNotes', JSON.stringify(notes));
  renderNotes();
});

// Initial render
renderNotes();