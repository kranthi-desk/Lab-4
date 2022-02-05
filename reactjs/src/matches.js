import React, {createRef} from "react";
import { Button} from 'reactstrap';

class Match extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			DataisLoaded: false,
			page:1
		};
	}
	async componentDidMount() {
		fetch(`http://localhost:5000/matches/${parseInt((this.state.page-1)*10)}/10`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					DataisLoaded: true,
					items: json
				});
			})
	}
	Incrementpage = async() => {
		if(this.state.page < 10){
			await this.setState({ page: this.state.page + 1 });
			this.componentDidMount()
		}
	}
	Decreasepage = async() => {
		if(this.state.page > 1){
			await this.setState({ page: this.state.page - 1 });
			this.componentDidMount()
		}
	}

	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Loading.... </h1> </div> ;

		return (
			<div>
				<div >
					<main>
					<h1> Matches </h1> 
					<h1> Page {this.state.page} of 10 </h1>
					{
						items.map((item) => (
						<Button color="primary" className="px-4"  >
						<a className="boxhead" href = {`matches/${item.match_id}`}>
						<div className="boxed" >
							<h2> {item.team1} vs { item.team2 }</h2>
							<h3> { item.venue_name }, {item.city_name}</h3>
							{ item.team1 } won by { item.win_margin } { item.win_type}
						</div>
						</a>
						</Button>
						))
					}
					</main>

					<left>
						<Button onClick={this.Decreasepage} >
							Previous Page
						</Button>
					</left>
					<right>
						<Button onClick={this.Incrementpage}>
							Next Page
						</Button>
					</right>
					
				</div>

				<style jsx>{`

				h1{
					text-align: center;
				}

				main{
					text-align: center;
					z-index: 1;
				}
				.boxed {
					z-index: 1;
					width: 800px;
					padding: 40px;
					text-align: center;
				} 
				.boxhead {
					text-decoration: none;
				}
				left {
					z-index: 2;
					background-color: rgb(179, 179, 179);
					position:fixed;
					left: 10px;
					bottom: 20px;
				}
				right {
					z-index: 2;
					background-color: rgb(179, 179, 179);
					position:fixed;
					right: 10px;
					bottom: 20px;
				}
		
				.btn:hover {
					color: white;
					background-color: grey;
				}
				`}</style>

				</div>
		);
	}
}

export default Match;