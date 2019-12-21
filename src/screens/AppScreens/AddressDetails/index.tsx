import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "./styles";
import { AvatarItem, Input, CommonButton } from "../../../components";
import {
  logoutUserService,
  getUserAddressService,
  userDeleteAddressService
} from "../../../redux/services/user";
import { NavigationEvents } from "react-navigation";
import { colors } from "../../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface itemProp {
  item: any;
}

class AddressDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    //this.updateAddress = this.updateAddress.bind(this);
    this.state = {
      page: 1,
      limit: 20,
      values: "",
      addresses: []
    };
  }

  deleteAddress = item => {
    userDeleteAddressService(this.state.values.userId, item.userAddressId)
      .then(res => {
        //this.setState({ addresses: res });
        console.log("Address Deleted successfully");
        this.componentDidMount();
      })
      .catch(console.log);
  };

  componentDidMount() {
    console.log("mounted");
    AsyncStorage.getItem("userToken")
      .then(value => {
        this.setState({ values: JSON.parse(value) });
      })
      .then(res => {
        console.log(this.state.values.userId);
        getUserAddressService(this.state.values.userId)
          .then(res => {
            this.setState({ addresses: res });
            console.log(this.state.addresses);
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
            <Text style={styles1.headerTitle}>{`Profile Details`}</Text>
          </View>
        </View>
        <View style={styles1.container}>
          <Button
            title="Add New Address"
            color="#3F51B5"
            onPress={() => navigation.navigate("AddAddress")}
          />
        </View>
        <View style={styles1.item_separator} />
        <FlatList
          data={this.state.addresses}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.addressContainer}>
              <View style={styles.addressContainerRow}>
                <View style={styles.label}>
                  <Text style={styles.text}>Name:</Text>
                </View>
                <View style={styles.data}>
                  <Text
                    style={styles.text}
                  >{`${this.state.values.firstName} ${this.state.values.lastName}`}</Text>
                </View>
              </View>
              <View style={styles.addressContainerRow}>
                <View style={styles.label}>
                  <Text style={styles.text}>Address Line1:</Text>
                </View>
                <View style={styles.data}>
                  <Text style={styles.text}>{item.addressLine1}</Text>
                </View>
              </View>
              <View style={styles.addressContainerRow}>
                <View style={styles.label}>
                  <Text style={styles.text}>Address Line2:</Text>
                </View>
                <View style={styles.data}>
                  <Text style={styles.text}>{item.addressLine2}</Text>
                </View>
              </View>
              <View style={styles.addressContainerRow}>
                <View style={styles.label}>
                  <Text style={styles.text}>State:</Text>
                </View>
                <View style={styles.data}>
                  <Text style={styles.text}>{item.state}</Text>
                </View>
              </View>
              <View style={styles.addressContainerRow}>
                <View style={styles.label}>
                  <Text style={styles.text}>City:</Text>
                </View>
                <View style={styles.data}>
                  <Text style={styles.text}>{item.city}</Text>
                </View>
              </View>
              <View style={styles.addressContainerRow}>
                <View style={styles.label}>
                  <Text style={styles.text}>Country:</Text>
                </View>
                <View style={styles.data}>
                  <Text
                    style={styles.text}
                  >{`${item.country}-${item.pinCode}`}</Text>
                </View>
              </View>
              <View style={styles.addressContainerRow}>
                <View style={styles.label}>
                  <Text style={styles.text}>Mobile No:</Text>
                </View>
                <View style={styles.data}>
                  <Text style={styles.text}>
                    {this.state.values.mobileNumber}
                  </Text>
                </View>
              </View>
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
