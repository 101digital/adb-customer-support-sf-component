import React, { useContext, useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ThemeContext } from "react-native-theme-component";
// import { ThemeContext, useThemeFonts } from "react-native-theme-component";
import { colors, fonts } from "../../assets";
// import { TicketingContext } from "../../contexts";
import { TicketingService } from "adb-customer-support-sf-component/src/services/ticketing-service";
import PDFView from "react-native-view-pdf";

const ticketingInstance = TicketingService.instance();

interface ADBTicketAttachmentsProps {
  attachmentId?: string;
  attachmentName?: string;
}

const ADBTicketAttachmentsComponent: React.FC<ADBTicketAttachmentsProps> = ({
  attachmentId,
  attachmentName,
}: ADBTicketAttachmentsProps) => {
  const { i18n } = useContext(ThemeContext);
  // const { } = useContext(TicketingContext);
  const [content, setContent] = useState("");

  useEffect(() => {
    const getAttachmentContent = async () => {
      try {
        if (attachmentId) {
          const response = await ticketingInstance.getAttachmentContent(
            attachmentId
          );
          setContent(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAttachmentContent();
  }, []);

  const isPDF = attachmentName?.toUpperCase().includes(".PDF");

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {i18n.t("adb_ticketing.ticket_attachments_title")}
            </Text>
            <Text style={styles.subTitle}>
              {i18n.t("adb_ticketing.ticket_attachments_sub_title")}
            </Text>
          </View>
        </View>
        <View style={styles.imageWrapper}>
          {isPDF && content?.length > 0 && (
            <PDFView
              fadeInDuration={250.0}
              // style={{ flex: 1 }}
              style={styles.image}
              resource={content}
              resourceType={"base64"}
              onError={(error) => console.log("Cannot render PDF", error)}
            />
          )}
          {!isPDF && content?.length > 0 && (
            <Image
              source={{ uri: `data:image/png;base64,${content}` }}
              resizeMode="contain"
              style={styles.image}
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 24,
  },
  contentWrapper: {
    alignItems: "flex-start",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 24,
  },
  titleWrapper: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 20,
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
  imageWrapper: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    // height: '100%'
    height: 300,
  },
});

export default ADBTicketAttachmentsComponent;
