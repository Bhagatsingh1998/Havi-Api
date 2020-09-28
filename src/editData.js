import {DATA} from './data';
import { initialPagination } from './pagination';


const updateRow = (e, data = DATA) => {
  let element =
    e.target.parentElement;
  // console.log(element);

  if(!element.dataset.id) {
    if(element.dataset.tag === "i") {
      element =  e.target.parentElement.parentElement;
    } else if(element.dataset.tag === "svg") {
      element =  e.target.parentElement.parentElement.parentElement;
    } else if(element.dataset.tag === "path") {
      element =  e.target.parentElement.parentElement.parentElement.parentElement;
    } else {
      element =  e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    }
  }

  const rowId = element.dataset.id;
  // console.log(rowId);
  element = element.parentElement.parentElement.parentElement;
  // console.log(element);
  let fname, lname, doy, city;

  // let rowdata = data.filter((el) => +el.id === +rowId);
  let rowdata;
  
  data.map(el => {
    if(+el.id === +rowId) {
      rowdata = el;
    }
  });

  // console.log(rowdata);
  fname = rowdata.fname;
  lname = rowdata.lname;
  doy = rowdata.doy;
  city = rowdata.city;

  const cityDelhi = `
  <div class="input-field dropdownBox text-left" id="dropdownBox">
    <select id="selectCity">
      <option name="city" selected value="Delhi">   Delhi</option>
      <option name="city" value="Bangalore">   Bangalore</option>
    </select>
  </div>`;

  const cityBangalore = `
  <div class="input-field dropdownBox text-left" id="dropdownBox">
    <select id="selectCity">
      <option value="Delhi">   Delhi</option>
      <option selected value="Bangalore">   Bangalore</option>
    </select>
  </div>`;
  
  let selectedCity = city === "Delhi" ? cityDelhi : cityBangalore;

  let row = `
  <td class="check-box"></td>
  <form id="myForm">
    <td class="actions-box">
      <span class="actions-icons">
        <a class="btn-floating z-depth-0" data-action="close-row"><i data-action="close-row" class="material-icons black-text" ><svg data-action="close-row" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="close-row" d="M0 0h24v24H0z" fill="none"/><path data-action="close-row" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></i></a>

        <a data-id=${rowId} class="btn-floating z-depth-0" data-action="update-data"><i data-action="update-data" data-tag="i" class="material-icons black-text"><svg data-tag="svg" data-action="update-data" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path  data-tag="path" data-action="update-data" d="M0 0h24v24H0z" fill="none"/><path data-tag="path1" data-action="update-data" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></i></a>
      </span>
    </td>
    <td></td>
    <td class="username-box">
      <div class="input-field">
        <input placeholder="First Name" id="firstName" type="text" value="${fname}">
      </div>
    </td>
    <td class="username-box">
      <div class="input-field">
        <input placeholder="Last Name" id="lastName" type="text" value="${lname}">
      </div>
    </td>
    <td class="doy-box">
      <div class="input-field">
        <input placeholder="DoY" id="doy" type="number" value="${doy}">
      </div>
    </td>
    <td class="city-box">
      ${selectedCity}
    </td>
  </form>`;
  element.innerHTML = row;

  // select
  let elems = document.querySelectorAll('select');
  let instances = M.FormSelect.init(elems, '');
}

let updatedCity;

const updateData = e => {
  // console.log('Updated', e.target);
  const fname = document.querySelector("#firstName").value;
  const lname = document.querySelector("#lastName").value;
  const doy = document.querySelector("#doy").value;
  // let city = updatedCity;
  // updatedCity = undefined;

  let selectCity = document.querySelector("#selectCity");
  let city = selectCity.options[selectCity.selectedIndex].value;
  // console.log(fname, lname, doy);

  let element, rowId, dataIndex, row;
  element = e.target.parentElement;
  // console.log(element);

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

  rowId = element.dataset.id;
  // console.log(rowId);

  DATA.map((el, index) => {
    if (+el.id === +rowId) {
      // console.log(el);
      row = el;
      dataIndex = index;
    }
  });
  // console.log(dataIndex);
  // console.log(row);

  // if (city === undefined) {
  //   city = row.city;
  // }

  let updatedData = DATA;
  let updatedDataRow = { ...updatedData[dataIndex] };
  // console.log(updatedDataRow);
  updatedDataRow.fname = fname;
  updatedDataRow.lname = lname;
  updatedDataRow.city = city;
  updatedDataRow.doy = doy;
  // console.log(updatedDataRow);
  updatedData[dataIndex] = updatedDataRow;
  // console.log(DATA);
  // DATA = updatedData;
  initialPagination();
}

// function cityFun(sel) {
//   // console.log(sel.options[sel.selectedIndex].text);
//   updatedCity = sel.options[sel.selectedIndex].text;
// }




export {updateRow, updateData };