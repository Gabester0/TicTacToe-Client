import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

if("serviceWorker" in navigator){
  window.addEventListener("load", ()=>{
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res=> console.log("Service Worker registered"))
      .catch(err=> console.log("Service worker not registered: ", err))
  })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
