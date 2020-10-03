import './css/marterial-table.css';
import './css/materialize.min.css';
import './js/materialize.min.js';

import {initialPagination} from './pagination';
import './displaydata';
import { updateRow } from './editData';
import { deleteData, deleteRow, checkAllRows, deleteAllData, checkSingleRow } from './deleteData';
import { sortFname, sortLname, sortDoy, sortCity, searchText, claerSearchBox } from './filters';
import { openNote, updateNote } from './notes';
import { openTags, addTag, deleteTag, easyAddTag } from './tags';
import { newRow, newRowData } from './newData';

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('select');
  let instances = M.FormSelect.init(elems, '');
  return instances;
});

const tableActions = event => {
  // console.log(event.target);
  // console.log(event.target.dataset.action);
  let elementAction = event.target.dataset.action
  if(elementAction === 'update-row') {
    updateRow(event);
  } else 
  if(elementAction === 'close-row') {
    initialPagination();
  // } else if(elementAction === 'update-data') {
  //   updateData(event);
  } else if(elementAction === 'delete-row') {
    deleteRow(event)
  } else if(elementAction === 'delete-data') {
    deleteData(event)
  } else if(elementAction === 'check-all-rows') {
    checkAllRows(event)
  } else if(elementAction === 'check-single-row') {
    checkSingleRow(event)
  } else if(elementAction === 'sort-fname') {
    sortFname(event)
  } else if(elementAction === 'sort-lname') {
    sortLname(event)
  } else if(elementAction === 'sort-doy') {
    sortDoy(event)
  } else if(elementAction === 'sort-city') {
    sortCity(event)
  } else if(elementAction === 'search-text') {
    searchText(event)
  } else if(elementAction === 'open-note') {
    openNote(event)
  } else if(elementAction === 'open-tags') {
    openTags(event)
  }  else if(elementAction === 'save-row-data') {
    console.log('lol');
    newRowData(event);
  } else {
    console.log('tableActions');
  }
}
document.querySelector('table').addEventListener('click', tableActions);

const cardHeaderActions = event => {
  // console.log(event.target);
  // console.log(event.target.dataset.action);
  let elementAction = event.target.dataset.action
  if(elementAction === 'delete-all-data') {
    deleteAllData(event);
  } else if(elementAction === 'clear-serach-box') {
    claerSearchBox(event);
  } else if(elementAction === 'new-row') {
    newRow(event);
  } else {
    console.log('cardHeaderActions');
  }
}
document.querySelector('.card-header').addEventListener('click', cardHeaderActions);

const noteActions = event => {
  // console.log(event.target);
  // console.log(event.target.dataset.action);
  let elementAction = event.target.dataset.action;
  if(elementAction === 'add-note') {
    updateNote(event);
  // } else if(elementAction === 'save-note-data') {
  //   saveNoteData(event);
  } else if(elementAction === 'update-note') {
    updateNote(event);
  // } else if(elementAction === 'update-note-data') {
  //   updateNoteDate(event);
  } else {
    console.log('noteActions');
  }
}
document.querySelector('.note').addEventListener('click', noteActions);

const tagsActions = event => {
  // console.log(event.target);
  // console.log(event.target.dataset.action);
  let elementAction = event.target.dataset.action;
  if(elementAction === 'add-tag') {
    addTag(event);
  } else if(elementAction === 'delete-tag') {
    deleteTag(event);
  } else if(elementAction === 'tag-color') {
    tagColor(event);
  } else if(elementAction === 'save-tag-data') {
    saveTagData(event);
  } else if(elementAction === 'easy-add-tag') {
    easyAddTag(event);
  } else {
    console.log('tagsActions');
  }
}

document.querySelector('.tags').addEventListener('click', tagsActions);

initialPagination();
