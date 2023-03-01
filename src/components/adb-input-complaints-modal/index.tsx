import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  ADBButton,
  ADBInputField,
  ThemeContext,
} from "react-native-theme-component";
import ADBBottomSheet from "../adb-bottom-sheet";
import { colors } from "../../assets";
import { fonts } from "../../assets/fonts";
import { countWords } from "../../common";
import { MAXIMUM_WORDS_COMPLAINT } from "../adb-create-ticket-details-component/model";
import InputField from "../input-field";

interface ADBInputComplaintsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  value: string;
}

const ADBInputComplaintsModal = ({
  isVisible,
  onClose,
  onSubmit,
  value,
}: ADBInputComplaintsModalProps) => {
  const { i18n } = useContext(ThemeContext);

  return (
    <ADBBottomSheet
      title={
        i18n.t("adb_ticketing.create_ticket_details_title") ?? "Description"
      }
      subTitle={
        i18n.t("adb_ticketing.create_ticket_details_sub_title") ??
        "Please let us know your issue."
      }
      isVisible={isVisible}
      onClose={onClose}
      bottomSheetHeight={600}
    >
      <View style={styles.contentWrapper}>
        <InputField
          name="complaint"
          label="Complaints"
          placeholder={
            i18n.t(
              "adb_ticketing.create_ticket_details_complaints_placeholder"
            ) ?? "Enter your complaints here"
          }
          multiline
          numberOfLines={7}
          editable
        />
        <Text style={styles.remainingLabel}>{`${countWords(
          value
        )}/${MAXIMUM_WORDS_COMPLAINT}`}</Text>
        <View style={styles.buttonWrapper}>
          <ADBButton label="Confirm" onPress={onSubmit} />
        </View>
      </View>
    </ADBBottomSheet>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 24,
    height: 410,
  },
  buttonWrapper: {
    marginTop: "auto",
  },
  remainingLabel: {
    textAlign: "right",
  },
});

export default ADBInputComplaintsModal;
