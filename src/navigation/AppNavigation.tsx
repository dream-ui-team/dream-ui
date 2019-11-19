import React from "react";
import { createAppContainer,createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

import Home from "../screens/AppScreens/Home";
import Blank from "../screens/AppScreens/Blank";
import AddressDetails from "../screens/AppScreens/AddressDetails";
import VehicleDetails from "../screens/AppScreens/VehicleDetails";
import SideBar from "../screens/AppScreens/SideBar";
import Login from "../screens/AuthScreens/Login";
import AuthLoading from "../screens/AuthLoading";
import Registration from "../screens/AuthScreens/Registration";
import AccountDetails from "../screens/AppScreens/AccountDetails";

const MainStack = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

const RegistrationStack = createStackNavigator(
  {
    Registration: { screen: Registration }
  },
  {
    initialRouteName: "Registration",
    headerMode: "none"
  }
);

const AppStack = createDrawerNavigator(
  {
    MainStack: { screen: MainStack },
    AccountDetails: {screen: AccountDetails},
    Blank: { screen: Blank }
  },
  {
    drawerWidth: width - 50,
    drawerPosition: "left",
    contentComponent: props => <SideBar {...props} />
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      AuthStack: AuthStack,
      RegistrationStack: RegistrationStack,
      AppStack: AppStack,
      AddressDetails: { screen: AddressDetails },
      VehicleDetails: { screen: VehicleDetails }
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
