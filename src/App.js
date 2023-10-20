import React from 'react';
import './App.css';
import Np from './Np';
import D from './D';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArticlesProvider } from './ArticlesContext';
function App() {
  return (
    <ArticlesProvider>
    <div className="App">
      <Router>
        <Routes>
          {/* Route for the root path */}
          <Route path="/" element={<Np />} />

          {/* Route for paths like /id:id */}
          <Route path="/details/:id" element={<D />} />
        </Routes>
      </Router>
    </div>
    </ArticlesProvider>
  );
}

export default App;
