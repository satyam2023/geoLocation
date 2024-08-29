import { GeolocationResponse } from "@react-native-community/geolocation"
import { SET_USER_LOCATION } from "../ActionConstant"


export const setLocationAction=(data:GeolocationResponse)=>{
   return {
        type:SET_USER_LOCATION,
        payload:data
    }
}