import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weather: {
        main:null
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
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=b8ce29065c0a67b1e38773807063c87f`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            weather: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);

          this.setState({
            isLoaded: true,
            error
          });
        }
      ).then(
        
      )
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
                <option></option>
                  <option>madrid</option>
                  <option>tokio</option>
                  <option>berlin</option>
                  <option>london</option>
                </select>
              </form>
            </div>
            <div class="col-sm-3"><button type="button" class="mybtn"  onClick={this.getweather}>Block level button</button>
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
