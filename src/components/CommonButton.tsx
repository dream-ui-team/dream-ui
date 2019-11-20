import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps
} from "react-native";
import { colors } from "../constants";

interface Props extends TouchableOpacityProps {
  text: string;
}

export class CommonButton extends Component<Props, {}> {
  render() {
    const { text } = this.props;
    return (
      <TouchableOpacity {...this.props} style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.primary,
    height: 20,
    width: 70,
    alignItems: "center",
    borderRadius: 4
  },
  buttonTextStyle: {
    color: colors.containerBg,
    fontSize: 14
  }
});
