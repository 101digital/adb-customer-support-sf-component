import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { ADBBottomSheetStyles } from './index';
import { fonts } from '../../assets/fonts'

const useMergeStyles = (style?: ADBBottomSheetStyles): ADBBottomSheetStyles => {
  const defaultStyles: ADBBottomSheetStyles = StyleSheet.create({
    closeButtonContainer: {
      padding: 24,
      // height: '90%',
    },
    closeIcon: {
      backgroundColor: '#EBEBEB',
      borderRadius: 100,
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    titleStyle: {
      color: "#1B1B1B",
      fontSize: 24,
      marginTop: 24,
      fontFamily: fonts.semiBold,
    },
    subTitleStyle: {
      color: "#1B1B1B",
      fontSize: 14,
      marginTop: 8,
      fontFamily: fonts.medium,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
