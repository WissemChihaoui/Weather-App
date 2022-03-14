import React from "react";

const Form = props => {
    return(
    <form onSubmit={props.loadweather}>
        <div className="inputs">
        <input type="text" placeholder="Country" name="city" required/>
        <input type="text" placeholder="State :'TN'" name="state"/>
        </div>
        <button className="btn">Get Weather</button>
    </form>
    );
}

export default Form;