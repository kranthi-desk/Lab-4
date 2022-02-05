import React, { useState, useEffect } from 'react';  
import { Bar } from 'react-chartjs-2';
import "./lineChart.css";
import {
    BrowserRouter,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";

export const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart'
      }
    }
  };

function Pointstable(){
    let {season_year} = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }
    const [table, setTable] = useState([]);
    
    useEffect(() => {
        const api1 = `http://localhost:5000/pointstable/${season_year}`;
        fetchdata(api1).then(data => {
            setTable(data)
        })
    }, [])

    return(

        <div>
            <div>
            <h1>POINTS TABLE</h1>

                {
                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Team name</th>
                            <th>Matches</th>
                            <th>Won</th>
                            <th>Lost</th>
                            <th>Tied</th>
                            <th>NR</th>
                            <th>Points</th>

                        </tr>

                        <tbody id="myTable">
                            {   
                                table.map((item) => (
                                    <tr>
                                    <td>{item.team_name}</td>
                                    <td>{item.matches}</td> 
                                    <td>{item.win}</td> 
                                    <td>{item.lost} </td> 
                                    <td>{item.nrr} </td> 
                                    <td>{item.points} </td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default Pointstable;