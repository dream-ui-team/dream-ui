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
import AddVehicle from "../screens/AppScreens/VehicleDetails/AddVehicle";
import SideBar from "../screens/AppScreens/SideBar";
import AuthLoading from "../screens/AuthLoading";
import Registration from "../screens/AuthScreens/Registration/Register";
import AccountDetails from "../screens/AppScreens/AccountDetails";
import AddAddress from "../screens/AppScreens/AddressDetails/AddAddress";
import ServiceCenterDetails from "../screens/AppScreens/Home/ServiceCenterDetails";
import OrderRequest from "../screens/AppScreens/Orders/OrderRequest";
import OrderSummary from "../screens/AppScreens/Orders/OrderSummary";
import UserProfileDetails from "../screens/AppScreens/MyProfileDetails/UserProfileDetails";
import LoginPage from "../screens/AuthScreens/Login/Login";
const { width } = Dimensions.get("window");

// this stack will store every page in app
// except screen such as login/registration/forgot-password
const MainStack = createStackNavigator(
  {
    // key is used in navigation.navigate() function
    // key: component-name
    Home: Home,
    AddAddress: AddAddress,
    ServiceCenterDetails: ServiceCenterDetails,
    OrderRequest: OrderRequest,
    OrderSummary: OrderSummary,
    AddVehicle: AddVehicle,
    UserProfileDetails: UserProfileDetails,
    VehicleDetails: VehicleDetails
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
    LoginPage: LoginPage,
    Registration: Registration
  },
  {
    initialRouteName: "LoginPage",
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
