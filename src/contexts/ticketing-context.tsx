import React, { useCallback, useMemo, useState } from "react";
import { TicketingService } from "../services/ticketing-service";
import {
  TicketStatusDisplay,
  TicketStatusValue,
  TicketDateOrder,
  SortOrder,
} from "../common";

const ticketingInstance = TicketingService.instance();

const PAGE_SIZE = 10;

type CreateTicketAttachment = {
  name: string;
  uri: string;
};

type SearchedTicketAttachment = {
  id: string;
  name: string;
};

type Ticket = {
  id: string;
  status: string;
  type: string;
  createdDate: string;
  description: string;
  header: string;
};

interface ITicketingData {
  // create ticket
  createTicketType: string;
  createTicketHeader: string;
  createTicketComplaint: string;
  createTicketAttachments?: CreateTicketAttachment[];
  createdTicketId: string;
  setCreateTicketType: (type: string) => void;
  setCreateTicketHeader: (header: string) => void;
  setCreateTicketComplaint: (complaint: string) => void;
  setCreatedTicketId: (id: string) => void;
  setCreateTicketAttachments: (attachments: CreateTicketAttachment[]) => void;
  clearCreateTicketData: () => void;
  // search tickets
  isLoadingSearchTickets: boolean;
  isLoadingGetTicketAttachments: boolean;
  searchedTickets: Ticket[];
  searchedTicketsFilterBy: string;
  searchedTicketsSortBy: string;
  searchedTicketId: string;
  searchedTicketsPages: number;
  isSearchedTicketsEndOfList: boolean;
  searchedTicketAttachments: SearchedTicketAttachment[] | undefined;
  getTickets: (query: string) => void;
  getTicketAttachments: (id: string) => void;
  setSearchedTicketsPages: (pages: number) => void;
  setIsSearchedTicketsEndOfList: (end: boolean) => void;
  setIsLoadingSearchTickets: (loading: boolean) => void;
  setSearchedTicketId: (id: string) => void;
  clearSearchedTicketData: () => void;
  setSearchedTicketsFilterBy: (status: string) => void;
  setSearchedTicketsSortBy: (order: string) => void;
  clearSearchedTicketsData: () => void;
  setSearchedTicketAttachments: (
    attachments: SearchedTicketAttachment[]
  ) => void;
}

export const ticketingDataDefaultValue: ITicketingData = {
  createTicketType: "",
  createTicketHeader: "",
  createTicketComplaint: "",
  createdTicketId: "",
  setCreateTicketType: () => {},
  setCreateTicketHeader: () => {},
  setCreateTicketComplaint: () => {},
  setCreateTicketAttachments: () => {},
  setCreatedTicketId: () => {},
  clearCreateTicketData: () => {},
  isLoadingSearchTickets: false,
  isLoadingGetTicketAttachments: false,
  searchedTickets: [],
  searchedTicketsFilterBy: TicketStatusDisplay.ALL,
  searchedTicketsSortBy: TicketDateOrder.NEWEST,
  searchedTicketId: "",
  searchedTicketsPages: 1,
  isSearchedTicketsEndOfList: false,
  searchedTicketAttachments: undefined,
  getTickets: () => {},
  getTicketAttachments: () => {},
  setSearchedTicketId: () => {},
  setSearchedTicketsPages: () => {},
  setIsSearchedTicketsEndOfList: () => {},
  setIsLoadingSearchTickets: () => {},
  clearSearchedTicketData: () => {},
  setSearchedTicketsFilterBy: () => {},
  setSearchedTicketsSortBy: () => {},
  clearSearchedTicketsData: () => {},
  setSearchedTicketAttachments: () => {},
};

export const TicketingContext = React.createContext<ITicketingData>(
  ticketingDataDefaultValue
);

