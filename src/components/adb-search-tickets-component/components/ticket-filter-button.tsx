import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from "react-native";
import { ArrowDownIcon } from "adb-customer-support-sf-component/src/assets/icons";
import { colors, fonts } from "adb-customer-support-sf-component/src/assets";

interface TicketFilterButtonProps extends TouchableOpacityProps {
  label: string;
  onPress: () => void;
}

const TicketFilterButton = ({
  label,
  style,
  onPress,
}: TicketFilterButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.icon}>
        <ArrowDownIcon size={13} color={colors.black} />
      </View>
    </TouchableOpacity>
  );
};

export default TicketFilterButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 24,
    padding: 8,
    width: "40%",
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  icon: {
    marginLeft: 10,
    marginTop: 2,
  },
});
