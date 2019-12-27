import React, { Component } from "react";
import {
  View,
  FlatList,
  AsyncStorage,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import styles from "./styles";
import { CommonButton } from "../../../components";
import {
  logoutUserService,
  getUserAddressService,
  userDeleteAddressService
} from "../../../redux/services/user";
import { colors } from "../../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddressFlatList from "./AddressFlatList";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface MyProfileData {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  emailAddress: string;
  userId: string;
}

interface UserAdress {
  userAddressId: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
  mobileNumber: string;
}

interface AddressState {
  page: number;
  limit: number;
  values: MyProfileData;
  addresses: UserAdress[];
  refresh: boolean;
}

class AddressDetails extends Component<Props, AddressState> {
  constructor(props: Props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.addNewAddress = this.addNewAddress.bind(this);
    this.state = {
      page: 1,
      limit: 20,
      values: null,
      addresses: [],
      refresh: true
    };
  }

  addNewAddress(newAddress: UserAdress) {
    console.log("adding ..........");
    if (newAddress != undefined && newAddress != null) {
      let updatedAddress = this.state.addresses;
      updatedAddress.push(newAddress);
      this.setState({
        addresses: updatedAddress,
        refresh: !this.state.refresh
      });
    } else {
      console.log("naaa ..........");
    }
  }

  deleteAddress = item => {
    userDeleteAddressService(this.state.values.userId, item.userAddressId)
      .then(res => {
        console.log("Address Deleted successfully");
        this.componentDidMount();
      })
      .catch(console.log);
  };

  componentDidMount() {
    AsyncStorage.getItem("userToken")
      .then(value => {
        this.setState({ values: JSON.parse(value) });
      })
      .then(res => {
        console.log(this.state.values.userId);
        getUserAddressService(this.state.values.userId)
          .then(res => {
            this.setState({ addresses: res });
          })
          .catch(console.log);
      });
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  handleBackButtonClick() {
    this.props.navigation.navigate("AccountDetails");
    return true;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
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
            <Text style={styles1.headerTitle}>{`Address Details`}</Text>
          </View>
        </View>

        <View style={styles1.item_separator} />
        <FlatList
          data={this.state.addresses}
          extraData={this.state.refresh}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.addressContainer}>
              <AddressFlatList
                userName={`${this.state.values.firstName} ${this.state.values.lastName}`}
                addressLine1={item.addressLine1}
                addressLine2={item.addressLine2}
                city={item.city}
                state={item.state}
                country={item.country}
                pincode={item.pinCode}
                mobileNumber={this.state.values.mobileNumber}
              />

              <View style={{ marginTop: 10 }}></View>
              <View style={styles.addressContainerRow}>
                <View style={styles.updateButton}>
                  <CommonButton
                    text="Update"
                    onPress={() =>
                      this.props.navigation.navigate("AddAddress", {
                        details: item
                      })
                    }
                  />
                </View>
                <View style={styles.updateButton}>
                  <CommonButton
                    text="Delete"
                    onPress={() => this.deleteAddress(item)}
                  />
                </View>
              </View>
            </View>
          )}
        />
        <View style={styles1.container}>
          <Button
            title="Add New Address"
            color="#3F51B5"
            onPress={() =>
              navigation.navigate("AddAddress", {
                addNewAddress: this.addNewAddress
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
    //alignItems: "center"
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700"
  },
  rightContainer: {
    flex: 1
    //alignItems: "flex-end"
  },
  iconButton: {
    paddingHorizontal: 16
  }
});
export default AddressDetails;
