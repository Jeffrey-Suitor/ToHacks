import React from "react"
import restaurant_data from "../data/restaurants.json"
import {Text} from "react-native"

export default class AvailableRestaurantsComponent extends React.Component{





    render(){

        if (this.props.region.longitude > 0){
            var longtitude_max = this.props.region.longitude + this.props.region.longitudeDelta/2
            var longtitude_min = this.props.region.longitude - this.props.region.longitudeDelta/2
        } else{
            var longtitude_min = this.props.region.longitude + this.props.region.longitudeDelta/2
            var longtitude_max = this.props.region.longitude - this.props.region.longitudeDelta/2
        }

        if (this.props.region.latitude > 0){
            var latitude_max = this.props.region.latitude + this.props.region.latitudeDelta/2
            var latitude_min = this.props.region.latitude - this.props.region.latitudeDelta/2
        }else{
            var latitude_min = this.props.region.latitude + this.props.region.latitudeDelta/2
            var latitude_max = this.props.region.latitude - this.props.region.latitudeDelta/2
        }

        console.log(latitude_min, latitude_max)
        console.log(longtitude_min, longtitude_max)

        restaurant_data.map((item, index) => {
            var longitude_flag = false
            var latitude_flag = false

            if (this.props.region.longitude > 0){
                if (longtitude_min <= item.Longitude <= longtitude_max){
                    longitude_flag = true;
                }
            } else{
                if (longtitude_min >= item.Longitude >= longtitude_max){
                    longitude_flag = true;
                }
            }
            
            if (this.props.region.latitude > 0){
                if (latitude_min <= item.Latitude <= latitude_max){
                    latitude_flag = true;
                }
            }else{
                if (latitude_min >= item.Latitude >= latitude_max){
                    latitude_flag = true;
                }
            }

            if (latitude_flag && longitude_flag){
                console.log(item.name, item.Longitude, item.Latitude)
            }
                
            });

        return(
            <Text>asdsasd</Text>
        );
    }
}