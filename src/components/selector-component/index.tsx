import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
} from "react-native";
import { colors } from "../../assets";
import { ArrowDownIcon } from "../../assets/icons";
import { images } from "../../assets/images";
import useMergeStyles from "./style";
import { TrashBinIcon } from "../../assets/icons";

export type SelectorProps = {
  value?: string | undefined;
  title?: string;
  placeholder?: string;
  onPress: () => void;
  onRemovePress?: () => void;
  style?: SelectorComponentStyles;
  isSearch?: boolean;
  isRemovable?: boolean;
};

export type SelectorComponentStyles = {
  container?: StyleProp<ViewStyle>;
  touchableStyle?: StyleProp<ViewStyle>;
  line?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  placeholder?: StyleProp<TextStyle>;
  currentBalanceStyle?: StyleProp<TextStyle>;
  amountContainer?: StyleProp<TextStyle>;
};

const Selector = ({
  placeholder,
  title,
  value,
  onPress,
  onRemovePress,
  style,
  isSearch,
  isRemovable,
}: SelectorProps) => {
  const styles: SelectorComponentStyles = useMergeStyles(style);
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity style={styles.touchableStyle} onPress={onPress}>
        <Text
          style={[styles.placeholder, { color: value ? "#333333" : "#C2C2C2" }]}
        >
          {value || placeholder}
        </Text>
        <View style={styles.amountContainer}>
          {isSearch ? (
            value && isRemovable ? (
              <TouchableOpacity onPress={onRemovePress}>
                <TrashBinIcon size={24} />
              </TouchableOpacity>
            ) : (
              <Image
                source={images.search}
                style={{ height: 24, width: 24 }}
                resizeMode={"contain"}
              />
            )
          ) : (
            <ArrowDownIcon color={colors.black} size={17} />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );
};

export default Selector;
