import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { userRegistrationService } from "../../../redux/services/user";
import { Input, Button } from "../../../components";
import styles from "./styles";
import { Alert, AsyncStorage } from "react-native";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
interface userData {
  firstName: string;
  lastName: string;
  mobileNum: string;
  email: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[0-9]+$/)
    .min(10)
    .max(10)
    .required()
});

class Registration extends Component<Props, {}> {
  handleRegistration = (values: userData) => {
    const { navigation } = this.props;

    userRegistrationService(
      values.mobileNum,
      values.password,
      values.firstName,
      values.lastName,
      values.email
    ).then(res => {
      //console.log("in Registration output",res);
      if (res["errorCode"] == undefined || res["errorCode"] == "") {
        //    Alert.alert(
        //      'Registration Successful',
        //      'Plese relogin',
        //      [
        //        {text: 'OK', onPress: () => console.log('OK Pressed')},
        //      ],
        //      {cancelable: false},
        //  );
        console.log("Registration successful");
        Alert.alert("Registration successful. Please relogin");
        navigation.navigate("AuthStack");
      } else if (res["errorCode"] == 20003 || res["errorCode"] == 20004) {
        console.log("user already exists with email or mobileNum");
        navigation.navigate("AuthStack");
        Alert.alert(res["errorMessage"]);
      } else {
        console.log("user already exists with email");
        Alert.alert(res["errorMessage"]);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView bounces={false}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                mobileNum: "",
                password: ""
              }}
              //validationSchema={loginSchema}
              onSubmit={values => this.handleRegistration(values)}
            >
              {props => {
                return (
                  <View>
                    <View style={styles.headStyle}>
                      <Icon name="emotsmile" size={100} />
                      <Text style={styles.headText}>Let's sign up ..!!</Text>
                    </View>
                    <View style={styles.inputContainer}>
                      <Input
                        placeholder="First name"
                        value={props.values.firstName}
                        onChangeText={props.handleChange("firstName")}
                        //onBlur={props.handleBlur("firstName")}
                        error={
                          props.touched.firstName && props.errors.firstName
                        }
                      />
                      <Input
                        placeholder="Last name"
                        value={props.values.lastName}
                        onChangeText={props.handleChange("lastName")}
                        //onBlur={props.handleBlur("lastName")}
                        error={props.touched.lastName && props.errors.lastName}
                      />
                      <Input
                        placeholder="Email"
                        value={props.values.email}
                        onChangeText={props.handleChange("email")}
                        //onBlur={props.handleBlur("email")}
                        error={props.touched.email && props.errors.email}
                      />
                      <Input
                        placeholder="Mobille number"
                        value={props.values.mobileNum}
                        onChangeText={props.handleChange("mobileNum")}
                        //onBlur={props.handleBlur("mobileNum")}
                        error={
                          props.touched.mobileNum && props.errors.mobileNum
                        }
                      />
                      <Input
                        placeholder="Password"
                        value={props.values.password}
                        onChangeText={props.handleChange("password")}
                        onBlur={props.handleBlur("password")}
                        secureTextEntry
                        error={props.touched.password && props.errors.password}
                      />
                      <Button text="Sign up" onPress={props.handleSubmit} />
                      <Button
                        text="Login"
                        onPress={() =>
                          this.props.navigation.navigate("AuthStack")
                        }
                      />
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

export default Registration;
