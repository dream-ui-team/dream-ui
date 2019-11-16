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
  // return new Promise((resolve, reject) => {
  //   fetch(`${urls.Base}users/login?mobileNum=${encodeURIComponent(`${username}`)}&password=${encodeURIComponent(`${password}`)}`,{
  //     method:'GET',
  //     headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin':'*',
  //         'Access-Control-Allow-Methods':  'GET,POST,PATCH,DELETE,PUT,OPTIONS',
  //         'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type, Authorization',
  //         'Sec-Fetch-Mode': 'no-cors'
  //       },
  //     }).then(res => res.json())
  //       .then(response => {
  //         resolve(response);
  //       })
  //       .catch(error => {
  //         Alert.alert("Login unSuccess");
  //         reject(error);
  //       });
  //     });
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
    return response
  }).catch(error => {
    Alert.alert(error);

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
