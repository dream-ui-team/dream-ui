import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { logoutUserService } from "../../../redux/services/user";
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

interface OrderSummaryState {
  serviceRequestResponse: ServiceRequestResponse;
  show: boolean;
}

class OrderSummary extends Component<Props, OrderSummaryState> {
  constructor(Props) {
    super(Props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      serviceRequestResponse: {},
      show: false
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    let serviceReqResponse = navigation.getParam("response", "");
    this.setState({
      serviceRequestResponse: serviceReqResponse,
      show: true
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
    if (!this.state.show) {
      return <FailureView />;
    }
    const { serviceRequestResponse } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.handleBackButtonClick}>
              <Icon name="arrow-back" size={24} />
            </Button>
          </Left>
          <Body>
            <Title>Order Summary</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>
            <CardItem header>
              <Text>Service Request Details</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Type: {serviceRequestResponse.serviceType}</Text>
                <Text>
                  Status: {serviceRequestResponse.orderStatus.toLowerCase()}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Service Center Details</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Name: {serviceRequestResponse.partner.name}</Text>
                <Text>
                  Contact number: {serviceRequestResponse.partner.mobileNumber}
                </Text>
                <Text>
                  Alternate contact number:{" "}
                  {serviceRequestResponse.partner.alternateMobileNumber}
                </Text>
                <Text>
                  Email: {serviceRequestResponse.partner.emailAddress}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Vehicle Details</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Vehicle:{" "}
                  {serviceRequestResponse.vehicle.manufacturerName +
                    " " +
                    serviceRequestResponse.vehicle.model +
                    ":" +
                    serviceRequestResponse.vehicle.registrationNumber}
                </Text>
                <Text>
                  Pick up time: {serviceRequestResponse.vehiclePickUpTime}
                </Text>
                <Text>
                  Estimated delivery time: {serviceRequestResponse.endTime}
                </Text>
                <Text>
                  Estimated cost: {serviceRequestResponse.estimatedCost}
                </Text>
                <Text>Payment mode: {serviceRequestResponse.paymentMode}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
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
  leftContainer: {
    flex: 1,
    alignItems: "flex-start"
  },
  midContainer: {
    flex: 2.6,
    marginLeft: 20
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700"
  },
  iconButton: {
    paddingHorizontal: 16
  },
  orderSummaryContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.containerBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor
  }
});

export default OrderSummary;
