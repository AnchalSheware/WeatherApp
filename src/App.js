import React from "react";
import { useEffect, useState } from "react";
import SearchBox from "./Components/SearchBox";

import "./App.css"
import { Button} from "@mui/material";
import CloudyIcon from "./cloud.png"
import { color } from "@mui/system";
import ToggleBtn from "./Components/Togglebtn";


const App = () => {
  const[checked,setChecked] = useState(false) ;
  const[weather,setweather] = useState("");
  const[city,setCity]=useState("");
  const[wind,setwind]=useState("");
  const[climate,setClimate] = useState("");
  const[humidity,sethumidity]=useState("");
  const[searchcity,setSearchCity]=useState("");
  const[errState,setErrState]=useState(false);
  const[dupweather,setDupWeather]=useState("");
  

  const getWeather = async(searchCity) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchcity} &appid=7abb3ff2fe622c01deee6a69267d9acf `;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
    if(responseJson.cod==404)
    {
        setErrState(true)
    }
    else{
    setErrState(false);
    setChecked(false);
    setClimate(responseJson.weather[0].main);
    setweather((responseJson.main.temp-273.15).toFixed(2));
    setDupWeather((responseJson.main.temp-273.15).toFixed(2));
    setCity(responseJson.name);
    setwind(responseJson.wind.speed);
    sethumidity(responseJson.main.humidity)
    console.log(checked);
    }

  }
 
  useEffect(()=>{
      getWeather();
      
  },[]);
  // useEffect(()=>{
  //   setChecked(false);
  // },[searchcity])

  const MyFunction = () => {
    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes()+':'+ myCurrentDate.getSeconds() ;
    const newCurrentDate = date;
    return (
      <p>{newCurrentDate}</p>
    );
  }
  
  const ConvertFar = () => {
   const res = ((weather)* 1.8 + 32).toFixed(2);
   console.log(res);
   setDupWeather(res);

  }
  // const ConvertCel = () => {
  //   const res = ((weather-32)*5/9).toFixed(2);
  //   console.log(res);
  //   setweather(res);
 
  //  }
   const Convert = (e) => {
    
     console.log("Button clicked");
    let check = e.target.checked;
    check ? ConvertFar() : setDupWeather(weather);
    setChecked(check);
   }

   const getCssClass = (value) => {
     switch(value.toLowerCase())
     {
          case "haze" :
            return "bg-haze"
          case "clouds":
            return "bg-cloudy"
          case "smoke":
            return "bg-smoke"
          case "clear":
            return "bg-clear"
            case "rain":
            return "bg-rain"
          default :
             return "bg-default"

     }

   }

  return(
    <>
    
    <div className={`bg ${getCssClass(climate)}`} >

      
  { errState ? <span>Enter Valid City</span> : <div className="content">
     
     <div className="temp">{dupweather} {(checked===true) ? <span><sup>O</sup>F</span> : <span><sup>O</sup>C</span> }</div>
       <div className="location-details">
           <div className="location">{city}</div>
           <MyFunction />
      </div>
      <div className="clouds">
        <img src={CloudyIcon } alt="cloud-icon"></img>
        <div className="cloudy">{climate}</div>
      </div >
      {/* //<Button style={style} onClick={Convert}>To Faranheit</Button> */}
      <div  className="tgBtn">
      <ToggleBtn 
      onClick={(e)=>{Convert(e); 
      console.log("CHecked State" +e.target.checked);}
      }   checked={checked}/>
      
    </div>
       
       </div>}
       <div className="content-form">
         <div className="content-form-items">
          <div className="form-row">
           <SearchBox 
           value = {searchcity}
           setSearchCity = {setSearchCity}
           onClick={() => getWeather()}
        />
        
         <div className="form-row-options-items">
          <div className="form-row-options" onClick={()=>{setSearchCity("Mumbai")} }> Mumbai </div>
          <div className="form-row-options" onClick={()=>{setSearchCity("Nagpur")}}> Nagpur </div>
          <div className="form-row-options" onClick={()=>{setSearchCity("Pune")}}> Pune </div>
          <div className="form-row-options" onClick={()=>{setSearchCity("Bhopal")}} > Bhopal </div>
         </div>
         <div className="form-row-options-items">
          <h3>Weather Details</h3>
           <div className="weather-options">
            <div className="weather-details"> <div>Humidity</div> <div>{humidity}%</div> </div>
            <div className="weather-details"> <div>Wind</div>  <div>{wind}km/hr</div> </div>
          </div>
         </div>
         <h3 className="next-day-details">NEXT DAY DETAILS</h3> 
         
        </div>
      </div>
       </div>
       
    </div>
    </>
  );
};
export default App;