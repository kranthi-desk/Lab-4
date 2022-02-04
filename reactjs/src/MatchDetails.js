import React, { useState, useEffect } from 'react';  
import { Button} from 'reactstrap';
import LineChart from './lineChart'; 
import Summary from './summary';
import {
  BrowserRouter,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

function MatchDetails(){
    let {match_id} = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [info, setInfo] = useState([]);
    const [umpires, setUmpires] = useState([]);
    const [venue, setVenue] = useState([]);
    const [team1xi, setTeam1xi] = useState([]);
    const [team2xi, setTeam2xi] = useState([]);



    const [batting1, setBatting1] = useState([]);
    const [bowling1, setBowling1] = useState([]);
    const [batting2, setBatting2] = useState([]);
    const [bowling2, setBowling2] = useState([]);

    const [state, setState] = useState({showChart: 0});
    const [summarystate, setSummarystate] = useState({showChart: 0});



    const getChart = (value) => {
        setState({ showChart: value });
    }

    const hideChart = (value) => {
        setState({ showChart: 0 });
    }


    

    useEffect(() => {
        const api1 = `http://localhost:5000/match/${match_id}/team/1`;
        fetchdata(api1).then(data => {
            setTeam1(data)
        })
        const api2 = `http://localhost:5000/match/${match_id}/batting/1`;
        fetchdata(api2).then(data => {
            setBatting1(data)
        })
        const api3 = `http://localhost:5000/match/${match_id}/team/2`;
        fetchdata(api3).then(data => {
            setTeam2(data)
        })
        const api4 = `http://localhost:5000/match/${match_id}/bowling/1`;
        fetchdata(api4).then(data => {
            setBowling1(data)
        })
        const api5 = `http://localhost:5000/match/${match_id}/batting/2`;
        fetchdata(api5).then(data => {
            setBatting2(data)
        })
        const api6 = `http://localhost:5000/match/${match_id}/bowling/2`;
        fetchdata(api6).then(data => {
            setBowling2(data)
        })
        const api7 = `http://localhost:5000/match/${match_id}/details`;
        fetchdata(api7).then(data => {
            setInfo(data)
        })
        const api8 = `http://localhost:5000/match/${match_id}/umpires`;
        fetchdata(api8).then(data => {
            setUmpires(data)
        })
        const api9 = `http://localhost:5000/match/${match_id}/team1`;
        fetchdata(api9).then(data => {
            setTeam1xi(data)
        })
        const api10 = `http://localhost:5000/match/${match_id}/team2`;
        fetchdata(api10).then(data => {
            setTeam2xi(data)
        })
        const api11 = `http://localhost:5000/match/${match_id}/venue`;
        fetchdata(api11).then(data => {
            setVenue(data)
        })
    }, [])

    


    return(
        <div>
            

            <div>
                <h1> Scorecard </h1>
                <right>
                    <Button onClick={() => getChart("d")}>
                    Score Comparison
                    </Button>
                    &nbsp;&nbsp;
                    <Button onClick={() => getChart("s")}>
                    Match Summary
                    </Button>
                </right>
                <LineChart
                    show = {state.showChart === "d"}
                    onHide={() => hideChart("d")}
                />
                <Summary
                    show = {state.showChart === "s"}
                    onHide={() => hideChart("s")}
                />

                <main>
                    <main>
                        <h2>First Innings</h2>
                    </main>
                    {
                        team1.map((item) => (
                            <h4>
                                Batting({item.team_name})
                            </h4>
                        ))
                    }   
                    
                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Batter</th>
                            <th>Runs</th>
                            <th>Fours</th>
                            <th>Sixes</th>
                            <th>Balls faced</th>
                        </tr>

                        <tbody id="myTable">
                            {   
                                batting1.map((item) => (
                                    <tr>
                                    <td>{item.batter}</td>
                                    <td>{item.runs}</td> 
                                    <td>{item.fours}</td> 
                                    <td>{item.sixes} </td> 
                                    <td>{item.balls_faced}</td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        team2.map((item) => (
                            <h4>
                                Bowling({item.team_name})
                            </h4>
                        ))
                    }
                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Bowler</th>
                            <th>Balls Bowled</th>
                            <th>Runs given</th>
                            <th>Wickets</th>
                        </tr>

                        <tbody id="myTable">
                            {   
                                bowling1.map((item) => (
                                    <tr>
                                    <td>{item.bowler}</td>
                                    <td>{item.balls_bowled}</td> 
                                    <td>{item.runs_given}</td> 
                                    <td>{item.wickets} </td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <main>
                        <h2>Second Innings</h2>
                    </main>
                    {
                        team2.map((item) => (
                            <h4>
                                Batting({item.team_name})
                            </h4>
                        ))
                    }   
                    
                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Batter</th>
                            <th>Runs</th>
                            <th>Fours</th>
                            <th>Sixes</th>
                            <th>Balls faced</th>
                        </tr>

                        <tbody id="myTable">
                            {   
                                batting2.map((item) => (
                                    <tr>
                                    <td>{item.batter}</td>
                                    <td>{item.runs}</td> 
                                    <td>{item.fours}</td> 
                                    <td>{item.sixes} </td> 
                                    <td>{item.balls_faced}</td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        team1.map((item) => (
                            <h4>
                                Bowling({item.team_name})
                            </h4>
                        ))
                    }
                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Bowler</th>
                            <th>Balls Bowled</th>
                            <th>Runs given</th>
                            <th>Wickets</th>
                        </tr>

                        <tbody id="myTable">
                            {   
                                bowling2.map((item) => (
                                    <tr>
                                    <td>{item.bowler}</td>
                                    <td>{item.balls_bowled}</td> 
                                    <td>{item.runs_given}</td> 
                                    <td>{item.wickets} </td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <h1> Match-Info </h1>
                    {
                        info.map((item) => (
                            <h4>
                                <b>Match:</b>
                                <br></br>
                                {item.match_id}, {item.team1} vs {item.team2}, {item.season_year}
                                <br></br>
                                <b>Toss: </b>
                                <br></br>
                                {item.toss_winner}
                                <br></br>
                                <b>Venue:</b> 
                                {
                                    venue.map((item) => (
                                        <h5>
                                            {item.venue_name}, {item.city_name}
                                        </h5>
                                    ))
                                }
                                <b>Umpires:</b>
                                {
                                    umpires.map((item) => (
                                        <h5>
                                            {item.umpire_name}
                                        </h5>
                                    ))
                                }
                                <b>Playing XI of {item.team1}</b>
                                {
                                    team1xi.map((item) => (
                                        <h5>
                                            {item.player_name}
                                        </h5>
                                    ))
                                }
                                <b>Playing XI of {item.team2}</b>
                                {
                                    team2xi.map((item) => (
                                        <h5>
                                            {item.player_name}
                                        </h5>
                                    ))
                                }
                                <br></br>

                            </h4>
                        ))
                    } 
                </main>
                
            </div>
            <style jsx>{`
                h1{
                    text-align: center;
                }
                h2{
                    text-align: center;
                }
                main{
					margin: 0 auto;
                    width: 70%;
					text-align: center;
					z-index: 1;
				}
                right {
					color: rgb(256,0,0);
                    position: absolute;
					right: 100px;
					top: 9px;
				}
            `}</style>
            
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        </div>
            
    )
} 


export default MatchDetails;
