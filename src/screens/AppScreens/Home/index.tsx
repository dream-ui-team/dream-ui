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

class Home extends Component {
  constructor(props) {
    super(props);
	
    this.state = {
		page:1,
		limit:20,
      value: '',
		locations:[],
		pickerList:[],
    },
	getAllLocationsService().then(res =>{
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
				 <Text > {"Index ="+this.state.value}</Text>  
      </View>
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
