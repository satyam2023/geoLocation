import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors} from '../config/constants/Color';

interface IStyle {
  inbutBoxContainer: ViewStyle;
  leftIconStyle: ImageStyle;
  textinputStyle: TextStyle;
  rightIconStyle: ImageStyle;
  rightImageContainer: ViewStyle;
}

interface IInputText {
  placeholder: string;
  onChangeText: (text: string) => void;
  lefticon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onRightIconPress?: () => void;
  value: string;
}

const InputText = ({
  placeholder,
  onChangeText,
  lefticon,
  rightIcon,
  onRightIconPress,
  value,
}: IInputText) => {
  console.log('value', value);
  return (
    <View style={styles.inbutBoxContainer}>
      {lefticon && <Image source={lefticon} style={styles.leftIconStyle} />}
      <TextInput
        onChangeText={(text: string) => onChangeText(text)}
        placeholder={placeholder}
        defaultValue={value}
        placeholderTextColor={'red'}
        style={styles.textinputStyle}
        multiline
      />
      {rightIcon && (
        <TouchableOpacity
          style={styles.rightImageContainer}
          onPress={onRightIconPress}>
          <Image source={rightIcon} style={styles.rightIconStyle} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create<IStyle>({
  inbutBoxContainer: {
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
  leftIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  textinputStyle: {
    fontSize: 16,
    flexShrink: 2,
    width: '100%',
    color: Colors.red,
  },
  rightImageContainer: {
    marginLeft: 10,
  },
  rightIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
