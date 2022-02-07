import React from 'react'
import App from './App'
import ReactDOM from 'react-dom';


export default function Home() {
  return (
    <div >
      <h1>HI</h1>
    </div>
        
  )
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);