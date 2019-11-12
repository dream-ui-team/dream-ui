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

  isValidCredentials= function(){
    let isValid = AsyncStorage.getItem("userToken");
    return isValid != undefined
  }

  handleLogin = (values: userData) => {
    const { navigation } = this.props;
    loginUserService(values.username, values.password).then(res => {
      if(res["errorCode"]!=undefined && res["errorCode"]=="20000"){
        Alert.alert(res['errorMessage']);
      }else{
        let userToken = `${values.username}${values.password}`;
        AsyncStorage.setItem("userToken", userToken)
        navigation.navigate("AppStack");
      }
        
    });
  };

  render() {
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
                console.log(props, "fdsfsdfdsf");
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
                    </View>
                    <View>

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
