import React, { useState, useEffect } from 'react';  
import { Button} from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';

  import {
    BrowserRouter,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";


ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
ArcElement,
Title,
Tooltip,
Legend
);



function VenueDetails(){
    let {venue_id} = useParams();
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }
    const [info, setInfo] = useState([]);
    const [maxmin, setMaxmin] = useState([]);
    const [maxchased, setMaxchased] = useState([]);
    const [doughnutdata, setDoughnutdata] = useState([]);
    const [firstinavg, setFirstinavg] = useState([]);





    useEffect(() => {
        const api1 = `http://localhost:5000/venue/${venue_id}/info`;
        fetchdata(api1).then(data => {
            setInfo(data)
        })
        const api2 = `http://localhost:5000/venue/${venue_id}/maxmin`;
        fetchdata(api2).then(data => {
            setMaxmin(data)
        })
        const api3 = `http://localhost:5000/venue/${venue_id}/maxchased`;
        fetchdata(api3).then(data => {
            setMaxchased(data)
        })
        const api4 = `http://localhost:5000/venue/${venue_id}/wins`;
        fetchdata(api4).then(data => {
            setDoughnutdata(data)
        })
        const api5 = `http://localhost:5000/venue/${venue_id}/firstinavg`;
        fetchdata(api5).then(data => {
            setFirstinavg(data)
        })
    }, [])




    const options = {
        maintainAspectRatio: true,
        elements: {
            height: '100px',
        },
        
        legend:{
            display: false,
        }
        
    };
    

    const entries = [];
    for (var i=0; i < doughnutdata.length; i++) {
        entries.push(doughnutdata[i].bat_first);
        entries.push(doughnutdata[i].bat_second);
        entries.push(0);
    }

    const data = {
        // Name of the variables on x-axies for each bar
        labels: ["Matches won by team batting first","Matches won by team batting second","Matches Drawn"],
        datasets: [
        {
            // Label for bars
            // label: "Runs",
            // Data or value of your each variable
            data: entries,
            // Color of each bar
            backgroundColor: ['red','green','aqua'],
            borderWidth: 0.5,
        },
        ],
    };


    const options1 = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    fontSize: 6,
                    // usePointStyle:true,
              }
            },
            title: {
                display: true,
            },
        },
        elements: {
            point:{
                radius: 5,
                display: true,
                pointBackgroundColor: 'rgb(255, 255, 255)'
            },
                
        },
        scales:{
            y:{
                title: {
                    display: true,
                    text: 'AVG SCORE'
                  }
            },
            x:{
                title: {
                    display: true,
                    text: 'SEASON YEAR'
                  }
            }
        }
    };

    const labels1 = [];
    const entries1 = [];
    for (var i=0; i < firstinavg.length; i++) {
        entries1.push(firstinavg[i].avgs);
        labels1.push(firstinavg[i].season_year);
    }
    // console.log(labels1);

    const data1 = {
        labels : labels1,
        datasets: [
          {
              type: 'line',
              label: "Average First Innings Score ",
              data: entries1,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
  
        ],
      };





    const details = [];
    for (var i=0; i < maxmin.length; i++) {
        details.push(maxmin[i].matches);
        details.push(maxmin[i].max);
        details.push(maxmin[i].min);
        details.push(maxchased[i].max);
    }
    return(
        <div>          
            <div>
                <h1>Venue statistics</h1>
                <h2>Basic Information</h2>
                {
                    <table class="table table-striped">
                        <tr  class="bg-info">
                            <th>Venue name </th>
                            <th>Address</th>
                            <th>Capacity</th>
                            <th>Total matches played</th>
                            <th>Highest total recorded</th>
                            <th>Lowest total recorded</th>
                            <th>Highest score chased</th>
                            
                        </tr>

                        <tbody id="myTable">
                            {   
                                info.map((item) => (
                                    <tr>
                                    <td>{item.venue_name}</td>
                                    <td>{item.city_name},{item.country_name}</td> 
                                    <td>{item.capacity}</td> 
                                    <td>{details[0]}</td> 
                                    <td>{details[1]}</td> 
                                    <td>{details[2]}</td> 
                                    <td>{details[3]}</td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
                <h2>Outlines of matches held at this venue</h2>
                <div style={{width: '30%'}}>
                    <Doughnut options = {options} data = {data}/>
                </div>

                <h2>Average First Innings Score</h2>

                <div style={{width: '40%'}}>
                    <Line options = {options1} data = {data1}/>
                </div>


            </div>
        </div>
    )
}

export default VenueDetails;