import React, { Component } from "react";
import {
  AsyncStorage,
  Alert,
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Input } from "../../../components";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Header,
  Button,
  Left,
  Title,
  Icon
} from "native-base";
import { updateUserProfile } from "../../../redux/services/user";
import { Formik } from "formik";
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface UserProfileData {
  firstName: string;
  lastName: string;
  mobileNumber: number;
  emailAddress: string;
  userId: string;
}

interface UserProfileDetailState {
  userProfile: UserProfileData;
  editInfo: boolean;
}

class UserProfileDetails extends Component<Props, UserProfileDetailState> {
  constructor(props: Props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      userProfile: {},
      editInfo: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userToken").then(value => {
      this.setState({ userProfile: JSON.parse(value) });
    });
  }

  handleProfileUpdate = (values: UserProfileData) => {
    console.log("Updating user info" + values.userId);
    updateUserProfile(
      values.userId,
      values.mobileNumber,
      values.firstName,
      values.lastName,
      values.emailAddress
    ).then(res => {
      if (res["errorCode"] == undefined || res["errorCode"] == "") {
        AsyncStorage.setItem("userToken", JSON.stringify(values));
        Alert.alert("Successfully updated user information");
        this.setState({
          editInfo: false,
          userProfile: values
        });
      } else {
        Alert.alert(res["errorMessage"]);
      }
    });
  };

  handleBackButtonClick() {
    this.props.navigation.navigate("AccountDetails");
    return true;
  }

  render() {
    const { userProfile } = this.state;
    // exmaple: https://dribbble.com/shots/7979460-Profile-and-Chat-Mobile-app-screens/attachments/524185?mode=media

    if (this.state.editInfo) {
      return (
        <View>
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={this.handleBackButtonClick}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title styles={{ paddingLeft: 15 }}>My Account details</Title>
              </Body>
            </Header>
          </Container>
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              marginTop: 80
            }}
          >
            <ScrollView bounces={false}>
              <Formik
                initialValues={{
                  firstName: `${userProfile.firstName}`,
                  lastName: `${userProfile.lastName}`,
                  emailAddress: `${userProfile.emailAddress}`,
                  mobileNumber: `${userProfile.mobileNumber}`,
                  userId: `${userProfile.userId}`
                }}
                onSubmit={values => this.handleProfileUpdate(values)}
              >
                {props => {
                  return (
                    <View>
                      <View>
                        <Text>First name:</Text>
                        <Input
                          placeholder="First name"
                          value={props.values.firstName}
                          onChangeText={props.handleChange("firstName")}
                          error={
                            props.touched.firstName && props.errors.firstName
                          }
                        />
                        <Text>Last name:</Text>
                        <Input
                          placeholder="Last name"
                          value={props.values.lastName}
                          onChangeText={props.handleChange("lastName")}
                          error={
                            props.touched.lastName && props.errors.lastName
                          }
                        />
                        <Text>Email:</Text>
                        <Input
                          placeholder="Email"
                          value={props.values.emailAddress}
                          onChangeText={props.handleChange("emailAddress")}
                          error={
                            props.touched.emailAddress &&
                            props.errors.emailAddress
                          }
                        />
                        <Text>mobile Number:</Text>
                        <Input
                          placeholder="Mobille number"
                          value={props.values.mobileNumber}
                          onChangeText={props.handleChange("mobileNumber")}
                          error={
                            props.touched.mobileNumber &&
                            props.errors.mobileNumber
                          }
                        />

                        <Button
                          rounded
                          info
                          style={{
                            alignSelf: "center",
                            flexDirection: "row",
                            margin: 20
                          }}
                          onPress={props.handleSubmit}
                        >
                          {/* <Icon name="md-create" /> */}
                          <Text> Edit my information </Text>
                        </Button>
                      </View>
                    </View>
                  );
                }}
              </Formik>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      );
    } else {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.handleBackButtonClick}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title styles={{ paddingLeft: 15 }}>My Account details</Title>
            </Body>
          </Header>
          <Content>
            <Card transparent>
              <CardItem cardBody>
                <Body>
                  <Image
                    source={require("../../../../assets/user-profile.jpg")}
                    style={{
                      height: 100,
                      width: 100,
                      marginLeft: 120
                    }}
                  />
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem bordered>
                <Body>
                  <Text
                    style={{
                      alignSelf: "center",
                      flexDirection: "row"
                    }}
                  >
                    {userProfile.firstName} {userProfile.lastName}{" "}
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem header bordered>
                <Left>
                  <Text> Contact information </Text>
                </Left>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text> Email: {userProfile.emailAddress} </Text>
                  <Text />
                  <Text> Mobile number: {userProfile.mobileNumber} </Text>
                  <Text />
                </Body>
              </CardItem>
            </Card>
            <Button
              rounded
              info
              style={{
                alignSelf: "center",
                flexDirection: "row",
                margin: 20
              }}
              onPress={() => {
                this.setState({
                  editInfo: true
                });
              }}
            >
              {/* <Icon name="md-create" /> */}
              <Text> Edit my information </Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
}

export default UserProfileDetails;
