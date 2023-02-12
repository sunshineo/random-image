import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const b64toBlob = (b64Data: any, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function App() {
  const [images, setImages] = useState([])

  const fetchImages = async () => {
    const response = await fetch('http://localhost:3000/')
    setImages(await response.json())
  }
  useEffect(() => {
    fetchImages()
  }, [])
  const copy = (index: number) => {
    navigator.clipboard.write([
      new ClipboardItem({ 'image/png': b64toBlob(images[index], 'image/png')})
    ])
  }

  return (
    <div className="App">
      {images.map((image, index) => 
        <div style={{margin: 20}}>
          <img src ={`data:image/png;base64,${image}`} alt='number'/>
          <button style={{marginLeft: 20}} onClick={() => copy(index)}>Copy to clipboard</button>
        </div>
      )}
      <button onClick={fetchImages}>Refresh</button>
    </div>
  );
}

export default App;
