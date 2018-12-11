// /client/App.js
import React, { Component } from "react";

class App extends Component {
  // initialize our state 
  state = {
    data: []
  };

  // fetch data from DB
  componentDidMount() {
    this.getDataFromDb()
    .then(res => this.setState({data: res}))
    .catch(err => console.log(err));
}

  // kill process once app terminates
  componentWillUnmount() {

  }


  getDataFromDb = async () => {
    const response = await fetch("/api/getData");
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={data.name}>
                  <span style={{ color: "gray" }}> Name: </span> {dat.name} <br />
                  <span style={{ color: "gray" }}> Year: </span> {dat.year} <br />
                  <span style={{ color: "gray" }}> Number: </span> {dat.number} <br />
                </li>
              ))}
        </ul>
        </div>
    );
  }
}

export default App;