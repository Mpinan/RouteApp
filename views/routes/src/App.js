import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  function readMovies() {
    fetch("http://localhost:3001/movies", {
      method: "GET"
    })
      .then(response => response.json())

      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
    console.log(response);
  }

  return (
    <div className="App">
      <header className="App-header">
        <a getMovies={readMovies()}>Learn React</a>
      </header>
    </div>
  );
}

export default App;
