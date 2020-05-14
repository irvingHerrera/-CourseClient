import React from 'react';
import Admin from './pages/Admin';
import SingIn from './pages/Admin/SingIn';
import Home from './pages/Home';
import Contact from './pages/Contact';

import "./App.scss";

function App() {

  return (
    <div className='App'>
      <h1>Estamos en App</h1>
      <Admin></Admin>
      <SingIn></SingIn>
      <Home></Home>
      <Contact></Contact>
    </div>
    
  );
}

export default App;
