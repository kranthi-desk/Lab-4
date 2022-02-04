import React from "react";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import MatchDetails from "./MatchDetails";
import Match from "./matches";

export default function App() {
  return (
    <BrowserRouter>
		<div>
		  <Routes>
			  <Route path = "/matches/" element = {<Match/>}/>
			  <Route path = "/matches/:match_id" element = {<MatchDetails/>}/>

		  </Routes>
		</div>
    </BrowserRouter>
  );
}

