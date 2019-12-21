import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

interface Details {
  data: string;
  label: string;
}

class PartnerItem extends Component<Details, {}> {
  render() {
    return (
      <View style={styles.homeContainerRow}>
        <View style={styles.label}>
          <Text style={styles.text}>{this.props.label}:</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>{this.props.data}</Text>
        </View>
      </View>
    );
  }
}

export default PartnerItem;
