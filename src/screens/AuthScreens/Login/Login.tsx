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
import { loginUserService } from "../../../redux/services/user";
import { NavigationScreenProp, NavigationState } from "react-navigation";
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

export default class LoginView extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: 0,
      password: ""
    };
  }
  handleLogin = () => {
    const { navigation } = this.props;

    loginUserService(this.state.mobileNumber, this.state.password).then(res => {
      if (
        res != undefined &&
        (res["errorCode"] == undefined || res["errorCode"] == "")
      ) {
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
        Alert.alert(res != undefined ? res["errorMessage"] : "");
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
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.handleLogin}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.onClickListener("restore_password")}
          >
            <Text style={{ color: "#FFFFFF" }}>Forgot your password?</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("Registration")}
          >
            <Text style={{ color: "#FFFFFF" }}>Not a member? Register</Text>
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
    alignItems: "center",
    marginTop: 150
    //backgroundColor: "#DCDCDC"
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
