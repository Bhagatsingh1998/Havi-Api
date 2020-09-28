import {DATA} from './data';
import { allRowsOnSearch } from './displaydata';

const startPageSvg = document.querySelector('.start-page-svg');
const previousPageSvg = document.querySelector('.previous-page-svg');
const nextPageSvg = document.querySelector('.next-page-svg');
const endPageSvg = document.querySelector('.end-page-svg');
const noOfRows = document.querySelector('.no-of-rows');
let cardHeader = document.querySelector(".card-header");

const paginationData = {
  currentPageNo: 1,
  previousPageNo: 1,
  pagesOnEachSlide: 5
};

paginationData.nextPageNo = paginationData.currentPageNo + 1;
paginationData.totalPages = Math.ceil(DATA.length / paginationData.pagesOnEachSlide);

let cardContent = `
<div class="truncate valign-wrapper card-title">Havi Table</div>
<div class="card-header-body">
  <span class="valign-wrapper">
    <span class="search valign-wrapper">
      <i class="material-icons black-text"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></i>

      <span class="input-field">
        <input placeholder="Search" data-action="search-text" id="search" type="text" />
      </span>
      <a href="#!">
      <i data-action="clear-serach-box" class="material-icons black-text btn-floating z-depth-0 center-align valign-wrapper"><svg data-action="clear-serach-box" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="clear-serach-box" d="M0 0h24v24H0z" fill="none"/><path data-action="clear-serach-box" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></i> </a>
    </span>

    <span class="waves-effect"><a href="#!"><i class="material-icons  btn-floating z-depth-0 center-align valign-wrapper black-text" data-action="new-row">
      <svg data-action="new-row" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="new-row" d="M0 0h24v24H0z" fill="none"/><path data-action="new-row" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg></i></a>
    </span>
  </span>
</div>`;

const headerHighlight = numRows => {
  cardHeader.innerHTML = `
      <span class="truncate valign-wrapper card-title"><strong> ${numRows} row(s) selected </strong></span>
      <div >
      <a class="btn-floating z-depth-0" data-action="delete-all-data"><i data-action="delete-all-data" class="material-icons black-text" ><svg data-action="delete-all-data" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-action="delete-all-data" d="M0 0h24v24H0z" fill="none"/><path data-action="delete-all-data" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></i></a>
      </div>`;
      cardHeader.classList.add('header-highlight');
  // <span class="waves-effect"><a href="#!"><i class="material-icons black-text">add_box</i></a></span>
}

let header = () => {
  cardHeader.innerHTML = cardContent;
  cardHeader.classList.remove('header-highlight');
}

header();

const paginationSize = (event) => {
  const rows = event.target.value;
  pagesOnEachSlide = rows;
  totalPages = Math.ceil(DATA.length / pagesOnEachSlide);
  initialPagination();
}

const startPage = () => {
  paginationData.currentPageNo = 1;
  paginationData.previousPageNo = 1;
  paginationData.nextPageNo = paginationData.currentPageNo + 1;
  if (paginationData.nextPageNo > paginationData.totalPages) {
    paginationData.nextPageNo--;
  }
  initialPagination();
}

const previousPage = () => {
  paginationData.currentPageNo = paginationData.currentPageNo - 1;
  paginationData.previousPageNo = paginationData.currentPageNo - 1;
  paginationData.nextPageNo = paginationData.currentPageNo + 1;
  if (paginationData.currentPageNo < 1) {
    paginationData.currentPageNo = 1;
    paginationData.previousPageNo = 1;
  }
  initialPagination();
}

const nextPage = () => {
  paginationData.currentPageNo = paginationData.currentPageNo + 1;
  paginationData.previousPageNo = paginationData.currentPageNo - 1;
  paginationData.nextPageNo = paginationData.currentPageNo + 1;
  if (paginationData.currentPageNo >= paginationData.totalPages) {
    paginationData.currentPageNo = paginationData.totalPages;
    paginationData.nextPageNo = paginationData.totalPages;
  }
  initialPagination();
}

const endPage = () => {
  paginationData.currentPageNo = paginationData.totalPages;
  paginationData.previousPageNo = paginationData.currentPageNo - 1;
  paginationData.nextPageNo = paginationData.totalPages;
  if (paginationData.previousPageNo < 1) {
    paginationData.previousPage++;
  }
  if (paginationData.nextPageNo > paginationData.totalPages) {
    paginationData.nextPageNo--;
  }
  initialPagination();
}

const initialPagination = (data = DATA) => {
  let result = data.slice();
  result = result.slice(
    (paginationData.currentPageNo - 1) * paginationData.pagesOnEachSlide,
    paginationData.pagesOnEachSlide * paginationData.currentPageNo
  );
  allRowsOnSearch(result);
  const pagesSetup = document.querySelector(".pages-setup");
  pagesSetup.innerHTML = `<a href="#!" class="black-text">${paginationData.currentPageNo} of ${paginationData.totalPages}</a>`;
};

startPageSvg.addEventListener('click', startPage);
previousPageSvg.addEventListener('click', previousPage);
nextPageSvg.addEventListener('click', nextPage);
endPageSvg.addEventListener('click', endPage);
noOfRows.addEventListener('change', paginationSize);

export {initialPagination, paginationData, header, headerHighlight};