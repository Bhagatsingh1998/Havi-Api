import { DATA, updateData } from './data';
import { initialPagination, paginationData } from './pagination';

const newRow = (e, data = DATA) => {
  // console.log('newRow', e.target);
  let tbody = document.querySelector('tbody');

  let row = `
  <td class="check-box"></td>
  <td class="actions-box">
    <span class="actions-icons">
      <a class="btn-floating z-depth-0" data-action="close-row"><i data-action="close-row" class="material-icons black-text" ><svg data-action="close-row" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="close-row" d="M0 0h24v24H0z" fill="none"/><path data-action="close-row" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></i></a>
      <a class="btn-floating z-depth-0" data-action="save-row-data"><i data-action="save-row-data" class="material-icons black-text"><svg data-action="save-row-data" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="save-row-data" d="M0 0h24v24H0z" fill="none"/><path data-action="save-row-data" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></i></a>
    </span>
  </td>
  <td></td>
  <td class="username-box">
    <div class="input-field">
      <input placeholder="First Name" id="firstName" type="text" >
    </div>
  </td>
  <td class="username-box">
    <div class="input-field">
      <input placeholder="Last Name" id="lastName" type="text" >
    </div>
  </td>
  <td class="doy-box">
    <div class="input-field">
      <input placeholder="DoY" id="doy" type="number" >
    </div>
  </td>
  <td class="city-box">
    <div class="input-field " id="add-dropdownBox">
      <select onchange="cityFun(this)" id="addCity">
        <option  value="Delhi">   Delhi</option>
        <option  value="Bangalore">   Bangalore</option>
      </select>
    </div>
  </td>`;
  tbody.innerHTML = row + tbody.innerHTML;
  // select
  let elems = document.querySelectorAll('select');
  let instances = M.FormSelect.init(elems, '');
}

const newRowData = (e, data = DATA) => {
  // console.log('newRowData', e.target);
  const fname = document.querySelector("#firstName").value;
  const lname = document.querySelector("#lastName").value;
  const doy = document.querySelector("#doy").value;
  let city = document.querySelector("#addCity").value;

  let newData = {
    id: Math.random(),
    fname: fname,
    lname: lname,
    doy: doy,
    city: city,
  };

  let allData = data;
  allData[allData.length] = newData;
  data = allData;
  paginationData.totalPages = Math.ceil(data.length / paginationData.pagesOnEachSlide);
  updateData(data);
  initialPagination();
}

export { newRow, newRowData };