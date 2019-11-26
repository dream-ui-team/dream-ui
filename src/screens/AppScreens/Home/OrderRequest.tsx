import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,StyleSheet,Picker,Text,TouchableOpacity } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import RNPickerSelect  from 'react-native-picker-select';
import { connect } from "react-redux";
import { Header,CommonButton } from "../../../components";
import styles from "./styles";
import { AvatarItem } from "../../../components";
import { logoutUserService,getAllLocationsService,getServiceCentresByLocationId } from "../../../redux/services/user";
import SearchInput, { createFilter } from 'react-native-search-filter';
import { colors } from "../../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class OrderRequest extends Component {
  constructor(props) {
    super(props);
	this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	this.getServiceCentres=this.getServiceCentres.bind(this);
    this.state = {
		locationId: '',
		locations:[],
		pickerList:[],
		serviceCentres:[],
		serviceCentresBackup:[],
		isNotNull:false,
		searchTerm: ''
    },
	this.state.serviceCentres = this.props.navigation.getParam('details', 'NULL');
  }
  
  searchUpdated(term) {
	this.state.serviceCentres=this.state.serviceCentresBackup;
	this.setState({ searchTerm: term });
  }
  
  getServiceCentres=(itemValue)=>
  {
	if(itemValue!='NULL')
	{
		this.state.locationId=itemValue ;
		this.setState({isNotNull:false});
		getServiceCentresByLocationId(this.state.locationId).then(res =>{
				this.setState({ serviceCentres: res });
				this.state.serviceCentresBackup=[];
				this.setState({serviceCentresBackup:this.state.serviceCentres});
				this.setState({isNotNull:true});
			  })
				.catch(console.log);
	}
	else{
		this.setState({isNotNull:false});
	}
		
  }
  
  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };
  
handleBackButtonClick() {
	const { navigation } = this.props;
     navigation.navigate("MainStack");
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
          <Text style={styles1.headerTitle}>{`Service Request`}</Text>
        </View>
      </View>
	<View style={{alignItems:'center',marginTop:200}}>
		<Text>Placing Order for</Text>
		<Text>{this.state.serviceCentres.name}</Text>
		</View>
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
    flex:2.6 ,
	marginLeft:20
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
export default OrderRequest;