// src/App.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CanvasEditor from './components/CanvasEditor';
import './App.css';
import { RouterProvider } from "react-router-dom";
import router from './Routing.jsx/Routering';

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (images) => {
    setImages(images);
  };

  const selectImageForCanvas = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <RouterProvider router={router} />
  );
}

export default App;
