import { initialPagination } from './pagination';
import { DATA, TAGS } from './data';

let tagsModal = document.querySelector('.tags');

const checkBoxDisplay = (checkBoxSelectd, name, rowId, tagId) => {
  if(checkBoxSelectd) {
    return `
    <label>
      <input id="tag-choose-checkbox" data-id="${rowId}" data-tagid="${tagId}" type="checkbox" name="tagCheckbox" class="filled-in" checked="checked" />
      <span for="tag-choose-checkbox" class="valign-wrapper">${name}</span>
    </label>`;
  } else {
    return `
    <label>
      <input id="tag-choose-checkbox" data-id="${rowId}" data-tagid="${tagId}" type="checkbox" name="tagCheckbox" class="filled-in" />
      <span for="tag-choose-checkbox" class="valign-wrapper">${name}</span>
    </label>`;
  }
}

const modalLayout = (rowId, data = DATA, tags = TAGS) => {
  let totalSelectedTags = '';
  let totalUnselectedTags = '';

  let person;

  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });

  tags.map(t => {
    let checked = false;
    if(person.tags.includes(t.id)) {
      checked = true;
      totalSelectedTags += `
      <div class="valign-wrapper">
        ${checkBoxDisplay(checked, t.name, rowId, t.id)}
        <a href="#!" data-id="${rowId}" data-tagid="${t.id}" data-action="delete-tag">
          <i data-action="delete-tag" data-tag="i" class="material-icons">
            <svg data-action="delete-tag" data-tag="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="delete-tag" data-tag="path" d="M0 0h24v24H0z" fill="none"/><path data-action="delete-tag" data-tag="path" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </i>
        </a>
      </div>`;
    } else {
      totalUnselectedTags += `
      <div class="valign-wrapper">
        ${checkBoxDisplay(checked, t.name, rowId, t.id)}
        <a href="#!" data-id="${rowId}" data-tagid="${t.id}" data-action="delete-tag">
          <i data-action="delete-tag" data-tag="i" class="material-icons">
            <svg data-action="delete-tag" data-tag="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="delete-tag" data-tag="path" d="M0 0h24v24H0z" fill="none"/><path data-action="delete-tag" data-tag="path" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </i>
        </a>
      </div>`;
    }
  });

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
      ${totalSelectedTags}
      ${totalUnselectedTags}
    </div>
  </div>`;
  return tagsModal;
}

const openTags = (e = false, rowid = false, data = DATA, tags = TAGS) => {
  console.log('opentags', e.target);
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
      } else if(element.dataset.tag === 'path2') {
        element = element.parentNode.parentNode.parentNode;
      } else {
        element = element.parentNode.parentNode.parentNode.parentNode;
      }
    }
  }
  let rowId;
  if(!rowid) {
    console.log(element);
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
  setTimeout(() => {
    document.querySelector('#tagNameInput').addEventListener('keydown', enterAddTag);
    // console.log( tagsModal.querySelectorAll("input[name=tagCheckbox]"));

    let allTagCheckbox = tagsModal.querySelectorAll("input[name=tagCheckbox]")
    allTagCheckbox.forEach(check => {
      // let value = check.value;
      // console.log(value);
      check.addEventListener('change', easyManageTag);
    });

  }, 200);
}

const easyManageTag = (e, value) => {
  console.log('easyManageTag', e.target);
  let element = e.target;
  // console.log(element);
  let rowId = element.dataset.id;
  let tagId = element.dataset.tagid;
  // console.log(rowId, tagId);
  console.log(e.target.checked);

  if(e.target.checked) {
    easyAddTag(e, rowId, tagId)
  } else {
    easyRemoveTag(e, rowId, tagId)
  }
}

const enterAddTag = (e) => {
  console.log(e.explicitOriginalTarget);
  console.log(e.explicitOriginalTarget.dataset.id);
  let rowId = e.explicitOriginalTarget.dataset.id;
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

const easyAddTag = (e, rowId, tagId, data = DATA, tags = TAGS) => {
  console.log('easyAddTag', e.target);
  
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

const easyRemoveTag = (e, rowId, tagId, data = DATA, tags = TAGS) => {
  console.log('easyAddTag', e.target);
  
  let person;
  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });
  let tagIndex;
  for(let i = 0; i < person.tags.length; i++) {
    if(+person.tags[i] === +tagId) {
      tagIndex = i;
      break;
    }
  }

  person.tags.splice(tagIndex, 1);
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

  let tIndex;
  for(let i = 0; i < tags.length; i++) {
    // console.log(tagId, person.tags[i]);
    if(+tags[i].id === +tagId) {
      tIndex = i;
      break;
    }
  }
  tags.splice(tIndex, 1);  
  // console.log(person.tags);
  initialPagination();
  openTags(false, rowId);
}



export {openTags, deleteTag, addTag, easyAddTag};


