import { AsyncStorage } from "react-native";
import { urls } from "../../constants";
import { Alert } from "react-native";
import base64 from "react-native-base64";

export function fetchImageService(page?: number, limit?: number) {
  // return new Promise((resolve, reject) => {
  //   fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(response => {
  //       resolve(response);
  //     })
  //     .catch(error => {
  //       reject(error);
  //     });
  // });
  return [];
}

/**
 * This method is used to oauth access token. This method checks if we have a valid
 * token in asyncstorage. If current token is expired then it will fetch and return
 * a new access token.
 */
export const getOauthAccessToken = async () => {
  //checking if we already have oauth token
  const currentToken = await AsyncStorage.getItem("accessToken");
  const expiryTime = await AsyncStorage.getItem("accessTokenExpiryTime");

  // checking if existing token is valid or expired
  if (currentToken != undefined && currentToken != "") {
    const isValid = new Date(expiryTime) > new Date();
    if (isValid) {
      return currentToken;
    }
  }

  // either token is expired or does not exist
  // Setting up required headers
  var headers = new Headers();
  headers.append(
    "Authorization",
    "Basic " + base64.encode(`${urls.clientId}:${urls.clientSecret}`)
  );
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,PUT,OPTIONS"
  );
  headers.append(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token, content-type, Authorization"
  );
  headers.append("Access-Control-Max-Age", "3600");

  let formdata = new FormData();
  formdata.append("username", "tester");
  formdata.append("password", "tester");
  formdata.append("grant_type", "password");

  // Fetching token
  const tokenResponse = await fetch(`${urls.Base}/oauth/token`, {
    method: "POST",
    headers: headers,
    body: formdata
  });
  const responseJson = await tokenResponse.json();

  // putting token in async storage
  AsyncStorage.setItem("accessToken", responseJson["access_token"]);

  // putting token expiration time in async storage
  let tokenExpireIn = responseJson["expires_in"];
  let tokenExpiryTime = new Date();
  // if there is not expiration time, keeping default expiration time as one month
  if (tokenExpireIn != undefined && currentToken != "") {
    tokenExpiryTime.setSeconds(tokenExpiryTime.getSeconds() + tokenExpireIn);
  } else {
    tokenExpiryTime.setMonth(tokenExpiryTime.getMonth() + 1);
  }
  // this will be used to check if token is expired
  AsyncStorage.setItem("accessTokenExpiryTime", tokenExpiryTime.toString());

  return responseJson["access_token"];
  //return "hgjhgjh";
};

export async function loginUserService(username: string, password: string) {
  const token = await getOauthAccessToken();
  return fetch(
    `${urls.Base}/users/login?mobileNum=${encodeURIComponent(
      `${username}`
    )}&password=${encodeURIComponent(`${password}`)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, Content-Type, X-Auth-Token, content-type, Authorization",
        "Sec-Fetch-Mode": "no-cors"
      }
    }
  )
    .then(res => res.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      Alert.alert(error);
    });
}

export async function getAllUserVehicles(userId: string) {
   let userVehicles = await AsyncStorage.getItem("userVehicles");
  //if (userVehicles == undefined) {
    const token = await getOauthAccessToken();
    const response = await fetch(`${urls.Base}/users/${userId}/vehicles`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

      const responseJson = await response.json();
      //responseJson = JSON.stringify(responseJson);
      userVehicles = JSON.stringify(responseJson);
      AsyncStorage.setItem("userVehicles", userVehicles);
//  }
    return userVehicles;
  // }else{
  //   return userVehicles;
  // }
}
export async function userRegistrationService(
  mobileNum: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string
) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailAddress: email,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNum,
      password: password,
      exists: true
    })
  })
    .then(res => res.json())
    .then(response => {
      console.log("User registered successfully");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("Failed to register user " + error);
    });
}

export async function createServiceRequest(serviceRequest) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: serviceRequest
  })
    .then(res => res.json())
    .then(response => {
      console.log("Service request placed successfully");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("Failed to place a service request " + error);
    });
}

export async function getPartnerPaymentMode(partnerId: String) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/partners/${partnerId}/paymentmodes`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log("Successfully retrieved payment modes for given partner");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("Failed to retrieved payment modes " + error);
    });
}

