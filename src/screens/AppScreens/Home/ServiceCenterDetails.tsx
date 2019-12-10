import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Picker
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header, CommonButton } from "../../../components";
import styles from "./styles";
import { AvatarItem } from "../../../components";
import {
  logoutUserService,
  getAllLocationsService,
  getServiceCentresByLocationId,
  getCostSheet
} from "../../../redux/services/user";
import SearchInput, { createFilter } from "react-native-search-filter";
import { colors } from "../../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class ServiceCenterDetails extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.getServiceCentres = this.getServiceCentres.bind(this);
    (this.state = {
      locationId: "",
      locations: [],
      pickerList: [],
      serviceCentres: [],
      serviceCentresBackup: [],
      isNotNull: false,
      searchTerm: "",
      costSheet: [],
      url: false
    }),
      (this.state.serviceCentres = this.props.navigation.getParam(
        "details",
        "NULL"
      ));
  }

  searchUpdated(term) {
    this.state.serviceCentres = this.state.serviceCentresBackup;
    this.setState({ searchTerm: term });
  }

  getServiceCentres = () => {
    getCostSheet(this.state.serviceCentres.partnerId)
      .then(res => {
        this.setState({ costSheet: res });
        //Alert.alert(`${this.state.contacts.exists}`);
        console.log(this.state.costSheet);
        this.setState({ url: true });
      })
      .catch(console.log);
  };

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  handleBackButtonClick() {
    this.props.navigation.navigate("AppStack");
    return true;
  }

  render() {
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
            <Text style={styles1.headerTitle}>{`Service Center Details`}</Text>
          </View>
        </View>
        <View style={styles.homeContainer}>
          <View style={styles.homeContainerRow}>
            <Text style={styles.serviceDetailsText}>
              {this.state.serviceCentres.name}
            </Text>
          </View>
          <View style={styles.homeContainerRow}>
            <Text style={styles.serviceDetailsText}>
              {this.state.serviceCentres.address}
            </Text>
          </View>
          <View style={styles.homeContainerRow}>
            <Text style={styles.serviceDetailsText}>
              {this.state.serviceCentres.mobileNumber}
            </Text>
          </View>
          <View style={styles.homeContainerRow}>
            <Text style={styles.serviceDetailsText}>
              {this.state.serviceCentres.alternateMobileNumber}
            </Text>
          </View>
          <View style={styles.homeContainerRow}>
            <Text style={styles.serviceDetailsText}>
              {this.state.serviceCentres.emailAddress}
            </Text>
          </View>
        </View>
        <Text></Text>
        <View style={styles.homeContainer}>
          <View style={styles.homeContainerRow}>
            <Text style={{ marginTop: 6, marginBottom: 4 }}>
              {"Services offered by service center :"}
            </Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.pickerStyle}
              selectedValue={this.state.locationId}
            >
              <Picker.Item label={"Vehicle Servicing"} value={1} />
              <Picker.Item label={"Vehicle Repair"} value={2} />
              <Picker.Item label={"Vehicle Wash"} value={3} />
            </Picker>
          </View>
        </View>
        <Text></Text>
        <View style={styles.homeContainer}>
          <View style={styles.homeContainerRow}>
            <View style={styles.updateButton}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.getServiceCentres()}
              >
                <Text style={styles.buttonTextStyle}>{"See Costsheet"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.homeContainerRow}>
            {this.state.url ? (
              <Text
                style={{ color: "blue", marginTop: 20, fontSize: 15 }}
                onPress={() => Linking.openURL(this.state.costSheet.url)}
              >
                Download Costsheet
              </Text>
            ) : (
              <Text style={{ marginTop: 20, fontSize: 15 }}>{"No Data"}</Text>
            )}
          </View>
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
    flex: 2.8,
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
export default ServiceCenterDetails;
