const mongoose = require("mongoose");

const RowSchema = mongoose.Schema({
  name: {
    type: String
  },
  surname: {
    type: String
  },
  birthYear: {
    type: Number
  },
  birthCity: {
    type: String
  },
  tableData:{} 
});

module.exports = mongoose.model("Rows", RowSchema);