export async function getUserAddressService(userId: String) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/users/${userId}/addresses`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log("Successfully retrieved user addresses");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("Failed to get user addresses " + error);
    });
}

export async function getPickupAndDropLocations(locationId: string) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/locations/${locationId}/PickAndDropLocations`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log("Successfully retrieved pick and drop locations");
      return response;
    })
    .catch(error => {
      console.log("failed to get pick and drop locations " + error);
    });
}

export async function getUserVehicles(userId: string) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/users/vehicles?userId=${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log("Successfully retrieved user vehicles"+ JSON.stringify(response));
      return response;
    })
    .catch(error => {
      console.log("failed to get user vehicles " + error);
    });
}

export async function updateUserProfile(
  userId: string,
  mobileNumber: string,
  firstName: string,
  lastName: string,
  emailAddress: string
) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/users`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: userId,
      emailAddress: emailAddress,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber
    })
  })
    .then(res => res.json())
    .then(response => {
      console.log("successfully updated user profile");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("failed to update user profile " + error);
    });
}

export async function userAddAddressService(
  addressLine1: string,
  addressLine2: string,
  country: string,
  state: string,
  city: string,
  pinCode: string,
  userId: string
) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/users/addresses`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      country: country,
      state: state,
      city: city,
      pinCode: pinCode,
      userId: userId
    })
  })
    .then(res => res.json())
    .then(response => {
      console.log("successfully added user address");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("failed to add user address " + error);
    });
}

export async function userUpdateAddressService(
  userAddressId: string,
  addressLine1: string,
  addressLine2: string,
  country: string,
  state: string,
  city: string,
  pinCode: string,
  userId: string
) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/users/${userId}/addresses`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userAddressId: userAddressId,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      country: country,
      state: state,
      city: city,
      pinCode: pinCode
    })
  })
    .then(res => res.json())
    .then(response => {
      console.log("successfully updated user address");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("failed to updated user address " + error);
    });
}

export async function userDeleteAddressService(
  userId: string,
  userAddressId: string
) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/users/${userId}/addresses/${userAddressId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/plain",
      Authorization: `Bearer ${token}`,
      //'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, X-Auth-Token, content-type, Authorization",
      "Sec-Fetch-Mode": "no-cors"
    }
  })
    .then(res => {
      console.log("successfully deleted user address");
      return res;
    })
    .catch(error => {
      console.log(error);
      console.log("failed to delete user address " + error);
    });
}

export async function getAllLocationsService() {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/locations`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, X-Auth-Token, content-type, Authorization",
      "Sec-Fetch-Mode": "no-cors"
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log("successfully fetched all the locations");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("failed to get all the location " + error);
    });
}

export async function getServiceCentresByLocationId(locationId: string) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/partners/locations/${locationId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, X-Auth-Token, content-type, Authorization",
      "Sec-Fetch-Mode": "no-cors"
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log("fetched parnters for given location");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("error occurred");
    });
}

export async function getCostSheet(partnerId: string,serviceType:string) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/partners/${partnerId}/services/${serviceType}/costsheets`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, X-Auth-Token, content-type, Authorization",
      "Sec-Fetch-Mode": "no-cors"
    }
  })
    .then(response => {
      console.log("Successfully downloaded costsheet");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("failed to download costsheet " + error);
    });
}
export async function getAllServiceRequestsByUserId(userId: String) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/orders/users/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log("Successfully retrieved service requests for given user");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("Failed to retrieved service requests " + error);
    });
}
export function logoutUserService() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem("accessToken");
    AsyncStorage.removeItem("accessTokenExpiryTime");
    AsyncStorage.removeItem("userVehicles");
    AsyncStorage.removeItem("userToken")
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}
