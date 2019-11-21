import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,AsyncStorage,Text,StyleSheet  } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "./styles";
import { AvatarItem,Input, CommonButton } from "../../../components";
import { logoutUserService,getUserVehicles } from "../../../redux/services/user";
import {NavigationEvents} from 'react-navigation';
import AwesomeButton from "react-native-really-awesome-button";
import { colors } from "../../../constants";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface itemProp {
  item: any;
}

interface State {
  page: number;
  limit: number;
  values: string;
  vehicles: Array<Object>;
}

class VehicleDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      values:"",
      vehicles:[]
    };
  }

  componentDidMount() {
    console.log("mounted");
    let values= 
      [
        {
      'model':'Maruti Swift Dezire',
      'registrationNumber':'5645646',
      'manufacturerName': 'Maruti',
      'vehicleTypeCode': 2
        }
      ]
    
    this.setState({ vehicles: values });
   // this.setState({values:values});
    // AsyncStorage.getItem('userToken').then((value) =>{
    //     this.setState({values:JSON.parse(value)});
    //     }).then(res => {
    //       console.log(this.state.values.userId);
    //       getUserVehicles(this.state.values.userId)
    //         .then(res =>{
    //                 this.setState({ vehicles: res });
    //                 console.log(this.state.vehicles[0].manufacturerName);
    //               })
    //         .catch(console.log)
    //     });
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  handleUpdate = (vehicle) => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };
  handleDelete = (vehicle) => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title="My Vehicles"
          leftButtonPress={() => navigation.openDrawer()}
          rightButtonPress={() => this.handleLogout()}
        />
        <FlatList
          data={this.state.vehicles}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) =>
          <View style={styles.vehicleContainer}>
            <View style={styles.vehicleContainerRow}>
              <View style={styles.label}>
                <Text style={styles.text}>Model</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.text}>{item.model}</Text>
              </View>
            </View>
            <View style={styles.vehicleContainerRow}>
              <View style={styles.label}>
                <Text style={styles.text}>Registration Nr</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.text}>{item.registrationNumber}</Text>
              </View>
            </View>
            <View style={styles.vehicleContainerRow}>
              <View style={styles.label}>
                <Text style={styles.text}>Manufacturer</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.text}>{item.manufacturerName}</Text>
              </View>
            </View>
            <View style={styles.vehicleContainerRow}>
              <View style={styles.label}>
                <Text style={styles.text}>Type</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.text}>{item.vehicleTypeCode}</Text>
              </View>
            </View>
            <View style={styles.vehicleContainerRow}>
              <View style={styles.updateButton}>
                <CommonButton text="Update" onPress={()=>this.handleUpdate(item)}/>
              </View>
              <View style={styles.updateButton}>
                <CommonButton text="Delete" onPress={()=>this.handleDelete(item)}/>
              </View>
            </View>
          </View>
        }/>
        
      </View>
    );
  }
}

const styles1 = StyleSheet.create({


});
export default VehicleDetails;
