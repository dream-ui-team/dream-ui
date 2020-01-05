import { getOauthAccessToken } from "./user";
import { urls } from "../../constants/urls";

export async function userDeleteVehicleService(
    userId: string,
    vehicleId: string
  ) {
    const token = await getOauthAccessToken();
    return fetch(`${urls.Base}/users/${userId}/vehicles/${vehicleId}`, {
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


  export async function userAddVehicleService(
    manufacturerName: string,
    model: string,
    registrationNumber: string,
    userId: string,
    vehicleId: string,
    vehicleTypeCode: number
    
  ) {
    const token = await getOauthAccessToken();
    return fetch(`${urls.Base}/users/vehicles`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        manufacturerName: manufacturerName,
        model: model,
        registrationNumber: registrationNumber,
        userId: userId,
        vehicleId: vehicleId,
        vehicleTypeCode: vehicleTypeCode
        
      })
    })
      .then(res => res.json())
      .then(response => {
        console.log("successfully added user Vehicle");
        return response;
      })
      .catch(error => {
        console.log(error);
        console.log("failed to add user vehicle " + error);
      });
  }
  

  export async function userUpdateVehicleService(
    manufacturerName: string,
    model: string,
    registrationNumber: string,
    userId: string,
    vehicleId: string,
    vehicleTypeCode: number
  ) {
    const token = await getOauthAccessToken();
    console.log(manufacturerName+ " "+ model + " "+ registrationNumber +" "+ userId+" "+ vehicleId+" "+ vehicleTypeCode);
    return fetch(`${urls.Base}/users/${userId}/vehicles`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        manufacturerName: manufacturerName,
        model: model,
        registrationNumber: registrationNumber,
        userId: userId,
        vehicleId: vehicleId,
        vehicleTypeCode: vehicleTypeCode
      })
    })
      .then(res => res.json())
      .then(response => {
        console.log("successfully updated user Vehicle");
        return response;
      })
      .catch(error => {
        console.log(error);
        console.log("failed to updated user vehicle " + error);
      });
  }