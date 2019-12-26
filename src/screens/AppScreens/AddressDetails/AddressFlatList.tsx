import React, { Component } from "react";
import { View } from "react-native";
import AddressListItem from "./AddressListItem";

interface UserAddress {
  userName: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
  mobileNumber: string;
}

class AddressFlatList extends Component<UserAddress, {}> {
  render() {
    return (
      <View>
        <AddressListItem label="Name" data={this.props.userName} />
        <AddressListItem label="Address Line1" data={this.props.addressLine1} />
        <AddressListItem label="Address Line2" data={this.props.addressLine2} />
        <AddressListItem label="State" data={this.props.state} />
        <AddressListItem label="City" data={this.props.city} />
        <AddressListItem label="Country" data={this.props.country} />
        <AddressListItem label="Pincode" data={this.props.pincode} />
        <AddressListItem label="Mobile No" data={this.props.mobileNumber} />
      </View>
    );
  }
}

export default AddressFlatList;
