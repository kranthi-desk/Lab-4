import React, {createRef} from "react";
import { Button} from 'reactstrap';


class Match extends React.Component {
	

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			DataisLoaded: false
		};
		this.page = 0;
		// this.prev = this.prev.bind(this);
		// this.next = this.next.bind(this);
	}
	componentDidMount() {
		fetch(`http://localhost:5000/matches/0/10`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					DataisLoaded: true,
					items: json
				});
			})
	}
	kk(){
		// this.page = this.page + 10;
		// window.location.reload(true);
		console.log("hello");
	}
	// prev(){
	// 	// this.page = this.page + 10;
	// 	// window.location.reload(false);
	// }
	

	render() {
		const { DataisLoaded, items } = this.state;
		const page = this.page;
		if (!DataisLoaded) return <div>
			<h1> Loading.... </h1> </div> ;

		return (
			<div>
				<div >
					<main>
					<h1> Matches </h1> 
					<h1> {page} </h1>
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
						<Button onclick={() => this.kk()} >
							previous page
						</Button>
					</left>
					<right>
						<Button onclick={this.next}>
							next page
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
				<script>{

				// function prev(){
				// 	if(this.page != 0) page = this.page - 10
				// 	window.location.reload(false)
				// }
				// function next(){
				// 	this.page = this.page + 10
				// 	window.location.reload(false)
				// }
					
				}</script>

				</div>
		);
	}
}

export default Match;
