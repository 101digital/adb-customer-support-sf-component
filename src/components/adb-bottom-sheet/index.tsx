import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { BottomSheet } from "react-native-theme-component";
import { CloseIcon } from "react-native-theme-component/src/assets";
import { images } from "../../assets/images";
import useMergeStyles from "./style";

export type ADBBottomSheetProps = {
  title: string;
  subTitle?: string;
  isVisible?: boolean;
  onClose?: () => void;
  //   onPress?: () => void;
  style?: ADBBottomSheetStyles;
  bottomSheetHeight: number;
  children: React.ReactNode;
};

export type ADBBottomSheetStyles = {
  closeButtonContainer?: StyleProp<ViewStyle>;
  closeIcon?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
};

const ADBBottomSheet = ({
  title,
  subTitle,
  isVisible,
  onClose = () => {},
  //   onPress = () => {},
  style,
  bottomSheetHeight,
  children,
}: ADBBottomSheetProps) => {
  const styles: ADBBottomSheetStyles = useMergeStyles(style);

  return (
    <BottomSheet
      isVisible={isVisible}
      style={{
        containerStyle: {
          height: bottomSheetHeight,
        },
      }}
      useSafeArea
    >
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
          <CloseIcon width={8} height={8} />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>{title}</Text>
        {subTitle && <Text style={styles.subTitleStyle}>{subTitle}</Text>}
      </View>
      {children}
    </BottomSheet>
  );
};

export default ADBBottomSheet;
