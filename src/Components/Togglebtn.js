import React from "react";
import "./toggle.css";
const Togglebtn = (props) => {
    return(
        <div>
              <input type="checkbox"  id="toggle-btn-1" className="toggle" checked={props.checked} onClick={(e)=>props.onClick(e)} >
                 
              </input>
               <label for="toggle-btn-1">
          
               </label>
        </div>
    );
}
export default Togglebtn;