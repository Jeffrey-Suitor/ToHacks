import React from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {Marker, Callout} from 'react-native-maps';
import call from 'react-native-phone-call';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

import inactive_arrow from '../assets/icons/tag_inactive.png';
import active_arrow from '../assets/icons/tag_active.png';
import curbside from '../assets/icons/curbside.png';
import mobile_order from '../assets/icons/mobile.png';
import delivery from '../assets/icons/delivery.png';
import phone from '../assets/icons/telephone.png';

import skip_the_dishes from '../assets/icons/skip.png';
import uber_eats from '../assets/icons/uber.png';
import door_dash from '../assets/icons/doordash.png';

export default class RestaurantComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      img: inactive_arrow,
    };

    this.toggleActive = this.toggleActive.bind(this);
    if (this.props.reset === true) {
      this.setState({active: false});
    }
  }

  toggleActive() {
    if (this.state.active === false) {
      this.setState({active: !this.state.active, img: active_arrow});
    } else {
      this.setState({active: !this.state.active, img: inactive_arrow});
    }
  }

  render() {
    return (
      <Marker
        coordinate={{
          latitude: parseFloat(this.props.item.Latitude),
          longitude: parseFloat(this.props.item.Longitude),
        }}
        image={this.state.img}
        onPress={this.toggleActive}>
        {this.state.active === true && (
          <View>
            <ActiveRestaurantComponent
              item={this.props.item}
              deactivate={this.toggleActive}
            />
          </View>
        )}
      </Marker>
    );
  }
}

class ActiveRestaurantComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.placePhoneCall = this.placePhoneCall.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.getDelivery = this.getDelivery.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
  }

  componentWillUnmount() {
    this.props.deactivate();
  }

  placePhoneCall(val) {
    args = {number: val, prompt: true};
    console.log(args.number);
    call(args).catch(console.error);
  }

  getDirections() {
    console.log('Pickup');
  }

  getDelivery() {
    console.log('Delivery');
  }

  placeOrder(url) {
    console.log(url);
    Linking.openURL(url);
  }

  toggleExpand() {
    console.log('Toggling expand');
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={styles.restaurant_name}
            {this.props.item.name}
          </Text>
          <Text
            style={{paddingTop: 10, paddingRight: 5}}
            onPress={this.toggleExpand}>
            Expand
          </Text>
        </View>

        <Text style={styles.restaurant_description}>
          {this.props.item.description}
        </Text>

        {parseBool(this.props.item['Curbside Pickup']) === true && (
          <View style={styles.inline}>
            <Image source={curbside} style={styles.icon} />
            <Text
              style={{
                flex: 1,
                fontSize: RFPercentage(1.5),
                fontWeight: 'bold',
                color: '#009353',
                paddingLeft: 10,
              }}>{`Curbside\nPickup`}</Text>
            <TouchableHighlight
              style={{
                borderRadius: 20,
                backgroundColor: '#FF7A7A',
                padding: 7,
                zIndex: 3,
                elevate: 3,
              }}
              onPress={this.getDirections}
              underlayColor="blue">
              <Text style={{color: 'white', fontSize: RFPercentage(2)}}>
                Take me there
              </Text>
            </TouchableHighlight>
          </View>
        )}
        {parseInt(this.props.item['In-House Delivery']) === true && (
          <View>
            <Image source={delivery} style={styles.icon} />
            <Text>{`Mobile\nPOrder`}</Text>
            <TouchableHighlight
              style={{borderRadius: 30}}
              onPress={this.getDelivery}>
              <Text style={{padding: 20}}>Order Online</Text>
            </TouchableHighlight>
          </View>
        )}

        <View style={styles.inline}>
          {this.props.item.SkipTheDishes !== '' && (
            <Image
              source={skip_the_dishes}
              style={styles.icon}
              onPress={this.placeOrder}
              value={this.props.item.SkipTheDishes}
            />
          )}
          {this.props.item.DoorDash !== '' && (
            <Image
              source={door_dash}
              style={styles.icon}
              onPress={this.placeOrder}
              value={this.props.item.DoorDash}
            />
          )}
          {this.props.item.UberEats !== '' && (
            <Image
              source={uber_eats}
              style={styles.icon}
              onPress={this.placeOrder}
              value={this.props.item.UberEats}
            />
          )}

          {parseInt(this.props.item.phone.split('.').join('')) !== NaN && (
            <Image
              source={phone}
              style={styles.icon}
              onPress={this.placePhoneCall}
              value={parseInt(this.props.item.phone.split('.').join(''))}
            />
          )}
        </View>
      </View>
    );
  }
}

function parseBool(val) {
  return val === true || val === 'true' || val === 'TRUE';
}

const styles = StyleSheet.create({
  fill_container: {
    flex: 1,
  },

  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    flex: 1,
  },

  main_container: {
    position: 'absolute',
    top: 0,
    right: 20,
    left: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
  },

  restaurant_name: {
    flex: 1,
    fontSize: RFPercentage(4),
    padding: 5,
  },

  restaurant_description: {
    flex: 1,
    padding: 5,
    paddingBottom: 20,
  },

  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
});
