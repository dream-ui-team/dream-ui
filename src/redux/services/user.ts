import { AsyncStorage } from "react-native";
import { urls } from "../../constants";
import { Alert } from "react-native";
import base64 from "react-native-base64";

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

/**
 * This method is used to oauth access token. This method checks if we have a valid
 * token in asyncstorage. If current token is expired then it will fetch and return
 * a new access token.
 */
const getOauthAccessToken = async () => {
  const currentToken = await AsyncStorage.getItem("accessToken");
  const expiryTime = await AsyncStorage.getItem("accessTokenExpiryTime");

  if (currentToken != undefined && currentToken != "") {
    const isValid = new Date(expiryTime) > new Date();
    console.log("is this token valid:" + isValid);
    if (isValid) {
      return currentToken;
    }
  }
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

  console.log("fetching the token");
  const tokenResponse = await fetch(`${urls.Base}/oauth/token`, {
    method: "POST",
    headers: headers,
    body: formdata
  });
  console.log("response received:");
  const responseJson = await tokenResponse.json();

  AsyncStorage.setItem("accessToken", responseJson["access_token"]);
  let tokenExpireIn = responseJson["expires_in"];
  let tokenExpiryTime = new Date();
  console.log(
    "this token will expire in  " +
      tokenExpireIn +
      " seconds and current time is " +
      tokenExpiryTime
  );
  // if there is not expiration time, keeping default expiration time as one month
  if (tokenExpireIn != undefined && currentToken != "") {
    tokenExpiryTime.setSeconds(tokenExpiryTime.getSeconds() + tokenExpireIn);
  } else {
    tokenExpiryTime.setMonth(tokenExpiryTime.getMonth() + 1);
  }
  // this will be used to check if token is expired
  AsyncStorage.setItem("accessTokenExpiryTime", tokenExpiryTime.toString());
  return responseJson["access_token"];
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

export async function getUserVehicles(userId: String) {
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
      console.log("Successfully retrieved user vehicles");
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
      console.log("fatch parnters for given location");
      return response;
    })
    .catch(error => {
      console.log(error);
      console.log("error occurred");
    });
}

export async function getCostSheet(partnerId: string) {
  const token = await getOauthAccessToken();
  return fetch(`${urls.Base}/partners/${partnerId}/services/1/costsheets`, {
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

export function logoutUserService() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem("accessToken");
    AsyncStorage.removeItem("accessTokenExpiryTime");
    AsyncStorage.removeItem("userToken")
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}
