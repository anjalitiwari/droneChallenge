import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import socketIOClient from "socket.io-client";
import { addDrone } from './utilities/addDrone';
import { deleteDrone } from './utilities/deleteDrone';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeDrones: [],
      endpoint: "http://127.0.0.1:4001",
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit("quadrantBoundary", { "width": window.innerWidth, "height": window.innerHeight })
    socket.on("activeDrones", data => { this.setState({ activeDrones: data }) });
    socket.on("mychannel", data => { this.setState({ activeDrones: data }) });
  }

  deleteDrone(id) {
    deleteDrone(id, function (err, success) {
      if (success)
        alert("Drone deleted successfully")
    });
  }

  callForEach(activeDrones) {
    let drones = []
    activeDrones.forEach((drone) => {
      if (drone.x > window.innerWidth || drone.y > window.innerHeight) {
        alert("Drone with id " + drone.id + " is out of the quadrant")
      } else {
        drones.push(<div id={drone.id} className="droneBox" style={{ marginLeft: drone.x + "px", marginTop: drone.y + "px" }} onClick={this.deleteDrone.bind(null, drone.id)}>{drone.id}<div key={drone.id} className="drone-1"><FontAwesomeIcon icon={faTimes} style={{ alignItems: "center", padding: "10px" }} /></div></div>)
      }
    });
    return drones
  }

  addDrone() {
    addDrone(function (err, success) {
      if (success)
        alert("Drone added successfully")
    });
  }

  render() {
    let { activeDrones } = this.state;
    return (
      <div>
        <div onClick={this.addDrone.bind(null)} className="button"><button>Add Drone</button></div>
        <div>
          {activeDrones
            ? this.callForEach(activeDrones)
            : <p>Loading...</p>}
        </div>
      </div>
    );
  }
}

export default App;
