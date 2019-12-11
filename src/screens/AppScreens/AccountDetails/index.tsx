import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Header } from "../../../components";
import { AsyncStorage } from "react-native";
import { logoutUserService } from "../../../redux/services/user";

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

class AccountDetails extends Component<Props, { MyProfileData }> {
  constructor(props) {
    //
    super(props);
    this.state = {
      MyProfileData: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(value => {
      this.setState({ MyProfileData: JSON.parse(value) });
    });
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title="My account details"
          leftButtonPress={() => navigation.openDrawer()}
          rightButtonPress={() => this.handleLogout()}
        />

        <TouchableOpacity
          style={styles.ProfileButton}
          onPress={() =>
            navigation.navigate("MyProfileDetails", {
              values: this.state.MyProfileData
            })
          }
        >
          <Text> My profile </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.AddressButton}
          onPress={() => this.props.navigation.navigate("AddressDetails")}
        >
          <Text> My addresses </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ProfileButton}
          onPress={() => navigation.navigate("VehicleDetails")}
        >
          <Text> My vehicles </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10
  },
  AddressButton: {
    alignItems: "center",
    backgroundColor: "skyblue",
    padding: 10
  },
  ProfileButton: {
    alignItems: "center",
    backgroundColor: "powderblue",
    padding: 10
  }
});

export default AccountDetails;
