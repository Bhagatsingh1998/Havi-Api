import { initialPagination } from './pagination';
import { DATA } from './data';

let tags = document.querySelector('.tags');

const openTags = (e, data = DATA) => {
  // console.log('opentags', e.target);
  let element = e.target;
  // console.log(element);
  if(!element.dataset.id) {
    if(element.dataset.tag === "i") {
      element = e.target.parentElement;
    } else if(element.dataset.tag === "svg") {
      element = e.target.parentElement.parentElement;
    } else if(element.dataset.tag === "path") {
      element = e.target.parentElement.parentElement;
    } else {
      element = e.target.parentElement.parentElement.parentElement;
    }
  }
  // console.log(element);

  let rowId = element.dataset.id;
  console.log(rowId);

  let person;
  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });
  // console.log(person);

  let allTags = '';
  if(person.tags.length > 0) {
    person.tags.map(el => {
      allTags+= `
      <p class="tag-info valign-wrapper">
        <span class="tag-delete">
          <a data-id=${rowId} data-tagid=${el.tagId} data-action="delete-tag" class="btn-floating z-depth-0 modal-trigger" data-target="modal2"><i data-action="delete-tag" data-tag="i"  class="material-icons black-text" >
          <svg data-tag="svg" data-action="delete-tag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path"  data-action="delete-tag" d="M0 0h24v24H0z" fill="none"/><path data-tag="path2" data-action="delete-tag" d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
          </i></a>
        </span>
        <span class="tag-label">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${el.color}" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </span>
        <span class="tag-name">
          ${el.name}
        <span>
      </p>`;
    });
  } else {
    allTags = `<p>No Tags Added</p>`;
  }

  let openTagsModal = `
  <div class="modal-content">
    <h4>Your Tags </h4>
    <div class="divider"></div>
    <br />
    <div>
      ${allTags}
    </div>
  </div>
  <div class="modal-footer">
  <a data-id=${rowId} data-action="add-tag" class="waves-light btn-small waves-effect waves-blue"> Add Tag </a>
  <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
  </div>`;

  tags.innerHTML = openTagsModal;

  let elems = document.querySelectorAll(".tags");
  M.Modal.init(elems, open);
}

