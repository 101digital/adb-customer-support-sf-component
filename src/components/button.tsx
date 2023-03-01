import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  colors,
  fonts,
  ArrowRightIcon,
} from "adb-customer-support-sf-component/src/assets";

interface IButton {
  background?: string;
  label?: string;
  onPress?: () => void;
  labelColor?: string;
  icon?: any;
  fullButton?: boolean;
  disabled?: boolean;
}
const Button: React.FC<IButton> = (props: IButton) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        props.fullButton ? styles.fullContainer : styles.container,
        {
          backgroundColor: props.background ?? "#1B1B1B",
          opacity: props.disabled ? 0.6 : 1,
        },
      ]}
      disabled={props.disabled}
    >
      <Text style={[styles.label, { color: props.labelColor ?? colors.white }]}>
        {props.label}
      </Text>
      <View style={styles.iconWrapper}>{props.icon}</View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  fullContainer: {
    width: "100%",
    borderRadius: 100,
    padding: 16,
    borderWidth: 3,
    borderColor: "#1B1B1B",
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.secondary,
    textAlign: "center",
  },
  iconWrapper: {
    marginLeft: 10,
  },
});
