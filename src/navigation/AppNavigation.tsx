import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Dimensions } from "react-native";
import Home from "../screens/AppScreens/Home";
import Blank from "../screens/AppScreens/Blank";
import Orders from "../screens/AppScreens/Orders";
import AddressDetails from "../screens/AppScreens/AddressDetails";
import VehicleDetails from "../screens/AppScreens/VehicleDetails";
import SideBar from "../screens/AppScreens/SideBar";
import Login from "../screens/AuthScreens/Login";
import AuthLoading from "../screens/AuthLoading";
import Registration from "../screens/AuthScreens/Registration";
import AccountDetails from "../screens/AppScreens/AccountDetails";
import MyProfileDetails from "../screens/AppScreens/MyProfileDetails";
import AddAddress from "../screens/AppScreens/AddressDetails/AddAddress";
import ServiceCenterDetails from "../screens/AppScreens/Home/ServiceCenterDetails";
import OrderRequest from "../screens/AppScreens/Orders/OrderRequest";

const { width } = Dimensions.get("window");

// this stack will store every page in app
// except screen such as login/registration/forgot-password
const MainStack = createStackNavigator(
  {
    // key is used in navigation.navigate() function
    // key: component-name
    Home: Home,
    MyProfileDetails: MyProfileDetails,
    AddAddress: AddAddress,
    ServiceCenterDetails: ServiceCenterDetails,
    OrderRequest: OrderRequest
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

// this stack will have all pages related to
// user authentication
const AuthStack = createStackNavigator(
  {
    Login: Login,
    Registration: Registration
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

const AppStack = createDrawerNavigator(
  {
    MainStack: MainStack,
    AccountDetails: AccountDetails,
    VehicleDetails: VehicleDetails,
    AddressDetails: AddressDetails,
    Blank: Blank,
    Orders: Orders
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
      AppStack: AppStack,
      MainStack: MainStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
