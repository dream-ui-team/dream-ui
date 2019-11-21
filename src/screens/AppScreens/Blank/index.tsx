import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Header } from "../../../components";
import styles from "./styles";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
  page: number;
  limit: number;
}


class Blank extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20
    };
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header title="Blank" leftButtonPress={() => navigation.openDrawer()} />
        <ScrollView contentContainerStyle={styles.contentStyle}>
          <Text style={styles.textStyle}>Blank Page</Text>
        </ScrollView>
      </View>
    );
  }
}

export default Blank;
