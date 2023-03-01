import React, { useContext, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
// import { ThemeContext, useThemeFonts } from "react-native-theme-component";
import { colors, fonts } from "../../assets";
import { AttachmentIcon, TrashBinIcon } from "../../assets/icons";

interface ADBCreateTicketAttachmentProps {
  name: string;
  onDelete: () => void;
}

const ADBCreateTicketAttachment: React.FC<ADBCreateTicketAttachmentProps> = ({
  name,
  onDelete,
}: ADBCreateTicketAttachmentProps) => {
  return (
    <View style={styles.container}>
      <View style={{ marginRight: 8 }}>
        <AttachmentIcon size={16} />
      </View>
      <Text style={styles.text}>{name}</Text>
      <TouchableOpacity onPress={onDelete}>
        <View style={styles.trashBin}>
          <TrashBinIcon size={14} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.almostBlack,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 5,
    width: "100%",
  },
  text: {
    color: colors.almostBlack,
    width: "80%",
  },
  trashBin: {
    marginLeft: "auto",
    alignSelf: "flex-end",
  },
});

export default ADBCreateTicketAttachment;
