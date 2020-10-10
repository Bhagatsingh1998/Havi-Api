import React from "react";
import WholeTable from "./components/Table/Table";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#61dafb',
      },
      secondary: {
        main: '#61dafb',
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <WholeTable />
    </ThemeProvider>
  );
};

export default App;
