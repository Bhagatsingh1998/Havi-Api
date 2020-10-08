import * as actionTypes from "./../actionTypes";

const initialState = {
  tagsData: [
    { id: 1, name: "Imp", color: "#f44336" },
    { id: 2, name: "danger", color: "red" },
    { id: 3, name: "try", color: "brown" },
    { id: 4, name: "random", color: "yellow" },
    { id: 5, name: "Imp2", color: "pink" },
    { id: 6, name: "danger2", color: "purple" },
  ],
};

const tagsReducer = (state = initialState, action) => {
  return state;
}

export default tagsReducer;
