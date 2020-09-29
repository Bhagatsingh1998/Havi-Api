import { initialPagination } from './pagination';
import { DATA, TAGS } from './data';

let tagsModal = document.querySelector('.tags');
// let GLOBAL_VAR = 0;
// if(GLOBAL_VAR >= 1) {
//   require('./enterKey');
// }

const modalLayout = (rowId, data = DATA, tags = TAGS) => {
  let allUserTags = '';
  let totalTags = '';

  let person;

  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });

  if(person.tags.length > 0) {
    person.tags.map(tag => {
      tags.map(t => {
        if(+t.id === tag) {
          allUserTags += `
          <div class="valign-wrapper">
            <i class="material-icons">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${t.color}" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"/></svg>
            </i>
            <p> ${t.name} </p> 
            <a href="#!" data-id="${rowId}" data-tagid="${t.id}" data-action="delete-tag">
              <i data-action="delete-tag" data-tag="i" class="material-icons">
                <svg data-action="delete-tag" data-tag="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="delete-tag" data-tag="path" d="M0 0h24v24H0z" fill="none"/><path data-action="delete-tag" data-tag="path" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
              </i>
            </a>
          </div>`;
        }
      })
    });
  } else {
    allUserTags = `<p>No tags added by you.</p>`;
  }

  tags.map(t => {
    totalTags += `
    <div class="valign-wrapper">
      <i class="material-icons">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${t.color}" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"/></svg>
      </i>
      <p> ${t.name} </p> 
      <a href="#!" data-id="${rowId}" data-tagid="${t.id}" data-action="easy-add-tag">
        <i data-action="easy-add-tag" data-tag="i" class="material-icons">
          <svg data-action="easy-add-tag" data-tag="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="easy-add-tag" data-tag="path" d="M0 0h24v24H0z" fill="none"/><path data-action="easy-add-tag" data-tag="path" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/></svg>
        </i>
      </a>
    </div>`;
  })

  tagsModal.innerHTML = `
  <div class="modal-content" >
    <b>Your Tags</b>
    <div class="divider"> </div>
    <br />
    <div class="tag-form">
      <i class="material-icons prefix">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      </i>
      <div class="input-field">
        <!-- Do not change the "data-id" place -->
        <input data-id="${rowId}" id="tagNameInput"  placeholder="Enter Note Title" type="text">
        <label class="active" for="tagName">Tag Name</label>
      </div>
      <div class="input-field">
        <input id="tagColorInput" value="#61dafb" type="color">
        <label></label>
      </div>
      <i data-id="${rowId}"  data-action="add-tag" class="material-icons prefix"> 
        <svg data-action="add-tag" data-tag="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="add-tag" data-tag="path" d="M0 0h24v24H0z" fill="none"/><path data-action="add-tag" data-tag="path" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      </i>
    </div>
    <div class="tags-list">
      ${allUserTags}
    </div>
    <div class="tags-list">
      <h6>Other Tags</h6>
      ${totalTags}
  </div>
  `;
  return tagsModal;
}
let LOL;

const openTags = (e = false, rowid = false, data = DATA, tags = TAGS) => {
  // console.log('opentags', e.target);
  // GLOBAL_VAR++;
  let element;
  if(e) {
    element = e.target;
    if(!element.dataset.id) {
      if(element.dataset.tag == 'span') {
        element = element.parentNode;
      } else if(element.dataset.tag === 'i') {
        element = element.parentNode;
      } else if(element.dataset.tag === 'svg') {
        element = element.parentNode.parentNode;
      } else if(element.dataset.tag === 'path') {
        element = element.parentNode.parentNode.parentNode;
      } else {
        element = element.parentNode.parentNode.parentNode;
      }
    }
  }
  let rowId;
  if(!rowid) {
    rowId = element.dataset.id;
    // console.log(rowId);
  } else {
    rowId = rowid;
  }
  modalLayout(rowId);
  if(e) {
    let elems = document.querySelectorAll(".tags");
    M.Modal.init(elems, open);
  }
  // require('./enterKey');
  // LOL = require ('./enterKey');
  // console.log(LOL.a);

  setTimeout(() => {
    document.querySelector('#tagNameInput').addEventListener('keydown', enterAddTag);
  }, 200);
}

const enterAddTag = (e) => {
  // console.log(e);
  // console.log(e.path[0].attributes[0].nodeValue);
  let rowId = e.path[0].attributes[0].nodeValue;
  if(e.key === 'Enter') {
    addTag(false, rowId);
  }
}

const addTag = (e = false, rowid = false, data = DATA, tags = TAGS) => {
  console.log('addTag', e.target);
  let element, rowId;
  if(e) {
    element = e.target;
    if(!element.dataset.id) {
      if(element.dataset.tag === 'i') {
        element = element;
        // console.log(element);
      } else if(element.dataset.tag === 'svg') {
        element = element.parentNode;
        // console.log(element);
      } else if(element.dataset.tag === 'path') {
        element = element.parentNode.parentNode;
        // console.log(element);
      } else {
        element = element.parentNode.parentNode;
        // console.log(element);
      }
    }
    console.log(element);
    rowId = element.dataset.id;
    console.log(rowId);
  } else {
    rowId = rowid;
  }

  let tagNameInput = document.querySelector('#tagNameInput').value;
  let tagColorInput = document.querySelector("#tagColorInput").value;
  console.log(tagColorInput);

  let person;
  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });

  let tagId = Math.random();

  tags.push({
    id: tagId,
    name: tagNameInput,
    color : tagColorInput
  });
  person.tags.push(tagId);

  initialPagination();
  openTags(false, rowId); 

}

const easyAddTag = (e, data = DATA, tags = TAGS) => {
  console.log('opentags', e.target);
  let element = e.target;
  if(!element.dataset.id) {
    if(element.dataset.tag === 'i') {
      element = element.parentNode;
    } else if(element.dataset.tag === 'svg') {
      element = element.parentNode.parentNode;
    } else if(element.dataset.tag === 'path') {
      element = element.parentNode.parentNode.parentNode;
    } else {
      element = element.parentNode.parentNode.parentNode;
    }
  }
  console.log(element);
  let rowId = element.dataset.id;
  let tagId = element.dataset.tagid;
  console.log(rowId, tagId);

  let person;
  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });

  person.tags.push(+tagId);
  initialPagination();
  openTags(false, rowId);
}

const deleteTag = (e, data = DATA, tags = TAGS) => {
  console.log('opentags', e.target);
  let element = e.target;
  console.log(element);

  if(!element.dataset.id) {
    if(element.dataset.tag === 'i') {
      element = element.parentNode;
      // console.log(element);
    } else if(element.dataset.tag === 'svg') {
      element = element.parentNode.parentNode;
      // console.log(element);
    } else if(element.dataset.tag === 'path') {
      element = element.parentNode.parentNode.parentNode;
      // console.log(element);
    } else {
      element = element.parentNode.parentNode.parentNode;
      // console.log(element);
    }
  }
  console.log(element);

  let rowId = element.dataset.id;
  let tagId = element.dataset.tagid;
  console.log(rowId, tagId);

  let person;
  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });

  let tagIndex;
  for(let i = 0; i < person.tags.length; i++) {
    console.log(tagId, person.tags[i]);
    if(+person.tags[i] === +tagId) {
      console.log(tagId, person.tags[i]);
      tagIndex = i;
      break;
    }
  }
  console.log(tagIndex);
  console.log(person.tags);

  person.tags.splice(tagIndex, 1);
  console.log(person.tags);
  initialPagination();
  openTags(false, rowId);
}



export {openTags, deleteTag, addTag, easyAddTag};


