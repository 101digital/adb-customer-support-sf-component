import React, { useContext, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { ThemeContext } from "react-native-theme-component";
// import { ThemeContext, useThemeFonts } from "react-native-theme-component";
import { colors, fonts } from "../../assets";
import TicketCard from "./components/ticket-card";
import Selector from "../selector-component";
import TicketFilterButton from "./components/ticket-filter-button";
import { TicketingContext } from "../../contexts";
import {
  TicketStatusValue,
  TicketStatusDisplay,
  TicketDateOrder,
  SortOrder,
} from "../../common";
import SyncSearchableModal from "../sync-searchable-modal";

interface ADBSearchTicketsProps {
  navigateToTicketDetails: (ticketId: string) => void;
}

const FILTER_STATUSES = [
  // {
  //   label: TicketStatusDisplay.SUBMITTED,
  //   value: TicketStatusValue.SUBMITTED,
  // },
  // {
  //   label: TicketStatusDisplay.IN_PROGRESS,
  //   value: TicketStatusValue.IN_PROGRESS,
  // },
  // {
  //   label: TicketStatusDisplay.IN_REVIEW,
  //   value: TicketStatusValue.IN_REVIEW,
  // },
  // {
  //   label: TicketStatusDisplay.RESOLVED,
  //   value: TicketStatusValue.RESOLVED,
  // },
  TicketStatusDisplay.ALL,
  TicketStatusDisplay.SUBMITTED,
  TicketStatusDisplay.IN_PROGRESS,
  TicketStatusDisplay.IN_REVIEW,
  TicketStatusDisplay.RESOLVED,
];

const SORT_DATE_ORDER = [
  // {
  //   label: TicketDateOrder.NEWEST,
  //   value: SortOrder.DESC,
  // },
  // {
  //   label: TicketDateOrder.OLDEST,
  //   value: SortOrder.ASC,
  // },
  TicketDateOrder.NEWEST,
  TicketDateOrder.OLDEST,
];

const ADBSearchTicketsComponent: React.FC<ADBSearchTicketsProps> = ({
  navigateToTicketDetails,
}: ADBSearchTicketsProps) => {
  const { i18n } = useContext(ThemeContext);
  const {
    isLoadingSearchTickets,
    searchedTickets,
    // setSearchedTicketsPages,
    getTickets,
    // searchedTicketsPages,
    // isSearchedTicketsEndOfList,
    // setIsSearchedTicketsEndOfList,
    searchedTicketId,
    searchedTicketsFilterBy,
    searchedTicketsSortBy,
    setSearchedTicketId,
    setSearchedTicketsFilterBy,
    setSearchedTicketsSortBy,
    clearSearchedTicketsData,
  } = useContext(TicketingContext);
  const [selectSearchIdModal, setSelectSearchIdModal] = useState(false);
  const [selectFilterStatusModal, setSelectFilterStatusModal] = useState(false);
  const [selectSortDateModal, setSelectSortDateModal] = useState(false);
  const flatListRef = useRef<FlatList>();

  useEffect(() => {
    return () => {
      console.log("UNMOUNT");
      clearSearchedTicketsData();
    };
  }, []);

  useEffect(() => {
    console.log("FIRING USEEFFECT");
    // TODO: get email from context
    getTickets("minh@101digital.io");
    // }, [searchedTicketsFilterBy, searchedTicketsSortBy, searchedTicketsPages]);
  }, [searchedTicketsFilterBy, searchedTicketsSortBy]);

  // const scrollToTop = () => {
  //   flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
  // };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {i18n.t("adb_ticketing.search_tickets_title")}
            </Text>
            <Text style={styles.subTitle}>
              {i18n.t("adb_ticketing.search_tickets_sub_title")}
            </Text>
          </View>
        </View>
        <View style={styles.searchWrapper}>
          <Selector
            value={searchedTicketId}
            placeholder={i18n.t(
              "adb_ticketing.search_tickets_selector_placeholder"
            )}
            onPress={() => {
              setSelectSearchIdModal(true);
            }}
            isSearch
            isRemovable
            onRemovePress={() => {
              setSearchedTicketId("");
            }}
          />
        </View>
        <View style={styles.filterWrapper}>
          <TicketFilterButton
            label={searchedTicketsFilterBy}
            style={{ marginRight: 4.5 }}
            onPress={() => {
              setSelectFilterStatusModal(true);
            }}
          />
          <TicketFilterButton
            label={searchedTicketsSortBy}
            style={{ marginLeft: 4.5 }}
            onPress={() => {
              setSelectSortDateModal(true);
            }}
          />
        </View>
        <FlatList
          ref={flatListRef}
          style={styles.listWrapper}
          data={searchedTickets.filter((n) => n.id.includes(searchedTicketId))}
          renderItem={({ item }) => (
            <TicketCard
              key={item.id}
              header={item.header}
              status={item.status}
              id={item.id}
              createdDate={item.createdDate}
              onPress={() => {
                // setSearchedTicketId(item.id);
                navigateToTicketDetails(item.id);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          // onEndReached={() => {
          //   console.log("EOL");
          //   if (!isSearchedTicketsEndOfList) {
          //     setSearchedTicketsPages(searchedTicketsPages + 1);
          //   }
          // }}
        />
        {/* {isLoadingSearchTickets && searchedTickets.length > 0 && (
          <ActivityIndicator color={colors.black} />
        )} */}
      </View>

      <SyncSearchableModal
        title={i18n.t("adb_ticketing.search_tickets_search_id_label")}
        defaultData={searchedTickets.map((n) => n.id)}
        isVisible={selectSearchIdModal}
        onClose={() => {
          setSelectSearchIdModal(false);
        }}
        onPress={(id) => {
          setSearchedTicketId(id);
          setSelectSearchIdModal(false);
        }}
        bottomSheetHeight={450}
        isSearchable
        isShowDataOnSearch
        searchPlaceholder={i18n.t(
          "adb_ticketing.search_tickets_search_id_placeholder"
        )}
      />
      <SyncSearchableModal
        title={i18n.t("adb_ticketing.search_tickets_filter_modal_label")}
        defaultData={FILTER_STATUSES}
        isVisible={selectFilterStatusModal}
        onClose={() => {
          setSelectFilterStatusModal(false);
        }}
        onPress={(status) => {
          setSearchedTicketsFilterBy(status);
          setSelectFilterStatusModal(false);
          // setIsSearchedTicketsEndOfList(false);
          // setSearchedTicketsPages(1);
          // scrollToTop();
        }}
        bottomSheetHeight={450}
      />
      <SyncSearchableModal
        title={i18n.t("adb_ticketing.search_tickets_sort_modal_label")}
        defaultData={SORT_DATE_ORDER}
        isVisible={selectSortDateModal}
        onClose={() => {
          setSelectSortDateModal(false);
        }}
        onPress={(order) => {
          setSearchedTicketsSortBy(order);
          setSelectSortDateModal(false);
          // setIsSearchedTicketsEndOfList(false);
          // setSearchedTicketsPages(1);
          // scrollToTop();
        }}
        bottomSheetHeight={350}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 24,
  },
  contentWrapper: {
    alignItems: "flex-start",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 24,
  },
  titleWrapper: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 20,
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
  searchWrapper: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filterWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: 36,
    marginBottom: 32,
  },
  listWrapper: {
    paddingHorizontal: 24,
  },
});

export default ADBSearchTicketsComponent;
