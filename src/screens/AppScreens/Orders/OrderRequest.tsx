import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Picker,
  Button
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";

import {
  logoutUserService,
  getAllUserVehicles,
  getPickupAndDropLocations
} from "../../../redux/services/user";
import { colors } from "../../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";

interface ParterDetails {
  partnerId: string;
  name: string;
  emailAddress: string;
  alternateMobileNumber: number;
  address: string;
  mobileNumber: number;
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface UserVehicle {
  vehicleId: string;
  model: string;
  registrationNumber: string;
  manufacturerName: string;
  vehicleTypeCode: number;
}

interface PickOrDropLocation {
  pickAndDropId: string;
  pickLocationName: string;
  dropLocationName: string;
}

interface OrderState {
  vehicles: UserVehicle[];
  pickOrDropLocations: PickOrDropLocation[];
  userId: String;
  selectedVehicleId: string;
  selectedPickupLocationId: string;
  selectedDropLocationId: string;
}

class OrderRequest extends Component<Props, OrderState> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      vehicles: [],
      pickOrDropLocations: [],
      userId: "",
      selectedVehicleId: "",
      selectedPickupLocationId: "",
      selectedDropLocationId: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const userId = navigation.getParam("userId", "");
    getAllUserVehicles(userId).then(res => {
      this.setState({ vehicles: JSON.parse(res), userId: userId });
    });
    this.findPickupAndDropLocations(navigation.getParam("locationId", ""));
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  handleBackButtonClick() {
    const { navigation } = this.props;
    navigation.navigate("MainStack");
    return true;
  }

  findPickupAndDropLocations(locationId: string) {
    getPickupAndDropLocations(locationId).then(res => {
      this.setState({ pickOrDropLocations: res });
    });
  }

  render() {
    const { navigation } = this.props;
    let serviceCenter = navigation.getParam("serviceCenter", "");
    if (serviceCenter == undefined || serviceCenter == "") {
      return <FailureView />;
    }

    let vehicles = [];
    /* Pushing first value*/
    vehicles.push(
      <Picker.Item key={"NULL"} label={"Select your vehicle"} value={"null"} />
    );

    /* Pushing all user vehicles*/
    const userVehicles = this.state.vehicles;
    for (var i = 0; i < userVehicles.length; i++) {
      vehicles.push(
        <Picker.Item
          key={userVehicles[i].vehicleId}
          label={
            userVehicles[i].manufacturerName +
            " " +
            userVehicles[i].model +
            ":" +
            userVehicles[i].registrationNumber
          }
          value={userVehicles[i].vehicleId}
        />
      );
    }

    let pickOrDropLocations = [];
    /* Pushing first value*/
    pickOrDropLocations.push(
      <Picker.Item key={"NULL"} label={"Select a location"} value={"null"} />
    );
    /* Pushing all user vehicles*/
    const locations = this.state.pickOrDropLocations;
    for (var i = 0; i < locations.length; i++) {
      let locationName =
        locations[i].pickLocationName == undefined ||
        locations[i].pickLocationName == ""
          ? locations[i].dropLocationName
          : locations[i].pickLocationName;
      pickOrDropLocations.push(
        <Picker.Item
          key={locations[i].pickAndDropId}
          label={locationName}
          value={locations[i].pickAndDropId}
        />
      );
    }

    return (
      <View style={styles.container}>
        {/*
          1. Display Service center name
          2. fetch and allow to pick vehicle to be serviced
               --> 2.1 check async storage
               --> 2.2 fetch from back end
               --> 2.3 if not found, redirect user to add vehicle page
          3. show services provided by partner and then allow user to select a service
             --> *** this should be done in home page only
          4.
             (** are we allowing user to desire pick up and drop locations or fixed set of pick up and drop
             location for first release?? )
             allow user to select a pick up and delivery locations
              --> 4.1 check async storage
              --> 4.2 fetch from back end
              --> 4.3 if not found, redirect user to add address page
         5. pick-up time
          */}
        <View style={styles.orderRequestContainer}>
          <View style={styles.leftContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={this.handleBackButtonClick}
            >
              <Icon name="arrow-back" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.midContainer}>
            <Text style={styles.headerTitle}>{`Service Request`}</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}></View>
        <View>
          {/* make service center name distinguishable*/}
          <Text style={styles.page_text}>
            Service center: {serviceCenter.name}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}></View>
        <View>
          <Text style={styles.page_text}>Select vehicle to service:</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.selectedVehicleId}
            onValueChange={(vehicleId, index) => {
              this.setState({ selectedVehicleId: vehicleId });
            }}
          >
            {vehicles}
          </Picker>
        </View>
        <View style={{ marginTop: 10 }}></View>
        <View>
          {/* fetch and display pick up location */}
          <Text style={styles.page_text}>
            Select location to pick your vehicle from:
          </Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.selectedPickupLocationId}
            onValueChange={(locationId, index) => {
              this.setState({ selectedPickupLocationId: locationId });
            }}
          >
            {pickOrDropLocations}
          </Picker>
        </View>
        <View style={{ marginTop: 10 }}></View>

        <View style={{ marginTop: 10 }}></View>
        <View>
          {/* fetch and display drop location */}
          <Text style={styles.page_text}>
            Select location to drop your vehicle to:
          </Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.selectedDropLocationId}
            onValueChange={(locationId, index) => {
              this.setState({ selectedDropLocationId: locationId });
            }}
          >
            {pickOrDropLocations}
          </Picker>
        </View>
        <View>
          {/* order placement button */}
          <Button
            title="Place service request"
            onPress={() => {
              console.log("Implement final order call");
              console.log("Selected vehicle:" + this.state.selectedVehicleId);
            }}
          />
        </View>
      </View>
    );
  }
}

function FailureView() {
  return <View>Failed select partner, please try again ...!!!</View>;
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#68a0cf",
    backgroundColor: "white"
  },
  page_text: {
    margin: 8,
    fontWeight: "bold",
    fontSize: 18
  },
  item_separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#263238"
  },
  orderRequestContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.containerBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start"
  },
  midContainer: {
    flex: 2.6,
    marginLeft: 20
    //alignItems: "center"
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700"
  },
  iconButton: {
    paddingHorizontal: 16
  },
  pickerStyle: {
    height: 50,
    width: "90%",
    color: "#344953",
    justifyContent: "center"
  },
  pickerContainer: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    margin: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center"
  }
});

export default OrderRequest;
