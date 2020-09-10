import React from 'react';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Main from './containers/Main';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
