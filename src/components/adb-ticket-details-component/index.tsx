import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemeContext, ADBButton } from "react-native-theme-component";
import { colors } from "../../assets/colors";
import { fonts } from "../../assets/fonts";
import { images } from "../../assets/images";
import { TicketingContext } from "../../contexts";
import Button from "../button";
import { AttachmentIcon } from "../../assets/icons";
import { TicketStatusValue } from "../../common";

interface ADBTicketDetailsComponentProps {
  ticketId: string;
  navigateToCustomerServiceHome: () => void;
  navigateToTicketAttachments: (
    attachmentId: string,
    attachmentName: string
  ) => void;
}

const ADBTicketDetailsComponent: React.FC<ADBTicketDetailsComponentProps> = ({
  ticketId,
  navigateToCustomerServiceHome,
  navigateToTicketAttachments,
}: ADBTicketDetailsComponentProps) => {
  const { i18n } = useContext(ThemeContext);
  const {
    createTicketType,
    createTicketHeader,
    createTicketComplaint,
    clearCreateTicketData,
    searchedTickets,
    searchedTicketAttachments,
    clearSearchedTicketData,
    getTicketAttachments,
  } = useContext(TicketingContext);
  const searchedTicket = searchedTickets.find((n) => n.id === ticketId);

  useEffect(() => {
    if (!searchedTicketAttachments) {
      getTicketAttachments(ticketId);
    }
  }, []);

  const ticketDetails = [
    {
      label: "Ticket ID",
      value: ticketId,
    },
    {
      label: "Status",
      value: searchedTicket?.status || TicketStatusValue.SUBMITTED,
    },
    {
      label: "Support Type",
      value: searchedTicket?.type || createTicketType,
    },
    {
      label: "Header",
      value: searchedTicket?.header || createTicketHeader,
    },
    {
      label: "Descriptions",
      value: searchedTicket?.description || createTicketComplaint,
    },
  ];

  let titleKey = "";
  if (!searchedTicket) {
    titleKey = "adb_ticketing.ticket_details_title_submitted";
  } else {
    switch (searchedTicket.status) {
      case TicketStatusValue.SUBMITTED:
        titleKey = "adb_ticketing.ticket_details_title_submitted";
        break;
      case TicketStatusValue.IN_REVIEW:
        titleKey = "adb_ticketing.ticket_details_title_in_review";
        break;
      case TicketStatusValue.IN_PROGRESS:
        titleKey = "adb_ticketing.ticket_details_title_in_review";
        break;
      case TicketStatusValue.RESOLVED: {
        titleKey = "adb_ticketing.ticket_details_title_resolved";
        break;
      }
    }
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingVertical: 24,
        }}
      >
        <Image source={images.placeholder} style={styles.image} />
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{i18n.t(titleKey)}</Text>
            <Text style={styles.subTitle}>
              {i18n.t("adb_ticketing.ticket_details_sub_title")}
            </Text>
          </View>
          <View>
            <Text style={styles.sectionLabel}>Ticket Details</Text>
            {ticketDetails.map((n, idx) => (
              <View key={idx}>
                <Text style={styles.sectionItemLabel}>{n.label}</Text>
                <Text style={styles.sectionItemValue}>{n.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.divider} />
          {searchedTicketAttachments &&
            searchedTicketAttachments.length > 0 && (
              <View style={styles.attachmentSection}>
                <Text style={styles.sectionLabel}>Supporting documents</Text>
                {searchedTicketAttachments.map((n, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => {
                      // TODO: cater for create ticket flow too
                      navigateToTicketAttachments(n.id, n.name);
                    }}
                  >
                    <View key={idx} style={styles.attachmentWrapper}>
                      <View style={{ marginRight: 8 }}>
                        <AttachmentIcon size={16} />
                      </View>
                      <Text style={styles.attachmentText}>{n.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
        </View>
        <View style={styles.buttonWrapper}>
          <View style={{ marginBottom: 8 }}>
            <Button
              fullButton
              label="Go to Home"
              labelColor={"#1B1B1B"}
              background={"#ffffff"}
              onPress={() => {
                navigateToCustomerServiceHome();
                clearCreateTicketData();
                clearSearchedTicketData();
              }}
            />
          </View>
          <Button fullButton label="Contact Customer Care" onPress={() => {}} />
        </View>
      </ScrollView>
    </>
  );
};

export default ADBTicketDetailsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
  },
  image: {
    alignSelf: "center",
    marginBottom: 32,
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
    color: colors.almostBlack,
    fontSize: 24,
    fontFamily: fonts.semiBold,
  },
  subTitle: {
    color: colors.almostBlack,
    marginTop: 8,
    // fontFamily: fonts.medium,
  },
  divider: {
    borderBottomColor: colors.almostBlack,
    borderBottomWidth: 1,
  },
  buttonWrapper: {
    marginTop: "auto",
  },
  sectionLabel: {
    fontSize: 16,
    color: colors.almostBlack,
    fontFamily: fonts.bold,
    marginBottom: 16,
  },
  sectionItemLabel: {
    fontSize: 12,
    marginBottom: 8,
    fontFamily: fonts.medium,
  },
  sectionItemValue: {
    fontSize: 16,
    color: colors.almostBlack,
    fontFamily: fonts.regular,
    marginBottom: 24,
  },
  attachmentSection: {
    marginBottom: 48,
  },
  attachmentWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  attachmentText: {
    color: colors.almostBlack,
    textDecorationLine: "underline",
    marginBottom: 5,
  },
});
