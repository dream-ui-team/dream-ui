import React, { Component } from "react";
import { View, FlatList, ActivityIndicator,StyleSheet,Picker,Text } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Dropdown } from 'react-native-material-dropdown';
import RNPickerSelect  from 'react-native-picker-select';
import { connect } from "react-redux";
import { Header } from "../../../components";
import styles from "./styles";
import { AvatarItem } from "../../../components";
import { logoutUserService,getAllLocationsService } from "../../../redux/services/user";
import {
  fetchImageData,
  fetchMoreImageData
} from "../../../redux/actions/fetch";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  fetchImageData: (page?: number, limit?: number) => void;
  fetchMoreImageData: (page?: number, limit?: number) => void;
  imageData: any;
  loading: boolean;
}

interface itemProp {
  item: any;
}

interface State {
  page: number;
  limit: number;
}

class Home extends Component<Props, State> {

  constructor(props:Props) {
    super(props);

    this.state = {
		page:1,
		limit:20,
    value: '',
    accessToken: this.props.navigation.getParam("accessToken1","NO-ID"),
    locations:[],
		pickerList:[],
    },
    console.log("constructor is called");

	  getAllLocationsService(this.state.accessToken).then(res =>{
				           	this.setState({ locations: res });
                    console.log(this.state.locations);
                  })
					        .catch(console.log);
	  }

  componentDidMount() {
  }

  handleLogout = () => {
    const { navigation } = this.props;
    logoutUserService().then(() => {
      navigation.navigate("AuthStack");
    });
  };

  render() {
    const { navigation, imageData, fetchMoreImageData, loading } = this.props;
    const { page, limit } = this.state;
	this.state.pickerList=[];
	for(var i=0;i<this.state.locations.length;i++)
	{
		this.state.pickerList.push(
		<Picker.Item label={this.state.locations[i].locationName} value={this.state.locations[i].locationId} />  )
	}
    return (
      <View style={styles.container}>
        <Header
          title="Home"
          leftButtonPress={() => navigation.openDrawer()}
          rightButtonPress={() => this.handleLogout()}
        />
        <View style={styles1.container}>
		<Picker style={styles1.pickerStyle}
                        selectedValue={this.state.value}
                        onValueChange={(itemValue, itemPosition) =>
                            this.setState({value: itemValue, choosenIndex: itemPosition})}
                    >
					{this.state.pickerList}
                </Picker>
<<<<<<< Updated upstream
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
=======
				 <Text > {"Index ="+this.state.value}</Text>
      </View>
>>>>>>> Stashed changes
	  </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  imageData: state.data,
  loading: state.loading
});

function bindToAction(dispatch: any) {
  return {
    fetchImageData: (page?: number, limit?: number) =>
      dispatch(fetchImageData(page, limit)),
    fetchMoreImageData: (page?: number, limit?: number) =>
      dispatch(fetchMoreImageData(page, limit))
  };
}
const styles1 = StyleSheet.create({
  container: {
         flex: 1,
         alignItems: 'center'
         //justifyContent: 'center',
     },
  dropdown: {
    width: '80%',
	marginTop:20
  },
    textStyle:{
        margin: 24,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    pickerStyle:{
        height: 150,
        width: "80%",
        color: '#344953',
        justifyContent: 'center',
    }
});
export default connect(
  mapStateToProps,
  bindToAction
)(Home);
