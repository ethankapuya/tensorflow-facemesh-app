// Install dependencies DONE
// Import dependencies DONE
// Setup webcam and canvas //DONE
// Define references to those // DONE
// Load facemesh // DONE
// Detect function
// Drawing utilities
// Load triangulation
// Setup triangle path
// Setup point drawing
// Add drawMesh to detect function
import React, {useRef} from 'react';
// import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import {drawMesh} from "./utilities";

function App() {
  // Setup references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load facemesh
  const runFacemesh = async () => {
    const net = await facemesh.load({
      inputResolution: {width: 640, height: 480}, scale:0.8
    });
    setInterval(() => {
      detect(net);
    }, 100)
  }

  // Detect function
  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas dimensions
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const face = await net.estimateFaces(video);
      console.log(face);

      // Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  }

  runFacemesh();

  return (
    <div>
      <header className="App-header">
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
        <h1 style={{
          position: 'absolute',
          top: 10,
          left: 20,
          maxWidth: 350,
          fontSize: '1rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textAlign: 'left',
          textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #38bdf8, #a855f7, #f472b6)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 4px 20px rgba(168, 85, 247, 0.35)',
          paddingBottom: '0.5rem',
        }}>
          <span>Facemesh by Ethan Kapuya.</span>
          <span>This is a simple implementation of TFJS's face landmark detection tool.</span>
        </h1>
      </header>
    </div>
  );
}

export default App;