const deleteTag = (e, data = DATA) => {
  console.log('deleteTag', e.target);
  let element = e.target;
  console.log(element);

  if(!element.dataset.id) {
    if(element.dataset.tag === "i") {
      element = e.target.parentElement;
    } else if(element.dataset.tag === "svg") {
      element = e.target.parentElement.parentElement;
    } else if(element.dataset.tag === "path") {
      element = e.target.parentElement.parentElement;
    } else {
      element = e.target.parentElement.parentElement.parentElement;
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

  console.log(person);
  let allTags = person.tags;
  console.log(allTags);

  let tagIndex;
  allTags.map((el, index) => {
    if(+el.tagId === +tagId) {
      tagIndex = index;
    }
  });

  allTags.splice(tagIndex, 1);
  
  // let elems = document.querySelectorAll(".tags");
  afterTask(rowId);

}

let TAG_COLOR = 'black';
const addTag = (event, data = DATA) => {
  console.log('add tag', event.target);
  let element = event.target;

  console.log(element);
  const rowId = element.dataset.id;

  let addTagModal = `
  <div class="modal-content">
    <h4>Your Tags </h4>
    <div class="divider"></div>
    <br />
    <div class="input-field col s6">
      <input id="newTagName" type="text" class="validate">
      <label for="newTagName">Tag Name</label>
    </div>
    <div>
      <span>Choose tag color </span>
      <span data-id=${rowId}>
        <a data-color="black" class="btn-floating z-depth-0 modal-trigger" data-action="tag-color" ><i data-action="tag-color" data-tag="i"  class="material-icons black-text" >
          <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </i></a>

        <a data-color="yellow" class="btn-floating z-depth-0 modal-trigger" data-action="tag-color" ><i data-action="tag-color" data-tag="i"  class="material-icons black-text" >
          <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </i></a>

        <a data-color="blue" class="btn-floating z-depth-0 modal-trigger" data-action="tag-color" ><i data-action="tag-color" data-tag="i"  class="material-icons black-text" >
          <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </i></a>

        <a data-color="green" class="btn-floating z-depth-0 modal-trigger" data-action="tag-color" ><i data-action="tag-color" data-tag="i"  class="material-icons black-text" >
          <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </i></a>

        <a data-color="red" class="btn-floating z-depth-0 modal-trigger" data-action="tag-color" ><i data-action="tag-color" data-tag="i"  class="material-icons black-text" >
          <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </i></a>
      
      </span>
    </div>
    <div>
      <span> You choose <span>
      <span>
        <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${TAG_COLOR}" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
      </span>
    </div>
  </div>
  <div class="modal-footer">
    <a data-id=${rowId} data-action="save-tag-data" class="waves-light btn-small waves-effect waves-blue"> Save Tag </a>
    <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
  </div>`;

  tags.innerHTML = addTagModal;
  // let elems = document.querySelectorAll(".tags");
  M.Modal.init(elems, open);
}



const tagColor = (e, data = DATA) => {
  // console.log('tagColor', e.target);
  let element = e.target;
  // console.log(element);

  if(!element.dataset.color) {
    if(element.dataset.tag === "i") {
      element = e.target.parentElement;
    } else if(element.dataset.tag === "svg") {
      element = e.target.parentElement.parentElement;
    } else if(element.dataset.tag === "path") {
      element = e.target.parentElement.parentElement;
    } else {
      element = e.target.parentElement.parentElement.parentElement;
    }
  }
  const newTagName = document.querySelector('#newTagName').value;
  // console.log(element);
  let tColor = element.dataset.color;
  console.log(tColor);
  // TAG_COLOR = tColor;
  console.log(element.parentElement);
  let rowId = element.parentElement.dataset.id;
  console.log(rowId);

  let addTagModal = `
  <div class="modal-content">
    <h4>Your Tags </h4>
    <div class="divider"></div>
    <br />
    <div class="input-field col s6">
      <input value="${newTagName}" id="newTagName" type="text" class="validate">
      <label class="active" for="newTagName">Tag Name</label>
    </div>
    <div>
      <span>Choose tag color </span>
      <span data-id=${rowId}>
        <a data-color="black" class="btn-floating z-depth-0 modal-trigger" data-action="tag-color" ><i data-action="tag-color" data-tag="i"  class="material-icons black-text" >
          <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </i></a>

        <a data-color="yellow" class="btn-floating z-depth-0 modal-trigger" data-action="tag-color" ><i data-action="tag-color" data-tag="i"  class="material-icons black-text" >
          <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="yellow" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </i></a>

        <a data-color="blue" class="btn-floating z-depth-0 modal-trigger" data-action="tag-color" ><i data-action="tag-color" data-tag="i"  class="material-icons black-text" >
          <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </i></a>

        <a data-color="green" class="btn-floating z-depth-0 modal-trigger" data-action="tag-color" ><i data-action="tag-color" data-tag="i"  class="material-icons black-text" >
          <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </i></a>

        <a data-color="red" class="btn-floating z-depth-0 modal-trigger" data-action="tag-color" ><i data-action="tag-color" data-tag="i"  class="material-icons black-text" >
          <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </i></a>
      
      </span>
    </div>
    <div>
      <span> You choose <span>
      <span>
        <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${tColor}" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
      </span>
    </div>
  </div>
  <div class="modal-footer">
    <a data-id=${rowId} data-color="${tColor}" data-action="save-tag-data" class="waves-light btn-small waves-effect waves-blue"> Save Tag </a>
    <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
  </div>`;

  tags.innerHTML = addTagModal;
  M.Modal.init(elems, open);
}

const saveTagData = (event, data = DATA) => {
  console.log('save tag data', event.target);
  let element = event.target;
  let rowId = element.dataset.id;
  console.log(rowId);
  const newTagName = document.querySelector('#newTagName').value;

  const newTagColor = element.dataset.color;
  console.log(newTagColor);
  let person;

  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });

  let tagData = {
    tagId: Math.random(),
    name: newTagName,
    color: newTagColor
  }
  // console.log(tagData);
  console.log(person);
  person.tags.push(tagData);
  console.log(data);
  initialPagination();
  afterTask(rowId);
}
 
const afterTask = (rowId, data = DATA) => {
  let person;
  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });
  // console.log(person);

  let allTags = '';
  if(person.tags.length > 0) {
    person.tags.map(el => {
      allTags+= `
      <p class="tag-info valign-wrapper">
        <span class="tag-delete">
          <a data-id=${rowId} data-tagid=${el.tagId} data-action="delete-tag" class="btn-floating z-depth-0 modal-trigger" data-target="modal2"><i data-action="delete-tag" data-tag="i"  class="material-icons black-text" >
          <svg data-tag="svg" data-action="delete-tag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path"  data-action="delete-tag" d="M0 0h24v24H0z" fill="none"/><path data-tag="path2" data-action="delete-tag" d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
          </i></a>
        </span>
        <span class="tag-label">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${el.color}" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
        </span>
        <span class="tag-name">
          ${el.name}
        <span>
      </p>`;
    });
  } else {
    allTags = `<p>No Tags Added</p>`;
  }

  let openTagsModal = `
  <div class="modal-content">
    <h4>Your Tags </h4>
    <div class="divider"></div>
    <br />
    <div>
      ${allTags}
    </div>
  </div>
  <div class="modal-footer">
  <a data-id=${rowId} data-action="add-tag" class="waves-light btn-small waves-effect waves-blue"> Add Tag </a>
  <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
  </div>`;

  tags.innerHTML = openTagsModal;

  // let elems = document.querySelectorAll(".tags");
  M.Modal.init(elems, open);
}
export {openTags, deleteTag, addTag, tagColor, saveTagData};