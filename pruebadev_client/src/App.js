import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Property from "./tablas/Property";
import PropertyTrace from "./tablas/PropertyTrace";
import Owner from "./tablas/Owner";
import PropertyImages from "./tablas/PropertyImages";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Property /><br />
      <PropertyTrace/><br />
      <Owner/><br />
      <PropertyImages/>
    </>
  );
}

export default App;
