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
  userAddAddressService,
  userUpdateAddressService,
  logoutUserService
} from "../../../redux/services/user";
import { Input } from "../../../components";
import styles from "./styles";
import { Alert, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../../constants";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface UserAdress {
  userAddressId: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

class AddAddress extends Component<Props, State> {
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

  handleAddressChange = (values: UserAdress) => {
    const { navigation } = this.props;
    if (this.props.navigation.getParam("buttonText", "") == "Add Address") {
      userAddAddressService(
        values.addressLine1,
        values.addressLine2,
        values.country,
        values.state,
        values.city,
        values.pincode,
        this.state.loggedInUser.userId
      ).then(res => {
        if (res["errorCode"] == undefined || res["errorCode"] == "") {
          console.log("address added successfully");
          values.userAddressId = res["userAddressId"];
          const addAddressFunction = this.props.navigation.getParam(
            "addNewAddress",
            ""
          );
          addAddressFunction(values);
          Alert.alert("Address added Successfully");
          navigation.navigate("AddressDetails");
        } else {
          Alert.alert("Failed to add a address");
        }
      });
    } else {
      userUpdateAddressService(
        values.userAddressId,
        values.addressLine1,
        values.addressLine2,
        values.country,
        values.state,
        values.city,
        values.pincode,
        this.state.loggedInUser.userId
      ).then(res => {
        if (res["errorCode"] == undefined || res["errorCode"] == "") {
          console.log("address updated successfully");
          const updateAddressFunction = this.props.navigation.getParam(
            "updateAddress",
            ""
          );
          updateAddressFunction(values);
          Alert.alert("Address updated successfully");
          navigation.navigate("AddressDetails");
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
    navigation.navigate("AddressDetails");
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
                addressLine1: this.props.navigation.getParam(
                  "addressLine1",
                  ""
                ),
                addressLine2: this.props.navigation.getParam(
                  "addressLine2",
                  ""
                ),
                country: this.props.navigation.getParam("country", ""),
                state: this.props.navigation.getParam("state", ""),
                city: this.props.navigation.getParam("city", ""),
                pincode: this.props.navigation.getParam("pincode", ""),
                userAddressId: this.props.navigation.getParam(
                  "userAddressId",
                  ""
                )
              }}
              onSubmit={(values, { resetForm }) => {
                this.handleAddressChange(values);
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
                        >{`Address details`}</Text>
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <Text>Address Line1:</Text>
                      <Input
                        placeholder="AddressLine1"
                        value={props.values.addressLine1}
                        onChangeText={props.handleChange("addressLine1")}
                        error={
                          props.touched.addressLine1 &&
                          props.errors.addressLine1
                        }
                      />
                      <Text>Address Line2:</Text>
                      <Input
                        placeholder="AddressLine2"
                        value={props.values.addressLine2}
                        onChangeText={props.handleChange("addressLine2")}
                        error={
                          props.touched.addressLine2 &&
                          props.errors.addressLine2
                        }
                      />
                      <Text>City:</Text>
                      <Input
                        placeholder="City"
                        value={props.values.city}
                        onChangeText={props.handleChange("city")}
                        error={props.touched.city && props.errors.city}
                      />

                      <Text>State:</Text>
                      <Input
                        placeholder="State"
                        value={props.values.state}
                        onChangeText={props.handleChange("state")}
                        error={props.touched.state && props.errors.state}
                      />

                      <Text>Country:</Text>
                      <Input
                        placeholder="Country"
                        value={props.values.country}
                        onChangeText={props.handleChange("country")}
                        error={props.touched.country && props.errors.country}
                      />
                      <Text>Pincode:</Text>
                      <Input
                        placeholder="Pincode"
                        value={props.values.pincode}
                        onChangeText={props.handleChange("pincode")}
                        error={props.touched.pincode && props.errors.pincode}
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
export default AddAddress;
