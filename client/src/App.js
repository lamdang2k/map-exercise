import axios from 'axios';
import React,{Component} from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import './App.css';
import {Icon} from "leaflet";


class App extends Component {
 

  state = {

  // Initially, no file is selected
  selectedFile: null
  };
  
  // On file select (from the pop up)
  onFileChange = event => {
  
  // Update the state
  this.setState({ selectedFile: event.target.files[0] });
  
  };
  
  // On file upload (click the upload button)
  onFileUpload = () => {
  
  // Create an object of formData
  const formData = new FormData();
  
  // Update the formData object
  formData.append(
    "myFile",
    this.state.selectedFile,
    this.state.selectedFile.name
  );
  
  // Details of the uploaded file
  
  // Request made to the backend api
  // Send formData object
  axios.post("http://localhost:3000/upload", formData,{
    // receive two parameter endpoint url ,form data
  })
  .then (res =>{//then print response status
      console.log(res.statusText)
        })
  };
  
  // File content to be displayed after
  // file upload is complete
  fileData = () => {
  
  if (this.state.selectedFile) {
    return (

    
    <div>
      <br />
      <MapContainer center={[45.4, 5.4502821]} zoom={13}scrollWheelZoom={false}>
          <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
         
        </MapContainer>
      <h2>File Details:</h2>
      
      <p>File Name: {this.state.selectedFile.name}</p>

            
      <p>File Type: {this.state.selectedFile.type}</p>

    </div>
    );
  } else {
    return (
    <div>
      <br />
      <h4>Choose before Pressing the Upload button</h4>
    </div>
    );
  }
  };
  
  render() {
  
  return (
 

    <div>
      <h1>
      Choose a geojson file to visualize it on the map
      </h1>
      
  );
      <h3>
      Please choose a json file to load!
      </h3>
      <div>
        <input type="file" onChange={this.onFileChange} />
        <button onClick={this.onFileUpload}>
        Upload!
        </button>

      </div>
    {this.fileData()}

    </div>

   

   
  );
  }
}

export default App;
