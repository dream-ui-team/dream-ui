import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  FlatList,
  Picker,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Header } from "../../../components";
import styles from "./styles";
import PartnerItem from "./PartnerItem";

import {
  logoutUserService,
  getAllLocationsService,
  getServiceCentresByLocationId
} from "../../../redux/services/user";

import SearchInput from "react-native-search-filter";

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

interface HomeState {
  serviceCentresBackup: [];
  partners: ParterDetails[];
  places: Place[];
  selectedPlaceId: string;
  searchTerm: string;
  userId: string;
  modalVisible: boolean;
  showActivityIndicator: boolean;
}

interface Place {
  locationId: string;
  locationName: string;
}

class Home extends Component<Props, HomeState> {
  constructor(props) {
    super(props);
    this.getServiceCentres = this.getServiceCentres.bind(this);
    (this.state = {
      serviceCentresBackup: [],
      partners: [],
      places: [],
      selectedPlaceId: "",
      searchTerm: "",
      userId: "",
      modalVisible: false,
      showActivityIndicator: false
    }),
      AsyncStorage.getItem("userToken").then(value => {
        const userValues = JSON.parse(value);
        this.state.userId = userValues.userId;
      });
    getAllLocationsService()
      .then(res => {
        this.setState({ places: res });
      })
      .catch(console.log);
  }

  searchUpdated(term) {
    this.setState({
      searchTerm: term,
      partners: this.state.serviceCentresBackup
    });
  }

  getServiceCentres(placeId: string) {
    getServiceCentresByLocationId(placeId)
      .then(res => {
        this.setState({
          partners: res,
          serviceCentresBackup: res,
          modalVisible: false,
          showActivityIndicator: false
        });
      })
      .catch(console.log);
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  render() {
    const { navigation } = this.props;
    let places = [];
    places.push(
      <Picker.Item
        key="do_not_pull_data"
        label="Select Your Area"
        value="do_not_pull_data"
      />
    );

    let tempPlaces = this.state.places;
    for (var i = 0; i < tempPlaces.length; i++) {
      places.push(
        <Picker.Item
          key={tempPlaces[i].locationId}
          label={tempPlaces[i].locationName}
          value={tempPlaces[i].locationId}
        />
      );
    }
    if (this.state.searchTerm != "") {
      var search = this.state.searchTerm.toString();
      var filteredPartners = this.state.partners.filter(function(partner) {
        return partner.name.toLowerCase().includes(search.toLowerCase());
      });
      this.state.partners = filteredPartners;
      this.state.searchTerm = "";
    }

    let displayText = "";
    if (this.state.selectedPlaceId == "do_not_pull_data") {
      displayText = "Select your location from above drop down";
    } else {
      displayText = "Sorry, currently we are not serving at selected location";
    }

    return (
      <View style={styles.container}>
        {/* We should add one more picker here to select the type of service
          user wants to use. e.g servicing, washing, repair.
          Then we should fetch service centers based on locationId and service type
          */}
        <Header
          title="Home"
          leftButtonPress={() => navigation.openDrawer()}
          rightButtonPress={() => this.handleLogout()}
        />
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.selectedPlaceId}
            onValueChange={(value, index) => {
              if (value != "do_not_pull_data") {
                this.setState({
                  selectedPlaceId: value,
                  modalVisible: true,
                  showActivityIndicator: true
                });
                this.getServiceCentres(value);
              } else {
                this.setState({
                  selectedPlaceId: value
                });
              }
            }}
          >
            {places}
          </Picker>
        </View>
        <SearchInput
          onChangeText={term => {
            this.searchUpdated(term);
          }}
          style={styles.searchInput}
          placeholder="Enter service centre name"
        />
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.activityIndicator}>
            <ActivityIndicator
              size="large"
              color="#8acefa"
              animating={this.state.showActivityIndicator}
            />
          </View>
        </Modal>
        {this.state.partners.length > 0 ? (
          <FlatList
            data={this.state.partners}
            keyExtractor={item => item.partnerId}
            renderItem={({ item }) => (
              <View style={styles.homeContainer}>
                <PartnerItem label="Name" data={item.name} />
                <PartnerItem label="Address" data={item.address} />
                <PartnerItem label="Email Address" data={item.emailAddress} />
                <PartnerItem
                  label="Contact No.1"
                  data={item.mobileNumber.toString()}
                />
                <PartnerItem
                  label="Contact No.2"
                  data={item.alternateMobileNumber.toString()}
                />
                <View style={{ marginTop: 10 }}></View>
                <View style={styles.homeContainerRow}>
                  <View style={styles.updateButton}>
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={() =>
                        navigation.navigate("ServiceCenterDetails", {
                          details: item
                        })
                      }
                    >
                      <Text style={styles.buttonTextStyle}>
                        {"Show Details"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.deleteButton}>
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      onPress={() =>
                        navigation.navigate("OrderRequest", {
                          serviceCenter: item,
                          userId: this.state.userId,
                          locationId: this.state.selectedPlaceId
                        })
                      }
                    >
                      <Text style={styles.buttonTextStyle}>
                        {"Place Request"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <Text
            style={{
              marginTop: 190,
              marginLeft: 10,
              marginRight: 10,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18
            }}
          >
            {displayText}
          </Text>
        )}
      </View>
    );
  }
}

export default Home;
