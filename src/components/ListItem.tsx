import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";
import { colors } from "../constants";
//import { Icon } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props extends TouchableOpacityProps {
  title: string;
  iconName: string;
}

export class ListItem extends Component<Props, {}> {
  render() {
    const { title } = this.props;
    return (
      <TouchableOpacity {...this.props} style={styles.itemContainer}>
        {this.props.iconName != undefined && this.props.iconName != "" && (
          <Icon name={this.props.iconName}></Icon>
        )}
        <Text style={styles.titleStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.containerBg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 10
  }
});
