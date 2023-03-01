import { Formik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  // FlatList,
  Image,
  ImageStyle,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { BottomSheet, InputField } from "react-native-theme-component";
import { CloseIcon } from "react-native-theme-component/src/assets";
import { images } from "adb-customer-support-sf-component/src/assets/images";
import useMergeStyles from "adb-customer-support-sf-component/src/components/async-searchable-modal/style";
import { useDebounce } from "react-native-theme-component/src/hooks/useDebounce";

export type AsyncSearchableModalProps = {
  title: string;
  data: string[];
  isVisible?: boolean;
  onClose?: () => void;
  onPress?: (item: string) => void;
  style?: AsyncSearchableModalStyles;
  isSearchable?: boolean;
  bottomSheetHeight: number;
  searchPlaceholder?: string;
};

export type AsyncSearchableModalStyles = {
  cardContainer?: StyleProp<ViewStyle>;
  closeButtonContainer?: StyleProp<ViewStyle>;
  closeIcon?: StyleProp<ViewStyle>;
  line?: StyleProp<ViewStyle>;
  searchContainer?: StyleProp<ViewStyle>;
  prefixIcon?: StyleProp<ViewStyle>;
  itemsWrapper?: StyleProp<ViewStyle>;
  cardTitle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  searchIcon?: StyleProp<ImageStyle>;
};

const AsyncSearchableModal = ({
  title,
  data,
  isVisible,
  onClose = () => {},
  onPress = () => {},
  style,
  isSearchable,
  bottomSheetHeight,
  searchPlaceholder,
}: AsyncSearchableModalProps) => {
  const [searchedText, setSearchedText] = useState<string>("");
  const debouncedSearchedText = useDebounce<string>(searchedText, 300);
  const [sheetHeight, setBottomSheetHeight] =
    useState<number>(bottomSheetHeight);

  const styles: AsyncSearchableModalStyles = useMergeStyles(style);

  useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener("keyboardWillShow", () =>
      setBottomSheetHeight(600)
    );
    const keyboardWillHideSub = Keyboard.addListener("keyboardWillHide", () =>
      setBottomSheetHeight(bottomSheetHeight)
    );

    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, []);

  useEffect(() => {}, [debouncedSearchedText]);

  const onSearch = (e: string) => {
    setSearchedText(e);
  };

  const RenderItem = ({ item }: { item: string }) => {
    return (
      <View>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => {
            onPress(item);
            onClose();
          }}
        >
          <Text style={styles.cardTitle}>{item}</Text>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    );
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      style={{
        containerStyle: {
          height: sheetHeight, // 605
        },
      }}
      useSafeArea
    >
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
          <CloseIcon width={8} height={8} />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
      {/* Search Container */}
      {isSearchable ? (
        <KeyboardAvoidingView
          style={styles.searchContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <InputField
            keyboardType="default"
            name={"searchedText"}
            value={searchedText}
            placeholder={searchPlaceholder ?? "Search"}
            maxLength={8}
            onChangeText={(e) => onSearch(e)}
            errorBorderColor="transparent"
            activeBorderColor="transparent"
            inactiveBorderColor="transparent"
            prefixIcon={<View style={styles.prefixIcon} />}
            suffixIcon={
              <Image
                source={images.search}
                style={styles.searchIcon}
                resizeMode={"contain"}
              />
            }
            style={{
              textInputStyle: {
                fontSize: 16,
              },
              containerStyle: {
                width: "100%",
                marginLeft: 5,
              },
            }}
          />
        </KeyboardAvoidingView>
      ) : null}

      <ScrollView style={styles.itemsWrapper}>
        {data.map((item: string, idx: number) => (
          <RenderItem key={idx} item={item} />
        ))}
      </ScrollView>
    </BottomSheet>
  );
};

export default AsyncSearchableModal;
