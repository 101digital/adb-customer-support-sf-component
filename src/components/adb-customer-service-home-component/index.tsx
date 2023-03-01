import React, { useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { colors } from "../../assets";
import { fonts } from "../../assets/fonts";
import { ThemeContext } from "react-native-theme-component";
import { ImagePlaceHolderIcon } from "../../assets/icons";

interface ICustomerServiceHome {
  navigateToCreateTicketType?: () => void;
  navigateToSearchTickets?: () => void;
}

const ADBCustomerServiceHomeComponent: React.FC<ICustomerServiceHome> = ({
  navigateToCreateTicketType,
  navigateToSearchTickets,
}: ICustomerServiceHome) => {
  const { i18n } = useContext(ThemeContext);

  const menuData = [
    {
      title: "Create support ticket",
      onPress: navigateToCreateTicketType,
    },
    {
      title: "My tickets",
      onPress: navigateToSearchTickets,
    },
    {
      title: "Chat with Live Agent",
      onPress: () => {},
    },
    {
      title: "FAQs",
      onPress: () => {},
    },
    {
      title: "Contact Customer Care",
      onPress: () => {},
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {i18n.t("adb_ticketing.help_support") ?? "Help & Support"}
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            style={styles.flatlist}
            data={menuData}
            renderItem={({ item }) => (
              <View style={[styles.menuList]}>
                <View style={styles.imageProductWrapper}>
                  <ImagePlaceHolderIcon color={"#FFFFFF"} size={20} />
                </View>
                <View>
                  <Text style={styles.menuItem} onPress={item.onPress}>
                    {item.title}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default ADBCustomerServiceHomeComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  contentWrapper: {
    alignItems: "flex-start",
    justifyContent: "space-around",
    width: "100%",
  },
  titleWrapper: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    color: "#1B1B1B",
    fontSize: 24,
    marginTop: 24,
    fontFamily: fonts.semiBold,
  },
  flex: { flex: 1 },
  flatlist: {
    marginTop: 38,
  },
  menuList: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingBottom: 12,
    paddingTop: 12,
  },
  imageProductWrapper: {
    borderRadius: 50,
    marginRight: 13,
    justifyContent: "center",
  },
  menuItem: {
    color: "#1B1B1B",
    fontFamily: fonts.medium,
    fontSize: 12,
    textAlign: "right",
  },
});
