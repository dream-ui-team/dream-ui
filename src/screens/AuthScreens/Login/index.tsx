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
import { loginUserService, getAccessToken } from "../../../redux/services/user";
import { Input, Button } from "../../../components";
import styles from "./styles";
import { Alert, AsyncStorage } from "react-native";
import moment from "moment";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface userData {
  username: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string()
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

    getAccessToken().then(response => {
      // get the oauth token first
      // npm run web will not working due to cross Origin issue.Hence run it using npm run android
      if (response["error"] == undefined || response["error"] == "") {
        AsyncStorage.setItem("accessToken", response["access_token"]);
        let tokenExpireIn = response["expires_in"];
        let tokenExpiryTime = new Date();
        console.log(
          "this token will expire in  " +
            tokenExpireIn +
            " seconds and current time is " +
            tokenExpiryTime
        );
        tokenExpiryTime.setSeconds(
          tokenExpiryTime.getSeconds() + tokenExpireIn
        );
        // this will be used to check if token is expired
        AsyncStorage.setItem(
          "accessTokenExpiryTime",
          tokenExpiryTime.toString()
        );

        loginUserService(values.username, values.password).then(res => {
          if (res["errorCode"] == undefined || res["errorCode"] == "") {
            AsyncStorage.setItem("userToken", JSON.stringify(res));
            Alert.alert("Logged in Successfully");
            navigation.navigate("AppStack");
          } else {
            Alert.alert(res["errorMessage"]);
          }
        });
      } else {
        Alert.alert(
          "Failed to get oauth token. Note this meesage should be removed afterwards"
        );
      }
    });
  };

  render() {
    //  const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ username: "", password: "" }}
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
                        placeholder="Username"
                        value={props.values.username}
                        onChangeText={props.handleChange("username")}
                        onBlur={props.handleBlur("username")}
                        error={props.touched.username && props.errors.username}
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
