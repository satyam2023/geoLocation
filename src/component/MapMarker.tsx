import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Marker} from 'react-native-maps';

interface ICustomMarker {
  lat: number;
  long: number;
  title?: string;
  description?: string;
  icon: ImageSourcePropType;
}

const CustomMapMarker = (props: ICustomMarker) => {
  return (
    <Marker
      coordinate={{
        latitude: props?.lat,
        longitude: props?.long,
      }}
      title={props?.title}
      description={props?.description}>
      <Image source={props?.icon} style={styles.icon} />
    </Marker>
  );
};

export default CustomMapMarker;

const styles = StyleSheet.create({
  icon: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
});
