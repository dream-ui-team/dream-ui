import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Container,
Header,
Content,
Card,
CardItem,
Body,
Text,
Left,
Right,
Button,
Title,
Icon } from 'native-base';
import { NavigationScreenProp, NavigationState } from "react-navigation";
//import { Header } from "../../../components";
import { AsyncStorage } from "react-native";
import { logoutUserService } from "../../../redux/services/user";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class AccountDetails extends Component<Props, { myProfileData }> {
  constructor(props) {
    super(props);
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      myProfileData: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(value => {
      this.setState({ myProfileData: JSON.parse(value) });
    });
  }
  handleBackButtonClick() {
    const { navigation } = this.props;
    navigation.navigate("Home");
    return true;
  }
  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
      <Header>
        <Left>
          <Button transparent onPress={this.handleBackButtonClick}>
            <Icon name="arrow-back" size={24} />
          </Button>
        </Left>
        <Body>
          <Title styles={{paddingLeft:15}}>My Account details</Title>
        </Body>
        <Right />
      </Header>
       <Content>
         <Card>
           <CardItem>
             <Icon active name="person" />
             <Text>My Profile</Text>
             <Right>
               <Icon name="arrow-forward"   onPress={() =>
                   navigation.navigate("MyProfileDetails", {
                     values: this.state.myProfileData
                   })
                 }/>
             </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Icon active name="home" />
              <Text>My Address</Text>
              <Right>
                <Icon name="arrow-forward"    onPress={() => this.props.navigation.navigate("AddressDetails")}/>
              </Right>
             </CardItem>
           </Card>
           <Card>
             <CardItem>
               <Icon active name="car" />
               <Text>My Vehicles</Text>
               <Right>
                 <Icon name="arrow-forward"   onPress={() => navigation.navigate("VehicleDetails")}/>
               </Right>
              </CardItem>
            </Card>
       </Content>
     </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10
  },
  AddressButton: {
    alignItems: "center",
    backgroundColor: "skyblue",
    padding: 10
  },
  ProfileButton: {
    alignItems: "center",
    backgroundColor: "powderblue",
    padding: 10
  }
});

export default AccountDetails;
