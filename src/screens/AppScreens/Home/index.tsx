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

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

class Home extends Component {
  constructor(props) {
    super(props);
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
	getAllLocationsService().then(res =>{
					this.setState({ locations: res });
                    console.log(this.state.locations);
                  })
					.catch(console.log);
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

  render() {
	 if(this.state.isNotNull && this.state.searchTerm!=''){
		var search = this.state.searchTerm.toString();
		this.state.serviceCentres =  this.state.serviceCentres.filter(function(hero) {
			return hero.name.toLowerCase().includes(search.toLowerCase()) ;
		});
	}
	else if(this.state.isNotNull){
		this.state.serviceCentres=this.state.serviceCentresBackup;
	}
    const { navigation} = this.props;
	
	this.state.pickerList=[];
	this.state.pickerList.push(
		<Picker.Item key={'NULL'} label={'Select Your Area'} value={'NULL'} />  )
	for(var i=0;i<this.state.locations.length;i++)
	{
		this.state.pickerList.push(
		
		<Picker.Item key={this.state.locations[i].locationId} label={this.state.locations[i].locationName} value={this.state.locations[i].locationId} />  )
	}
	
    return (
      <View style={styles.container}>
        <Header
          title="Home"
          leftButtonPress={() => navigation.openDrawer()}
          rightButtonPress={() => this.handleLogout()}
        />
		<View style={styles.pickerContainer}>
		<Picker style={styles.pickerStyle}  
                        selectedValue={this.state.locationId}  
                        onValueChange={(itemValue, itemPosition) =>  
								this.getServiceCentres(itemValue)}
                    >  
					{this.state.pickerList}
                </Picker>
		</View>
		<SearchInput 
			onChangeText={(term) => { this.searchUpdated(term) }} 
			style={styles.searchInput}
			placeholder="Enter service centre name"
          />
		{this.state.isNotNull?
				
		<FlatList 
          data={this.state.serviceCentres}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) =>
           <View style={styles.homeContainer}>
            <View style={styles.homeContainerRow}>
              <View style={styles.label}>
                <Text style={styles.text}>Name:</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </View>
			<View style={styles.homeContainerRow}>
              <View style={styles.label}>
                <Text style={styles.text}>Address:</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.text}>{item.address}</Text>
              </View>
            </View>
			<View style={styles.homeContainerRow}>
              <View style={styles.label}>
                <Text style={styles.text}>Email Address:</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.text}>{item.emailAddress}</Text>
              </View>
            </View>
			<View style={styles.homeContainerRow}>
              <View style={styles.label}>
                <Text style={styles.text}>Mobile Number:</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.text}>{item.mobileNumber}</Text>
              </View>
            </View>
			<View style={styles.homeContainerRow}>
              <View style={styles.label}>
                <Text style={styles.text}>Alternate Mobile Number:</Text>
              </View>
              <View style={styles.data}>
                <Text style={styles.text}>{item.alternateMobileNumber}</Text>
              </View>
            </View>
		  <View style={{marginTop:10}}></View>
			<View style={styles.homeContainerRow}>
              <View style={styles.updateButton}>
                <TouchableOpacity  style={styles.buttonStyle} onPress={()=>navigation.navigate('ServiceCenterDetails',{details:item})}>
					<Text style={styles.buttonTextStyle}>{'Show Details'}</Text>
					</TouchableOpacity>
              </View>
              <View style={styles.deleteButton}>
               <TouchableOpacity  style={styles.buttonStyle} onPress={()=>navigation.navigate('OrderRequest',{details:item})}>
					<Text style={styles.buttonTextStyle}>{'Place Request'}</Text>
				</TouchableOpacity>
              </View>
            </View>
			</View>
              }
        />
		:<Text style={{marginTop:200,marginLeft:150,alignItems:'center',justifyContent: 'center'}}>{'No Data'}</Text>
		}		
	  </View>
    );
  }
}

export default Home;