import React from "react";


const Weather = (props) => {
    return (
        <div className="container" >
            <div className="cards">
                <h1>{props.city}</h1>
                <h5 className="icon">
                    <i className={`wi ${props.weatherIcon}`}></i>
                </h5>
                <h3 className="deg">{props.temp_celsius}</h3>
                {minmaxTemp(props.temp_min,props.temp_max)}
                <div className="situation">
                    <h4>{props.description}</h4>
                </div>
            </div>
        </div>
    );
};

function minmaxTemp (min, max){
    return(
        <div className="other-deg">
        <h4>{min}</h4>
        <h4>{max}</h4>
        </div>
    )
}

export default Weather;
