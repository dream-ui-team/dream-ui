import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { Icon } from "native-base";
import { userRegistrationService } from "../../../redux/services/user";
import { NavigationScreenProp, NavigationState } from "react-navigation";
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

export default class LoginView extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      mobileNum: 0,
      email: "",
      password: "",
      confirmPassword: ""
    };
  }
  handleRegistration = (values: userData) => {
    const { navigation } = this.props;

    userRegistrationService(
      this.state.mobileNumber,
      this.state.password,
      this.state.firstName,
      this.state.lastName,
      this.state.email
    ).then(res => {
      if (res["errorCode"] == undefined || res["errorCode"] == "") {
        console.log("Registration successful");
        Alert.alert("Registration successful. Please relogin");
        navigation.navigate("LoginPage");
      } else if (res["errorCode"] == 20003 || res["errorCode"] == 20004) {
        console.log("user already exists with email or mobileNum");
        navigation.navigate("LoginPage");
        Alert.alert(res["errorMessage"]);
      } else {
        console.log("user already exists with email");
        Alert.alert(res["errorMessage"]);
      }
    });
  };

  render() {
    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../../../../assets/login-page-background.jpg")}
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Icon style={styles.inputIcon} name="person" />
            <TextInput
              style={styles.inputs}
              placeholder="First name"
              keyboardType="name-phone-pad"
              underlineColorAndroid="transparent"
              onChangeText={firstName => this.setState({ firstName })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon style={styles.inputIcon} name="person" />
            <TextInput
              style={styles.inputs}
              placeholder="last name"
              keyboardType="name-phone-pad"
              underlineColorAndroid="transparent"
              onChangeText={lastName => this.setState({ lastName })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon style={styles.inputIcon} name="md-cloud" />
            <TextInput
              style={styles.inputs}
              placeholder="Email id"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon style={styles.inputIcon} name="md-phone-portrait" />
            <TextInput
              style={styles.inputs}
              placeholder="Mobile number"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={mobileNumber => this.setState({ mobileNumber })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon style={styles.inputIcon} name="md-lock" />
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.inputContainer}>
              <Icon style={styles.inputIcon} name="md-lock" />
              <TextInput
                style={styles.inputs}
                placeholder=" Confirm password"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                onChangeText={confirmPassword =>
                  this.setState({ confirmPassword })
                }
              />
            </View>
            <View style={styles.bottomBlock}></View>
          </KeyboardAvoidingView>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.handleRegistration}
          >
            <Text style={styles.loginText}>Register</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("LoginPage")}
          >
            <Text style={{ color: "#FFFFFF" }}>Already a member? Login</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "#DCDCDC"
  },
  bottomBlock: {
    marginBottom: 20
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center",
    color: "#0d54cc"
  },
  inputText: {
    color: "#f7fdfa",
    fontWeight: "900"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  }
});
