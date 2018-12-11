// /client/App.js
import React, { Component } from "react";

class App extends Component {
  // initialize our state 
  state = {
    data: []
  };

  // fetch data from DB
  componentDidMount() {
    this.getDataFromServer()
    .then(res => this.setState({data: res}))
    .catch(err => console.log(err));
}

  getDataFromServer = async () => {
    const response = await fetch("/api/getData");
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  };

  getAscending = async () => {
    const response = await fetch("/api/getAscending");
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    this.setState({data:body});
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <button type = "radio" name="sort" onClick={() => this.getAscending()}>
            Get Ascending
        </button>
        <button type="radio" name="sort" onClick={() => this.getAscending()}>
            Get Descending
        </button>
        <ul>
          {data.map(dat => (
                <li style={{ padding: "10px" }} key={data.name}>
                  <span style={{ color: "gray" }}> Name: </span> {dat["President"]} <br />
                  <span style={{ color: "gray" }}> Year: </span> {dat["Birthday"]} <br />
                  <span style={{ color: "gray" }}> Death day: </span> {dat["Death day"]} <br />
                  <span style={{ color: "gray" }}> Death place: </span> {dat["Death place"]} <br />
                </li>
              ))}
        </ul>
        </div>
    );
  }
}

export default App;