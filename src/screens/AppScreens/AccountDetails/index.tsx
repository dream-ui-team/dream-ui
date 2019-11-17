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

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text> My profile </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
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
     justifyContent: 'center',
     paddingHorizontal: 10
   },
   button: {
     alignItems: 'center',
     backgroundColor: '#DDDDDD',
     padding: 10
   },
   countContainer: {
     alignItems: 'center',
     padding: 10
   },
   countText: {
     color: '#FF00FF'
   }
 })

export default AccountDetails;
