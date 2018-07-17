import React from "react";

/*
 * return function with middle col = numRow
 */
const GenericRow = (numRow = 6) => {
    return ({children}) => (<div className="row">
    <div className="col"></div>
    <div className={"col-"+numRow}>
        {children} 
    </div>
    <div className="col"></div>
    </div>);
}
export default GenericRow;
