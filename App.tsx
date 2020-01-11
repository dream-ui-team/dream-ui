import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import { Provider } from "react-redux";
import AppContainer from "./src/navigation/AppNavigation";
import configureStore from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Platform, StatusBar, View, Text } from "react-native";
import { colors } from "./src/constants";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return (
        <View>
          <Text> Still loading </Text>
        </View>
      );
    }
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: colors.primary
        }}
      >
        <Provider store={configureStore().store}>
          <PersistGate loading={null} persistor={configureStore().persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
