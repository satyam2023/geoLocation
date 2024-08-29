import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import CustomMapMarker from './MapMarker';
import {GLYPHS} from '../assests/Glyph';
import { StringConstant } from '../config/constants/StringConstant';

interface IMapPolyLine {
  srcLat: number;
  srcLon: number;
  dstLat: number;
  dstLon: number;
  strokeColor: string;
  width?: number;
  markerNotVisible?: boolean;
}

const MapPolyLine = (props: IMapPolyLine) => {
  return (
    <>
      <MapViewDirections
        origin={{
          latitude: props.srcLat,
          longitude: props.srcLon,
        }}
        destination={{
          latitude: props.dstLat,
          longitude: props.dstLon,
        }}
        apikey={StringConstant.GOOGLE_API_KEY}
        strokeColor={props.strokeColor}
        strokeWidth={props?.width ? props?.width : 4}
        lineDashPattern={[2]}
        onError={e => {
          console.log('Error', e);
        }}
      />
      {!props?.markerNotVisible && (
        <>
          <CustomMapMarker
            lat={props.srcLat}
            long={props.srcLon}
            icon={GLYPHS.PickUpPoint}
          />
          <CustomMapMarker
            lat={props.dstLat}
            long={props.dstLon}
            icon={GLYPHS.DropPoint}
          />
        </>
      )}
    </>
  );
};

export default MapPolyLine;

const styles = StyleSheet.create({});
