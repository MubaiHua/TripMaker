import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from './main-page';
import CreateRoom from './create-room';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<CreateRoom />} />
          <Route exact path="main" element={<MainPage />} />
        </Routes>
      </Router>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);