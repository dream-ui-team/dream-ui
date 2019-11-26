import { AsyncStorage } from "react-native";
import { colors,urls } from "../../constants";
import { Alert} from 'react-native';
import base64 from 'react-native-base64';

const accessToken='';
const expiryTime='';
const lastUpdatedTime='';


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

// Token validate{
//  return fetch()
//

export function loginUserService(username: string, password: string, accessToken: string) {

    console.log("Retrieve token from AsyncStorage:" + accessToken);
    // token
    // validate true / false
    // false => {}

    return fetch(`${urls.Base}/users/login?mobileNum=${encodeURIComponent(`${username}`)}&password=${encodeURIComponent(`${password}`)}`,{
        method:'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }).then(res => res.json())
          .then(response => {
            return response
          })
          .catch(error => {
            Alert.alert(error);
          });
}

export function userRegistrationService(mobileNum: string, password: string,firstName:string,lastName:string,email:string) {

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
    console.log("Registration success");
    return response
  }).catch(error => {
    console.log(res);
    console.log("failed to register");
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
    console.log("fetched all addresses");
    return response
  }).catch(error => {
    console.log(res);
    console.log("failed to get user addresses");

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
            console.log("fetched user vehicles");
            return response
          }).catch(error => {
            console.log("error occurred");
        });
}

export function updateUserProfile(userId: string, mobileNumber: string, firstName:string, lastName:string, emailAddress:string) {
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
             console.log("updated user profile");
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
    console.log("added user address");
    return response
  }).catch(error => {
    console.log(res);
    console.log("error occurred");

  });
}

export function userUpdateAddressService(userAddressId:string,addressLine1:string,addressLine2:string,country:string,state:string,city:string,pinCode:string,userId:string) {
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
    console.log("updated user address ");
    return response
  }).catch(error => {
    console.log(res);
    console.log("error occurred");

  });
}

export function userDeleteAddressService(userId:string,userAddressId:string) {
  return fetch(`${urls.Base}/users/${userId}/addresses/${userAddressId}`,{
      method:'DELETE',
      headers: {
          Accept: 'application/plain',
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Methods':  'GET,POST,PATCH,DELETE,PUT,OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type, Authorization',
              'Sec-Fetch-Mode': 'no-cors'
        }
}).then(res => {
    console.log("deleted user address ");
    return res
  }).catch(error => {
    console.log(res);
    console.log("error occurred");

  });
}

export function getAllLocationsService(accessToken: string) {

  console.log("accessToken is expired"+ accessToken);

  const tokenJson = getAccessToken();

  console.log("this is the response"+tokenJson);
  console.log("new oauth token is "+  tokenJson[0].access_token);

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
    console.log("received all the location details");
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
    console.log("fetched all services center based on location");
    return response
  }).catch(error => {
    console.log(res);
    console.log("error occurred");

  });
}

export async function getAccessToken(){

     // check if current token is expired
    // if not expired, return the existing token

    // if expired, get a new one and set it into above constants

    var headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(`${urls.clientId}:${urls.clientSecret}`));
     //headers.append("Accept", "application/json");
    //headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT,OPTIONS");
    headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token, content-type, Authorization");
    headers.append("Access-Control-Max-Age", "3600");
  //  headers.append("Sec-Fetch-Mode", "no-cors");

    let formdata = new FormData();
    formdata.append("username", 'tester');
    formdata.append("password", 'tester');
    formdata.append("grant_type", 'password');


      const tokenResponse = await fetch(`${urls.Base}/oauth/token`,{
                           method:'POST',
                           headers: headers,
                           body: formdata
                          });
  const responseJson = await tokenResponse.json();
  return responseJson;
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
