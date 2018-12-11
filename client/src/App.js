import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  /* State object will just contain data of the US presidents */
  state = {
    data: []
  };

  /* Initially, web app will display data of president in no particular order */
  componentDidMount() {
    this.getDataFromServer()
    .then(res => this.setState({data: res}))
    .catch(err => console.log(err));
  };

  /* Fetches presidents' data from server endpoint using fetch API */
  getDataFromServer = async () => {
    const response = await fetch("/api/getData");
    const body = await response.json();

    if(response.status !== 200) throw Error(body.message);

    return body;
  };

  
  /* POST request using axios
   * Sends president data from State object to back-end 
   * Backend sorts by ascending and returns the sorted obj 
   * Set state object for president to new sorted president obj 
   */
  getAscending = async () => {
    const {
      data
    } = this.state;

    axios.post("/api/getAscending", {
      data 
    }).then(response => {
      console.log(response["data"]);
      this.setState({data:response["data"]});
    }).catch(error => {
      console.log(error);
    });
  };

  /* Backend sorts by descending and returns the sorted obj 
   * Set state object for president to new sorted president obj 
   */
  getDescending = async () => {
    const {
      data
    } = this.state;

    axios.post("/api/getDescending", {
      data 
    }).then(response => {
      console.log(response["data"]);
      this.setState({data:response["data"]});
    }).catch(error => {
      console.log(error);
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <button onClick={() => this.getAscending()}>
            Get Ascending
        </button>
        <button onClick={() => this.getDescending()}>
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