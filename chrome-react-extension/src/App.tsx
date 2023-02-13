import React, { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
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

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function App() {
  const [images, setImages] = useState([])

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:3000', {
    onOpen: async () => {
      while (true) {
        if (readyState !== ReadyState.CONNECTING && readyState !== ReadyState.OPEN) {
          break;
        }
        sendMessage('');
        await sleep(10000);
      }
    },
    onMessage: event => {
      setImages(JSON.parse(event.data));
    },
    retryOnError: true,
  });

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
    </div>
  );
}

export default App;
