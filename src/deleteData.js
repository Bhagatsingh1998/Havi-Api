import { DATA } from './data';
import { initialPagination, paginationData, header, headerHighlight } from './pagination';

const deleteRow = e => {
  console.log('delete row', e.target);
  let element =
    e.target.parentElement;
  console.log(element);

  if(!element.dataset.id) {
    if(element.dataset.tag === "i") {
      element =  e.target.parentElement.parentElement;
      // console.log(element);
    } else if(element.dataset.tag === "svg") {
      element =  e.target.parentElement.parentElement.parentElement;
      // console.log(element);
    } else if(element.dataset.tag === "path") {
      element =  e.target.parentElement.parentElement.parentElement.parentElement;
      // console.log(element);
    } else {
      element =  e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
      // console.log(element);
    }
  }
  element = element.parentElement.parentElement.parentElement;
  // console.log(element);
  let rowID = element.dataset.id;
  
  let row = `
  <td class="check-box"></td>
  <td class="actions-box">
    <span class="actions-icons">
      <a class="btn-floating z-depth-0" data-action="close-row"><i data-action="close-row" class="material-icons black-text" ><svg data-action="close-row" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="close-row" d="M0 0h24v24H0z" fill="none"/><path data-action="close-row" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></i></a>

      <a data-id=${rowID} class="btn-floating z-depth-0" data-action="delete-data"><i data-tag="i" data-action="delete-data" class="material-icons black-text"><svg data-tag="svg" data-action="delete-data" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path"  data-action="delete-data" d="M0 0h24v24H0z" fill="none"/><path data-tag="path2" data-action="delete-data" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></i></a>
    </span>
  </td>
  <td class="valign-wrapper alert-box ">
  <p class=""><b> Are you sure you want to delete this row? </b> </td>`;
  element.innerHTML = row;
}

const deleteData = (e, data = DATA) => {
  // console.log("deleted", e.target);
  let element =
    e.target.parentElement;
  
  if(!element.dataset.id) {
    if(element.dataset.tag === "i") {
      element =  e.target.parentElement.parentElement;
      // console.log(element);
    } else if(element.dataset.tag === "svg") {
      element =  e.target.parentElement.parentElement.parentElement;
      // console.log(element);
    } else if(element.dataset.tag === "path") {
      element =  e.target.parentElement.parentElement.parentElement.parentElement;
      // console.log(element);
    } else {
      element =  e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
      // console.log(element);
    }
  }
  // console.log(element);
  
  const rowId = element.dataset.id;
  // console.log(rowId);

  let rowIndex;
  data.map((el, index) => {
    // console.log(el.id, rowId);
    if (+el.id === +rowId) {
      rowIndex = index;
    }
  });

  // console.log(rowIndex);
  console.log('delted');
  let allData = data;
  allData.splice(rowIndex, 1);
  paginationData.totalPages = Math.ceil(allData.length / paginationData.pagesOnEachSlide);
  initialPagination();
}

const checkSingleRow = e => {
  const checkboxes = document.querySelectorAll(
    'input[name="checkRow"]:checked'
  );

  let checkboxChecked = [];
  checkboxes.forEach((checkbox) => {
    checkboxChecked.push(checkbox.value);
  });

  if (checkboxChecked.length > 0) {
    headerHighlight(checkboxChecked.length);
  } else {
    header();
  }
}


const checkAllRows = e => {
  // console.log('check all', e);
  let tbody = document.querySelector('tbody');

  if(document.getElementById("selectAll").checked) {
    let checkboxes = tbody.querySelectorAll('input[type="checkbox"]');
    let rowCounter = 0;
    for (let checkbox of checkboxes) {
      rowCounter++;
      checkbox.checked = true;
    }
    headerHighlight(rowCounter);
  } else {
    let checkboxes = tbody.querySelectorAll('input[type="checkbox"]');
    for (let checkbox of checkboxes) {
      checkbox.checked = false;
    }
    header();
  }
}

const deleteAllData = (e, data = DATA) => {
  // console.log('delete all data', e);
  const checkboxes = document.querySelectorAll(
    'input[name="checkRow"]:checked'
  );

  let allIds = [];
  checkboxes.forEach((checkbox) => {
    let ele = checkbox.parentElement.parentElement.parentElement;
    let eleId = ele.dataset.id;
    allIds.push(eleId);
  });

  allIds = [...new Set(allIds)];
  let allData = data;
  allIds.map(id => {
    let temp = allData;
    allData.forEach((el,index) => {
      if(+el.id === +id) {
        temp.splice(index, 1);
      }
    });
    allData = temp;
  });

  document.getElementById('selectAll').checked = false;
  data = allData;
  // console.log(data);
  paginationData.totalPages = Math.ceil(data.length/paginationData.pagesOnEachSlide);
  initialPagination();
}

export {deleteRow, deleteData, checkAllRows, deleteAllData, checkSingleRow};