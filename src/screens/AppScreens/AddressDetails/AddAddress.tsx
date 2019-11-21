import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,StyleSheet
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { userAddAddressService,userUpdateAddressService } from "../../../redux/services/user";
import { Input, Button } from "../../../components";
import styles from "./styles";
import { Alert, AsyncStorage } from "react-native";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface addressData {
  addressLine1:string,
  addressLine2:string,
  country:string,
  state:string,
  city:string,
  pinCode:string
}

class AddAddress extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 20,
      loggedInUser:"",
      addresses:{userAddressId:'',addressLine1:'',addressLine2:'',country:'',state:'',city:'',pinCode:''},
      buttonText:"",

    };
    this.state.addresses=this.props.navigation.getParam('details',  this.state.addresses);
    console.log(this.state.addresses.city);
  }

  componentDidMount() {
    console.log("mounted");
      const { navigation } = this.props;
    AsyncStorage.getItem('userToken').then((value) =>{
        this.setState({loggedInUser:JSON.parse(value)});
        }).then(res => {
          console.log(this.state.loggedInUser.userId);
        });
        console.log(this.state.addresses);
      if( this.state.addresses.addressLine1!='')
      {
          this.setState({buttonText:"UPDATE"})
      }
      else
      {
          this.setState({buttonText:"ADD"})
          // this.state.addresses.addressLine1='';
          // this.state.addresses.addressLine2='';
          //  this.state.addresses.country='';
          //  this.state.addresses.state='';
          //  this.state.addresses.city='';
          // this.state.addresses.pinCode='';
      }
  }

  handleAddressChange = (values: addressData) => {
    const { navigation } = this.props;
    if(this.state.buttonText == "ADD")
    {
    console.log("in add address");
     userAddAddressService(values.addressLine1, values.addressLine2,values.country,values.state,values.city,values.pinCode,this.state.loggedInUser.userId).then(res => {
           if(res["errorCode"]==undefined || res["errorCode"]==""){
            console.log("address added successfully");
            navigation.navigate("AddressDetails");
          }
   });
 }
 else
 {
   console.log("in update address");
   console.log(values.pinCode);
    userUpdateAddressService(this.state.addresses.userAddressId,values.addressLine1, values.addressLine2,values.country,values.state,values.city,values.pinCode,this.state.loggedInUser.userId).then(res => {
          if(res["errorCode"]==undefined || res["errorCode"]==""){
           console.log("address updated successfully");
           navigation.navigate("AddressDetails");
         }
  });
 }
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
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Formik
              initialValues={{ addressLine1:`${this.state.addresses.addressLine1}`, addressLine2:`${this.state.addresses.addressLine2}`, country:`${this.state.addresses.country}`, state:`${this.state.addresses.state}`,city:`${this.state.addresses.city}`,pinCode:`${this.state.addresses.pinCode}` }}

              //validationSchema={loginSchema}
              onSubmit={values => this.handleAddressChange(values)}
            >
            { props => {

              return (
                <View>
                  <View style={styles.headStyle}>
                    <Icon name="emotsmile" size={100} />
                    <Text style={styles.headText}>
                      Let's sign up ..!!
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <Input
                      placeholder="AddressLine1"
                      value={props.values.addressLine1}
                      onChangeText={props.handleChange("addressLine1")}
                      //onBlur={props.handleBlur("firstName")}
                      error={props.touched.addressLine1 && props.errors.addressLine1}
                    />
                    <Input
                      placeholder="AddressLine2"
                      value={props.values.addressLine2}
                      onChangeText={props.handleChange("addressLine2")}
                     //onBlur={props.handleBlur("lastName")}
                      error={props.touched.addressLine2 && props.errors.addressLine2}
                    />
                    <Input
                      placeholder="Country"
                      value={props.values.country}
                      onChangeText={props.handleChange("country")}
                      //onBlur={props.handleBlur("email")}
                      error={props.touched.country && props.errors.country}
                    />
                    <Input
                      placeholder="State"
                      value={props.values.state}
                      onChangeText={props.handleChange("state")}
                      //onBlur={props.handleBlur("mobileNum")}
                      error={props.touched.state && props.errors.state}
                    />
                    <Input
                      placeholder="City"
                      value={props.values.city}
                      onChangeText={props.handleChange("city")}
                      //onBlur={props.handleBlur("city")}

                      error={props.touched.city && props.errors.city}
                    />
                    <Input
                      placeholder="Pincode"
                      value={props.values.pinCode}
                      onChangeText={props.handleChange("pinCode")}
                      //onBlur={props.handleBlur("city")}

                      error={props.touched.pinCode && props.errors.pinCode}
                    />
                    <Button text={this.state.buttonText} onPress={props.handleSubmit} />
                  </View>
                </View>
              );
            }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  container:{
    margin: 4,
    borderRadius: 5,
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
ButtonContainer:
{
  flex: 1,
  flexDirection: 'row',
  width: '30%',
  height: 40,
  justifyContent: 'space-between',
}

});
export default AddAddress;
