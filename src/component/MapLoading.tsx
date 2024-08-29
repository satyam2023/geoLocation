import {ActivityIndicator, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {StringConstant} from '../config/constants/StringConstant';
import {commomStyle} from '../commonStyle';
import {Colors} from '../config/constants/Color';

interface IStyle{
  loadingContainer:ViewStyle;
}

const MapLoading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={Colors.red} size={'large'} />
      <Text style={commomStyle.text}>{StringConstant.PLS_WAIT}</Text>
    </View>
  );
};

export default MapLoading;

const styles = StyleSheet.create<IStyle>({
  loadingContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey,
  },
});
