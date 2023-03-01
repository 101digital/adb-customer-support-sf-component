import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../assets";
import { fonts } from "../../assets/fonts";
import { ThemeContext, ADBButton } from "react-native-theme-component";
import Selector from "../selector-component";
import ItemsListModal from "adb-customer-support-sf-component/src/components/sync-searchable-modal";
import { TicketingContext } from "../../contexts";
import Button from "../button";

interface ICreateTicketType {
  navigateToCreateTicketDetails: () => void;
}

const TYPES = [
  "Savings Account",
  "Savings Pot",
  "Personal Financing",
  "Cash Advance",
  "Buy Now Pay Later",
  "Account Details Modification",
  "DuitNow Transfer",
  "DuitNow QR",
  "Debit Card",
  "Agent Banking",
  "Transaction Disputes",
  "Fraud Cases",
  "Aeon Membership Plus (AMP)",
  "OTP Delay / Not Received",
  "Statement Request",
  "Other Complaints / Feedbacks / Queries",
];

const ADBCreateTicketTypeComponent: React.FC<ICreateTicketType> = ({
  navigateToCreateTicketDetails,
}: ICreateTicketType) => {
  const { i18n } = useContext(ThemeContext);
  const { createTicketType, setCreateTicketType } =
    useContext(TicketingContext);
  const [selectTypeModal, setSelectTypeModal] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {i18n.t("adb_ticketing.create_ticket_type_title") ??
                "Create support ticket"}
            </Text>
            <Text style={styles.subTitle}>
              {i18n.t("adb_ticketing.create_ticket_type_sub_title") ??
                "How can we help you?"}
            </Text>
          </View>
        </View>
        <View>
          <Selector
            title={
              i18n.t("adb_ticketing.create_ticket_type_select_label") ??
              "Issue Type"
            }
            value={createTicketType}
            placeholder={
              i18n.t("adb_ticketing.create_ticket_type_select_placeholder") ??
              "Select one"
            }
            onPress={() => {
              setSelectTypeModal(true);
            }}
          />
          <ItemsListModal
            title={
              i18n.t("adb_ticketing.create_ticket_type_select_modal_title") ??
              "Issue type"
            }
            defaultData={TYPES}
            isVisible={selectTypeModal}
            onClose={() => setSelectTypeModal(false)}
            onPress={(item) => setCreateTicketType(item)}
            isSearchable
            bottomSheetHeight={600}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Button
            label={
              i18n.t("adb_ticketing.create_ticket_type_continue") ?? "Continue"
            }
            fullButton
            onPress={navigateToCreateTicketDetails}
            disabled={!createTicketType}
          />
        </View>
      </View>
    </>
  );
};

export default ADBCreateTicketTypeComponent;

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
    marginBottom: 32,
  },
  title: {
    color: "#1B1B1B",
    fontSize: 24,
    marginTop: 24,
    fontFamily: fonts.semiBold,
  },
  subTitle: {
    color: "#1B1B1B",
    fontSize: 14,
    marginTop: 8,
    fontFamily: fonts.medium,
  },
  btnWrapper: {
    marginTop: "auto",
    marginBottom: 8,
  },
});
