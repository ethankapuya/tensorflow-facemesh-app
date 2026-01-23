// Install dependencies DONE
// Import dependencies DONE
// Setup webcam and canvas
// Define references to those
// Load facemesh
// Detect function
// Drawing utilities
// Load triangulation
// Setup triangle path
// Setup point drawing
// Add drawMesh to detect function
import React, {useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <div className="App">
      <Webcam ref={webcamRef} style = {
        {
          position: 'absolute',
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480
        }
      } />
      <canvas ref={canvasRef} style = {
        {
          position: 'absolute',
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480
        }
      } />
    </div>
  );
}

export default App;
