import React, { Component } from "react";
import { View, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import {
  logoutUserService,
  getAllServiceRequestsByUserId
} from "../../../redux/services/user";
import { colors } from "../../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Right,
  Button,
  Title
} from "native-base";
import ServiceRequestCard from "./ServiceRequestCard";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface UserDetails {
  firstName: string;
  lastName: string;
}

interface PartnerDetails {
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

interface ServiceRequestResponse {
  orderId: string;
  user: UserDetails;
  partner: PartnerDetails;
  vehicle: UserVehicle;
  estimatedCost: number;
  finalCost: number;
  paymentMode: string;
  endTime: Date;
  vehiclePickUpTime: Date;
  orderStatus: string;
  serviceType: string;
}

interface ServiceHistoryState {
  serviceRequests: ServiceRequestResponse[];
  show: boolean;
  userId: string;
}

class ServiceHistory extends Component<Props, ServiceHistoryState> {
  constructor(props: Props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      serviceRequests: [],
      show: false,
      userId: ""
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("userToken").then(value => {
      let user = JSON.parse(value);
      const userId = user["userId"];
      getAllServiceRequestsByUserId(userId).then(response => {
        this.setState({ serviceRequests: response });
      });
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
  render() {
    const { navigation } = this.props;
    let serviceRequestList = [];
    const { serviceRequests } = this.state;
    if (serviceRequests.length > 0) {
      for (var i = 0; i < serviceRequests.length; i++) {
        serviceRequestList.push(
          <ServiceRequestCard serviceRequestResponse={serviceRequests[i]} />
        );
      }
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.handleBackButtonClick}>
              <Icon name="arrow-back" size={24} />
            </Button>
          </Left>
          <Body>
            <Title>My Service Requests</Title>
          </Body>
          <Right />
        </Header>
        <Content>{serviceRequestList}</Content>
      </Container>
    );
  }
}

function FailureView() {
  return (
    <View>
      <Text>Failed select partner, please try again ...!!!</Text>
    </View>
  );
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
    marginLeft: 60
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
export default ServiceHistory;
