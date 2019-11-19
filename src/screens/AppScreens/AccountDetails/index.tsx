import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { Input, Button } from "../../../components";
import { Alert, AsyncStorage } from "react-native";


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}


class AccountDetails extends Component<Props, {}> {

  constructor(props) {
    // 
    super(props);
    this.state = {
       values : []
     }
  }

  componentDidMount() {
    AsyncStorage.getItem('userToken').then((value) =>{
      this.setState({values:JSON.parse(value)});
      }).then(res => {
        console.log("values are:"+this.state.values.firstName)
      });
  }

  render() {
    return (

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.ProfileButton}
          onPress={ () => this.props.navigation.navigate("MyProfileDetails",{values:this.state.values})}
        >
          <Text> My profile </Text>
        </TouchableOpacity>
         <TouchableOpacity
           style={styles.AddressButton}
           onPress={ () => this.props.navigation.navigate("AddressDetails")}
         >
           <Text> My address </Text>
         </TouchableOpacity>
        </View>

     )
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'flex-start',
     paddingHorizontal: 10
   },
   AddressButton: {
     alignItems: 'center',
     backgroundColor: 'skyblue',
     padding: 10
   },
   ProfileButton: {
     alignItems: 'center',
     backgroundColor: 'powderblue',
     padding: 10
   }
 })

export default AccountDetails;
