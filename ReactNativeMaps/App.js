/*This is an Example of React Native Map*/
import React from 'react';
import {View, TouchableOpacity, Image, Icon} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Radar from 'react-native-radar';
import my_map_style from './assets/map/map_style.json';
import {SearchBar} from 'react-native-elements';
import RestaurantComponent from './components/RestaurantComponent';
import CheckRestaurantVisible from './components/CheckRestaurantVisible';

import restaurant_data from './data/restaurants.json';

import center_button_icon from './assets/icons/location.png';

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
      visible_count: 0,
    };

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.get_user_location = this.get_user_location.bind(this);
    Radar.requestPermissions(true);
    this.get_user_location();
  }

  async get_user_location() {
    await Radar.getLocation()
      .then(loc => {
        var temp_region = {
          latitude: loc.location.latitude,
          longitude: loc.location.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        };
        this.setState({region: temp_region});
      })
      .catch(err => {
        console.log(err);
      });
  }

  onRegionChangeComplete(event) {
    this.setState({visible_count: 0});
    this.setState({region: event});
  }

  updateSearch(event) {
    this.setState({search: event});
    console.log(restaurant_data.length);
  }

  render() {
    return (
      <View style={styles.fill_container}>
        <MapView
          style={styles.fill_container}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
          customMapStyle={my_map_style}>
          {restaurant_data.map((item, index) => {
            if (CheckRestaurantVisible(this.state.region, item)) {
              this.state.visible_count = this.state.visible_count + 1;
              if (this.state.visible_count < 8) {
                return <RestaurantComponent item={item} key={index} />;
              }
            }
          })}
        </MapView>

        <View style={styles.search_bar}>
          <SearchBar
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={this.state.search}
            placeholderTextColor="black"
            searchIcon={null}
            inputContainerStyle={styles.search}
            containerStyle={{backgroundColor: "white"}}
          />
        </View>

        <View style={styles.center_icon}>
          <TouchableOpacity
            style={styles.fill_container}
            activeOpacity={0.5}
            onPress={this.get_user_location}>
            <Image source={center_button_icon} style={styles.ImageIconStyle} />
          </TouchableOpacity>
        </View>
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
    left: 60,
    right: 60,
    top: 30,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'white',
    width: 290,
  },

  search: {
    borderRadius: 50,
    backgroundColor: 'white',
    height: 25,
    width: 290,
  },

  ImageIconStyle: {
    flex: 1,
    resizeMode: 'contain',
    width: 45,
  },

  center_icon: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center'
  },
};
