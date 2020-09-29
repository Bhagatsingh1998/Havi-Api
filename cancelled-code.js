/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TAGS


const openTags = (e, data = DATA, tags = TAGS) => {
  console.log('opentags', e.target);
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
  // console.log(rowId);

  let person;
  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });
  // console.log(person);

  let allTags = '';
  if(person.tags.length > 0) {
    person.tags.map(tagId => {
      tags.forEach(tag => {
        if(+tag.id === +tagId) {
          allTags+= `
          <p class="single-tag valign-wrapper">
            <span >
              <a data-id=${rowId} data-tagid=${tagId} data-action="delete-tag" class="btn-floating z-depth-0 modal-trigger" data-target="modal2"><i data-action="delete-tag" data-tag="i"  class="material-icons black-text" >
              <svg data-tag="svg" data-action="delete-tag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path"  data-action="delete-tag" d="M0 0h24v24H0z" fill="none"/><path data-tag="path2" data-action="delete-tag" d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              </i></a>
            </span>
            <span >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${tag.color}" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
            </span>
            <span >
              ${tag.name}
            <span>
          </p>`;
        }
      });
    });
  } else {
    allTags = `<p>No Tags Added</p>`;
  }

  let totalTags = '';
  tags.map(tag => {
    totalTags += `
    <p class="valign-wrapper z-depth-1 tag-details" data-action="easy-add-label" data-tagid=${tag.id}>
        <svg data-action="easy-add-label" data-tag="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${tag.color}" width="18px" height="18px"><path data-tag="path" data-action="easy-add-label" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="easy-add-label" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>${tag.name}
    </p>`;
  });

  let openTagsModal = `
  <div class="modal-content">
    <h4>Your Tags </h4>
    <div class="divider"></div>
    <br />
    <div class="tag-info-div">
      ${allTags}
    </div>
    <section><b> Other Labels (click to select) </b></section>
    <div class="tag-info-div" data-id="${rowId}">
      ${totalTags}
    </div>
  </div>
  <div class="modal-footer">
  <a data-id=${rowId} data-info="opening-add-tag-modal" data-action="add-tag" class="waves-light btn-small waves-effect waves-blue"> Add Tag </a>
  <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
  </div>`;

  tagsModal.innerHTML = openTagsModal;
  let elems = document.querySelectorAll(".tags");
  M.Modal.init(elems, open);
}

const easyAddLabel = (e, data = DATA, tags = TAGS) => {
  // console.log('easyAddLabel', e.target);
  let element = e.target;
  // console.log(element);

  if(!element.parentElement.dataset.id) {
    if(element.dataset.tag === "i") {
      element = e.target;
      // console.log(element);
    } else if(element.dataset.tag === "svg") {
      element = e.target.parentElement;
      // console.log(element);
    } else if(element.dataset.tag === "path") {
      element = e.target.parentElement;
      // console.log(element);
    } else {
      element = e.target.parentElement.parentElement;
      // console.log(element);
    }
  }
  // console.log(element);
  let tagId = element.dataset.tagid;
  // console.log(tagId);

  element = element.parentElement;
  let rowId = element.dataset.id;
  // console.log(rowId);

  let tagDetails;
  tags.map(tag => {
    if(+tag.id === +tagId) {
      tagDetails = tag;
    }
  });

  let person;
  // console.log(data);
  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });
  // console.log(person);
  person.tags.push(tagDetails.id);
  // console.log(person);

  initialPagination();
  afterTask(rowId);
}

const deleteTag = (e, data = DATA) => {
  // console.log('deleteTag', e.target);
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
  let tagId = element.dataset.tagid;
  // console.log(rowId, tagId);

  let person;
  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });

  // console.log(person);
  let allTags = person.tags;
  console.log(allTags);

  let tagIndex;
  allTags.map((tag, index) => {
    if(+tag === +tagId) {
      tagIndex = index;
    }
  });

  allTags.splice(tagIndex, 1);
  initialPagination();
  // let elems = document.querySelectorAll(".tags");
  afterTask(rowId);

}

let COLORS = ['black', 'green', 'brown', 'red', 'yellow', 'blue', 'purple', 'pink'];

let avilableColorTags = '';
COLORS.map(color => {
  avilableColorTags += `
  <a data-color="${color}" class="btn-floating z-depth-0 modal-trigger" data-action="add-tag" ><i data-action="add-tag" data-tag="i"  class="material-icons black-text" >
  <svg  data-tag="svg" data-action="add-tag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="18px" height="18px"><path data-tag="path" data-action="add-tag" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="add-tag" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
  </i></a>`;
});

