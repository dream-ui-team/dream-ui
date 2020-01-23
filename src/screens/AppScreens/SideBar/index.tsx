import React, { Component } from "react";
import { View, StyleSheet, AsyncStorage, Text, Image } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { colors } from "../../../constants";
import { ListItem } from "../../../components/ListItem";
import { Icon } from "native-base";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class SideBar extends Component<Props, {}> {
  constructor(props) {
    super(props);
    (this.state = {
      values: ""
    }),
      AsyncStorage.getItem("userToken")
        .then(value => {
          //console.log(value);
          this.setState({ values: JSON.parse(value) });
        })
        .then(res => {
          console.log(this.state.values);
        });
  }
  render() {
    const { navigation } = this.props;
    let fTitle = "Welcome" + " " + `${this.state.values.firstName}`;
    return (
      <View style={styles.container}>
        <Image
          style={styles.sideMenuProfileIcon}
          source={require("../../../../assets/user-profile.jpg")}
        ></Image>
        <ListItem
          iconName={undefined}
          title={fTitle}
          onPress={() => navigation.navigate("AccountDetails")}
        ></ListItem>

        <ListItem
          iconName="home"
          title="Home"
          onPress={() => navigation.navigate("Home")}
        />
        <ListItem
          iconName="user"
          title="Account Details"
          onPress={() => navigation.navigate("AccountDetails")}
        />
        <ListItem
          iconName="motorcycle"
          title="My Vehicles"
          onPress={() => navigation.navigate("VehicleDetails")}
        />
        <ListItem
          iconName="cart-plus"
          title="My Orders "
          onPress={() => navigation.navigate("Orders")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg
  },
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SideBar;
