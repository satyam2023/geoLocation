import {View, StyleSheet} from 'react-native';
import React from 'react';
import {GeolocationResponse} from '@react-native-community/geolocation';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import {userData} from '../../models/mockData';
import {ILocation, IRegion, IUser} from '../../models/interface/UserData';
import {GLYPHS} from '../../assests/Glyph';
import MapLoading from '../../component/MapLoading';
import {Colors} from '../../config/constants/Color';
import SearchBox from './SearchBox';
import MapPolyLine from '../../component/MapPolyLine';
import CustomMapMarker from '../../component/MapMarker';
import { IDistanceDetail } from '../../models/interface/IHome';
interface IHomeScreen {
  location: GeolocationResponse | undefined;
  handleDistanceTextEntered: (text: ILocation, id: number) => void;
  findNearestCab: () => void;
  nearestLocation: IRegion | undefined;
  sourceLocation: ILocation | undefined;
  destinationLocation: ILocation | undefined;
  useMyCurrentLocation:()=>void;
  distanceDetail:IDistanceDetail
}

const HomeScreen = ({
  location,
  handleDistanceTextEntered,
  findNearestCab,
  nearestLocation,
  sourceLocation,
  destinationLocation,
  useMyCurrentLocation,
  distanceDetail
}: IHomeScreen) => {
  return (
    <View style={style.mapContainer}>
      <SearchBox
        {...{
          handleDistanceTextEntered,
          findNearestCab,
          useMyCurrentLocation,
          distanceDetail
        }}
      />
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={style.mapStyle}
          mapType="terrain"
          region={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}>
          {userData.map((item: IUser, index: number) => {
            return (
              <CustomMapMarker
                key={index.toString()}
                lat={item?.region?.latitude}
                long={item?.region?.longitude}
                title={item?.name}
                description={item?.isDriver ? item.carNumber : ''}
                icon={GLYPHS.Car}
              />
            );
          })}
          <CustomMapMarker
            lat={location?.coords?.latitude}
            long={location?.coords?.longitude}
            title={'Name'}
            description={'Customer'}
            icon={GLYPHS.Profile}
          />
          {sourceLocation && destinationLocation && (
            <MapPolyLine
              srcLat={sourceLocation?.lat}
              srcLon={sourceLocation?.lng}
              dstLat={destinationLocation?.lat}
              dstLon={destinationLocation?.lng}
              strokeColor={Colors.black}
              width={8}
            />
          )}
          {nearestLocation && (
            <MapPolyLine
              srcLat={Number(sourceLocation?.lat)}
              srcLon={Number(sourceLocation?.lng)}
              dstLat={nearestLocation?.latitude}
              dstLon={nearestLocation?.longitude}
              strokeColor={Colors.red}
              markerNotVisible={true}
            />
          )}
          <Circle
            center={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
            }}
            radius={5000}
            fillColor={Colors.RegionColor}
            strokeWidth={0}
          />
        </MapView>
      ) : (
        <MapLoading />
      )}
    </View>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mapStyle: {
    flex: 1,
  },
  icon: {height: 30, width: 30, resizeMode: 'contain'},
  textViewStyle: {
    top: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 2,
    paddingHorizontal: 20,
    width: '100%',
    alignSelf: 'center',
  },
});
