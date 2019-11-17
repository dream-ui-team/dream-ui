import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,AsyncStorage,Text,StyleSheet  } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "./styles";
import { AvatarItem,Input, Button } from "../../../components";
import { logoutUserService,getUserAddressService } from "../../../redux/services/user";
import {NavigationEvents} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface itemProp {
  item: any;
}

class ProfileDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      values:"",
      addresses:[]
    };
  }

  componentDidMount() {
    console.log("mounted");
    AsyncStorage.getItem('userToken').then((value) =>{
        this.setState({values:JSON.parse(value)});
        }).then(res => {
          console.log(this.state.values.userId);
          getUserAddressService(this.state.values.userId).then(res =>{
                    this.setState({ addresses: res });
                    console.log(this.state.addresses[0].city);
                  })
                  .catch(console.log)
        });
  }

  handleLogout = () => {
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
          title="Profile Details"
          leftButtonPress={() => navigation.openDrawer()}
          rightButtonPress={() => this.handleLogout()}
        />
        <View style={styles1.container}>
        <View style={{marginLeft:10,flexDirection: 'row'}}>
          <Button text="Add New Address" />
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
              <View style={{flexDirection: 'row'}}>
                <Button text="UPDATE"/>
                <View style={{marginLeft:20}}>
                  <Button text="DELETE"/>
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
ButtonContainer:
{
  flex: 1,
  flexDirection: 'row',
  width: '30%',
  height: 40,
  justifyContent: 'space-between',
}

});
export default ProfileDetails;
