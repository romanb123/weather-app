import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weather: {
        main: null
      },
      value: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.getweather = this.getweather.bind(this);

  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  getweather() {
// ===========get weather from server====start==
axios.get('http://localhost:3000/users/'+this.state.value)
  .then((response)=> {
    console.log(response.data[0].time);
    console.log(response.data[0]);
    // check if it is more then 1 hour
    var checktime = new Date();
    if((response.data[0].time+120000)>=checktime.getTime()){
      // if it is less then 1 hour
      this.setState({
        isLoaded: true,
        weather:{
        main:response.data[0]
        } 
      });
    }
    else{
    // if it is more then 1 hour  
      // ===========get weather from api====start==
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=b8ce29065c0a67b1e38773807063c87f`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            weather: result
          });
          if (result.message !== "city not found") {
            var d = new Date();
            // send weather info to backend start
            axios.post('http://localhost:3000/users/' + this.state.value, {
              feels_like: result.main.feels_like,
              humidity: result.main.humidity,
              pressure: result.main.pressure,
              temp: result.main.temp,
              temp_max: result.main.temp_max,
              temp_min: result.main.temp_min,
              time: d.getTime(),
              city: this.state.value

            })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
             // send weather info to backend end
          }
        },
        (error) => {
          console.log(error);

          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    // ===========get weather from api====end==
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
// ===========get weather from server====end==

  }


  render() {
    return (
      <div className="content">
        <div className="cityname">
          {this.state.value}
        </div>
        <div className="cityselect">
          <div class="row">
            <div class="col-sm-9">
              <form action="/action_page.php">
                <select class="form-control" id="sel1" name="sellist1" onChange={this.handleChange}>
                  <option>choose the city</option>
                  <option>madrid</option>
                  <option>tokio</option>
                  <option>berlin</option>
                  <option>london</option>
                </select>
              </form>
            </div>
            <div class="col-sm-3"><button type="button" class="mybtn" onClick={this.getweather}>check the weather</button>
            </div>
          </div>
        </div>
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>feels_like</th>
              <th>humidity</th>
              <th>pressure</th>
              <th>temp</th>
              <th>temp_max</th>
              <th>temp_min</th>
            </tr>
          </thead>
          <tbody>
            {(this.state.weather.main) ? <tr>
              <td>{this.state.weather.main.feels_like}</td>
              <td>{this.state.weather.main.humidity}</td>
              <td>{this.state.weather.main.pressure}</td>
              <td>{this.state.weather.main.temp}</td>
              <td>{this.state.weather.main.temp_max}</td>
              <td>{this.state.weather.main.temp_min}</td>
            </tr>
              : null}
          </tbody>
        </table></div>

    );
  }
}
export default App;