import React, { useContext, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import { colors } from "../../assets";
import { fonts } from "../../assets/fonts";
import { CorrectIcon, WarningIcon } from "../../assets/icons";
import { ThemeContext, ADBButton } from "react-native-theme-component";
import { TicketingContext } from "../../contexts";
import {
  InputTicketDetailsData,
  InputTicketDetailschema,
  MAXIMUM_WORDS_HEADER,
  MAXIMUM_WORDS_COMPLAINT,
} from "./model";
import { countWords, calculateMaxLength } from "../../common";
import ADBInputComplaintsModal from "../adb-input-complaints-modal";
import ADBHowToUploadModal from "../adb-how-to-upload-modal";
import ADBCreateTicketAttachment from "../adb-create-ticket-attachment";
import { TicketingService } from "../../services/ticketing-service";
import AlertModal from "../alert-modal";
import InputField from "../input-field";
import FilePicker from "./components/file-picker";

import { DocumentPickerResponse } from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";

const ticketingService = TicketingService.instance();

interface ICreateTicketDetails {
  navigateToCustomerServiceHome: () => void;
  navigateToTicketDetails: (ticketId: string) => void;
}

const ADBCreateTicketDetailsComponent: React.FC<ICreateTicketDetails> = ({
  navigateToCustomerServiceHome,
  navigateToTicketDetails,
}: ICreateTicketDetails) => {
  const { i18n } = useContext(ThemeContext);
  const {
    setCreateTicketHeader,
    setCreateTicketComplaint,
    createTicketType,
    setCreateTicketAttachments,
  } = useContext(TicketingContext);
  const formikRef = useRef(null);
  const [createdTicketId, setCreatedTicketId] = useState("");
  const [selectComplaintsModal, setSelectComplaintsModal] = useState(false);
  const [selectHowToUploadModal, setSelectHowToUploadModal] = useState(false);
  const [selectUploadModal, setSelectUploadModal] = useState(false);
  const [selectSuccessModal, setSelectSuccessModal] = useState(false);
  const [selectWrongFileTypeModal, setSelectWrongFileTypeModal] =
    useState(false);
  const [selectWrongFileSizeModal, setSelectWrongFileSizeModal] =
    useState(false);
  const [attachments, setAttachments] = useState<
    Array<DocumentPickerResponse> | undefined | null
  >();
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const marginKeyboard =
    keyboardHeight > 0 && Platform.OS === "ios" ? keyboardHeight : 15;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const addAttachment = (attachment: DocumentPickerResponse) => {
    setAttachments([...(attachments || []), attachment]);
  };

  const removeAttachment = (attachment: DocumentPickerResponse) => {
    if (attachments) {
      setAttachments(
        attachments.filter((n) => n.fileCopyUri !== attachment.fileCopyUri)
      );
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          paddingHorizontal: 24,
          paddingTop: 24,
        }}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {i18n.t("adb_ticketing.create_ticket_details_title") ??
                "Description"}
            </Text>
            <Text style={styles.subTitle}>
              {i18n.t("adb_ticketing.create_ticket_details_sub_title") ??
                "Please let us know your issue."}
            </Text>
          </View>
        </View>
        <Formik
          innerRef={formikRef}
          enableReinitialize={true}
          initialValues={InputTicketDetailsData.empty()}
          validationSchema={InputTicketDetailschema}
          onSubmit={async (values) => {
            const payload = {
              Subject: values.header,
              Type: createTicketType,
              // TODO: get from context
              SuppliedEmail: "minh@101digital.io",
              SuppliedName: "Minh",
              Description: values.complaint,
              Origin: "App",
            };
            try {
              const response = await ticketingService.createCase(payload);
              if (response.success) {
                if (attachments && attachments.length > 0) {
                  const attachmentsToUpload: Array<{
                    title: string;
                    base64: string;
                  }> = [];
                  const base64Contents = await Promise.all(
                    attachments.map((n) =>
                      RNFetchBlob.fs.readFile(n.uri, "base64")
                    )
                  );
                  base64Contents.forEach((base64, idx) => {
                    attachmentsToUpload.push({
                      title: attachments[idx].name,
                      base64,
                    });
                  });
                  await Promise.all(
                    attachmentsToUpload.map((n) =>
                      ticketingService.createCaseAttachment({
                        Title: n.title,
                        FirstPublishLocationId: response.id,
                        VersionData: n.base64,
                      })
                    )
                  );
                }
                setCreatedTicketId(response.id);
                setCreateTicketHeader(values.header);
                setCreateTicketComplaint(values.complaint);
                if (attachments && attachments.length > 0) {
                  setCreateTicketAttachments(
                    attachments.map((n) => ({
                      name: n.name,
                      uri: n.uri,
                    }))
                  );
                }
                setSelectSuccessModal(true);
              }
            } catch (e) {
              console.log(e);
            }
          }}
        >
          {({ submitForm, errors, values, isValid, isSubmitting }) => {
            return (
              <>
                <View style={styles.formWrapper}>
                  <InputField
                    name="header"
                    label="Header"
                    placeholder={
                      i18n.t(
                        "adb_ticketing.create_ticket_details_header_placeholder"
                      ) ?? "Title here"
                    }
                    showPlaceholder
                    maxLength={calculateMaxLength(
                      values.header,
                      MAXIMUM_WORDS_HEADER
                    )}
                  />
                  {!errors.header && (
                    <Text style={styles.remainingLabel}>{`${countWords(
                      values.header
                    )}/${MAXIMUM_WORDS_HEADER}`}</Text>
                  )}
                  <View style={styles.verticalSpacing} />
                  <InputField
                    name="complaint"
                    label="Complaints"
                    placeholder={
                      i18n.t(
                        "adb_ticketing.create_ticket_details_complaints_placeholder"
                      ) ?? "Enter your complaints here"
                    }
                    editable={false}
                    multiline
                    numberOfLines={3}
                    onPress={() => {
                      setSelectComplaintsModal(true);
                    }}
                  />
                  {!errors.complaint && (
                    <Text style={styles.remainingLabel}>{`${countWords(
                      values.complaint
                    )}/${MAXIMUM_WORDS_COMPLAINT}`}</Text>
                  )}
                  <ADBInputComplaintsModal
                    isVisible={selectComplaintsModal}
                    onClose={() => {
                      setSelectComplaintsModal(false);
                    }}
                    onSubmit={() => {
                      setSelectComplaintsModal(false);
                    }}
                    value={values.complaint}
                  />

                  <View style={styles.attachmentWrapper}>
                    {attachments &&
                      attachments.map((n) => (
                        <ADBCreateTicketAttachment
                          key={n.fileCopyUri}
                          name={n.name}
                          onDelete={() => {
                            removeAttachment(n);
                          }}
                        />
                      ))}
                  </View>

                  <View style={styles.uploadWrapper}>
                    <ADBButton
                      label={"Upload file (optional)"}
                      containerStyles={styles.uploadButton}
                      onPress={() => {
                        setSelectUploadModal(true);
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setSelectHowToUploadModal(true);
                      }}
                    >
                      <Text style={styles.howToUploadButtonLabel}>
                        How to upload?
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      marginTop: "auto",
                      marginBottom: marginKeyboard,
                      justifyContent: "flex-end",
                    }}
                  >
                    <ADBButton
                      label={
                        i18n.t(
                          "adb_ticketing.create_ticket_details_continue"
                        ) ?? "Submit Ticket"
                      }
                      onPress={submitForm}
                      disabled={!isValid}
                      isLoading={isSubmitting}
                    />
                  </View>
                </View>
              </>
            );
          }}
        </Formik>
      </ScrollView>

      {/* UPLOAD MODAL */}
      <FilePicker
        isVisible={selectUploadModal}
        addAttachment={addAttachment}
        onSelectWrongFileType={() => {
          setSelectWrongFileTypeModal(true);
        }}
        onSelectWrongFileSize={() => {
          setSelectWrongFileSizeModal(true);
        }}
        onClose={() => {
          setSelectUploadModal(false);
        }}
      />

      {/* SUCCESS MODAL */}
      <AlertModal
        title={
          i18n.t("adb_ticketing.create_ticket_details_success_modal_title") ??
          "Your complaint has been received successfully!"
        }
        message={
          i18n.t("adb_ticketing.create_ticket_details_success_modal_message") ??
          "We will revert back to you on your ticket as soon as possible."
        }
        subBtnLabel={
          i18n.t(
            "adb_ticketing.create_ticket_details_success_sub_button_label"
          ) ?? "Go to Home"
        }
        btnLabel={
          i18n.t("adb_ticketing.create_ticket_details_success_button_label") ??
          "Check support ticket"
        }
        icon={<CorrectIcon size={55.5} />}
        isVisible={selectSuccessModal}
        onSubBtnPress={() => {
          setSelectSuccessModal(false);
          navigateToCustomerServiceHome();
        }}
        onConfirmBtnPress={() => {
          setSelectSuccessModal(false);
          navigateToTicketDetails(createdTicketId);
        }}
        onBackdropPress={() => setSelectSuccessModal(false)}
      >
        <View style={styles.successModalContentWrapper}>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 16,
              fontFamily: fonts.medium,
            }}
          >
            {i18n.t(
              "adb_ticketing.create_ticket_details_success_content_label"
            ) ?? "Ticket ID"}
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontSize: 16,
              color: colors.almostBlack,
            }}
          >
            {createdTicketId}
          </Text>
        </View>
      </AlertModal>

      {/* UPLOAD TUTORIAL MODAL */}
      <ADBHowToUploadModal
        isVisible={selectHowToUploadModal}
        onClose={() => {
          setSelectHowToUploadModal(false);
        }}
      />

      {/* WRONG FILE FORMAT MODAL */}
      <AlertModal
        title="Sorry, the file you uploaded is not in the right format"
        message="Please upload the file again in PDF, JPG, and JPEG."
        btnLabel="Done"
        onConfirmBtnPress={() => {
          setSelectWrongFileTypeModal(false);
        }}
        icon={<WarningIcon size={55.5} />}
        isVisible={selectWrongFileTypeModal}
      />

      {/* WRONG FILE SIZE MODAL */}
      <AlertModal
        title="Sorry, the file you uploaded is too big"
        message="Please upload a file that is less than 25 MB."
        btnLabel="Done"
        onConfirmBtnPress={() => {
          setSelectWrongFileSizeModal(false);
        }}
        icon={<WarningIcon size={55.5} />}
        isVisible={selectWrongFileSizeModal}
      />
    </>
  );
};

export default ADBCreateTicketDetailsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrapper: {
    alignItems: "flex-start",
    justifyContent: "space-around",
    width: "100%",
  },
  titleWrapper: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 32,
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
  // inputs
  formWrapper: {
    flex: 1,
    marginTop: 10,
  },
  verticalSpacing: {
    height: 15,
  },
  remainingLabel: {
    textAlign: "right",
  },
  //
  successModalContentWrapper: {
    marginBottom: 40,
    alignSelf: "flex-start",
  },
  uploadButton: {
    marginTop: 32,
    width: 222,
    alignSelf: "center",
  },
  uploadWrapper: {
    marginBottom: 26,
  },
  howToUploadButtonLabel: {
    marginTop: 26,
    alignSelf: "center",
    fontSize: 16,
    textDecorationLine: "underline",
    color: colors.almostBlack,
  },
  attachmentWrapper: {
    marginTop: 32,
  },
});
