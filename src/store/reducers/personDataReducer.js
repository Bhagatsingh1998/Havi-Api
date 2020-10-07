const initialState = {
  personsData: [
    { id: 478, tags:[1, 4, 1, 2, 3, 4, 5], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
    { id: 2,   tags:[], fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore", note: "hey hello" },
    { id: 1,   tags:[2], fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi", note: "" },
    { id: 3,   tags:[], fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi", note: "" },
    { id: 24,  tags:[1, 2, 3, 4, 5], fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore", note: "" },
    { id: 4478,tags:[1], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
    { id: 14,  tags:[], fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi", note: "" },
    { id: 34,  tags:[4], fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi", note: "" },
    { id: 4978,tags:[], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
    { id: 8478, tags:[1], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
  ]
}

const personDataReducer = (state = initialState, action) => {
  return state
}

export default personDataReducer;