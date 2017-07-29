import React from "react";
import {connect} from 'react-redux';
import AddToCart from './AddToCart';
import setCurrentBeer from '../reducers/cart';


const SingleBeer = (props) => {

    const beerList = props.beers
    const selectedBeerId = props.match.params.beerId

    const selectedBeer = beerList.find(beer => { return beer.id == selectedBeerId })

        if (!selectedBeer) return <p> loading... </p>

        return (
            <div className='col-lg-12'>
                <div className="row">

                    <div className='col-lg-12'>
                        <h1 className='title'>{selectedBeer.name}</h1>
                    </div>

                    <div className='col-lg-6'>
                        <img width='100%'
                            className="beer-img"
                            src={selectedBeer.imageURL}
                            alt={selectedBeer.name}
                        />
                    </div>

                    <div className="col-lg-6">
                        <ul className="list-group">
                            <li className="list-group-item">
                                Type: {selectedBeer.beerSubType}
                            </li>
                            <li className="list-group-item">
                                Price: ${selectedBeer.price}
                            </li>
                            <li className="list-group-item">
                                ABV: {selectedBeer.abv}%
                            </li>
                            <li className="list-group-item">
                                IBU: {selectedBeer.ibu}
                            </li>
                            <li className="list-group-item">
                                Country: {selectedBeer.country}
                            </li>

                            <li className="list-group-item">
                                {selectedBeer.parent_company_id.name || "undefined"}
                            </li>
                        </ul>

                    <AddToCart currentBeer={selectedBeer.id}/>

                    </div>
                </div>
            </div>
        )
    }

const mapStateToProps = storeState => ({
    beers: storeState.beers,
})

export default connect(mapStateToProps)(SingleBeer)
