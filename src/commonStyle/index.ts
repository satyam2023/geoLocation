import {StyleSheet, TextStyle} from 'react-native';
import {Colors} from '../config/constants/Color';

interface IStyle {
  text: TextStyle;
}

export const commomStyle = StyleSheet.create<IStyle>({
  text: {
    color: Colors.black,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
});
