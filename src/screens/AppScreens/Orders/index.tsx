import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, ActivityIndicator,StyleSheet,TouchableOpacity,Linking ,Picker} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Header } from "../../../components";
import styles from "./styles";
import { colors } from "../../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
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
	this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      page: 1,
      limit: 20
    };
  }
  
  handleBackButtonClick() {
      this.props.navigation.navigate("MainStack");
      return true;
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
         <View style={styles1.profileContainer}>
        <View style={styles1.leftContainer}>
          <TouchableOpacity style={styles1.iconButton} onPress={this.handleBackButtonClick}>
            <Icon name="arrow-back" size={24}  />
          </TouchableOpacity>
        </View>
        <View style={styles1.midContainer}>
          <Text style={styles1.headerTitle}>{`My Orders`}</Text>
        </View>
      </View>
        <ScrollView contentContainerStyle={styles.contentStyle}>
          <Text style={styles.textStyle}>My Orders</Text>
        </ScrollView>
      </View>
    );
  }
}
const styles1 = StyleSheet.create({
  container:{
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#68a0cf',
    backgroundColor:'white'
  },
item_text_style:
{
  fontSize: 20,
  color: '#000',
  padding: 5,
  marginLeft:10
},

item_separator:
{
  height: 1,
  width: '100%',
  backgroundColor: '#263238',
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
    flex:2.8 ,
	marginLeft:60
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
export default Blank;
