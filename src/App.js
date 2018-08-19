import React, { Component } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import * as CAFE from './components/CafeList';
import escapeRegExp from 'escape-string-regexp';
import * as FSAPI from './FourSquareAPI';
import './App.css';

class App extends Component {
    state = {
        loc: {
            lat: 53.560915,
            lng: 9.991106
        },
        cafes: {},
        query: '',
        searchedCafes: CAFE.CafeList.response.venues,
        markers: [],
        map: {},
        info: {},
        infoWindow: {},
        fsCon: '',
        googleCon: 'red'
    };

    onQuery = query => {
        if (!query) {
            this.setState({ query: '', searchedCafes: this.state.cafes });
            return;
        }
        this.setState(
            {
                query: query,
                searchedCafes: []
            },
            function() {
                this.search();
            }.bind(this)
        );
    };

    search = () => {
        let searchedCafes;
        const match = new RegExp(escapeRegExp(this.state.query), 'i');
        searchedCafes = this.state.cafes.filter(cafe => match.test(cafe.name));
        this.setState({ searchedCafes });
    };

    onMapMarkerUpdate = markers => this.setState({ markers });

    onMapUpdate = map => this.setState({ map });

    onInfoWindowUpdate = infoWindow => this.setState({ infoWindow });

    onMouseOver = i => window.google.maps.event.trigger(this.state.markers[i], 'mouseover');

    onMouseOut = i => window.google.maps.event.trigger(this.state.markers[i], 'mouseout');

    onClick = i => window.google.maps.event.trigger(this.state.markers[i], 'click');

    componentDidMount() {
        FSAPI.search('cafe', this.state.loc)
            .then(res =>
                this.setState({ cafes: res.response.venues, searchedCafes: res.response.venues, fsCon: 'green' })
            )
            .catch(err => {
                this.setState({
                    cafes: CAFE.CafeList.response.venues,
                    searchedCafes: CAFE.CafeList.response.venues
                });
                this.setState({ fsCon: 'red' });
            });
    }

    render() {
        return (
            <div className="App s-layout">
                <Sidebar
                    query={this.state.query}
                    cafes={this.state.searchedCafes}
                    onQuery={this.onQuery}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    onClick={this.onClick}
                    fsCon={this.state.fsCon}
                />
                <Map
                    map={this.state.map}
                    markers={this.state.markers}
                    cafes={this.state.searchedCafes}
                    loc={this.state.loc}
                    infoWindow={this.state.infoWindow}
                    onMapMarkerUpdate={this.onMapMarkerUpdate}
                    onMapUpdate={this.onMapUpdate}
                    onInfoWindowUpdate={this.onInfoWindowUpdate}
                />
            </div>
        );
    }
}

export default App;
