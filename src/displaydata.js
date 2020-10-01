import {DATA, TAGS} from './data';


const allRowsOnSearch = (data = DATA, tags = TAGS) => {
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  // console.log(data);
  data.forEach((rowData) => {

    let noteIcon;
    if(!rowData.note) {
      noteIcon = `
      <a data-id=${rowData.id} class="btn-floating z-depth-0 modal-trigger" data-action="open-note" data-target="modal1"><i data-action="open-note" data-tag="i"  class="material-icons black-text" >
        <svg data-tag="svg" data-action="open-note" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path" data-action="open-note" d="M0 0h24v24H0z" fill="none"/><path data-tag="path2" data-action="open-note" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"/></svg>
      </i></a>`;
    } else {
      noteIcon = `
      <a data-id=${rowData.id} class="btn-floating z-depth-0 modal-trigger" data-action="open-note" data-target="modal1"><i data-action="open-note" data-tag="i"  class="material-icons black-text" >
        <svg data-tag="svg" data-action="open-note" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path" data-action="open-note" d="M0 0h24v24H0V0z" fill="none"/><path data-tag="path2" data-action="open-note" d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"/></svg>
      </i></a>`;
    }

    let totalTags = '';
    if(rowData.tags) {
      rowData.tags.forEach(tagId => {
        tags.forEach(tag => {
          if(+tag.id === +tagId) {
            totalTags +=  `
              <div data-target="modal2" data-id=${rowData.id} data-action="open-tags" class="each-tag-display valign-wrapper z-depth-0 modal-trigger "><span data-action="open-tags" data-tag="span" class="left" style="background-color: ${tag.color}"></span><p data-action="open-tags" > ${tag.name} </p></div>`;
          }
        }) 
      });
    }

    let row = `
    <tr data-id=${rowData.id} >
      <td class="check-box">
        <label data-action="check-single-row">
          <input type="checkbox" data-action="check-single-row" name="checkRow" class="filled-in"  autocomplete="off" />
          <span></span>
        </label>
      </td>

      <td class="username-box " >${rowData.fname}</td>
      <td class="username-box ">${rowData.lname}</td>
      <td class="doy-box ">${rowData.doy}</td>
      <td class="city-box ">${rowData.city}</td>

      <td >
        <span class="actions-icons">
          <a data-id=${rowData.id} class="btn-floating z-depth-0 modal-trigger" data-target="modal3" data-action="update-row"><i data-tag="i" data-action="update-row" class="material-icons " ><svg data-tag="svg" data-action="update-row" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path" data-action="update-row" d="M0 0h24v24H0z" fill="none"/><path data-tag="path" data-action="update-row" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></i></a>

          <a data-id=${rowData.id} class="btn-floating z-depth-0" data-action="delete-row" ><i data-tag="i" data-action="delete-row" class="material-icons black-text" ><svg data-tag="svg" data-action="delete-row" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path" data-action="delete-row" d="M0 0h24v24H0z" fill="none"/><path data-tag="path2" data-action="delete-row" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></i></a>

          ${noteIcon}
        </span>
      </td>
      <td class="tags-td">
        <span class="valign-wrapper"> 
        ${totalTags}
        </span>
      </td>
      
    </tr>`;
    tbody.innerHTML += row;
  });
};

export { allRowsOnSearch };

// plus icon for tags
{/* <a data-id=${rowData.id} class="  modal-trigger" data-action="open-tags" data-target="modal2"><i data-action="open-tags" data-tag="i"  class="material-icons valign-wrapper black-text" >
        <svg data-tag="svg" data-action="open-tags" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path data-tag="path" data-action="open-tags" d="M0 0h24v24H0z" fill="none"/><path data-tag="path2" data-action="open-tags" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </i></a> */}