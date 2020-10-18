import React from "react";
import WholeTable from "./components/Table/Table";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import SignIn from './components/SignIn/SignIn';


const App = props => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#61dafb',
      },
      secondary: {
        main: '#61dafb',
      }
    }
  });
  
  let DisplayComponent;
  if(props.signInUser) {
    DisplayComponent = WholeTable;
  } else {
    DisplayComponent = SignIn;
  }

  return (
    <ThemeProvider theme={theme}>
      < DisplayComponent />
    </ThemeProvider>
  );
};

const mapStateToProps = state => {
  return {
    signInUser: state.auth.signInUser
  }
}

export default connect(mapStateToProps)(App);
