import React, { Component } from "react";
import { View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  AsyncStorage,
  TextInput,
  Text  } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Header } from "../../../components";
import { AvatarItem,Input, Button } from "../../../components";
import { logoutUserService } from "../../../redux/services/user";
import {NavigationEvents} from 'react-navigation';
import styles from "./styles";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface MyProfileData {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  email: string
}

class MyProfileDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state ={
      values: this.props.navigation.getParam("values","NO-ID")
    }
    console.log("my profile "+this.state.values)
  }

  componentDidMount() {
 }

 handleProfileUpdate = (values: MyProfileData) => {
   const { navigation } = this.props;
   console.log("your name is " + values.firstName);
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{
                 firstName: `${this.state.values.firstName}`,
                 lastName:`${this.state.values.lastName}`,
                 email:`${this.state.values.emailAddress}`,
                 mobileNum:`${this.state.values.mobileNumber}`
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
                        value={props.values.email}
                        onChangeText={props.handleChange("email")}
                        //onBlur={props.handleBlur("email")}
                        error={props.touched.email && props.errors.email}
                      />
                      <Text>mobile Number:</Text>
                      <Input
                        placeholder="Mobille number"
                        value={props.values.mobileNum}
                        onChangeText={props.handleChange("mobileNum")}
                        //onBlur={props.handleBlur("mobileNum")}
                        error={props.touched.mobileNum && props.errors.mobileNum}
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
