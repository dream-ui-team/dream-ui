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

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface itemProp {
  item: any;
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

  handleUpdate = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };
  handleDelete = () => {
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
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
          <View style={styles1.container}>
		        <View style = { styles1.item_text_style}>
                
                <Text>Model: {item.model}</Text>
                <Text>Registration Nr: {item.registrationNumber}</Text>
                <Text>Manufacturer: {item.manufacturerName}</Text>
                <Text>Type: {item.vehicleTypeCode}</Text>
		        </View>
            <View style={styles1.buttonContainer}>
              <View style={{width: 50, height: 50}} ><CommonButton text="Update" onPress={() => this.handleUpdate()}/></View>
              <View style={{width: 50, height: 50}}><CommonButton text="Delete" onPress={() => this.handleDelete()}/></View>
            </View>
          </View>
              }
        />
        
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  container:{
    margin: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#68a0cf',
    backgroundColor:'white'
  },

  AwesomeButton:{
    width:10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#68a0cf'
  },
  buttonContainer:{
    margin: 4,
    borderRadius: 5
  },
  updatebutton:{
    flexDirection: 'row'
  },
  deletebutton:{
    marginLeft:20
  },
item_text_style:
{
  fontSize: 20,
  color: '#000',
  padding: 5,
  marginLeft:10
},

item_separator:
{
  height: 1,
  width: '100%',
  backgroundColor: '#263238',
},
ButtonContainer:
{
  flex: 1
}

});
export default VehicleDetails;
