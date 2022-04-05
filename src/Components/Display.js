import React , {Component} from "react";
import SearchBox from "./SearchBox"
import CloudyIcon from "./Assets/cloud.png"
import ToggleBtn from "./Togglebtn.js";
import "./Display.css"



  
   
  

class Display extends Component{
     constructor(){
        super();
         this.state = 
           {
               
               checked : false ,
               weather : "",
               wind : "" ,
               climate : "",
               humidity : "",
               searchcity : "",
               errState : false,
               dupweather : "",
           };
    }
      getWeather = async() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.searchcity}&appid=7abb3ff2fe622c01deee6a69267d9acf `;
        const response = await fetch(url);
        const responseJson = await response.json();
        console.log(responseJson);
         if(String(responseJson.cod)==="404")
         {
             this.setState({errState:true});
         }
         else
         {
           this.setState({
             errState:false,
             checked : false,
             climate : responseJson.weather[0].main,
             weather : (responseJson.main.temp-273.15).toFixed(2),
             dupweather : (responseJson.main.temp-273.15).toFixed(2),
             city : responseJson.name,
             wind : responseJson.wind.speed,
             humidity :responseJson.main.humidity,
             curDT : new Date().toLocaleString()
           
            });
          }
        }
          
       getCity = (e) => {
         console.log(e);
         this.setState({searchcity:e})
       }  
      //  useEffect(()=>
      //   {
      //       this.getWeather();
      //    },[]);
      // useEffect(()=>{
      //   setChecked(false);
      // },[searchcity])
     
      ConvertFar = () => {
      const res = ((this.state.weather)* 1.8 + 32).toFixed(2);
      console.log(res);
      this.setState({dupweather : res});
     }
     // const ConvertCel = () => {
     //   const res = ((weather-32)*5/9).toFixed(2);
     //   console.log(res);
     //   setweather(res);
     //  }
     Convert = (e) => {
        console.log("Button clicked");
       let check = e.target.checked;
       check ? this.ConvertFar() : this.setState({dupweather:this.state.weather});
       this.setState({checked : check});
  }
       getCssClass = (value) => {
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
  

    render(){
        return(
          
              <div className={`bg ${this.getCssClass(this.state.climate)}`} >
                 { this.state.errState ? <span>Enter Valid City</span> : <div className="content">
                   <div className="temp">{this.state.dupweather} {(this.state.checked===true) ? <span><sup>O</sup>F</span> : <span><sup>O</sup>C</span> }</div>
                     <div className="location-details">
                         <div className="location">{this.state.city}</div>
                         <p> {this.state.curDT} </p>
                     </div>
                  <div className="clouds">
                     <img src={CloudyIcon } alt="cloud-icon"></img>
                     <div className="cloudy">{this.state.climate}</div>
                  </div >
                  {/* //<Button style={style} onClick={Convert}>To Faranheit</Button> */}
                 <div  className="tgBtn">
                    <ToggleBtn 
                       onClick={(e)=>{this.Convert(e); 
                       }}
                      checked={this.state.checked}/>
                </div>
                </div>}
                 <div className="content-form">
                   <div className="content-form-items">
                    <div className="form-row">
                    <SearchBox 
                      value = {this.state.searchcity}
                      setSearchCity = {this.getCity}
                      onClick={() => this.getWeather()}
                   />
                  <div className="form-row-options-items">
                     <div className="form-row-options" onClick={()=>{this.setState({searchcity : "Mumbai"});} }> Mumbai </div>
                     <div className="form-row-options" onClick={()=>{this.setState({searchcity : "Nagpur"});}}> Nagpur </div>
                     <div className="form-row-options" onClick={()=>{this.setState({searchcity : "Pune"});}}> Pune </div>
                     <div className="form-row-options" onClick={()=>{this.setState({searchcity : "Bhopal"});}} > Bhopal </div>
                   </div>
                  <div className="form-row-options-items">
                   <h3>Weather Details</h3>
                   <div className="weather-options">
                      <div className="weather-details"> <div>Humidity</div> <div>{this.state.humidity}%</div> </div>
                     <div className="weather-details"> <div>Wind</div>  <div>{this.state.wind}km/hr</div> </div>
                 </div>
               </div>
              <h3 className="next-day-details">NEXT DAY DETAILS</h3> 
          </div>
        </div>
      </div>
     </div>
  
   );
};}

export default Display;
