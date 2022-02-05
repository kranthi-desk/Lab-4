import React from "react";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import MatchDetails from "./MatchDetails";
import Match from "./matches";
import PlayerDetails from "./Player_info";
import Pointstable from "./points_table";
import VenueDetails from "./VenueDetails";
import Venues from "./venues";
export default function App() {
  return (
    <BrowserRouter>
		<div>
		  <Routes>
			  <Route path = "/matches/" element = {<Match/>}/>
			  <Route path = "/matches/:match_id" element = {<MatchDetails/>}/>
			  <Route path = "/players/:player_id" element = {<PlayerDetails/>}/>
			  <Route path = "/pointstable/:season_year" element = {<Pointstable/>}/>
			  <Route path = "/venues/" element = {<Venues/>}/>
			  <Route path = "/venues/:venue_id" element = {<VenueDetails/>}/>


		  </Routes>
		</div>
    </BrowserRouter>
  );
}

