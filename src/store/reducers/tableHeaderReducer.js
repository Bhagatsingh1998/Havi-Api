import * as actionTypes from "./../actionTypes";

const initialState = {
  tableHeaderData: [
    { id: 'fname', numeric: false, disablePadding: true, label: 'Name',},
    { id: 'lname', numeric: false, disablePadding: true, label: 'Surname'},
    { id: 'boy', numeric: true, disablePadding: true, label: 'Birth Year' },
    { id: 'city', numeric: false, disablePadding: true, label: 'City' },
    { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
    { id: 'tags', numeric: false, disablePadding: true, label: 'Tags'},
    { id: 'info1', numeric: false, disablePadding: true, label: 'Info 1'},
    { id: 'info2', numeric: false, disablePadding: true, label: 'Info 2'},
    { id: 'file', numeric: false, disablePadding: true, label: 'File'},
  ],
};


const tableHeaderReducer = (state = initialState, action) => {
  let newState, newTableHeaderData;
  switch(action.type) {
    case actionTypes.CHANGE_COL_ORDER:
      newState = {...state};
      // console.log(action.data);
      newTableHeaderData = action.data;

      newState.tableHeaderData = newTableHeaderData;
      return newState; 
    
      case actionTypes.RESET_ALL_COLUMNS:
        newState = {...state};
        newTableHeaderData = [
          { id: 'fname', numeric: false, disablePadding: true, label: 'Name',},
          { id: 'lname', numeric: false, disablePadding: true, label: 'Surname'},
          { id: 'boy', numeric: true, disablePadding: true, label: 'Birth Year' },
          { id: 'city', numeric: false, disablePadding: true, label: 'City' },
          { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
          { id: 'tags', numeric: false, disablePadding: true, label: 'Tags'},
          { id: 'info1', numeric: false, disablePadding: true, label: 'Info 1'},
          { id: 'info2', numeric: false, disablePadding: true, label: 'Info 2'},
          { id: 'file', numeric: false, disablePadding: true, label: 'File'},
        ];
        
        newState.tableHeaderData = newTableHeaderData;
        return newState;
    default:
      return state;
  }
}

export default tableHeaderReducer;