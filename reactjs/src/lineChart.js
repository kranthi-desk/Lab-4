import React, { Component } from "react";
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
    elements: {
        point:{
            radius: 0
        }
    },
    yAxes: [{
        scaleLabel: {
            display: true,
            labelString: 'RUNS'
        }
    }],
    xAxes: [{
        scaleLabel: {
            display: true,
            labelString: 'OVERS'
        }
    }]
};



class LineChart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            line1: [],
            line2: []
        };
        // this.match_id = props.match.params.match_id;
        // console.log(this.match_id);
    }
    componentDidMount() {
        // const { id } = this.props.match.params;
        fetch(`http://localhost:5000/match/501203/scorecomparison/team1`)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
                  line1: json
              });
            })
        fetch(`http://localhost:5000/match/501203/scorecomparison/team2`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    line2: json
                });
            })
	  }
    
  render() {
    // console.log(this.props.show);
    const { line1, line2 } = this.state;
    const values1 =  [];
    const values2 =  [];
    var cum1 = 0;
    var cum2 = 0;


    for (var i=0; i < line1.length; i++) {
        cum1 = parseInt(cum1) + parseInt(line1[i].runs);
        values1.push(cum1)
    }
    for (var i=0; i < line2.length; i++) {
        cum2 = parseInt(cum2) + parseInt(line2[i].runs);
        values2.push(cum2)
    }
   console.log(values1);
   console.log(values2);

   
    const labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: values1,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: values2,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
    return (
      <React.Fragment>
        {this.props.show && (
          <div className="chart">
            <button onClick={this.props.onHide}>Close</button>
            <Line options={options} data={data} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default LineChart;
