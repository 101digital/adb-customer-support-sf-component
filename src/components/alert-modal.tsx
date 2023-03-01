import { fonts } from "@/assets";
import React, { ReactNode } from "react";
import { Dimensions, Platform, StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";
import Button from "./button";

const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );

export type AlertModalProps = {
  title: string;
  message?: string;
  isVisible?: boolean;
  icon?: ReactNode;
  onBackdropPress?: () => void;
  onConfirmBtnPress: () => void;
  onSubBtnPress?: () => void;
  onClose?: () => void;
  btnLabel: string;
  subBtnLabel?: string;
  children?: React.ReactNode;
};

const AlertModal = (props: AlertModalProps) => {
  const {
    title,
    isVisible,
    message,
    onBackdropPress,
    icon,
    btnLabel,
    subBtnLabel,
    onConfirmBtnPress,
    onSubBtnPress,
    children,
  } = props;

  return (
    <Modal
      isVisible={isVisible}
      deviceHeight={deviceHeight}
      onBackdropPress={onBackdropPress}
      backdropTransitionInTiming={50}
      backdropTransitionOutTiming={50}
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      statusBarTranslucent
      style={styles.modalStyle}
    >
      <View style={styles.containerStyle}>
        <View style={styles.popupContainer}>
          <>
            {icon}
            <View style={styles.headerStyle}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.message}>{message}</Text>
            </View>
            {children}
            {subBtnLabel && (
              <View style={styles.subBtnContainer}>
                <Button
                  onPress={onSubBtnPress}
                  label={subBtnLabel}
                  labelColor={"#1B1B1B"}
                  background={"#ffffff"}
                  fullButton={true}
                />
              </View>
            )}
            {btnLabel && (
              <Button
                onPress={onConfirmBtnPress}
                label={btnLabel}
                fullButton={true}
              />
            )}
          </>
        </View>
      </View>
    </Modal>
  );
};

AlertModal.defaultProps = {
  isVisible: false,
  horizontalSpace: 20,
  backdropOpacity: 0.5,
  animationIn: "fadeIn",
  animationOut: "fadeOut",
  isShowClose: true,
  isFullWidth: true,
  isShowLeftIcon: true,
};

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    paddingBottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 34,
    marginLeft: 8,
    marginRight: 8,
  },
  containerStyle: {
    width: "100%",
  },
  subBtnContainer: {
    marginBottom: 10,
    width: "100%",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: fonts.regular,
  },
  popupContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 24,
    alignItems: "center",
  },
  headerStyle: {
    marginTop: 32,
  },
  content: {
    marginTop: 20,
    marginBottom: 35,
  },
  title: {
    color: "#1B1B1B",
    fontSize: 24,
    fontFamily: fonts.medium,
    textAlign: "center",
  },
});

export default React.memo(AlertModal);
