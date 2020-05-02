/*This is an Example of React Native Map*/
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Radar from 'react-native-radar';
import my_map_style from './assets/map/map_style.json';
import {SearchBar} from 'react-native-elements';
import RestaurantComponent from './components/RestaurantComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.center_on_user = this.center_on_user.bind(this);
  }

  componentDidMount() {
    Radar.requestPermissions(true);
  }

  center_on_user() {
    console.log('this');
  }

  onRegionChangeComplete(event) {
    this.setState({region: event});
  }

  updateSearch(event) {
    this.setState({search: event});

    Radar.getLocation().then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <View style={styles.fill_container}>
        <MapView
          style={styles.fill_container}
          region={this.state.region}
          onRegionChange={this.onRegionChange}

          customMapStyle={my_map_style}
        />

        <View style={styles.search_bar}>
          <SearchBar
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={this.state.search}
            style={styles.fill_container}
          />
        </View>

        <RestaurantComponent />
      </View>
    );
  }
}

const styles = {
  fill_container: {
    flex: 1,
  },

  search_bar: {
    position: 'absolute',
    flex: 1,
    top: 20,
    right: 10,
    left: 10,
    borderRadius: 50,
    overflow: 'hidden',
  },
};
