import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { connect } from 'react-redux'

import NavBar from "./NavBar.jsx"
import AllBeers from './AllBeers.jsx'
import SingleBeer from './SingleBeer.jsx'
import SingleBrewery from './SingleBrewery.jsx'

import { fetchAllBeers } from '../reducers/beer.jsx'
import { fetchAllBreweries } from '../reducers/parentCompany.jsx'

export class App extends React.Component {

    componentDidMount() {
        this.props.loadAllBeers();
        this.props.loadAllBreweries();
    }
    
    render() {
        return (

            <Router>
                <div id='app'>
                    <NavBar />
                    <Switch>
                        <Route exact path='/' component={AllBeers} />
                        <Route path='/beers/:beerId' component={SingleBeer} />
                        <Route path='/breweries/:breweryId' component={SingleBrewery} /> 
                    </Switch>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = storeState => ({
    beers: storeState.beers,
    breweries: storeState.breweries,
})

const mapThunksToProps = dispatch => ({
    loadAllBeers: () => dispatch(fetchAllBeers()),
    loadAllBreweries: () => dispatch(fetchAllBreweries())
})

export default connect(mapStateToProps, mapThunksToProps)(App)