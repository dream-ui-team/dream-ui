import React, { Component } from "react";
import { View, StyleSheet,AsyncStorage,Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { colors } from "../../../constants";
import { ListItem } from "../../../components/ListItem";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class SideBar extends Component<Props, {}> {
  constructor(props){
      super(props);
      this.state ={
        values:""
      },
      AsyncStorage.getItem('userToken').then((value) =>{
          //console.log(value);
          this.setState({values:JSON.parse(value)});
	        }).then(res => {
            console.log(this.state.values);
          });
 }
  render() {
    const { navigation } = this.props;
    let fTitle = "Welcome"+" "+`${this.state.values.firstName}`
    return (
      <View style={styles.container}>
        <ListItem title={fTitle}>
        </ListItem>
        <ListItem title="Home" onPress={() => navigation.navigate("Home")} />
        <ListItem
          title="Profile Details"
          onPress={() => navigation.navigate("ProfileDetails")}/>
        <ListItem
          title="Blank Page"
          onPress={() => navigation.navigate("Blank")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg
  }
});

export default SideBar;
