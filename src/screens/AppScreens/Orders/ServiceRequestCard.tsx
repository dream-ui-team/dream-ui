import React, { Component } from "react";
import { View } from "react-native";
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
class ServiceRequestCard extends Component<Props, {}> {
  render() {
    return (
      <Card>
        <CardItem header>
          <Text>Service Request Details</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Type: {this.props.serviceRequestResponse.serviceType}</Text>
            <Text>
              Status:{" "}
              {this.props.serviceRequestResponse.orderStatus.toLowerCase()}
            </Text>
          </Body>
        </CardItem>
        <CardItem header>
          <Text>Service Center Details</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Name: {this.props.serviceRequestResponse.partner.name}</Text>
            <Text>
              Contact number:{" "}
              {this.props.serviceRequestResponse.partner.mobileNumber}
            </Text>
            <Text>
              Alternate contact number:{" "}
              {this.props.serviceRequestResponse.partner.alternateMobileNumber}
            </Text>
            <Text>
              Email: {this.props.serviceRequestResponse.partner.emailAddress}
            </Text>
          </Body>
        </CardItem>
        <CardItem header>
          <Text>Vehicle Details</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              Vehicle:{" "}
              {this.props.serviceRequestResponse.vehicle.manufacturerName +
                " " +
                this.props.serviceRequestResponse.vehicle.model +
                ":" +
                this.props.serviceRequestResponse.vehicle.registrationNumber}
            </Text>
            <Text>
              Pick up time:{" "}
              {this.props.serviceRequestResponse.vehiclePickUpTime}
            </Text>
            <Text>
              Estimated delivery time:{" "}
              {this.props.serviceRequestResponse.endTime}
            </Text>
            <Text>
              Estimated cost: {this.props.serviceRequestResponse.estimatedCost}
            </Text>
            <Text>
              Payment mode: {this.props.serviceRequestResponse.paymentMode}
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
export default ServiceRequestCard;
