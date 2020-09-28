import { DATA } from "./data";
import { initialPagination } from './pagination';

let note = document.querySelector(".note");

const openNote = (e, data = DATA) => {
  let element = e.target.parentElement;
  // console.log(element);

  if (!element.dataset.id) {
    if (element.dataset.tag === "i") {
      element = e.target.parentElement.parentElement;
    } else if (element.dataset.tag === "svg") {
      element = e.target.parentElement.parentElement.parentElement;
    } else if (element.dataset.tag === "path") {
      element =
        e.target.parentElement.parentElement.parentElement.parentElement;
    } else {
      element =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement;
    }
  }
  // console.log(element);

  let rowId = element.dataset.id;
  // console.log(rowId);

  let newNote = `
  <div class="modal-content">
    <h4>Your Note </h4>
    <div class="divider"></div>
    <br />
    <p class="center-align">No notes added.  <br /> <br />
      <a data-id=${rowId} data-personnote="" data-action="add-note" class="waves-effect waves-light btn-small">
        Add Note
      </a>
    </p>
  </div>
  <div class="modal-footer">
  <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
  </div>`;

  let personData;
  data.map((el) => {
    if (+el.id === +rowId) {
      personData = el;
    }
  });

  // console.log(personData);

  if (!personData.note) {
    note.innerHTML = newNote;
  } else {
    updateNote(e, personData);
  }

  let elems = document.querySelectorAll(".note");
  // M.Modal.init(elems, open);
  // M.AutoInit();
  M.Modal.init(elems, {
    onCloseStart: () => {
      if(document.querySelector("#note-data")) {
        const noteData = document.querySelector("#note-data").value;
        // console.log(document.querySelector("#note-data"));
      
        let person;
        data.map(el => {
          if(+el.id === +rowId) {
            person = el;
          }
        });
        
        person.note = noteData;
        initialPagination();
      }
    },
    dismissible: false
  });
};

// const addNote = (event) => {
//   // console.log('addNote');
//   let element = event.target;
//   // console.log(element);
//   let rowId = element.dataset.id;  

//   let addNote = `
//   <div class="modal-content">
//     <h4>Your Note </h4>
//     <div class="divider"></div>
//     <br />
//     <p class="center-align">
//       <form id="note-form">
//         <input type="text" id="note-data" placeholder="Enter your note" />
//       </form>
//     </p>
//   </div>
//   <div class="modal-footer">
//   <a class="waves-light btn-small waves-effect waves-blue" data-id=${rowId} form="note-form" type="submit" data-action="save-note-data"> Add Note </a>
//   <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
//   </div>`;

//   note.innerHTML = addNote;
//   // var elems = document.querySelectorAll('.modal');

//   // require('./noteData');
//   M.Modal.init(elems, open);
// };

// const saveNoteData = (event, data = DATA) => {
//   // console.log("saveNote Data", event.target);
//   let element = event.target;
//   console.log(element);
//   const rowId = element.dataset.id;
//   // console.log(rowId);
//   const noteData = document.querySelector('#note-data').value;
//   // console.log(d);

//   let person;
//   data.map(el => {
//     if(+el.id === +rowId) {
//       person = el;
//     }
//   });

//   person.note = noteData;
//   // console.log(data);
//   // showNote(rowId, person);
// };

// const showNote = (rowId, person, data = DATA) => {
//   let savedNote = `
//   <div class="modal-content">
//     <h4>Your Note </h4>
//     <div class="divider"></div>
//     <br />
//     <p class="center-align">
//       ${person.note}
//     </p>
//   </div>
//   <div class="modal-footer">
//     <a class="waves-light btn-small waves-effect waves-blue" data-personnote="${person.note}" data-id="${rowId}" data-action="update-note"> Update Note </a>
//     <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
//   </div>`;

//   note.innerHTML = savedNote;
  
// }

const updateNote = (event, personData = null, data = DATA) => {
  // console.log('updateNote', event.target);
  let element = event.target;
  let rowId = element.dataset.id;
  // console.log(rowId);
  let pNote = element.dataset.personnote;
  // console.log(pNote);
  if(personData) {
    console.log(personData);
    pNote = personData.note;
    rowId = personData.id;
  }

  let addNote = `
  <div class="modal-content">
    <h4>Your Note </h4>
    <div class="divider"></div>
    <br />
        <div class="input-field col s12">
          <textarea  height="5" id="note-data" class="materialize-textarea">${pNote}</textarea>
          <label class="active" for="note-data">Enter your note</label>
        </div>
  </div>
  <div class="modal-footer">
  <a class="waves-light modal-close btn-small waves-effect waves-blue" data-id=${rowId} data-action="update-note-data"> Save Note </a>
  <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
  </div>`;

  note.innerHTML = addNote;
  // M.AutoInit();
}

// const updateNoteDate = (event, data = DATA) => {
//   console.log('updatedNoteData', event.target);
//   let element = event.target;
//   let rowId = element.dataset.id;
//   // console.log(rowId);

//   let person;
//   data.map(el => {
//     if(+el.id === +rowId) {
//       person = el;
//     }
//   });

//   let noteText = document.querySelector("#note-data");
//   console.log(noteText);

//   person.note = noteText;
//   // showNote(rowId, person);
//   // var instances = M.Modal.init(elems, open);
//   // M.AutoInit();
// }

export { openNote, updateNote };
