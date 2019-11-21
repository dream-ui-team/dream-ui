import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,AsyncStorage,Text,StyleSheet ,TouchableOpacity } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "./styles";
import { AvatarItem,Input, CommonButton } from "../../../components";
import { logoutUserService,getUserAddressService } from "../../../redux/services/user";
import {NavigationEvents} from 'react-navigation';
import { colors } from "../../../constants";
import Icons from 'react-native-vector-icons/MaterialIcons';
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface itemProp {
  item: any;
}

class AddressDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.state = {
      page: 1,
      limit: 20,
      values:"",
      addresses:[]
    };
  }
  deleteAddress = (item) =>{
  	  fetch(`http://192.168.42.86:8090/users/${this.state.values.userId}/addresses/${item.userAddressId}`,{
          method:'DELETE',
          headers: {
              Accept: 'application/plain',
              //'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Methods':  'GET,POST,PATCH,DELETE,PUT,OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type, Authorization',
              'Sec-Fetch-Mode': 'no-cors'
            },
          }).then(res => {
                //this.setState({ contacts: data });
                console.log('Address deleted successfully');
                this.componentDidMount();
              })
              .catch(console.log)

    }
  componentDidMount() {
    console.log("mounted");
    AsyncStorage.getItem('userToken').then((value) =>{
        this.setState({values:JSON.parse(value)});
        }).then(res => {
          console.log(this.state.values.userId);
          getUserAddressService(this.state.values.userId).then(res =>{
                    this.setState({ addresses: res });
                    console.log(this.state.addresses);
                  })
                  .catch(console.log)
        });
  }
updateAddress = (item) =>{
  console.log(item);
  this.props.navigation.navigate('AddAddress',{
                    details:item
                    });

}

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  handleBackButtonClick() {
      this.props.navigation.navigate("AccountDetails");
      return true;
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
      <View style={styles1.profileContainer}>
      <View style={styles1.leftContainer}>
        <TouchableOpacity onPress={this.handleBackButtonClick}>
            <Icons name={'arrow-back'} style={styles1.iconButton}/>
        </TouchableOpacity>
        </View>
      <View style={styles1.midContainer}>
        <Text style={styles1.headerTitle}>{`Profile Details`}</Text>
      </View>
      </View>
      <View style={styles1.container}>
        <View style={{marginTop:8,marginLeft:10,flexDirection: 'row'}}>
          <CommonButton text="Add New Address" onPress={()=>navigation.navigate("AddAddress")}/>
        </View>
        </View>
        <View style = { styles1.item_separator }/>
        <FlatList
          data={this.state.addresses}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
          <View style={styles1.container}>
		        <View style = { styles1.item_text_style}>
                <Text style = {{fontWeight:"700"}}>{`${this.state.values.firstName} ${this.state.values.lastName}`}</Text>
                <Text>{item.addressLine1}</Text>
                <Text>{item.addressLine2}</Text>
                <Text>{item.state}</Text>
                <Text>{item.city}</Text>
                <Text>{`${item.country}-${item.pinCode}`}</Text>
                <Text>{`Mobile Number: ${this.state.values.mobileNumber}`}</Text>
               <View style={{flexDirection: 'row',marginTop:10}}>
                   <View style={{width: 50, height: 50}} ><CommonButton text="UPDATE" onPress={()=>this.updateAddress(item)}/></View>
                 <View style={{marginLeft:20}}>
                   <View style={{marginLeft:20,width: 50, height: 50}}><CommonButton text="DELETE" onPress={()=>this.deleteAddress(item)}/></View>
                   </View>
                   </View>
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
profileContainer: {
  height: 56,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.containerBg,
  borderBottomWidth: 1,
  borderBottomColor: colors.borderColor
},
leftContainer: {
  flex: 1,
  alignItems: "flex-start"
},
midContainer: {
  flex: 10,
  alignItems: "center"
},
headerTitle: {
  fontSize: 16,
  fontWeight: "700"
},
rightContainer: {
  flex: 1,
  alignItems: "flex-end"
},
iconButton: {
  paddingHorizontal: 16
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
});
export default AddressDetails;
