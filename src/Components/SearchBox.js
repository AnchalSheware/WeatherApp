import React from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button } from "@mui/material";


const SearchBox = (props) => {
    return(
        <div className="search-content">
         <input className="search-input"
         value={props.value}
         onChange={(e)=>props.setSearchCity(e.target.value)}
         placeholder="Type to search..."></input>
         <div className="searchIcon">
         <Button onClick={()=>{props.onClick()}}><SearchOutlinedIcon  
         /></Button>
         </div>
        </div>
    )
}
export default SearchBox;