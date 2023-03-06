import React, { useContext } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import ADBBottomSheet from "../adb-bottom-sheet";
import { colors, fonts, images } from "../../assets";

interface ADBHowToUploadModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const LIST = [
  'Click "Upload file" button',
  "Choose your preferred option to retrieve the document(s).",
  "Select the document(s) to upload.",
  "Click “Upload another file” if you want to upload more document(s).",
  "Click “Continue” when done.",
];

const ADBHowToUploadModal = ({
  isVisible,
  onClose,
}: ADBHowToUploadModalProps) => {
  const { i18n } = useContext(ThemeContext);

  return (
    <ADBBottomSheet
      title={i18n.t("adb_ticketing.create_ticket_how_to_upload_modal_title")}
      isVisible={isVisible}
      onClose={onClose}
      bottomSheetHeight={650}
    >
      <View style={styles.contentWrapper}>
        <Image source={images.placeholder} />
        <View style={styles.listWrapper}>
          {LIST.map((text, idx) => (
            <View key={idx} style={styles.listItemWrapper}>
              <Text style={styles.listItemNumber}>{idx + 1}.</Text>
              <Text>{text}</Text>
            </View>
          ))}
        </View>
      </View>
    </ADBBottomSheet>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  listWrapper: {
    marginTop: 16,
    alignItems: "flex-start",
  },
  listItemWrapper: {
    flexDirection: "row",
    marginBottom: 10,
  },
  listItemNumber: {
    marginRight: 8,
  },
  title: {
    marginBottom: 12,
    color: colors.almostBlack,
    fontFamily: fonts.medium,
  },
});

export default ADBHowToUploadModal;
