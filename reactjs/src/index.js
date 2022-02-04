import React from 'react'
import App from './App'
import ReactDOM from 'react-dom';

// export default function Home() {
//   return (
//     <div className="container">
//       <App/>
//       <Head>
//         <title>IPL CRICINFO</title>
//       </Head>

//       <main>
//         <h1 className="title">
//           Welcome to IPL CRICINFO!
//         </h1>
//       </main>
//     </div>
        
//   )
// }
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);