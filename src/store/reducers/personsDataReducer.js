import * as actionTypes from '../actionTypes';

const initialState = {
  personsData: [
    { id: 478, tags:[1, 4, 1, 5], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
    { id: 2,   tags:[], fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore", note: "hey hello" },
    { id: 1,   tags:[2,1], fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi", note: "" },
    { id: 3,   tags:[1], fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi", note: "" },
    { id: 24,  tags:[1, 2, 3, 4, 5], fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore", note: "" },
    { id: 4478,tags:[1], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
    { id: 14,  tags:[], fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi", note: "" },
    { id: 34,  tags:[4], fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi", note: "" },
    { id: 4978,tags:[], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
    { id: 8478, tags:[1], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
  ]
}

const personDataReducer = (state = initialState, action) => {
  let pIndex, newState, newPersonData, p;
  switch(action.type) {
    case actionTypes.EDIT_PERSON_DETAILS :
      // console.log(action.data);
      pIndex = action.data.pIndex;
      newState = {...state};
      newPersonData = newState.personsData.slice();
      newState.personsData = newPersonData;
      // console.log(newPersonData);
      // console.log(typeof(newPersonData));
      // console.log(newState);
      p = {...newPersonData[pIndex]};
      // let p = newState.personsData[pIndex];

      p.fname = action.data.fname;
      p.lname = action.data.lname;
      p.city = action.data.city;
      p.doy = action.data.doy;
      p.note = action.data.note;
      p.tags = action.data.tags

      newPersonData[pIndex] = p;
      // console.log(newState);
      return newState;
    
    case actionTypes.EDIT_PERSON_NOTE :
      pIndex = action.data.pIndex;
      newState = {...state};
      newPersonData = newState.personsData.slice();
      newState.personsData = newPersonData;
      p = {...newPersonData[pIndex]};
      p.note = action.data.note;

      newPersonData[pIndex] = p;
      // console.log(newState);
      return newState;
    
    case actionTypes.DELETE_PERSON:
      pIndex = action.data.pIndex;
      newState = {...state};
      newPersonData = newState.personsData.slice();
      newPersonData.splice(pIndex, 1);
      newState.personsData = newPersonData;

      // console.log(newState);
      return newState;

    default:
      return state;
  }
}

export default personDataReducer;