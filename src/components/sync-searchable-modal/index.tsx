import { Formik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
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
import useMergeStyles from "adb-customer-support-sf-component/src/components/sync-searchable-modal/style";

export type SyncSearchableModalProps = {
  title: string;
  defaultData: string[];
  isVisible?: boolean;
  onClose?: () => void;
  onPress?: (item: string) => void;
  style?: SyncSearchableModalStyles;
  isSearchable?: boolean;
  isShowDataOnSearch?: boolean;
  bottomSheetHeight: number;
  searchPlaceholder?: string;
};

export type SyncSearchableModalStyles = {
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

const SyncSearchableModal = ({
  title,
  defaultData,
  isVisible,
  onClose = () => {},
  onPress = () => {},
  style,
  isSearchable,
  isShowDataOnSearch,
  bottomSheetHeight,
  searchPlaceholder,
}: SyncSearchableModalProps) => {
  const [searchedText, setSearchedText] = useState<string>("");
  const [sheetHeight, setBottomSheetHeight] =
    useState<number>(bottomSheetHeight);
  const formikRef: any = useRef(null);
  const styles: SyncSearchableModalStyles = useMergeStyles(style);

  const listData = useMemo(() => {
    if (!searchedText || !isVisible) {
      return isShowDataOnSearch ? [] : defaultData;
    } else if (searchedText) {
      return defaultData.filter(
        (item) => item.toUpperCase().indexOf(searchedText.toUpperCase()) > -1
      );
    }
  }, [defaultData, searchedText, isVisible]);

  const RenderItem = ({ item }: { item: string }) => {
    return (
      <View>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => {
            onPress(item);
            setSearchedText("");
            onClose();
          }}
        >
          <Text style={styles.cardTitle}>{item}</Text>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    );
  };

  const onSearch = (e: string) => {
    setSearchedText(e);
  };

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
          <Formik
            innerRef={formikRef}
            enableReinitialize={true}
            initialValues={{ searchText: "" }}
            onSubmit={() => {}}
          >
            {({ submitForm }) => (
              <View>
                <InputField
                  keyboardType="default"
                  name={"searchedText"}
                  value={searchedText}
                  placeholder={searchPlaceholder ?? "Search"}
                  // maxLength={8}
                  onChangeText={(e) => onSearch(e)}
                  errorBorderColor="transparent"
                  activeBorderColor="transparent"
                  inactiveBorderColor="transparent"
                  prefixIcon={<View style={styles.prefixIcon} />}
                  suffixIcon={
                    <TouchableOpacity onPress={submitForm}>
                      <Image
                        source={images.search}
                        style={styles.searchIcon}
                        resizeMode={"contain"}
                      />
                    </TouchableOpacity>
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
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      ) : null}

      <ScrollView style={styles.itemsWrapper}>
        {listData.map((item: string, idx: number) => (
          <RenderItem key={idx} item={item} />
        ))}
      </ScrollView>
    </BottomSheet>
  );
};

export default SyncSearchableModal;
