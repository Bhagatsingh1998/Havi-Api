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
  let pIndex, newState, newPersonsData, p, newPersonData, newPersonTag;
  switch(action.type) {
    case actionTypes.EDIT_PERSON_DETAILS :

      pIndex = action.data.pIndex;
      newState = {...state};
      newPersonsData = newState.personsData.slice();
      newState.personsData = newPersonsData;
      p = {...newPersonsData[pIndex]};

      p.fname = action.data.fname;
      p.lname = action.data.lname;
      p.city = action.data.city;
      p.doy = action.data.doy;
      p.note = action.data.note;
      p.tags = action.data.tags

      newPersonsData[pIndex] = p;
      return newState;
    
    case actionTypes.EDIT_PERSON_NOTE :
      pIndex = action.data.pIndex;
      newState = {...state};
      newPersonsData = newState.personsData.slice();
      newState.personsData = newPersonsData;
      p = {...newPersonsData[pIndex]};
      p.note = action.data.note;

      newPersonsData[pIndex] = p;
      // console.log(newState);
      return newState;
    
    case actionTypes.DELETE_PERSON:
      pIndex = action.data.pIndex;
      newState = {...state};
      newPersonsData = newState.personsData.slice();
      newPersonsData.splice(pIndex, 1);
      newState.personsData = newPersonsData;

      // console.log(newState);
      return newState;

    case actionTypes.ADD_TAG:
      // console.log('ADD_TAG', action.data);
      pIndex = action.data.pIndex;
      newState = {...state};
      newPersonsData = newState.personsData.slice();
      newPersonData = {...newPersonsData[pIndex]}
      newPersonTag = newPersonData.tags.slice();
      newPersonTag.push(action.data.id);
      // console.log(action.data);
      newPersonData.tags = newPersonTag;
      newPersonsData[pIndex] = newPersonData;
      newState.personsData = newPersonsData;
      return newState;

    case actionTypes.ADD_ALL_TAGS:
      pIndex = action.data.pIndex;
      newState = {...state};
      newPersonsData = newState.personsData.slice();
      newPersonData = {...newPersonsData[pIndex]};
      newPersonTag = action.data.tags;

      newPersonData.tags = newPersonTag;
      newPersonsData[pIndex] = newPersonData;
      // console.log(newPersonsData[pIndex]);
      newState.personsData = newPersonsData;
      return newState;

    case actionTypes.ADD_PERSON_DETAILS:
      newState = {...state};
      newPersonsData = newState.personsData.slice();
      newPersonsData.push(action.data);
      console.log(action.data);
      newState.personsData = newPersonsData;
      return newState;

    case actionTypes.DELETE_SELECTED_PERSONS:
      console.log('DELETE_SELECTED_PERSONS', action.data);
      newState = {...state};
      newPersonsData = newState.personsData.slice();
      // action.data.map(pId => {
      //   if(newPersonsData.includes(pId)) {
      //     console.log(pId);
      //   }
      // })
     
      for(let i = 0; i < action.data.length; i++) {
        for(let j = 0; j < newPersonsData.length; j++) {
          if(+action.data[i] === newPersonsData[j].id) {
            newPersonsData.splice(j, 1);
            break;
          }
        }
      }
      newState.personsData = newPersonsData
      return newState;
    default:
      return state;
  }
}

export default personDataReducer;