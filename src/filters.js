import { DATA } from './data';
// import { allRowsOnSearch } from './displaydata';
import { initialPagination } from './pagination';

let toggleFname = 0;
let toggleLname = 0;
let toggleDoy = 0;
let toggleCity = 0;

const sortFname = (event, data = DATA) => {
  toggleFname++;
  let byName = data;
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
  initialPagination(data);
}

const sortLname = (event, data = DATA) => {
  toggleLname++;
  let byName = data;
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
  initialPagination(data);
}

const sortDoy = (event, data = DATA) => {
  toggleDoy++;
  let byName = data;
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
  initialPagination(data);
}

const sortCity = (event, data = DATA) => {
  toggleCity++;
  let byName = data;
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
  initialPagination(data);
}


const searchText = (event, data = DATA) => {
  console.log(event);
  let text;
  setTimeout(() => {
    text = document.querySelector("#search").value;
    console.log(text);
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
    if(text) {
      initialPagination(result);
    } else {
      initialPagination();
    }
  }, 150);
}

document.querySelector('#search').addEventListener('keydown', searchText);

const claerSearchBox = (event) => {
  initialPagination();
}

export {sortFname, sortLname, sortCity, sortDoy, searchText, claerSearchBox}