import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Picker,
  Button,
  Platform,
  Alert,
  ScrollView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import {
  logoutUserService,
  getAllUserVehicles,
  getPickupAndDropLocations,
  getPartnerPaymentMode
} from "../../../redux/services/user";
import { colors } from "../../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface ParterDetails {
  partnerId: string;
  name: string;
  emailAddress: string;
  alternateMobileNumber: number;
  address: string;
  mobileNumber: number;
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

interface PaymentMode {
  id: string;
  paymentMode: string;
  details: string;
}

interface OrderState {
  vehicles: UserVehicle[];
  pickOrDropLocations: PickOrDropLocation[];
  paymentModes: PaymentMode[];
  userId: String;
  selectedVehicleId: string;
  selectedPickupLocationId: string;
  selectedDropLocationId: string;
  selectedPaymentModeId: string;
  vehiclePickupTime: Date;
  showVehiclePickupTimer: boolean;
}

class OrderRequest extends Component<Props, OrderState> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      vehicles: [],
      pickOrDropLocations: [],
      paymentModes: [],
      userId: "",
      selectedVehicleId: "",
      selectedPickupLocationId: "",
      selectedDropLocationId: "",
      selectedPaymentModeId: "",
      vehiclePickupTime: new Date(),
      showVehiclePickupTimer: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    const userId = navigation.getParam("userId", "");
    getAllUserVehicles(userId).then(res => {
      this.setState({ vehicles: JSON.parse(res), userId: userId });
    });

    const locationId = navigation.getParam("locationId", "");
    getPickupAndDropLocations(locationId).then(res => {
      this.setState({ pickOrDropLocations: res });
    });

    const serviceCenter = navigation.getParam("serviceCenter", "");
    getPartnerPaymentMode(serviceCenter.partnerId).then(paymentModes => {
      this.setState({ paymentModes: paymentModes });
    });
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  handleBackButtonClick() {
    const { navigation } = this.props;
    navigation.navigate("Home");
    return true;
  }

  setVehiclePickupTimer = (event, date) => {
    date = date || this.state.vehiclePickupTime;
    this.setState({
      showVehiclePickupTimer: Platform.OS === "ios" ? true : false,
      vehiclePickupTime: date
    });
  };

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

    let paymentModes = [];
    /* Pushing first value*/
    paymentModes.push(
      <Picker.Item
        key={"NULL"}
        label={"Select a payment mode"}
        value={"null"}
      />
    );
    const partnerPaymentModes = this.state.paymentModes;
    for (var i = 0; i < partnerPaymentModes.length; i++) {
      paymentModes.push(
        <Picker.Item
          key={partnerPaymentModes[i].id}
          label={partnerPaymentModes[i].paymentMode}
          value={partnerPaymentModes[i].id}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.orderRequestContainer}>
          {/* back button*/}
          <View style={styles.leftContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={this.handleBackButtonClick}
            >
              <Icon name="arrow-back" size={24} />
            </TouchableOpacity>
          </View>

          {/* Header title*/}
          <View style={styles.midContainer}>
            <Text style={styles.headerTitle}>{`Service Request`}</Text>
          </View>
        </View>
        <ScrollView>
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
         6. payment modes
          */}

            <View style={{ marginTop: 10 }}></View>

            {/* Service center details*/}
            <View>
              {/* make service center name distinguishable*/}
              <Text style={styles.page_text}>
                Service center: {serviceCenter.name}
              </Text>
            </View>
            <View style={{ marginTop: 10 }}></View>

            {/* User vehicles drop down*/}
            <View>
              <Text style={styles.page_text}>Choose your vehicle:</Text>
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
            <View>
              <Text style={{ textAlign: "center", fontSize: 18 }}>OR</Text>
            </View>
            <View style={styles.addVehicleButton}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Implement me : I should able to add a new vehicle"
                  );
                }}
              >
                <Text>Add new vehicle</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 10 }}></View>

            {/* fetch and display pick up location */}
            <View>
              <Text style={styles.page_text}>Pickup location:</Text>
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

            {/* fetch and display drop location */}
            <View>
              <Text style={styles.page_text}>Drop location:</Text>
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
            <View style={{ marginTop: 10 }}></View>
            {/* vehicle pick up time  */}
            <View style={styles.pickupTimeContainer}>
              <View style={styles.pickupTimeLeftContainer}>
                <Text style={styles.page_text}>Vehicle pick up time:</Text>
              </View>
              <View style={styles.pickupTimeRightContainer}>
                <Button
                  title="Fix me"
                  onPress={() => {
                    this.setState({ showVehiclePickupTimer: true });
                  }}
                />
                {this.state.showVehiclePickupTimer && (
                  <DateTimePicker
                    value={this.state.vehiclePickupTime}
                    onChange={this.setVehiclePickupTimer}
                  />
                )}
              </View>
            </View>

            <View style={{ marginTop: 10 }}></View>

            {/* fetch and display partner's payment modes */}
            <View>
              <Text style={styles.page_text}>Payment mode:</Text>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.selectedPaymentModeId}
                onValueChange={(paymentModeId, index) => {
                  this.setState({ selectedPaymentModeId: paymentModeId });
                }}
              >
                {paymentModes}
              </Picker>
            </View>

            <View style={{ marginTop: 10 }}></View>
            {/* order placement button */}
            <View style={styles.submitButton}>
              <TouchableOpacity
                onPress={() => {
                  console.log("Implement final order call");
                  console.log(
                    "Selected vehicle:" + this.state.selectedVehicleId
                  );
                }}
              >
                <Text>Place service request</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 100 }}></View>
        </ScrollView>
      </View>
    );
  }
}

function FailureView() {
  return <View>Failed select partner, please try again ...!!!</View>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#68a0cf",
    backgroundColor: "white"
  },
  page_text: {
    margin: 8,
    fontWeight: "bold",
    fontSize: 16
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
    margin: 10,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    fontSize: 16
  },
  pickupTimeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.containerBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor
  },
  pickupTimeLeftContainer: {
    flex: 3,
    alignItems: "flex-start"
  },
  pickupTimeRightContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 20
    //alignItems: "center"
  },
  addVehicleButton: {
    borderRadius: 8,
    flex: 1,
    backgroundColor: "#317cd4",
    height: 40,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  submitButton: {
    borderRadius: 8,
    flex: 1,
    backgroundColor: "#317cd4",
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default OrderRequest;
