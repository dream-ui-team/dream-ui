import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import {
    userAddVehicleService,
    userUpdateVehicleService
} from "../../../redux/services/VehicleService";

import {
    logoutUserService
  } from "../../../redux/services/user";
import { Input } from "../../../components";
import styles from "./styles";
import { Alert, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../../constants";
import { Vehicle } from "../../../redux/model/vehicle";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}


class AddVehicle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      loggedInUser: ""
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken")
      .then(value => {
        this.setState({ loggedInUser: JSON.parse(value) });
      })
      .then(res => {
        console.log(this.state.loggedInUser.userId);
      });
  }

  handleVehicleChange = (values: Vehicle) => {
    const { navigation } = this.props;
    console.log( this.props );

    if (this.props.navigation.getParam("buttonText", "") == "Add Vehicle") {
      userAddVehicleService(
        values.manufacturerName,
        values.model,
        values.registrationNumber,
        this.state.loggedInUser.userId,
        values.vehicleId,
        values.vehicleTypeCode 
      ).then(res => {
        if (res!= undefined && (res["errorCode"] == undefined || res["errorCode"] == "")) {
          console.log("address added successfully");
          values.vehicleId = res["vehicleId"];
          const addVehicleFunction = this.props.navigation.getParam(
            "addNewVehicle",
            ""
          );
          addVehicleFunction(values);
          Alert.alert("Address added Successfully");
          navigation.navigate("VehicleDetails");
        } else {
          Alert.alert("Failed to add a address");
        }
      });
    } else {
      userUpdateVehicleService(
        values.manufacturerName,
        values.model,
        values.registrationNumber,
        this.state.loggedInUser.userId,
        values.vehicleId,
        values.vehicleTypeCode 
      ).then(res => {
        if (res != undefined && (res["errorCode"] == undefined || res["errorCode"] == "")) {
          console.log("address updated successfully");
          const updateVehicleFunction = this.props.navigation.getParam(
            "updateVehicle",
            ""
          );
          updateVehicleFunction(values);
          Alert.alert("Address updated successfully");
          navigation.navigate("VehicleDetails");
        } else {
          Alert.alert("Failed to update a address");
        }
      });
    }
  };

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  handleBackButtonClick() {
    const { navigation } = this.props;
    navigation.navigate("VehicleDetails");
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              enableReinitialize
              initialValues={{
                manufacturerName: this.props.navigation.getParam(
                  "manufacturerName",
                  ""
                ),
                model: this.props.navigation.getParam(
                  "model",
                  ""
                ),
                registrationNumber: this.props.navigation.getParam("registrationNumber", ""),
                vehicleTypeCode: this.props.navigation.getParam("vehicleTypeCode", "").toString(),
                userId: this.props.navigation.getParam(
                  "userId",
                  ""
                ),
                vehicleId:this.props.navigation.getParam("vehicleId", ""),
              }}
              onSubmit={(values, { resetForm }) => {
                this.handleVehicleChange(values);
                resetForm();
              }}
            >
              {props => {
                return (
                  <View>
                    <View style={styles1.profileContainer}>
                      <View style={styles1.leftContainer}>
                        <TouchableOpacity
                          style={styles1.iconButton}
                          onPress={this.handleBackButtonClick}
                        >
                          <Icon name="arrow-back" size={24} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles1.midContainer}>
                        <Text
                          style={styles1.headerTitle}
                        >{`Vehicle details`}</Text>
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <Text>Manufacturer Name:</Text>
                      <Input
                        placeholder="Manufacturer Name"
                        value={props.values.manufacturerName}
                        onChangeText={props.handleChange("manufacturerName")}
                        error={
                          props.touched.manufacturerName &&
                          props.errors.manufacturerName
                        }
                      />
                      <Text>Model:</Text>
                      <Input
                        placeholder="Model"
                        value={props.values.model}
                        onChangeText={props.handleChange("model")}
                        error={
                          props.touched.model &&
                          props.errors.model
                        }
                      />
                      <Text>Registration Number:</Text>
                      <Input
                        placeholder="Registration Number"
                        value={props.values.registrationNumber}
                        onChangeText={props.handleChange("registrationNumber")}
                        error={props.touched.registrationNumber && props.errors.registrationNumber}
                      />

                      <Text>Vehicle Type:</Text>
                      <Input
                        placeholder="Vehicle Type"
                        value={props.values.vehicleTypeCode}
                        onChangeText={props.handleChange("vehicleTypeCode")}
                        error={props.touched.vehicleTypeCode && props.errors.vehicleTypeCode}
                      />
                      <View style={styles1.ButtonContainer}>
                        <Button
                          title={this.props.navigation.getParam(
                            "buttonText",
                            ""
                          )}
                          color="#3F51B5"
                          onPress={props.handleSubmit}
                        />
                      </View>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  container: {
    margin: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#68a0cf",
    backgroundColor: "white"
  },
  item_text_style: {
    fontSize: 20,
    color: "#000",
    padding: 5,
    marginLeft: 10
  },

  item_separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#263238"
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    width: "50%",
    height: 40,
    justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 10
    //backgroundColor:'#3F51B5'
  },
  profileContainer: {
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
    flex: 2,
    marginLeft: 20
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700"
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  iconButton: {
    paddingHorizontal: 16
  }
});
export default AddVehicle;
