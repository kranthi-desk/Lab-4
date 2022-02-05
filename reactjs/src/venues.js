import React, { useState, useEffect } from 'react';  
import { Button} from 'reactstrap';



function Venues(){
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }
    const [venues, setVenues] = useState([]);
    
    useEffect(() => {
        const api1 = `http://localhost:5000/venues`;
        fetchdata(api1).then(data => {
            setVenues(data)
        })
    }, [])

    return(

        <div>
            <div>
            <h1> Venues </h1> 
            <main>

                {
                    venues.map((item) => (
                    <Button color="primary" className="px-4"  >
                        <a className="boxhead" href = {`venues/${item.venue_id}`}>
                        <div className="boxed" >
                            <h2> {item.venue_name}</h2>
                        </div>
                        </a>
                    </Button>
                    ))
                }
            </main>

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
		
				.btn:hover {
					color: white;
					background-color: grey;
				}
				`}</style>
        </div>
    )
}

export default Venues;