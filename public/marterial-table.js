// jquery
const selectMethod = () => {
  $("select").formSelect();
};

// initial data
let data = [
  { id: 478, fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi" },
  { id: 2, fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore" },
  { id: 1, fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi" },
  { id: 3, fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi" },
  { id: 4878, fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi" },
  { id: 28, fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore" },
  { id: 18, fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi" },
  { id: 38, fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi" },
  { id: 478, fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi" },
  { id: 24, fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore" },
  { id: 14, fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi" },
  { id: 34, fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi" },
  { id: 4478, fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi" },
  { id: 21, fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore" },
  { id: 11, fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi" },
  { id: 31, fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi" },
  { id: 4178, fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi" },
  { id: 222, fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore" },
  { id: 122, fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi" },
  { id: 322, fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi" },
  { id: 42278, fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi" },
  { id: 244, fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore" },
  { id: 144, fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi" },
  { id: 344, fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi" },
  { id: 44478, fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi" },
  { id: 266, fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore" },
  { id: 166, fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi" },
  { id: 366, fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi" },
  { id: 46678, fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi" },
  { id: 25, fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore" },
  { id: 16, fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi" },
  { id: 366, fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi" },
];

// constants
let edit,updatedCity;
let toggleSelectAll = 0;
let toggleSingle = 0;
let toggleFname = toggleLname = toggleDoy = toggleCity = 0;
const search = document.querySelector("#search");
const tbody = document.querySelector("tbody");
let cardHeader = document.querySelector(".card-header");
let currentPageNo = 1;
let previousPageNo = 1;
let nextPageNo = currentPageNo + 1;
let pagesOnEachSlide = 25;
let totalPages = Math.ceil(data.length / pagesOnEachSlide);


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

function updateRow(e, optionalData = false, lol) {
  console.log(lol);
  let element =
    e.target.parentElement.parentElement.parentElement.parentElement;

  if (optionalData) {
    element =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
  }
  const rowId = element.dataset.id;
  console.log(rowId);
  let fname, lname, doy;

  // let rowdata = data.filter((el) => +el.id === +rowId);
  let rowdata;
  data.map(el => {
    if(+el.id === +rowId) {
      rowdata = el;
    }
  })
  console.log(rowdata);
  fname = rowdata.fname;
  lname = rowdata.lname;
  doy = rowdata.doy;
  city = rowdata.city;

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
        <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="initialPagination()"><img src="./icons/baseline_close_black_18dp.png" onclick="initialPagination()"></i></a>
        <a class="btn-floating z-depth-0"><i onclick="saveForm(event)" class="material-icons black-text"><img src="./icons/baseline_done_black_18dp.png" onclick="saveForm(event, true)" /></i></a>
      </span>
    </td>
    
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
  selectMethod();
}

function cityFun(sel) {
  // console.log(sel.options[sel.selectedIndex].text);
  updatedCity = sel.options[sel.selectedIndex].text;
}

function saveForm(e, optionalData) {
  const fname = document.querySelector("#firstName").value;
  const lname = document.querySelector("#lastName").value;
  const doy = document.querySelector("#doy").value;
  let city = updatedCity;
  updatedCity = undefined;

  let element, rowId, dataIndex, row;
  element = e.target.parentElement.parentElement.parentElement.parentElement;
  if(optionalData) {
    element = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    // console.log(element);
  }
  rowId = element.dataset.id;
  // console.log(rowId);

  data.map((el, index) => {
    if (+el.id === +rowId) {
      // console.log(el);
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
  allRowsOnSearch(data);
}

function deleteRow(e, optionalData) {
  let element =
    e.target.parentElement.parentElement.parentElement.parentElement;
  // console.log(element);

  if (optionalData) {
    element =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
  }

  let row = `
  <td class="check-box"></td>
  <td class="actions-box">
    <span class="actions-icons">
      <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="initialPagination()"><img src="./icons/baseline_close_black_18dp.png" onclick="initialPagination()" /></i></a>
      <a class="btn-floating z-depth-0"><i onclick="deleteData(event)" class="material-icons black-text"><img src="./icons/baseline_done_black_18dp.png"  /></i></a>
    </span>
  </td>
  <td class="valign-wrapper alert-box ">
  <p class=""><b> Are you sure you want to delete this row? </b> </td>`;
  element.innerHTML = row;
}

function deleteData(e, optionalData = false) {
  // console.log("deleted");
  const element =
    e.target.parentElement.parentElement.parentElement.parentElement;
  
  if(optionalData) {
    const element =
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
  }
  console.log(element);
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
  let allData = [...data];
  allData.splice(rowIndex, 1);
  data = allData;
  totalPages = Math.ceil(data.length / 5);
  initialPagination();
}


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
  allRowsOnSearch(data);
}

function sortLname() {
  toggleLname++;
  let byName = data.slice(0);
  byName.sort(function (a, b) {
    let x = a.lname.toLowerCase();
    let y = b.lname.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  console.log(toggleLname);
  if (toggleLname >= 2) {
    byName = byName.reverse();
    toggleLname = 0;
  }
  data = byName;
  allRowsOnSearch(data);
}

function sortDoy() {
  toggleDoy++;
  let byName = data.slice(0);
  byName.sort(function (a, b) {
    let x = +a.doy;
    let y = +b.doy;
    return x < y ? -1 : x > y ? 1 : 0;
  });
  if (toggleDoy >= 2) {
    byName = byName.reverse();
    toggleDoy = 0;
  }
  data = byName;
  allRowsOnSearch(data);
}

function sortCity() {
  toggleCity++;
  let byName = data.slice(0);
  byName.sort(function (a, b) {
    let x = a.city.toLowerCase();
    let y = b.city.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  if (toggleCity >= 2) {
    byName = byName.reverse();
    toggleCity = 0;
  }
  data = byName;
  allRowsOnSearch(data);
}


function searchRow(event) {
  let text;
  setTimeout(() => {
    text = document.querySelector("#search").value;
    text = text.toLowerCase();
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
      }
    });

    if (text) {
      allRowsOnSearch(result);
    } else {
      initialPagination()
    }
  }, 150);
}

const allRowsOnSearch = (data = data) => {
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
      <td >
        <span class="actions-icons ">
          <a class="btn-floating z-depth-0"><i class="material-icons " onclick="updateRow(event, false, 'b')"><img class="gray-text" src="./icons/baseline_create_black_18dp.png" onclick="updateRow(event, true, 'a')"></i></a>
          <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="deleteRow(event)"><img src="./icons/baseline_delete_black_18dp.png" onclick="deleteRow(event, true)"></i></a>
        </span>
      </td>
      <td class="username-box right-align" >${rowData.fname}</td>
      <td class="username-box right-align">${rowData.lname}</td>
      <td class="doy-box right-align">${rowData.doy}</td>
      <td class="city-box right-align">${rowData.city}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
  selectMethod();
};



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

function deleteAllRows(optionalData = false, lol) {
  console.log(optionalData);

  const checkboxes = document.querySelectorAll(
    'input[name="checkRow"]:checked'
  );
  let allIds = [];
  checkboxes.forEach((checkbox) => {
    let ele = checkbox.parentElement.parentElement.parentElement;
    // if(optionalData) {
    //   ele = checkbox.parentElement.parentElement.parentElement;
    //   console.log(ele);
    // }
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

  // document.getElementById('selectAll').checked = false;
  data = allData;
  console.log(data);
  totalPages = Math.ceil(data.length/pagesOnEachSlide);
  initialPagination();
}

function paginationSize() {
  const no_of_rows = document.querySelector("#no_of_rows").value;
  // console.log(no_of_rows);
  pagesOnEachSlide = no_of_rows;
  totalPages = Math.ceil(data.length / pagesOnEachSlide);
  initialPagination();
}

function startPage() {
  currentPageNo = 1;
  previousPageNo = 1;
  nextPageNo = currentPageNo + 1;
  if (nextPageNo > totalPages) {
    nextPageNo--;
  }
  initialPagination();
}

function previousPage() {
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

let cardContent = `
  <div class="truncate valign-wrapper card-title"><p> Havi Table </p></div>
  <div class="card-header-body">
    <span class="valign-wrapper">
      <span class="search valign-wrapper">
      <i class="material-icons black-text"><img src="./icons/baseline_search_black_18dp.png"></i>
      <span class="input-field">
        <input placeholder="Search" id="search" onkeydown="searchRow(event)" type="text" />
      </span>
      <i class="material-icons black-text"><img src="./icons/baseline_close_black_18dp.png"></i>
      </span>
      <span class="waves-effect"><a href="#!"><i class="material-icons  btn-floating z-depth-0 center-align valign-wrapper black-text" onclick="addRow()"><img src="./icons/baseline_add_box_black_18dp.png"></i></a></span>
    </span>
  </div>`;


function headerHighlight(numRows) {
  cardHeader.innerHTML = `
      <span class="truncate valign-wrapper card-title"><strong> ${numRows} row(s) selected </strong></span>
      <div >
      <a class="btn-floating z-depth-0"><i class="material-icons black-text" onclick="deleteAllRows(false, 'a')" ><img src="./icons/baseline_delete_black_18dp.png" onclick="deleteAllRows(true, 'b')"></i></a>
      </div>`;
      cardHeader.classList.add('header-highlight');
  // <span class="waves-effect"><a href="#!"><i class="material-icons black-text">add_box</i></a></span>
}

function header() {
  cardHeader.innerHTML = cardContent;
}

const initialPagination = () => {
  header();
  let result = data.slice();
  result = result.slice(
    (currentPageNo - 1) * pagesOnEachSlide,
    pagesOnEachSlide * currentPageNo
  );
  allRowsOnSearch(result);
  const pagesSetup = document.querySelector(".pages-setup");
  pagesSetup.innerHTML = `<a href="#!" class="black-text">${currentPageNo} of ${totalPages}</a>`;
};
initialPagination();
