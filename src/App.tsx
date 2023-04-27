import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Filter from "./components/Filter/Filter";
import CheckedCheckboxes from "./components/Filter/CheckedCheckboxes";

function App() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Filter />
        <CheckedCheckboxes />
      </div>
    </>
  );
}

export default App;
