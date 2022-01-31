import React from "react";
// import './App.css';

class match extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false
		};
	}

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		fetch(
"http://localhost:8033/matches")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					DataisLoaded: true,
					items: json.data
				});
			})
	}
	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Loading.... </h1> </div> ;

		return (
		<div >
			<h1> Matches </h1> {
				items.map((item) => (
				<ol key = { item.id } >
					team1: { item.team1 },
					team2: { item.team2 },
					win_type: { item.win_type }
					</ol>
				))
			}
		</div>
	);
}
}

export default match;
