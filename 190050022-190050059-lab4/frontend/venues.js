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
            <div id = 'container'>
            {/* <div id = 'space' ></div> */}
                <h1> Venues </h1> 
                <div id = 'right'>
                    <a className="boxhead" href = {`/venues/add`}>

                    <button style={{height: '70px'}}>

                    <div className="addvenue" >
                        <h2> Add venue</h2>
                    </div>
                    
                    
                    </button>
                    </a>
                </div>
            </div>

            <div id = 'space' ></div>
            

            <main>
                {
                    venues.map((item) => (
                    <Button color="primary" className="px-4" style={{margin: '10px', padding: '10px'}} >
                        <a className="boxhead" href = {`/venues/${item.venue_id}`}>
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
                #right {
                    position: absolute;
                    right: 100px;
                    top: 10px;
                    // right: 100px;
                }

                #space{
                    height:20px;
                }

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
                .addvenue {
					width: 200px;
					text-align: center;
				} 
				.boxhead {
					text-decoration: none;
				}
                .btn{
                    padding: 10px;
                    border: 1px solid #d8d8d8;
                    background-color: #f9f9f9;
                    border-radius: 3px;
                }
                .info {
                    border-color: #2196F3;
                    color: dodgerblue
                }
				.btn:hover {
					color: black;
				}
				`}</style>
        </div>
    )
}

export default Venues;
