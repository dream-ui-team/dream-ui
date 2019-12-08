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
import { loginUserService } from "../../../redux/services/user";
import { Input, Button } from "../../../components";
import styles from "./styles";
import { Alert, AsyncStorage } from "react-native";
import moment from "moment";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface userData {
  mobileNumber: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/)
    .min(10)
    .max(10)
    .required(),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9]+(\s?[a-zA-z0-9]+)*$/)
    .min(6)
    .max(16)
    .required()
});

class Login extends Component<Props, {}> {
  isValidCredentials = function() {
    let isValid = AsyncStorage.getItem("userToken");
    console.log("****" + isValid);
    return isValid != undefined;
  };

  handleLogin = (values: userData) => {
    const { navigation } = this.props;

    loginUserService(values.mobileNumber, values.password).then(res => {
      if (res["errorCode"] == undefined || res["errorCode"] == "") {
        AsyncStorage.setItem("userToken", JSON.stringify(res));
        Alert.alert("Logged in Successfully");
        navigation.navigate("AppStack");
      } else {
        Alert.alert(res["errorMessage"]);
      }
    });
  };

  render() {
    //  const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ mobileNumber: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {props => {
                return (
                  <View>
                    <View style={styles.headStyle}>
                      <Icon name="emotsmile" size={100} />
                      <Text style={styles.headText}>
                        Build Something Amazing
                      </Text>
                    </View>

                    <View style={styles.inputContainer}>
                      <Input
                        placeholder="mobileNumber"
                        value={props.values.mobileNumber}
                        onChangeText={props.handleChange("mobileNumber")}
                        onBlur={props.handleBlur("mobileNumber")}
                        error={
                          props.touched.mobileNumber &&
                          props.errors.mobileNumber
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
                      <Button text="Login" onPress={props.handleSubmit} />
                      <Button
                        text="Sign up"
                        onPress={() =>
                          this.props.navigation.navigate("RegistrationStack")
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

export default Login;
