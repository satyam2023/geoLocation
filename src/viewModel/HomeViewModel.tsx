import React, {useEffect, useRef, useState} from 'react';
import HomeScreen from '../views/homeScreen/HomeScreen';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {
  getDistanceFromLatLonInKm,
  requestLocationPermission,
} from '../config/helper';
import {userData} from '../models/mockData';
import {IDistanceDetail} from '../models/interface/IHome';
import {ILocation, IRegion, IUser} from '../models/interface/UserData';
import {Alert} from 'react-native';

const HomeViewModel = () => {
  const [location, setLocation] = useState<GeolocationResponse | undefined>();
  const [nearestLocation, setNearestLocation] = useState<IRegion | undefined>();
  const [sourceLocation, setSourceLocation] = useState<ILocation | undefined>();
  const [destinationLocation, setDestinationLocation] = useState<
    ILocation | undefined
  >();
  const distanceDetail: IDistanceDetail = {
    source: useRef<string>(''),
    destination: useRef<string>(''),
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  const handleDistanceTextEntered = (location: ILocation, id: number) => {
    id == 0 && setSourceLocation(location);
    id == 1 && setDestinationLocation(location);
  };

  const findNearest = (pickUpLat: number, pickUpLong: number) => {
    const distanceArray = userData.map(item => {
      const distance = getDistanceFromLatLonInKm(
        item?.region?.latitude,
        item?.region?.longitude,
        Number(pickUpLat),
        Number(pickUpLong),
      );
      return {item, distance};
    });
    const minDisData = distanceArray.reduce((prev, curr) =>
      prev.distance < curr.distance ? prev : curr,
    );

    setNearestLocation(minDisData?.item?.region);
  };

  const findNearestCab = async () => {
    if (!sourceLocation?.lat || !destinationLocation?.lat)
      return Alert.alert('Please Select a valid Location');

    findNearest(Number(sourceLocation?.lat), Number(sourceLocation?.lng));
  };

  const useMyCurrentLocation = async () => {
  };

  useEffect(() => {
    Geolocation.watchPosition(
      (pos: GeolocationResponse) => {
        setLocation(pos);
      },
      (error: GeolocationError) => {
        console.log('Error in tarcking Current Position :', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 500,
        distanceFilter: 1,
      },
    );
  }, []);

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <HomeScreen
      {...{
        location,
        handleDistanceTextEntered,
        findNearestCab,
        nearestLocation,
        sourceLocation,
        destinationLocation,
        useMyCurrentLocation,
        distanceDetail,
      }}
    />
  );
};

export default HomeViewModel;
