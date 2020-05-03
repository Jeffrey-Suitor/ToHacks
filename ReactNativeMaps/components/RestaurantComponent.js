import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Marker} from 'react-native-maps';

import inactive_arrow from '../assets/icons/tag_inactive.png';
import active_arrow from '../assets/icons/tag_active.png';

export default class RestaurantComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive() {
    this.setState({active: !this.state.active});
  }

  render() {
    if (this.state.active) {
      return <ActiveRestaurantComponent item={this.props.item} onPress={this.toggleActive}/>;
    } else {
      return (
        <Marker
          coordinate={{
            latitude: parseFloat(this.props.item.Latitude),
            longitude: parseFloat(this.props.item.Longitude),
          }}
          onPress={this.toggleActive}>
          <View>
            <Image source={inactive_arrow} style={styles.icon} />
          </View>
        </Marker>
      );
    }
  }
}

class ActiveRestaurantComponent extends React.Component {
  render() {
    return (
        
      <Marker
        coordinate={{
          latitude: parseFloat(this.props.item.Latitude),
          longitude: parseFloat(this.props.item.Longitude),
        }}
        onPress={this.props.onPress}>
        <View>
          <Image source={active_arrow} style={styles.icon} />
        </View>
      </Marker>
    );
  }
}

const styles = {
  fill_container: {
    flex: 1,
    backgroundColor: 'red',
  },

  icon: {
    flex: 1,
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
};
