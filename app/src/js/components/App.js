import React from "react";
import List from "./List";
const App = ({children}) => (
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
    <h2>Articles</h2>
    { children }
    </div>
  </div>
);
export default App;
