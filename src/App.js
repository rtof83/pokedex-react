import React, { useState } from 'react';
import Home from './pages/home';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ListContext, ShowModalContext} from './contexts/Contexts';

const App = () => {
  const [ list, setList ] = useState([]);
  const [ showModal, setShowModal ] = useState({ show: false });

  return (
    <ListContext.Provider value={[ list, setList ]}>
    <ShowModalContext.Provider value={[ showModal, setShowModal ]}>

      <Home />

    </ShowModalContext.Provider>
    </ListContext.Provider>
  )
};

export default App;
