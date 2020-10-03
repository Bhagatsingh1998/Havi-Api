let persons = [
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
  { id: 82,   tags:[], fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore", note: "hey hello" },
  { id: 81,   tags:[2,3], fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi", note: "" },
  { id: 83,   tags:[], fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi", note: "" },
  { id: 824,  tags:[1, 2, 3, 4, 5], fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore", note: "" },
  { id: 84478,tags:[1], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
  { id: 814,  tags:[], fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi", note: "" },
  { id: 834,  tags:[4], fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi", note: "" },
  { id: 84978,tags:[], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
  { id: 4678, tags:[1], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
  { id: 26,   tags:[], fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore", note: "hey hello" },
  { id: 16,   tags:[2,3], fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi", note: "" },
  { id: 36,   tags:[], fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi", note: "" },
  { id: 264,  tags:[1, 2, 3, 4, 5], fname: "Bravo", lname: "Yankee", doy: 2020, city: "Bangalore", note: "" },
  { id: 46478,tags:[1], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
  { id: 164,  tags:[], fname: "Alfa", lname: "Zulu", doy: 1992, city: "Delhi", note: "" },
  { id: 364,  tags:[4], fname: "Charlie", lname: "X-ray", doy: 2010, city: "Delhi", note: "" },
  { id: 46978,tags:[], fname: "Echo", lname: "Victor", doy: 2450, city: "Delhi", note: "" },
];

let tags = [
  {id: 1, name: 'Imp', color: '#f44336'},
  {id: 2, name: 'danger', color: 'red'},
  {id: 3, name: 'try', color: 'brown'},
  {id: 4, name: 'random', color: 'yellow'},
  {id: 5, name: 'Imp2', color: 'pink'},
  {id: 6, name: 'danger2', color: 'purple'},
];

if(!sessionStorage.getItem('persons')) {
  sessionStorage.setItem('persons', JSON.stringify(persons));
  sessionStorage.setItem('tags', JSON.stringify(tags));
}


const updateData = (updatedData) => {
  console.log(updatedData);
  sessionStorage.setItem('persons', JSON.stringify(updatedData));
}

const updateTags= (updatedTags) => {
  sessionStorage.setItem('tags', JSON.stringify(updatedTags));
}

let DATA = JSON.parse(sessionStorage.getItem('persons'));

let TAGS = JSON.parse(sessionStorage.getItem('tags'));

export {DATA, TAGS, updateData, updateTags};