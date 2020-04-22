import React from "react";
import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import GamesList from "./components/GamesList";

function App() {
  return (
    <div className="container">
      <h2>Game List</h2>
      <GamesList />
    </div>
  );
}

export default App;
