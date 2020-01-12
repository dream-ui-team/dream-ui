import React, { Component } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Picker
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import {  CommonButton } from "../../../components";
import styles from "./styles";
import { AvatarItem } from "../../../components";
import {
  logoutUserService,
  getAllLocationsService,
  getServiceCentresByLocationId,
  getCostSheet
} from "../../../redux/services/user";
import SearchInput, { createFilter } from "react-native-search-filter";
import { colors } from "../../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Right,
  Button,
  Title
} from "native-base";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}
interface PartnerDetails {
  name: string;
  emailAddress: string;
  alternateMobileNumber: number;
  address: string;
  mobileNumber: number;
}

interface PartnerDetailsResponse {
  partner:PartnerDetails;
}
interface ServiceCenterDetailsState {
  partnerDetailsResponse:PartnerDetailsResponse;
  serviceType:string;
  serviceName:string;
  url:boolean;
  enableButton:boolean;
  costSheetText:string;
}

class ServiceCenterDetails extends Component<Props, ServiceCenterDetailsState> {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.getServiceCentres = this.getServiceCentres.bind(this);
    this.setData = this.setData.bind(this);
      this.state = {
      partnerDetailsResponse:{},
      costSheet: [],
      url: false,
      serviceType:null,
      serviceName:null,
      enableButton:true,
      costSheetText:'Please select service type to get costsheet',
      serviceTypesArray:[{serviceName:null,value:null},{serviceName:'Vehicle Servicing',value:'1'},{serviceName:'Vehicle Repair',value:'2'},{serviceName:'Vehicle Wash',value:'3'}]
      };
      let partnerDetails = this.props.navigation.getParam(
      "details",
      "NULL"
    );
      this.state.partnerDetailsResponse=partnerDetails
  }

  componentDidMount() {

  }

  getServiceCentres = () => {
    getCostSheet(this.state.partnerDetailsResponse.partnerId,this.state.serviceType)
      .then(res => {
        this.setState({ costSheet: res });
        //Alert.alert(`${this.state.contacts.exists}`);
        console.log(this.state.costSheet);
        if(res.status == '200') {
        this.setState({ url: true });
      }
      else {
        this.setState({
          costSheetText:'Either CostSheet is not available or service center does not offer selected service'
        })
      }
      })
      .catch(console.log);
  };

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  handleBackButtonClick() {
    this.props.navigation.navigate("Home");
    return true;
  };
  setData = (value,index)=>{
    this.setState({ serviceType: value ,
    serviceName:this.state.serviceTypesArray[index].serviceName,
    url:false
  });
    if(this.state.serviceTypesArray[index].serviceName!=null){
      this.state.enableButton=false;
      this.setState({
        costSheetText:''
      });
    }
    else {
      this.state.enableButton=true;
      this.setState({
        costSheetText:'Please select service type to get costsheet'
      });
    }
  }

  render() {
    const { partnerDetailsResponse } = this.state;
    let serviceTypes = [];
    /* Pushing first value*/
    serviceTypes.push(
      <Picker.Item
        key={"NULL"}
        label={"Select a Service Type"}
        value={"null"}
      />
    );
    serviceTypes.push(
      <Picker.Item
        key={"1"}
        label={"Vehicle Servicing"}
        value={"1"}
      />
    );
    serviceTypes.push(
      <Picker.Item
        key={"2"}
        label={"Vehicle Repair"}
        value={"2"}
      />
    );
    serviceTypes.push(
      <Picker.Item
        key={"3"}
        label={"Vehicle Wash"}
        value={"3"}
      />
    );

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.handleBackButtonClick}>
              <Icon name="arrow-back" size={24} />
            </Button>
          </Left>
          <Body>
            <Title>Service Center Detail</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Card>
          <CardItem header>
            <Text>Service Center Details</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Name: {partnerDetailsResponse.name}</Text>
              <Text>Address: {partnerDetailsResponse.address}</Text>
              <Text>
                Contact number: {partnerDetailsResponse.mobileNumber}
              </Text>
              <Text>
                Alternate contact number:{" "}
                {partnerDetailsResponse.alternateMobileNumber}
              </Text>
              <Text>
                Email: {partnerDetailsResponse.emailAddress}
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Text>{"Services offered by service center :"}</Text>
          </CardItem>
            <View style={styles.pickerContainer}>
          <Picker
            style={styles.pickerStyle}
            selectedValue={this.state.serviceType}
            onValueChange={(value, index) => {
              this.setData(value,index)
            }}
          >

            {serviceTypes}
          </Picker>
        </View>
        </Card>
        <Card>
          <CardItem header>
            <Text>Cost sheet for {this.state.serviceName}:</Text>
          </CardItem>
          <CardItem>
            <Body>
            <TouchableOpacity disabled={this.state.enableButton}
             style={styles.buttonStyle}
             onPress={() => this.getServiceCentres()}
           >
           <Text style={styles.buttonTextStyle}>{"Get Costsheet"}</Text>
           </TouchableOpacity>
           {this.state.url ? (
              <Text
                style={{ color: "blue", marginTop: 20, fontSize: 15 }}
                onPress={() => Linking.openURL(this.state.costSheet.url)}
              >  Download Costsheet
              </Text>
            ) : (
              <Text style={{ marginTop: 20, fontSize: 15 }}>{this.state.costSheetText}</Text>
            )}
            </Body>
          </CardItem>
        </Card>
        </Content>
      </Container>
    );
  }
}
const styles1 = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#68a0cf",
    backgroundColor: "white"
  },
  item_text_style: {
    fontSize: 20,
    color: "#000",
    padding: 5,
    marginLeft: 10
  },

  item_separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#263238"
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
    flex: 2.8,
    marginLeft: 20
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
export default ServiceCenterDetails;
