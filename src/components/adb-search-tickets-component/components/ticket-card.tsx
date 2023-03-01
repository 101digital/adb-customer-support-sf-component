import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
// import { ThemeContext, useThemeFonts } from "react-native-theme-component";
import { colors, fonts } from "../../../assets";
import { ArrowForwardIcon } from "../../../assets/icons";
import moment from "moment";

interface TicketCardProps {
  header: string;
  status: string;
  id: string;
  createdDate: string;
  onPress: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  header,
  status,
  id,
  createdDate,
  onPress,
}: TicketCardProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{header}</Text>
          <View style={styles.headerArrow}>
            <ArrowForwardIcon size={14} />
          </View>
        </View>
        <Text style={styles.statusText}>{status}</Text>
        <View style={[styles.contentWrapper, { marginBottom: 16 }]}>
          <Text style={styles.contentLabel}>Ticket ID</Text>
          <Text style={styles.contentValue}>{id}</Text>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.contentLabel}>Submitted on</Text>
          <Text style={styles.contentValue}>
            {moment(createdDate).format("DD MMM YYYY")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.black,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  headerText: {
    // width: '95%',
    fontSize: 14,
    color: colors.almostBlack,
    fontFamily: fonts.bold,
  },
  headerArrow: {
    alignSelf: "flex-start",
    paddingTop: 5,
  },
  statusText: {
    fontSize: 16,
    color: colors.almostBlack,
    fontFamily: fonts.bold,
    marginBottom: 14,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentLabel: {
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  contentValue: {
    fontSize: 14,
    color: colors.almostBlack,
    fontFamily: fonts.regular,
  },
});

export default TicketCard;