const addTag = (e, data = DATA) => {
  // console.log('add tag', e.target);
  let element = e.target;
  // console.log(element);
  
  // const rowId = 1;
  let newTagName = '';
  if(document.querySelector('#newTagName')) {
    newTagName = document.querySelector('#newTagName').value;
  }
  
  let rowId;
  let color = 'black';
  if( !element.dataset.info) {
    if(!element.dataset.id) {
      if(element.dataset.tag === "i") {
        element = e.target.parentElement;
      } else if(element.dataset.tag === "svg") {
        element = e.target.parentElement.parentElement;
      } else if(element.dataset.tag === "path") {
        element = e.target.parentElement.parentElement;
      } else if(element.dataset.tag === "path2"){
        element = e.target.parentElement.parentElement.parentElement;
      } else {
  
      }
    }
    // console.log(element);
    color = element.dataset.color;
    rowId = element.parentElement.dataset.id;
    // console.log(rowId);
  } else {
    rowId = e.target.dataset.id;
    // console.log(rowId);
  }

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
        ${avilableColorTags}
      </span>
    </div>
    <div>
      <span> You choose <span>
      <span>
        <svg  data-tag="svg" data-action="tag-color" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="18px" height="18px"><path data-tag="path" data-action="tag-color" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="tag-color" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
      </span>
    </div>
  </div>
  <div class="modal-footer">
    <a data-id=${rowId} data-color="${color}" data-action="save-tag-data" class="waves-light btn-small waves-effect waves-blue"> Save Tag </a>
    <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
  </div>`;

  tagsModal.innerHTML = addTagModal;
  // let elems = document.querySelectorAll(".tags");
  M.Modal.init(elems, open);
}


const saveTagData = (event, data = DATA, tags = TAGS) => {
  // console.log('save tag data', event.target);
  let element = event.target;
  let rowId = element.dataset.id;
  // console.log(rowId);
  const newTagName = document.querySelector('#newTagName').value;
  const newTagColor = element.dataset.color;
  // console.log(newTagColor);
  let person;

  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });

  let tagData = {
    id: Math.random(),
    name: newTagName,
    color: newTagColor
  }
  person.tags.push(tagData.id);

  tags.push(tagData);
  // console.log(tagData);
  // console.log(person);
  // person.tags.push(tagData);
  // console.log(data);
  initialPagination();
  afterTask(rowId);
}
 
const afterTask = (rowId, data = DATA, tags = TAGS) => {
  // console.log('aftertask', rowId);
  let person;
  data.map(el => {
    if(+el.id === +rowId) {
      person = el;
    }
  });
  // console.log(person.tags);
  // console.log(tags);
  let allTags = '';
  if(person.tags.length > 0) {
    person.tags.map(tagId => {
      tags.forEach(tag => {
        // console.log(+tag.id, tagId);
        if(+tag.id === +tagId) {
          allTags+= `
          <p class="tag-info valign-wrapper">
            <span class="tag-delete">
              <a data-id=${rowId} data-tagid=${tagId} data-action="delete-tag" class="btn-floating z-depth-0 modal-trigger" data-target="modal2"><i data-action="delete-tag" data-tag="i"  class="material-icons black-text" >
              <svg data-tag="svg" data-action="delete-tag" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path"  data-action="delete-tag" d="M0 0h24v24H0z" fill="none"/><path data-tag="path2" data-action="delete-tag" d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
              </i></a>
            </span>
            <span class="tag-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${tag.color}" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>
            </span>
            <span class="tag-name">
              ${tag.name}
            <span>
          </p>`;
        }
      });
    });
  } else {
    allTags = `<p>No Tags Added</p>`;
  }

  let totalTags = '';
  tags.map(tag => {
    totalTags += `
    <p class="valign-wrapper z-depth-1 tag-details" data-action="easy-add-label" data-tagid=${tag.id}>
        <svg data-action="easy-add-label" data-tag="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${tag.color}" width="18px" height="18px"><path data-tag="path" data-action="easy-add-label" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="easy-add-label" d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>${tag.name}
    </p>`;
  });

  let openTagsModal = `
  <div class="modal-content">
    <h4>Your Tags </h4>
    <div class="divider"></div>
    <br />
    <div class="tag-info-div">
      ${allTags}
    </div>
    <section><b> Other Labels (click to select) </b></section>
    <div class="tag-info-div" data-id="${rowId}">
      ${totalTags}
    </div>
  </div>
  <div class="modal-footer">
  <a data-id=${rowId} data-action="add-tag" data-info="opening-add-tag" class="waves-light btn-small waves-effect waves-blue"> Add Tag </a>
  <a class="waves-light btn-small modal-close waves-effect waves-blue"> Close </a>
  </div>`;
  tagsModal.innerHTML = openTagsModal;
  // let elems = document.querySelectorAll(".tags");
  M.Modal.init(elems, open);
  // initialPagination();

}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTES