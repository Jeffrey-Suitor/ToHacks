/*This is an Example of React Native Map*/
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Radar from 'react-native-radar';
import my_map_style from './assets/map/map_style.json';
import {SearchBar} from 'react-native-elements';
import RestaurantComponent from "./components/RestaurantComponent"

export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;
    console.log(this.state)
    return (
      <View style={styles.main_container}>

        <MapView
          style={styles.main_container}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={my_map_style}
        />

          <View style={styles.search_bar}>
          <SearchBar
            placeholder="Type Here...asdsa"
            onChangeText={this.updateSearch}
            value={search}
            style={{flex: 1}}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  
  main_container:{
    flex: 1,
  },

  search_bar: {
    position: "absolute",
    flex: 1,
    top: 20,
    right: 10,
    left: 10,
    borderRadius: 50,
    //borderColor: "red",
    //borderWidth: 3,
    overflow: "hidden",
  }
}