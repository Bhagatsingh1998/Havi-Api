const selectMethod = () => {
  $("select").formSelect();
};

// constants
let edit;
const tbody = document.querySelector("tbody");

// initial display of rows
let data = [
  { id: 1, fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi" },
  { id: 2, fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore" },
  { id: 3, fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi" },
  { id: 4, fname: "Delta", lname: "Whiskey", doy: 2000, city: "Delhi" },
  { id: 478, fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi" },
  { id: 100, fname: "Foxtrot", lname: "Uniform", doy: 1892, city: "Delhi" },
  { id: 20, fname: "Golf", lname: "Tango", doy: 2005, city: "Bangalore" },
  { id: 30, fname: "Hotel", lname: "Sierra", doy: 1910, city: "Delhi" },
  { id: 465, fname: "India", lname: "Romeo", doy: 1920, city: "Delhi" },
];

// console.log(typeof data);

// const allRows = () => {
//   // console.log(data);
//   tbody.innerHTML = "";

//   data.forEach((rowData) => {
//     let row = `
//     <tr data-id=${rowData.id} >
//       <td class="check-box">
//         <label>
//           <input type="checkbox" onclick="singleSelect(this)" name="checkRow"  class="filled-in singleCheckBox" autocomplete="off" />
//           <span></span>
//         </label>
//       </td>
//       <td class="actions-box">
//         <span class="actions-icons">
//           <a class="btn-floating z-depth-0" ><i class="material-icons black-text" onclick="updateRow(event)"><img src="./icons/baseline_create_black_18dp.png" onclick="updateRow(event, true) ></i></a>
//           <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="deleteRow(event)"><img src="./icons/baseline_delete_black_18dp.png" onclick="deleteRow(event, true)></i></a>
//         </span>
//       </td>
//       <td class="username-box" >${rowData.fname}</td>
//       <td class="username-box">${rowData.lname}</td>
//       <td class="doy-box">${rowData.doy}</td>
//       <td class="city-box">${rowData.city}</td>
//     </tr>`;
//     tbody.innerHTML += row;
//   });
//   selectMethod();
// };
// allRows();

function updateRow(e, optionalData = false) {
  // console.log(optionalData);
  // console.log(e.target.parentElement.parentElement.parentElement.parentElement);

  let element =
    e.target.parentElement.parentElement.parentElement.parentElement;

  if (optionalData) {
    element =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
  }
  // console.log(element);
  const rowId = element.dataset.id;
  // console.log(rowId);

  let fname, lname, doy, cityNo;

  // console.log(data);
  let rowdata = data.filter((el) => +el.id === +rowId);
  // console.log(rowdata);
  fname = rowdata[0].fname;
  lname = rowdata[0].lname;
  doy = rowdata[0].doy;
  city = rowdata[0].city;
  // console.log(fname);

  const cityDelhi = `
  <div class="input-field dropdownBox text-left" id="dropdownBox">
    <select onchange="cityFun(this)">
      <option name="city" selected value="Delhi">   Delhi</option>
      <option name="city" value="Bangalore">   Bangalore</option>
    </select>
  </div>`;

  const cityBangalore = `
  <div class="input-field dropdownBox text-left" id="dropdownBox">
    <select onchange="cityFun(this)">
      <option value="Bangalore">   Delhi</option>
      <option selected value="Bangalore">   Bangalore</option>
    </select>
  </div>`;

  let selectedCity = city === "Delhi" ? cityDelhi : cityBangalore;

  let row = `
  <td class="check-box">
  </td>
  <form id="myForm">
    <td class="actions-box">
      <span class="actions-icons">
        <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="initialPagination()"><img src="./icons/baseline_close_black_18dp.png" /></i></a>
        <a class="btn-floating z-depth-0"><i onclick="saveForm(event)" class="material-icons black-text"><img src="./icons/baseline_done_black_18dp.png" /></i></a>
      </span>
    </td>
    
    <td class="username-box">
      <div class="input-field">
        <input placeholder="First Name" id="firstName" type="text" class="validate" value="${fname}">
      </div>
    </td>
    <td class="username-box">
      <div class="input-field">
        <input placeholder="Last Name" id="lastName" type="text" class="validate" value="${lname}">
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
  selectMethod();
  // const rowId = element.dataset.id;
  // console.log(rowId);
}

let updatedCity;

function cityFun(sel) {
  console.log(sel.options[sel.selectedIndex].text);
  updatedCity = sel.options[sel.selectedIndex].text;
}

function saveForm(e) {
  const fname = document.querySelector("#firstName").value;
  const lname = document.querySelector("#lastName").value;
  const doy = document.querySelector("#doy").value;
  let city = updatedCity;
  updatedCity = undefined;

  let element, rowId, dataIndex, row;
  element = e.target.parentElement.parentElement.parentElement.parentElement;
  rowId = element.dataset.id;

  data.map((el, index) => {
    if (+el.id === +rowId) {
      row = el;
      dataIndex = index;
    }
  });
  // console.log(dataIndex);
  // console.log(row);

  if (city === undefined) {
    city = row.city;
  }

  let updatedData = [...data];
  let updatedDataRow = { ...updatedData[dataIndex] };
  // console.log(updatedDataRow);
  updatedDataRow.fname = fname;
  updatedDataRow.lname = lname;
  updatedDataRow.city = city;
  updatedDataRow.doy = doy;

  updatedData[dataIndex] = updatedDataRow;
  data = updatedData;
  allRows();
}

function deleteRow(e, optionalData) {
  let element =
    e.target.parentElement.parentElement.parentElement.parentElement;
  // console.log(element);

  if (optionalData) {
    console.log("a");
    element =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
  }

  let row = `
  <td class="check-box"></td>
  <td class="actions-box">
    <span class="actions-icons">
      <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="initialPagination()"><img src="./icons/baseline_close_black_18dp.png" /></i></a>
      <a class="btn-floating z-depth-0"><i onclick="deleteData(event)" class="material-icons black-text"><img src="./icons/baseline_done_black_18dp.png" /></i></a>
    </span>
  </td>
  <p class="error-box">Are you sure you want to delete this row?</p>`;
  element.innerHTML = row;
}

function deleteData(e) {
  console.log("deleted");
  const element =
    e.target.parentElement.parentElement.parentElement.parentElement;
  console.log(element);
  const rowId = element.dataset.id;
  console.log(rowId);
  let rowIndex;
  data.map((el, index) => {
    // console.log(el.id, rowId);
    if (+el.id === +rowId) {
      rowIndex = index;
    }
  });
  console.log(rowIndex);

  let allData = [...data];
  allData.splice(rowIndex, 1);
  data = allData;
  totalPages = Math.ceil(data.length / 5);
  initialPagination();
}

let toggleFname = (toggleLname = toggleDoy = toggleCity = 0);
function sortFname() {
  toggleFname++;
  let byName = data.slice(0);
  byName.sort(function (a, b) {
    let x = a.fname.toLowerCase();
    let y = b.fname.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  // console.log(byName);
  if (toggleFname >= 2) {
    byName = byName.reverse();
    toggleFname = 0;
  }
  data = byName;
  allRows();
}

function sortLname() {
  toggleLname++;
  let byName = data.slice(0);
  byName.sort(function (a, b) {
    let x = a.lname.toLowerCase();
    let y = b.lname.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  // console.log(byName);
  console.log(toggleLname);
  if (toggleLname >= 2) {
    byName = byName.reverse();
    toggleLname = 0;
  }
  data = byName;
  allRows();
}

function sortDoy() {
  toggleDoy++;
  let byName = data.slice(0);
  byName.sort(function (a, b) {
    let x = +a.doy;
    let y = +b.doy;
    return x < y ? -1 : x > y ? 1 : 0;
  });
  // console.log(byName);
  if (toggleDoy >= 2) {
    byName = byName.reverse();
    toggleDoy = 0;
  }
  data = byName;
  allRows();
}

function sortCity() {
  toggleCity++;
  let byName = data.slice(0);
  byName.sort(function (a, b) {
    let x = a.city.toLowerCase();
    let y = b.city.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  // console.log(byName);
  if (toggleCity >= 2) {
    byName = byName.reverse();
    toggleCity = 0;
  }
  data = byName;
  allRows();
}

const search = document.querySelector("#search");
function searchRow(event) {
  // console.log(event);
  let text;

  setTimeout(() => {
    // console.log(search);
    text = document.querySelector("#search").value;
    text = text.toLowerCase();
    // console.log(text);

    // let result = data.filter(
    //   (el) =>
    //     el.fname.includes(text) ||
    //     el.lname.includes(text) ||
    //     el.doy.toString().includes(text) ||
    //     el.city.includes(text)
    // );

    let result = [];
    data.map((el) => {
      console.log(text);
      if (
        el.fname.toLowerCase().includes(text) ||
        el.lname.toLowerCase().includes(text) ||
        el.doy.toString().includes(text) ||
        el.city.toLowerCase().includes(text)
      ) {
        result.push(el);
        // console.log(result);
      }
    });

    if (text) {
      // console.log(result);
      // initialPagination(result)
      allRowsOnSearch(result);
    } else {
      allRows();
      // initialPagination(data)
    }
  }, 200);
}

const allRowsOnSearch = (data) => {
  // console.log(data);
  // console.log(data);
  tbody.innerHTML = "";

  data.forEach((rowData) => {
    let row = `
    <tr data-id=${rowData.id} >
      <td class="check-box">
        <label>
          <input type="checkbox" onclick="singleSelect(this)" name="checkRow" class="filled-in"  autocomplete="off" />
          <span></span>
        </label>
      </td>
      <td class="actions-box">
        <span class="actions-icons">
          <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="updateRow(event)"><img src="./icons/baseline_create_black_18dp.png" onclick="updateRow(event, true)"></i></a>
          <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="deleteRow(event)"><img src="./icons/baseline_delete_black_18dp.png" onclick="deleteRow(event, true)"></i></a>
        </span>
      </td>
      <td class="username-box" >${rowData.fname}</td>
      <td class="username-box">${rowData.lname}</td>
      <td class="doy-box">${rowData.doy}</td>
      <td class="city-box">${rowData.city}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
  selectMethod();
};

let toggleSelectAll = 0;
document.getElementById("selectAll").onclick = function () {
  toggleSelectAll++;
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let rowCounter = -1;
  for (var checkbox of checkboxes) {
    rowCounter++;
    checkbox.checked = this.checked;
  }

  if (toggleSelectAll % 2 == 1) {
    headerHighlight(rowCounter);
  } else {
    header();
  }
};

let cardHeader = document.querySelector(".card-header");
let cardContent = `
<div class="card-header">
  <div class="card-header-text">
    <span class="truncate card-title">Havi Table</span>
    <div class="actions valign-wrapper right">
      <div class="search valign-wrapper">
        <i class="material-icons black-text"><img src="./icons/baseline_search_black_18dp.png"></i>
        <span class="input-field">
          <input placeholder="Search" id="search" onkeydown="searchRow(event)" type="text" />
        </span>
        <i class="material-icons black-text"><img src="./icons/baseline_close_black_18dp.png"></i>
      </div>
      <span class="waves-effect  add-box"><a href="#!"><i class="material-icons black-text" onclick="addRow()"><img src="./icons/baseline_add_box_black_18dp.png"></i></a></span>
    </div>
  </div>
</div>`;

function header() {
  cardHeader.innerHTML = cardContent;
}

function headerHighlight(numRows) {
  cardHeader.innerHTML = `
  <div class="pink accent-1">
    <div class="card-header-text ">
      <span class="truncate card-title"><strong> ${numRows} row(s) selected </strong></span>
      <div class="delete-box valign-wrapper right">
      <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="deleteAllRows()" ><img src="./icons/baseline_delete_black_18dp.png" onclick="deleteAllRows()"></i></a>
      </div>
    </div>
  </div>`;
  // <span class="waves-effect"><a href="#!"><i class="material-icons black-text">add_box</i></a></span>
}

function deleteAllRows() {
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
  // let temp = data;
  // let allData = temp.slice((currentPageNo -1)*pagesOnEachSlide, pagesOnEachSlide);
  // console.log(allData);
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
  console.log(data);
  totalPages = Math.ceil(data.length/pagesOnEachSlide);
  initialPagination();
}

let toggleSingle = 0;
function singleSelect(sel) {
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

// pagination();

let currentPageNo = 1;
let previousPageNo = 1;
let nextPageNo = currentPageNo + 1;
let pagesOnEachSlide = 5;
let totalPages = Math.ceil(data.length / pagesOnEachSlide);

const initialPagination = () => {
  header();
  let result = data.slice();
  result = result.slice(
    (currentPageNo - 1) * pagesOnEachSlide,
    pagesOnEachSlide * currentPageNo
  );
  allRowsOnSearch(result);
  const pagesSetup = document.querySelector(".pages-setup");
  pagesSetup.innerHTML = `<a href="#!">${currentPageNo} of ${totalPages}</a>`;
};
initialPagination();

function startPage() {
  // console.log('startPage');

  currentPageNo = 1;
  previousPageNo = 1;
  nextPageNo = currentPageNo + 1;
  if (nextPageNo > totalPages) {
    nextPageNo--;
  }
  initialPagination();
}

function previousPage() {
  // console.log('previous Page');
  // console.log(currentPageNo, previousPageNo);
  currentPageNo = currentPageNo - 1;
  previousPageNo = currentPageNo - 1;
  nextPageNo = currentPageNo + 1;
  if (currentPageNo < 1) {
    currentPageNo = 1;
    previousPageNo = 1;
  }
  initialPagination();
}

function nextPage() {
  // console.log('next page');
  currentPageNo = currentPageNo + 1;
  previousPageNo = currentPageNo - 1;
  nextPageNo = currentPageNo + 1;
  if (currentPageNo >= totalPages) {
    currentPageNo = totalPages;
    nextPageNo = totalPages;
  }
  initialPagination();
}

function endPage() {
  // console.log('end page');
  currentPageNo = totalPages;
  previousPageNo = currentPageNo - 1;
  nextPageNo = totalPages;
  if (previousPageNo < 1) {
    previousPage++;
  }
  if (nextPageNo > totalPages) {
    nextPageNo--;
  }
  initialPagination();
}

function addRow() {
  let row = `
  <td class="check-box"></td>
  <td class="actions-box">
    <span class="actions-icons">
      <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="initialPagination()"><img src="./icons/baseline_close_black_18dp.png" /> </i></a>
      <a class="btn-floating z-depth-0"><i onclick="saveAddRow(event)" class="material-icons black-text"><img src="./icons/baseline_done_black_18dp.png" /></i></a>
    </span>
  </td>
  <td class="username-box">
    <div class="input-field">
      <input placeholder="First Name" id="firstName" type="text" class="validate" ">
    </div>
  </td>
  <td class="username-box">
    <div class="input-field">
      <input placeholder="Last Name" id="lastName" type="text" class="validate" ">
    </div>
  </td>
  <td class="doy-box">
    <div class="input-field">
      <input placeholder="DoY" id="doy" type="number" class="validate">
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
  selectMethod();
}

function saveAddRow(e) {
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

  let allData = [...data];
  allData[allData.length] = newData;
  data = allData;
  totalPages = Math.ceil(data.length / 5);
  initialPagination();
}

function paginationSize() {
  const no_of_rows = document.querySelector("#no_of_rows").value;
  console.log(no_of_rows);
  pagesOnEachSlide = no_of_rows;
  totalPages = Math.ceil(data.length / pagesOnEachSlide);
  initialPagination();
}
