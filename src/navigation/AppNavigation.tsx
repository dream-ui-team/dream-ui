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
import MyProfileDetails from "../screens/AppScreens/MyProfileDetails";
import AddAddress from "../screens/AppScreens/AddressDetails/AddAddress";
import ServiceCenterDetails from "../screens/AppScreens/Home/ServiceCenterDetails";
import OrderRequest from "../screens/AppScreens/Home/OrderRequest";

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

const MyProfileDetailsStack = createStackNavigator(
  {
    MyProfileDetails: { screen: MyProfileDetails }
  },
  {
    initialRouteName: "MyProfileDetails",
    headerMode: "none"
  }
);

const AppStack = createDrawerNavigator(
  {
    MainStack: { screen: MainStack },
    AccountDetails: { screen: AccountDetails},
    VehicleDetails: { screen: VehicleDetails },
    AddressDetails: { screen: AddressDetails },
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
      MyProfileDetails: MyProfileDetails,
      AppStack: AppStack,
	  AddAddress:{screen:AddAddress},
	  ServiceCenterDetails:{screen:ServiceCenterDetails},
	  OrderRequest:{screen:OrderRequest}
      
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
