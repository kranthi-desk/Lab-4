import React, { useState, useEffect } from 'react';  

import {
    BrowserRouter,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";


function Board(){
    let {match_id} = useParams();
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [season_year, setSeason_year] = useState([]);
    const [batters1, setBatters1] = useState([]);
    const [batters2, setBatters2] = useState([]);
    const [bowlers1, setBowlers1] = useState([]);
    const [bowlers2, setBowlers2] = useState([]);
    const [runs1, setRuns1] = useState([]);
    const [runs2, setRuns2] = useState([]);
    const [wickets1, setWickets1] = useState([]);
    const [wickets2, setWickets2] = useState([]);



    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }


    useEffect(() => {
        const api1 = `http://localhost:5000/match/${match_id}/team/1`;
        fetchdata(api1).then(data => {
            setTeam1(data)
        })
        const api2 = `http://localhost:5000/match/${match_id}/team/2`;
        fetchdata(api2).then(data => {
            setTeam2(data)
        })
        const api3 = `http://localhost:5000/match/${match_id}/seasonyear`;
        fetchdata(api3).then(data => {
            setSeason_year(data)
        })
        const api4 = `http://localhost:5000/match/${match_id}/bat/1`;
        fetchdata(api4).then(data => {
            setBatters1(data)
        })
        const api5 = `http://localhost:5000/match/${match_id}/bat/2`;
        fetchdata(api5).then(data => {
            setBatters2(data)
        })
        const api6 = `http://localhost:5000/match/${match_id}/bowl/1`;
        fetchdata(api6).then(data => {
            setBowlers1(data)
        })
        const api7 = `http://localhost:5000/match/${match_id}/bowl/2`;
        fetchdata(api7).then(data => {
            setBowlers2(data)
        })
        const api8 = `http://localhost:5000/match/${match_id}/runs/1`;
        fetchdata(api8).then(data => {
            setRuns1(data)
        })
        const api9 = `http://localhost:5000/match/${match_id}/wickets/1`;
        fetchdata(api9).then(data => {
            setWickets1(data)
        })
        const api10 = `http://localhost:5000/match/${match_id}/runs/2`;
        fetchdata(api10).then(data => {
            setRuns2(data)
        })
        const api11 = `http://localhost:5000/match/${match_id}/wickets/2`;
        fetchdata(api11).then(data => {
            setWickets2(data)
        })
    }, [])
    // const info = [team1,team2,season_year,batters1,batters2,bowlers1,bowlers2];
    // console.log(season_year);

    return (
        <div>

            <table class="table table-striped">
                <tr class="bg-info">
                    <th><h5><b>MATCH SUMMARY</b></h5></th>
                </tr>
                <tr class="bg-info">
                    <th>{match_id}, IPL {season_year[0].season_year}</th>
                </tr>
                <tr class="bg-info">
                    <th>{team1[0].team_name} <r> {runs1[0].sum}-{wickets1[0].sum} </r></th>
                </tr>
                <tr>
                    
                </tr>
                {/* <tbody id="myTable">
                    {   
                        <tr>
                        <td>{batters1[0].player_name}<span style="display:inline-block; width: 10px;"></span> <b>{batters1[0].runs}</b> {batters1[0].balls}</td>
                        </tr>
                    }
                </tbody> */}
            </table>

            <style jsx>{`
                
                r {
                    float: right;
                    margin-right: 50px;
				}
                .space{
                    width: 10%;
                }
            `}</style>
        </div>
    )
}

export default Board;