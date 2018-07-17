import React from "react";
import Header from "./Header";

import '../../css/common.css';

const App = ({children}) => (<main>
    <Header />
    <br />
    <div className="container">
        { children }
    </div>
</main>);
export default App;
