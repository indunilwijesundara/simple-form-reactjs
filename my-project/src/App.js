import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Form';
import View from './View';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<View />} /> 
        <Route path="/add" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
