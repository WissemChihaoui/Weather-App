import Weather from "./components/weather";
import Form from "./components/Form";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.min.css";
import React from "react";

const API_key = "965ffdc93bd20a837e430bafb5bf3ba0";
const API_source =
  "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=" +
  API_key;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };
    

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }


  getWeather = async (e) => {
      e.preventDefault();

      const city = e.target.elements.city.value;
      const state = e.target.elements.state.value;
      
      
      

    const api_call = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?&q="+ city +","+state+"&appid=" +
        API_key
    );

    const response = await api_call.json();
    console.log(response);
    

    this.setState({
      city: `${response.name},${response.sys.country}`,
      celsius: `${this.calCelsius(response.main.temp)}°`,
      temp_max: `${this.calCelsius(response.main.temp_max)}°`,
      temp_min: `${this.calCelsius(response.main.temp_min)}°`,
      description: response.weather[0].description,
      //icon: this.weatherIcon.Thunderstorm,
    });
    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather}/>
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
