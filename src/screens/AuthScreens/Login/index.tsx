import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  ActivityIndicator
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

interface LoginState {
  modalVisible: boolean;
  showActivityIndicator: boolean;
}

class Login extends Component<Props, LoginState> {
  constructor(Props) {
    super(Props);
    this.state = {
      modalVisible: false,
      showActivityIndicator: false
    };
  }

  isValidCredentials = function() {
    let isValid = AsyncStorage.getItem("userToken");
    return isValid != undefined;
  };

  handleLogin = (values: userData) => {
    const { navigation } = this.props;

    loginUserService(values.mobileNumber, values.password).then(res => {
      if (res != undefined && (res["errorCode"] == undefined || res["errorCode"] == "")) {
        AsyncStorage.setItem("userToken", JSON.stringify(res));
        this.setState({
          modalVisible: false,
          showActivityIndicator: false
        });
        Alert.alert("Logged in Successfully");
        navigation.navigate("AppStack");
      } else {
        this.setState({
          modalVisible: false,
          showActivityIndicator: false
        });
        Alert.alert(res!=undefined? res["errorMessage"]:"");
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ mobileNumber: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={values => {
                this.setState({
                  modalVisible: true,
                  showActivityIndicator: true
                });
                this.handleLogin(values);
              }}
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

                    <Modal
                      animationType={"fade"}
                      transparent={true}
                      visible={this.state.modalVisible}
                      onRequestClose={() => {
                        console.log("Modal has been closed.");
                      }}
                    >
                      <View style={styles.activityIndicator}>
                        <ActivityIndicator
                          size="large"
                          color="#8acefa"
                          animating={this.state.showActivityIndicator}
                        />
                      </View>
                    </Modal>

                    <View style={styles.inputContainer}>
                      <Input
                        placeholder="mobile number"
                        value={props.values.mobileNumber}
                        onChangeText={props.handleChange("mobileNumber")}
                        onBlur={props.handleBlur("mobileNumber")}
                        error={
                          props.touched.mobileNumber &&
                          props.errors.mobileNumber
                        }
                      />
                      <Input
                        placeholder="password"
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
                          this.props.navigation.navigate("Registration")
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
