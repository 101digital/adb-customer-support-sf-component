import {
  CreateCaseRequest,
  CreateCaseAttachmentRequest,
  GenerateTokenRequest,
} from "../types";
import RNFetchBlob from "rn-fetch-blob";
import { Buffer } from "buffer";

interface TicketingClient {
  ticketingClient: any;
}

export const TOKEN_URL = "oauth2/token";

export class TicketingService {
  private static _instance: TicketingService = new TicketingService();

  private _ticketingClient?: any;

  constructor() {
    if (TicketingService._instance) {
      throw new Error(
        "Error: Instantiation failed: Use TicketingService.getInstance() instead of new."
      );
    }
    TicketingService._instance = this;
  }

  public static instance(): TicketingService {
    return TicketingService._instance;
  }

  public initClients = (clients: TicketingClient) => {
    this._ticketingClient = clients.ticketingClient;
  };

  generateToken = async (params: GenerateTokenRequest) => {
    if (this._ticketingClient) {
      const newParams = new URLSearchParams();
      newParams.append("grant_type", params.grantType);
      newParams.append("client_id", params.clientId);
      newParams.append("client_secret", params.clientSecret);
      newParams.append("username", params.username);
      newParams.append("password", params.password);
      const response = await this._ticketingClient.instance.post(
        TOKEN_URL,
        newParams
      );
      return response.access_token;
    } else {
      throw new Error("Ticketing Client is not registered");
    }
  };

  createCase = async (params: CreateCaseRequest) => {
    if (this._ticketingClient) {
      const response = await this._ticketingClient.instance.post(
        "data/v56.0/sobjects/Case",
        params
      );
      return response;
    } else {
      throw new Error("Ticketing Client is not registered");
    }
  };

  createCaseAttachment = async (params: CreateCaseAttachmentRequest) => {
    if (this._ticketingClient) {
      const response = await this._ticketingClient.instance.post(
        "data/v56.0/sobjects/ContentVersion",
        {
          PathOnClient: "Simple",
          ContentLocation: "S",
          ...params,
        }
      );
      return response;
    } else {
      throw new Error("Ticketing Client is not registered");
    }
  };

  getCaseAttachments = async (caseId: string) => {
    if (this._ticketingClient) {
      const response = await this._ticketingClient.instance.get(
        "data/v56.0/query",
        {
          params: {
            q: `SELECT Id,Title FROM ContentVersion WHERE FirstPublishLocationId = '${caseId}'`,
          },
        }
      );
      return response.records;
    } else {
      throw new Error("Ticketing Client is not registered");
    }
  };

  getCases = async (query: string) => {
    if (this._ticketingClient) {
      const response = await this._ticketingClient.instance.get(
        "data/v56.0/query",
        {
          params: {
            q: `SELECT Id,CaseNumber,SuppliedEmail,Status,CreatedDate,Description,Subject,Type FROM Case WHERE ${query}`,
          },
        }
      );
      return response;
    } else {
      throw new Error("Ticketing Client is not registered");
    }
  };

  // getAttachmentContent = async (id: string) => {
  //   if (this._ticketingClient) {
  //     const response = await this._ticketingClient.get(`data/v56.0/sobjects/ContentVersion/${id}/VersionData`);
  //     return response;
  //   } else {
  //     throw new Error("Ticketing Client is not registered");
  //   }
  // };

  getAttachmentContent = async (id: string) => {
    if (this._ticketingClient) {
      const appToken = await this.generateToken(
        this._ticketingClient.connectedAppCredential
      );
      const response = await RNFetchBlob.fetch(
        "GET",
        `${this._ticketingClient.baseURL}/data/v56.0/sobjects/ContentVersion/${id}/VersionData`,
        {
          Authorization: `Bearer ${appToken}`,
        }
      );
      if (response.info().status === 200) {
        if (response.type === "base64") {
          return response.data;
        } else {
          return Buffer.from(response.data, "utf-8").toString("base64");
        }
      }
    } else {
      throw new Error("Ticketing Client is not registered");
    }
  };
}
