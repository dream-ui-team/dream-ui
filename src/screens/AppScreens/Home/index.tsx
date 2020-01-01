import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  FlatList,
  Picker,
  Text,
  TouchableOpacity
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
      userId: ""
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
          serviceCentresBackup: res
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
    let places = this.state.places.map(p => {
      return (
        <Picker.Item
          key={p.locationId}
          label={p.locationName}
          value={p.locationId}
        />
      );
    });
    if (this.state.searchTerm != "") {
      var search = this.state.searchTerm.toString();
      var filteredPartners = this.state.partners.filter(function(partner) {
        return partner.name.toLowerCase().includes(search.toLowerCase());
      });
      this.state.partners = filteredPartners;
      this.state.searchTerm = "";
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
              this.setState({ selectedPlaceId: value });
              this.getServiceCentres(value);
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
                          userId: this.state.userId
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
              marginTop: 200,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center", // <-- the magic
              fontWeight: "bold",
              fontSize: 18
            }}
          >
            {"Please select a location from above drop down"}
          </Text>
        )}
      </View>
    );
  }
}

export default Home;