export const useTicketingContextValue = (): ITicketingData => {
  const [_createTicketType, setCreateTicketType] = useState("");
  const [_createTicketHeader, setCreateTicketHeader] = useState("");
  const [_createTicketComplaint, setCreateTicketComplaint] = useState("");
  const [_createTicketAttachments, setCreateTicketAttachments] =
    useState<CreateTicketAttachment[]>();
  const [_createdTicketId, setCreatedTicketId] = useState("");
  const [_isLoadingSearchTickets, setIsLoadingSearchTickets] = useState(false);
  const [_searchedTickets, setSearchedTickets] = useState<Ticket[]>([]);
  const [_searchedTicketId, setSearchedTicketId] = useState("");
  const [_searchedTicketsPages, setSearchedTicketsPages] = useState(1);
  const [_isSearchedTicketsEndOfList, setIsSearchedTicketsEndOfList] =
    useState(false);
  const [_searchedTicketsFilterBy, setSearchedTicketsFilterBy] = useState(
    TicketStatusDisplay.ALL as string
  );
  const [_searchedTicketsSortBy, setSearchedTicketsSortBy] = useState(
    TicketDateOrder.NEWEST as string
  );
  const [_searchedTicketAttachments, setSearchedTicketAttachments] = useState<
    SearchedTicketAttachment[] | undefined
  >(undefined);
  const [_isLoadingGetTicketAttachments, setIsLoadingGetTicketAttachments] =
    useState(false);

  const clearCreateTicketData = useCallback(() => {
    setCreateTicketType("");
    setCreateTicketHeader("");
    setCreateTicketComplaint("");
    setCreateTicketAttachments(undefined);
    setCreatedTicketId("");
  }, []);

  const clearSearchedTicketsData = useCallback(() => {
    setSearchedTickets([]);
    setSearchedTicketsFilterBy(TicketStatusDisplay.ALL);
    setSearchedTicketsSortBy(TicketDateOrder.NEWEST);
    // setSearchedTicketsPages(1);
    // setIsSearchedTicketsEndOfList(false);
  }, []);

  const clearSearchedTicketData = useCallback(() => {
    setSearchedTicketId("");
    setSearchedTicketAttachments(undefined);
  }, []);

  const getTickets = useCallback(
    async (userEmail: string) => {
      try {
        setIsLoadingSearchTickets(true);

        // BUILDING QUERY PARAM
        // Filter by status
        let query = "";
        query += ` SuppliedEmail = '${userEmail}'`;
        if (
          _searchedTicketsFilterBy &&
          _searchedTicketsFilterBy !== TicketStatusDisplay.ALL
        ) {
          let status = "";
          switch (_searchedTicketsFilterBy) {
            case TicketStatusDisplay.SUBMITTED:
              status = TicketStatusValue.SUBMITTED;
              break;
            case TicketStatusDisplay.IN_PROGRESS:
              status = TicketStatusValue.IN_PROGRESS;
              break;
            case TicketStatusDisplay.IN_REVIEW:
              status = TicketStatusValue.IN_REVIEW;
              break;
            case TicketStatusDisplay.RESOLVED:
              status = TicketStatusValue.RESOLVED;
              break;
          }
          query += ` AND Status = '${status}'`;
        }
        // Sort by creation date
        if (_searchedTicketsSortBy) {
          query += ` ORDER BY CreatedDate ${
            _searchedTicketsSortBy === TicketDateOrder.NEWEST
              ? SortOrder.DESC
              : SortOrder.ASC
          }`;
        }
        // // Pagination
        // query += ` LIMIT ${PAGE_SIZE}`;
        // if (_searchedTicketsPages > 1) {
        //   query += ` OFFSET ${PAGE_SIZE * (_searchedTicketsPages - 1)}`;
        // }

        const { records } = await ticketingInstance.getCases(query);
        const newTickets = records.map((n) => ({
          id: n.Id,
          status: n.Status,
          type: n.Type,
          createdDate: n.CreatedDate,
          description: n.Description,
          header: n.Subject,
        }));
        const oldTickets = _searchedTicketsPages > 1 ? _searchedTickets : [];
        setSearchedTickets([...oldTickets, ...newTickets]);
        // if (newTickets.length === 0) {
        //   setIsSearchedTicketsEndOfList(true);
        // }
        setIsLoadingSearchTickets(false);
      } catch (error) {
        setIsLoadingSearchTickets(false);
      }
    },
    [
      _searchedTicketsFilterBy,
      _searchedTicketsSortBy,
      _searchedTickets,
      _searchedTicketsPages,
    ]
  );

  const getTicketAttachments = useCallback(async (id: string) => {
    try {
      setIsLoadingGetTicketAttachments(true);
      const response = await ticketingInstance.getCaseAttachments(id);
      setSearchedTicketAttachments(
        response.map((n) => ({
          id: n.Id,
          name: n.Title,
        }))
      );
      setIsLoadingGetTicketAttachments(false);
    } catch (error) {
      setIsLoadingGetTicketAttachments(false);
    }
  }, []);

  return useMemo(
    () => ({
      createTicketType: _createTicketType,
      createTicketHeader: _createTicketHeader,
      createTicketComplaint: _createTicketComplaint,
      createdTicketId: _createdTicketId,
      createTicketAttachments: _createTicketAttachments,
      isLoadingSearchTickets: _isLoadingSearchTickets,
      isLoadingGetTicketAttachments: _isLoadingGetTicketAttachments,
      searchedTickets: _searchedTickets,
      searchedTicketsPages: _searchedTicketsPages,
      isSearchedTicketsEndOfList: _isSearchedTicketsEndOfList,
      searchedTicketId: _searchedTicketId,
      searchedTicketsFilterBy: _searchedTicketsFilterBy,
      searchedTicketsSortBy: _searchedTicketsSortBy,
      searchedTicketAttachments: _searchedTicketAttachments,
      setCreateTicketType,
      setCreateTicketHeader,
      setCreateTicketComplaint,
      setCreateTicketAttachments,
      setCreatedTicketId,
      clearCreateTicketData,
      getTickets,
      getTicketAttachments,
      setSearchedTicketId,
      setSearchedTicketsPages,
      setIsSearchedTicketsEndOfList,
      setIsLoadingSearchTickets,
      setSearchedTicketsFilterBy,
      setSearchedTicketsSortBy,
      clearSearchedTicketsData,
      setSearchedTicketAttachments,
      clearSearchedTicketData,
    }),
    [
      _createTicketType,
      _createTicketHeader,
      _createTicketComplaint,
      _createdTicketId,
      _createTicketAttachments,
      _isLoadingSearchTickets,
      _isLoadingGetTicketAttachments,
      _searchedTickets,
      _searchedTicketId,
      _searchedTicketsFilterBy,
      _searchedTicketsSortBy,
      _searchedTicketsPages,
      _isSearchedTicketsEndOfList,
      _searchedTicketAttachments,
    ]
  );
};
