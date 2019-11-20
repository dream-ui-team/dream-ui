import React, { Component } from "react";
import { View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  AsyncStorage,
  Alert,
  TextInput,
  Text  } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Header } from "../../../components";
import { AvatarItem,Input, Button } from "../../../components";
import { logoutUserService, updateUserProfile } from "../../../redux/services/user";
import {NavigationEvents} from 'react-navigation';
import styles from "./styles";



interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface MyProfileData {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  emailAddress: string;
  userId: string;
}

class MyProfileDetails extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state ={
      values: this.props.navigation.getParam("values","NO-ID")
    }
  }


 handleProfileUpdate = (values: MyProfileData) => {
   console.log("Updating user info"+values.userId);
   updateUserProfile(values.userId,values.mobileNumber,values.firstName,values.lastName,values.emailAddress)
     .then( res => {
       if(res["errorCode"]==undefined || res["errorCode"]==""){
         //let userToken = `${values.username}${values.password}`;
         AsyncStorage.setItem("userToken",  JSON.stringify(values));
         Alert.alert("Successfully updated user information")
         this.props.navigation.navigate("AppStack");
       }else{
         Alert.alert(res["errorMessage"]);
         //navigation.navigate("RegistrationStack");
       }
     });
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  }

  render() {

    return (
      <View style={styles.container}>
      <Header
        title="My Profile details"
        leftButtonPress={() => navigation.openDrawer()}
        rightButtonPress={() => this.handleLogout()}
      />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{
                 firstName: `${this.state.values.firstName}`,
                 lastName:`${this.state.values.lastName}`,
                 emailAddress:`${this.state.values.emailAddress}`,
                 mobileNumber:`${this.state.values.mobileNumber}`,
                 userId:`${this.state.values.userId}`,
                 }}

              onSubmit={values => this.handleProfileUpdate(values)}
            >
              { props => {
                return (
                  <View>
                    <View style={styles.inputContainer}>
                      <Text>First name:</Text>
                      <Input
                        placeholder="First name"
                        value={props.values.firstName}
                        onChangeText={props.handleChange("firstName")}
                        //onBlur={props.handleBlur("firstName")}
                        error={props.touched.firstName && props.errors.firstName}
                      />
                      <Text>Last name:</Text>
                      <Input
                        placeholder="Last name"
                        value={props.values.lastName}
                        onChangeText={props.handleChange("lastName")}
                       //onBlur={props.handleBlur("lastName")}
                        error={props.touched.lastName && props.errors.lastName}
                      />
                      <Text>Email:</Text>
                      <Input
                        placeholder="Email"
                        value={props.values.emailAddress}
                        onChangeText={props.handleChange("email")}
                        //onBlur={props.handleBlur("email")}
                        error={props.touched.emailAddress && props.errors.emailAddress}
                      />
                      <Text>mobile Number:</Text>
                      <Input
                        placeholder="Mobille number"
                        value={props.values.mobileNumber}
                        onChangeText={props.handleChange("mobileNumber")}
                        //onBlur={props.handleBlur("mobileNum")}
                        error={props.touched.mobileNumber && props.errors.mobileNumber}
                      />

                      <Button text="Update my profile" onPress={props.handleSubmit} />

                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default MyProfileDetails;
