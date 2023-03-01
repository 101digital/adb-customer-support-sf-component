import { useField } from "formik";
import { defaultsDeep } from "lodash";
import React, { useContext, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { TextInputMaskProps } from "react-native-masked-text";
import { TriangleDangerIcon } from "../../assets/icons";
import { ThemeContext, useThemeFonts } from "react-native-theme-component";

const MAX_CHARACTERS_PER_LINE = 35;

export type InputFieldProps = TextInputMaskProps &
  TextInputProps & {
    name: string;
    label: string;
    errorBorderColor?: string;
    activeBorderColor?: string;
    inactiveBorderColor?: string;
    placeholderTextColor?: string;
    style?: InputFieldStyles;
    formatError?: (error: string) => string;
    footerText?: string;
    showErrorIcon?: boolean;
    showPlaceholder?: boolean;
    hideUnderLine?: boolean;
    onPress?: () => void;
  };

export type InputFieldStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  errorContainerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  footerTextStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
};

const InputField = (props: InputFieldProps) => {
  const {
    name,
    label,
    onFocus,
    onBlur,
    errorBorderColor,
    activeBorderColor,
    inactiveBorderColor,
    style,
    placeholderTextColor,
    formatError,
    options,
    placeholder,
    footerText,
    showErrorIcon = true,
    showPlaceholder,
    hideUnderLine,
    editable,
    multiline,
    numberOfLines,
    onPress,
    ...restProps
  } = props;
  const { inputField, colors } = useContext(ThemeContext);
  const [active, setActive] = useState(false);
  const [field, meta, helpers] = useField(name);
  const styles: InputFieldStyles = defaultsDeep(style, inputField);

  const handleOnFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    setActive(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleOnBlur = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    setActive(false);
    field.onBlur(name);
    helpers.setTouched(true);
    if (onBlur) {
      onBlur(event);
    }
  };

  let separatorColor: string;

  if (meta.error && meta.touched) {
    separatorColor = (errorBorderColor ?? colors.errorInputBorderColor)!;
  } else {
    separatorColor = active
      ? (activeBorderColor ?? colors.activeInputBorderColor)!
      : (inactiveBorderColor ?? colors.inActiveInputBorderColor)!;
  }

  const getErrorMessage = (error: string) => {
    return formatError?.(error) ?? error;
  };

  const titleInputStyles: TextStyle = {
    color: "#858585",
    fontSize: 12,
    fontFamily: useThemeFonts().medium,
    marginLeft: 5,
  };

  const inputContainerStyles: ViewStyle = {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  };

  const errorContainerStyles: ViewStyle = {
    flexDirection: "row",
    marginTop: 6,
    alignItems: "center",
  };

  const errorTitleStyles: TextStyle = {
    color: "#1B1B1B",
    fontSize: 13,
    marginLeft: 5,
  };

  const isMultilineViewOnly =
    multiline &&
    !editable &&
    field.value &&
    // only shows multiple lines if characters inputted overflow (numberOfLines - 1) lines
    field.value.length > MAX_CHARACTERS_PER_LINE * ((numberOfLines || 0) - 1);
  const isMultilineInputting = multiline && editable && (active || field.value);

  return (
    <View style={[styles.containerStyle]}>
      <Text style={titleInputStyles}>{label}</Text>
      <View style={inputContainerStyles}>
        <View
          style={[
            styles.contentContainerStyle,
            {
              flex: 1,
              borderColor: separatorColor,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingHorizontal: 0,
              borderBottomWidth: hideUnderLine ? 0 : 1,
              paddingRight: 12,
              borderBottomColor: "#C2C2C2",
            },
          ]}
        >
          <View
            style={[
              styles.inputContainerStyle,
              {
                height:
                  isMultilineViewOnly || isMultilineInputting
                    ? 40 + 10 * (numberOfLines || 0)
                    : 40,
              },
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                if (!editable && onPress) onPress();
              }}
            >
              {(function () {
                if (isMultilineViewOnly) {
                  return (
                    <Text
                      numberOfLines={numberOfLines}
                      style={[
                        styles.textInputStyle,
                        {
                          marginHorizontal: 5,
                        },
                      ]}
                      ellipsizeMode="tail"
                    >
                      {field.value}
                    </Text>
                  );
                }

                return (
                  <TextInput
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    value={field.value}
                    onChangeText={field.onChange(name)}
                    style={[
                      styles.textInputStyle,
                      {
                        marginHorizontal: 0,
                      },
                    ]}
                    placeholderTextColor={placeholderTextColor}
                    placeholder={placeholder}
                    editable={editable}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    textAlignVertical={isMultilineInputting ? "top" : "auto"}
                    {...restProps}
                  />
                );
              })()}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footerContainerStyle}>
        {meta.error && meta.touched && (
          <View style={errorContainerStyles}>
            {showErrorIcon && <TriangleDangerIcon size={18} />}
            <Text style={errorTitleStyles}>{getErrorMessage(meta.error)}</Text>
          </View>
        )}
        {footerText && <Text style={styles.footerTextStyle}>{footerText}</Text>}
      </View>
    </View>
  );
};

InputField.defaultProps = {
  type: "custom",
};

export default InputField;
