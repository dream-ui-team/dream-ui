import React, { Component } from "react";
import {
  View,
  FlatList,
  AsyncStorage,
  Text,
  StyleSheet,
  Button,
  Alert
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Header } from "../../../components";
import styles from "./styles";
import { CommonButton } from "../../../components";
import {
  logoutUserService,
  getAllUserVehicles
} from "../../../redux/services/user";
import { userDeleteVehicleService } from "../../../redux/services/VehicleService";
import { Vehicle } from "../../../redux/model/vehicle";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface itemProp {
  item: any;
}

interface State {
  page: number;
  limit: number;
  values: string;
  vehicles: [];
  refresh: boolean;
}

class VehicleDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.addNewVehicle = this.addNewVehicle.bind(this);
    this.updateVehicle = this.updateVehicle.bind(this);
    this.state = {
      page: 1,
      limit: 20,
      values: "",
      vehicles: [],
      refresh: true
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken")
      .then(value => {
        this.setState({ values: JSON.parse(value) });
      })
      .then(res => {
        console.log("User Id " + this.state.values.userId);
        getAllUserVehicles(this.state.values.userId)
          .then(res => {
            this.setState({
              vehicles: JSON.parse(res),
              refresh: !this.state.refresh
            });
            console.log(this.state.vehicles);
          })
          .catch(console.log);
      });
  }

  addNewVehicle(vehicle: Vehicle) {
    if (vehicle != undefined && vehicle != null) {
      let updatedVehicles = this.state.vehicles;
      updatedVehicles.push(vehicle);
      this.setState({
        vehicles: updatedVehicles,
        refresh: !this.state.refresh
      });
    } else {
      console.log("naaa ..........");
    }
  }

  updateVehicle(vehicle: Vehicle) {
    if (vehicle != undefined && vehicle != null) {
      let filteredVehicles = this.state.vehicles.filter(
        veh => veh.vehicleId != vehicle.vehicleId
      );
      filteredVehicles.push(vehicle);
      this.setState({
        vehicles: filteredVehicles,
        refresh: !this.state.refresh
      });
    } else {
      console.log("error: no address found to update");
    }
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  handleUpdate = vehicle => {
    const { navigation } = this.props;
    this.props.navigation.navigate("AddVehicle", {
      manufacturerName: vehicle.manufacturerName,
      model: vehicle.model,
      registrationNumber: vehicle.registrationNumber,
      userId: vehicle.userId,
      vehicleId: vehicle.vehicleId,
      vehicleTypeCode: vehicle.vehicleTypeCode,
      buttonText: "Update Vehicle",
      updateVehicle: this.updateVehicle
    });
  };
  handleDelete = vehicle => {
    const { navigation } = this.props;
    userDeleteVehicleService(this.state.values.userId, vehicle.vehicleId)
      .then(res => {
        if (res["errorCode"] == undefined || res["errorCode"] == "") {
          let filteredVehicles = this.state.vehicles.filter(
            veh => veh.vehicleId != vehicle.vehicleId
          );
          this.setState({
            vehicles: filteredVehicles,
            refresh: !this.state.refresh
          });
        } else {
          Alert.alert("failed to delete the address");
        }
      })
      .catch(console.log);
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title="My Vehicles"
          leftButtonPress={() => navigation.openDrawer()}
          rightButtonPress={() => this.handleLogout()}
        />
        {this.state.vehicles.length > 0 ? (
          <FlatList
            data={this.state.vehicles}
            extraData={this.state.refresh}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.vehicleContainer}>
                <View style={styles.vehicleContainerRow}>
                  <View style={styles.label}>
                    <Text style={styles.text}>Model</Text>
                  </View>
                  <View style={styles.data}>
                    <Text style={styles.text}>{item.model}</Text>
                  </View>
                </View>
                <View style={styles.vehicleContainerRow}>
                  <View style={styles.label}>
                    <Text style={styles.text}>Registration Nr</Text>
                  </View>
                  <View style={styles.data}>
                    <Text style={styles.text}>{item.registrationNumber}</Text>
                  </View>
                </View>
                <View style={styles.vehicleContainerRow}>
                  <View style={styles.label}>
                    <Text style={styles.text}>Manufacturer</Text>
                  </View>
                  <View style={styles.data}>
                    <Text style={styles.text}>{item.manufacturerName}</Text>
                  </View>
                </View>
                <View style={styles.vehicleContainerRow}>
                  <View style={styles.label}>
                    <Text style={styles.text}>Type</Text>
                  </View>
                  <View style={styles.data}>
                    <Text style={styles.text}>{item.vehicleTypeCode}</Text>
                  </View>
                </View>
                <View style={styles.vehicleContainerRow}>
                  <View style={styles.updateButton}>
                    <CommonButton
                      text="Update"
                      onPress={() => this.handleUpdate(item)}
                    />
                  </View>
                  <View style={styles.updateButton}>
                    <CommonButton
                      text="Delete"
                      onPress={() => this.handleDelete(item)}
                    />
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <View>
            <Text>Please Add your vehicle</Text>
          </View>
        )}
        <View style={styles1.container}>
          <Button
            title="Add New Vehicle"
            color="#3F51B5"
            onPress={() =>
              navigation.navigate("AddVehicle", {
                addNewVehicle: this.addNewVehicle,
                buttonText: "Add Vehicle"
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#68a0cf",
    backgroundColor: "white"
  }
});
export default VehicleDetails;
