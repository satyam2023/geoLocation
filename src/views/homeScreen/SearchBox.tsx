import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GLYPHS} from '../../assests/Glyph';
import {StringConstant} from '../../config/constants/StringConstant';
import {IDistanceDetail} from '../../models/interface/IHome';
import {
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import {Colors} from '../../config/constants/Color';
import {ILocation} from '../../models/interface/UserData';
interface ISearchBox {
  handleDistanceTextEntered: (text: ILocation, id: number) => void;
  findNearestCab: () => void;
  useMyCurrentLocation: () => void;
  distanceDetail: IDistanceDetail;
}

const SearchBox = ({
  handleDistanceTextEntered,
  findNearestCab,
}: ISearchBox) => {
  return (
    <View style={style.textViewStyle}>
      {[StringConstant.ENTER_SRC, StringConstant.ENTER_DES].map(
        (item, index) => {
          return (
            <GooglePlacesAutocomplete
              placeholder={item}
              key={index.toString()}
              query={{key: StringConstant.GOOGLE_API_KEY}}
              fetchDetails={true}
              onPress={(data, details) =>
                handleDistanceTextEntered(
                  details?.geometry?.location as ILocation,
                  index,
                )
              }
              onFail={error => console.log(error)}
              onNotFound={() => console.log('no results')}
              styles={locationContainer}
            />
          );
        },
      )}
      <TouchableOpacity style={style.iconBtn} onPress={findNearestCab}>
        <Image source={GLYPHS.Search} style={style.searchImage} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const style = StyleSheet.create({
  textViewStyle: {
    top: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 2,
    paddingHorizontal: 20,
    width: '90%',
  },
  searchImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    tintColor: 'red',
  },
  iconBtn: {
    position: 'absolute',
    top: 41,
    right: -35,
  },
});

const locationContainer = {
  container: {marginBottom: 20},
  textInputContainer: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: Colors.textBg,
    paddingVertical: 5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'transparent',
    color: 'red',
  },
  poweredContainer: {
    display: 'none',
  },
  row: {
    backgroundColor: Colors.textBg,
  },
  description: {
    color: 'red',
  },
};
