import { defaultsDeep } from "lodash";
import { StyleSheet } from "react-native";
import { fonts, colors } from "adb-customer-support-sf-component/src/assets";
import { SyncSearchableModalStyles } from "adb-customer-support-sf-component/src/components/sync-searchable-modal";

const useMergeStyles = (
  style?: SyncSearchableModalStyles
): SyncSearchableModalStyles => {
  const defaultStyles: SyncSearchableModalStyles = StyleSheet.create({
    closeButtonContainer: {
      padding: 24,
      // height: '90%',
    },
    closeIcon: {
      backgroundColor: "#EBEBEB",
      borderRadius: 100,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "flex-end",
    },
    cardContainer: {
      flexDirection: "row",
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: "center",
    },
    titleStyle: {
      fontSize: 24,
      fontFamily: fonts.semiBold,
      color: colors.black,
      lineHeight: 28,
      marginTop: 24,
    },
    cardTitle: {
      fontSize: 16,
      fontFamily: fonts.regular,
      color: colors.black,
      marginLeft: 16,
      lineHeight: 24,
    },
    line: {
      height: 0.5,
      width: "88%",
      backgroundColor: "#DDDDDD",
      alignSelf: "center",
    },
    searchContainer: {
      paddingLeft: 15,
      paddingRight: 27,
    },
    searchIcon: {
      height: 24,
      width: 24,
    },
    prefixIcon: {
      backgroundColor: "#1B1B1B",
      height: 18,
      width: 1,
    },
    itemsWrapper: { height: "88%", marginBottom: 70 },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
