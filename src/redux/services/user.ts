import { AsyncStorage } from "react-native";
import { colors,urls } from "../../constants";
import { Alert} from 'react-native';

export function fetchImageService(page?: number, limit?: number) {
  return new Promise((resolve, reject) => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
      .then(res => {
        return res.json();
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function loginUserService(username: string, password: string) {
    return fetch(`${urls.Base}users/login?mobileNum=${encodeURIComponent(`${username}`)}&password=${encodeURIComponent(`${password}`)}`,{
        method:'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':  'GET,POST,PATCH,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type, Authorization',
            'Sec-Fetch-Mode': 'no-cors'
          },
        }).then(res => res.json())
          .then(response => {
            return response
          })
          .catch(error => {
            Alert.alert(error);

          });
}

export function userRegistrationService(mobileNum: string, password: string,firstName:string,lastName:string,email:string) {

  console.log(`${firstName}`);
  return fetch(`${urls.Base}/users`,{
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
		  body: JSON.stringify({
			emailAddress:email,
			firstName:firstName,
			lastName:lastName,
			mobileNumber:mobileNum,
			password:password,
			exists:true
		  })
}).then(res => res.json())
  .then(response => {
    console.log("reponse occurred");
    return response
  }).catch(error => {
    console.log(res);
    console.log("error occurred");
  });
}

export function getUserAddressService(userId:String) {
  return fetch(`${urls.Base}/users/${userId}/addresses`,{
      method:'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
}).then(res => res.json())
  .then(response => {
    console.log("reponse occurred");
    return response
  }).catch(error => {
    console.log(res);
    console.log("error occurred");

  });
}


export function getUserVehicles(userId:String) {
  return fetch(`${urls.Base}/users/vehicles?userId=${userId}`,{
          method:'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(res => res.json())
          .then(response => {
            console.log("reponse occurred");
            return response
          }).catch(error => {
            console.log("error occurred");
        });
}

export function updateUserProfile(userId: string, mobileNumber: string, firstName:string, lastName:string, emailAddress:string) {
  console.log(`${firstName}`);
  return fetch(`${urls.Base}/users`,{
        method:'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
      body: JSON.stringify({
      userId:userId,
      emailAddress:emailAddress,
      firstName:firstName,
      lastName:lastName,
      mobileNumber:mobileNumber
      })
    }).then(res => res.json())
        .then(response => {
             console.log("reponse occurred");
             return response
        }).catch(error => {
                console.log(error);
                console.log("error occurred");
       });
}

export function userAddAddressService(addressLine1:string,addressLine2:string,country:string,state:string,city:string,pinCode:string,userId:string) {
  return fetch(`${urls.Base}/users/addresses`,{
      method:'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
  			addressLine1:addressLine1,
  			addressLine2:addressLine2,
  			country:country,
  			state:state,
  			city:city,
  			pinCode:pinCode,
        userId:userId
  		  })
}).then(res => res.json())
  .then(response => {
    console.log("reponse occurred");
    return response
  }).catch(error => {
    console.log(res);
    console.log("error occurred");

  });
}

export function userUpdateAddressService(userAddressId:string,addressLine1:string,addressLine2:string,country:string,state:string,city:string,pinCode:string,userId:string) {
  console.log("in update service"+`${userId}`+" "+`${userAddressId}` +" "+pinCode);
  return fetch(`${urls.Base}/users/${userId}/addresses`,{
      method:'PUT',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        userAddressId:userAddressId,
  			addressLine1:addressLine1,
  			addressLine2:addressLine2,
  			country:country,
  			state:state,
  			city:city,
  			pinCode:pinCode
  		  })
}).then(res => res.json())
  .then(response => {
    console.log("reponse occurred");
    return response
  }).catch(error => {
    console.log(res);
    console.log("error occurred");

  });
}
export function userDeleteAddressService(userId:string,userAddressId:string) {
  return fetch(`http://192.168.42.86:8090/users/${userId}/addresses/${userAddressId}`,{
      method:'DELETE',
      headers: {
          Accept: 'application/plain',
              //'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Methods':  'GET,POST,PATCH,DELETE,PUT,OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type, Authorization',
              'Sec-Fetch-Mode': 'no-cors'
        }
}).then(res => {
    console.log("reponse occurred");
    return res
  }).catch(error => {
    console.log(res);
    console.log("error occurred");

  });
}

export function getAllLocationsService() {
  return fetch(`${urls.Base}/locations`,{
      method:'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
		  'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':  'GET,POST,PATCH,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type, Authorization',
            'Sec-Fetch-Mode': 'no-cors'
        }
}).then(res => res.json())
  .then(response => {
    console.log("reponse occurred");
    return response
  }).catch(error => {
    console.log(res);
    console.log("error occurred");

  });
}

export function getServiceCentresByLocationId(locationId:string) {
  return fetch(`${urls.Base}partners/locations/${locationId}`,{
      method:'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
		  'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':  'GET,POST,PATCH,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type, Authorization',
            'Sec-Fetch-Mode': 'no-cors'
        }
}).then(res => res.json())
  .then(response => {
    console.log("reponse occurred");
    return response
  }).catch(error => {
    console.log(res);
    console.log("error occurred");

  });
}

export function getCostSheet(partnerId:string)
{
	return fetch(`${urls.Base}partners/${partnerId}/services/1/costsheets`,{
      method:'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
		  'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':  'GET,POST,PATCH,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type, Authorization',
            'Sec-Fetch-Mode': 'no-cors'
        }
}).then(res => res.json())
  .then(response => {
    console.log("reponse occurred");
    return response
  }).catch(error => {
    console.log(error);
    console.log("error occurred");

  });
	
}
export function logoutUserService() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem("userToken")
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}
