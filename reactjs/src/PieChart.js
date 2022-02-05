import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import "./lineChart.css";

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


class PieChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            dist1: [],
            dist2: [],
        }
        this.match_id = this.props.m_id;
        // console.log(this.match_id);
    }
    componentDidMount() {
        fetch(`http://localhost:5000/match/${this.match_id}/distribution/1`)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
                dist1: json[0]
              });
            })
        fetch(`http://localhost:5000/match/${this.match_id}/distribution/2`)
            .then((res) => res.json())
            .then((json) => {
            this.setState({
                dist2: json[0]
                });
            })
    }
    
    render(){
        const { dist1, dist2 } = this.state;
        const chartdata1 = {
            labels: ["Extras", "Ones", "Twos", "Threes", "Fours", "Sixes"],
            datasets: [
              {
                backgroundColor: [
                  "#83ce83",
                  "#959595",
                  "#f96a5d",
                  "#83ce83",
                  "#959595",
                  "#f96a5d",
                ],
                data: [dist1.extras, dist1.ones, dist1.twos, dist1.threes, dist1.fours, dist1.sixes],
              },
            ],
          };
          const chartdata2 = {
            labels: ["Extras", "Ones", "Twos", "Threes", "Fours", "Sixes"],
            datasets: [
              {
                backgroundColor: [
                  "#83ce83",
                  "#959595",
                  "#f96a5d",
                  "#83ce83",
                  "#959595",
                  "#f96a5d",
                ],
                data: [dist2.extras, dist2.ones, dist2.twos, dist2.threes, dist2.fours, dist2.sixes],
              },
            ],
          };

        return (
            <div>

            <React.Fragment>
              {this.props.show && (
                <div className="chart">
                  <div style= {{display: 'flex', justifyContent: 'right'}}>
                    <button onClick={this.props.onHide}>Close</button>
                  </div>
                    <div className='container'>
                        <div className='left' style={{width: '40%'}}>
                            <Pie data={chartdata1} options={options}/>
                        </div>
                        <div className='right' style={{width: '40%'}}>
                            <Pie data={chartdata2} options={options}/>
                        </div>
                    </div>
                </div>
              )}
            </React.Fragment>

            <style jsx>{`
                #container{width:100%;}
                #left{float:left;}
                #right{float:right;}
            `}</style>

            </div>

        );
    }
}

export default PieChart;
