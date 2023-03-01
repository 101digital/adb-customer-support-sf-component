import { defaultsDeep } from "lodash";
import { StyleSheet } from "react-native";
import { SelectorComponentStyles } from ".";
const useMergeStyles = (
  style?: SelectorComponentStyles
): SelectorComponentStyles => {
  const defaultStyles: SelectorComponentStyles = StyleSheet.create({
    container: {
      paddingVertical: 10,
    },
    title: {
      color: "#858585",
      fontSize: 12,
      fontFamily: "Poppins-Medium",
      fontWeight: "500",
      lineHeight: 16,
    },
    touchableStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      alignItems: "center",
    },
    placeholder: {
      fontFamily: "Poppins",
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 24,
      color: "#C2C2C2",
    },
    line: {
      height: 1,
      width: "100%",
      backgroundColor: "#C2C2C2",
    },
    currentBalanceStyle: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: "Poppins-Regular",
      fontWeight: "400",
      color: "#858585",
      paddingRight: 10,
    },
    amountContainer: {
      flexDirection: "row",
    },
    calanderImage: {
      height: 24,
      width: 24,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
