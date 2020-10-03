import { DATA, updateData } from "./data";
import { initialPagination } from "./pagination";

let editModal = document.querySelector(".edit");

const updateRow = (e, data = DATA) => {
  console.log("updateRow", e);
  let element = e.target;
  console.log(element);

  if (!element.dataset.id) {
    if (element.dataset.tag === "i") {
      element = e.target.parentElement;
    } else if (element.dataset.tag === "svg") {
      element = e.target.parentElement.parentElement;
    } else if (element.dataset.tag === "path") {
      element = e.target.parentElement.parentElement.parentElement;
    } else {
      element =
        e.target.parentElement.parentElement.parentElement.parentElement;
    }
  }
  // console.log(element);
  let rowId = element.dataset.id;
  console.log(rowId);

  let person;
  for(let i = 0; i < data.length; i++) {
    if(+data[i].id === +rowId) {
      person = data[i];
      break;
    }
  }

  let personCity = person.city;

  let editForm = `
  <div class="modal-content">
    <span class="card-title">Edit Details</span>
    <br />
    <div class="input-field">
      <input placeholder="First Name" id="first_name" type="text" value="${person.fname}">
      <label for="first_name" class="active">Edit First Name</label>
    </div>
    <br />
    <div class="input-field">
      <input placeholder="Surname" id="surname" type="text" value="${person.lname}">
      <label for="surame" class="active">Edit Surname</label>
    </div>
    <br />
    <div class="input-field">
      <input placeholder="Year of Birth" id="doy" type="number" value="${person.doy}">
      <label class="active">Edit Year of Birth</label>
    </div>
    <br />
    <select id="city">
      <option ${personCity === 'Delhi' ? 'selected' : ''} value="Delhi">Delhi</option>
      <option  ${personCity === 'Bangalore' ? 'selected' : ''} value="Bangalore">Bangalore</option>
    </select>
    <label>City</label>
    <br />
    <div class="input-field">
      <textarea id="note-data" class="materialize-textarea" placeholder="Your Note">${person.note}</textarea>
      <label class="active" for="note-data">Edit Note</label>
    </div>
    <br />
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-blue btn-small ">Update</a>
      <a href="#!" class="modal-close waves-effect waves-blue btn-small">Close</a>
    </div>
  </div>`;
  editModal.innerHTML = editForm;
  
  console.log('aaa');
  let elems = document.querySelectorAll('select');
  let instances = M.FormSelect.init(elems, '');

  let elems1 = document.querySelectorAll('.modal');
  let instances1 = M.Modal.init(elems1, {
    onCloseStart: () => {
      // console.log('submitted');
      let fname = editModal.querySelector('#first_name').value;
      let lname = editModal.querySelector('#surname').value;
      let doy = editModal.querySelector('#doy').value;
      let city = editModal.querySelector('#city').value;
      let note = editModal.querySelector('#note-data').value;
      console.log(fname, lname, doy, city, note);
      person.fname = fname;
      person.lname = lname;
      person.doy = doy;
      person.city = city;
      person.note = note;
      updateData(data);
      initialPagination();
    }
  });
};

export { updateRow };
