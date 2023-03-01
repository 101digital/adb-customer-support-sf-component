import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { ThemeContext } from "react-native-theme-component";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import { colors } from "../../../assets";

const MAX_FILE_SIZE = 10000000;
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

export interface FilePickerProps {
  isVisible: boolean;
  addAttachment: (attachment: DocumentPickerResponse) => void;
  onSelectWrongFileType: () => void;
  onSelectWrongFileSize: () => void;
  onClose: () => void;
}

const FilePicker: React.FC<FilePickerProps> = ({
  isVisible,
  addAttachment,
  onSelectWrongFileType,
  onSelectWrongFileSize,
  onClose,
}: FilePickerProps) => {
  const { i18n } = useContext(ThemeContext);

  const onFilePick = async () => {
    const pickerResult = await DocumentPicker.pickSingle({
      presentationStyle: "fullScreen",
      copyTo: "cachesDirectory",
    });
    if (pickerResult) {
      if (!ALLOWED_FILE_TYPES.includes(pickerResult.type)) {
        onSelectWrongFileType();
      } else if (pickerResult.size > MAX_FILE_SIZE) {
        onSelectWrongFileSize();
      } else {
        addAttachment(pickerResult);
        onClose();
      }
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      deviceHeight={deviceHeight}
      // onBackdropPress={onBackdropPress}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={50}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      statusBarTranslucent
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.listWrapper}>
          <TouchableOpacity
            style={[styles.listItem, styles.firstListItem]}
            onPress={onFilePick}
          >
            <Text style={styles.txtBtn}>
              {i18n?.t("loan-origination-component.file")}
            </Text>
          </TouchableOpacity>
          {Platform.OS === "ios" && (
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.txtBtn}>
                {i18n?.t("loan-origination-component.icloud-drive")}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.txtBtn}>
              {i18n?.t("loan-origination-component.google-drive")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.txtBtn}>
              {i18n?.t("loan-origination-component.dropbox")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.listItem, styles.lastListItem]}>
            <Text style={styles.txtBtn}>
              {i18n?.t("loan-origination-component.one-drive")}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.listItem, styles.wrapBottomBorder]}
          >
            <Text style={styles.txtBtn}>
              {i18n?.t("loan-origination-component.more")}
            </Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={styles.cancelWrapper} onPress={onClose}>
          <Text style={styles.txtCancel}>
            {i18n?.t("loan-origination-component.cancel")}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FilePicker;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    height: "100%",
  },
  container: {
    position: "absolute",
    bottom: -130,
    height: "70%",
    width: "100%",
    alignSelf: "center",
  },
  listWrapper: {
    backgroundColor: colors.white,
    width: "95%",
    borderRadius: 15,
    marginHorizontal: "5%",
    marginBottom: "3%",
    alignSelf: "center",
    justifyContent: "center",
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderBottomWidth: 0.5,
    width: "100%",
    backgroundColor: colors.white,
  },
  firstListItem: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  lastListItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  txtBtn: {
    fontSize: 20,
    fontWeight: "400",
    color: colors.black,
  },
  txtCancel: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.skyBlue,
  },
  cancelWrapper: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.white,
    width: "95%",
    borderRadius: 15,
    marginTop: 12,
  },
});
