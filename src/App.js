import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import CardComponent from './components/card-component';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="*" element={<CardComponent />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
