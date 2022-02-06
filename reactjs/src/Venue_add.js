import React from "react";
import { Button} from 'reactstrap';

class Venue_add extends React.Component {
    constructor(props) {
      super(props);
      this.state = {venue_name: '',country_name: '',city_name: '',capacity: 0};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {    this.setState({value: event.target.value});  }
    handleSubmit(event) {
    //   alert('Submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>        
            <label>
                Venue name: <input type="text" value={this.state.value} onChange={this.handleChange} /> 
            </label>
            <label>
                Country Name: <input type="text" value={this.state.value} onChange={this.handleChange} /> 
            </label>
            <label>
                City Name: <input type="text" value={this.state.value} onChange={this.handleChange} /> 
            </label>
            <label>
                Capacity: <input type="int" value={this.state.value} onChange={this.handleChange} /> 
            </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default Venue_add;