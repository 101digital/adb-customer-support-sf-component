import { TicketingService, TOKEN_URL } from "../services/ticketing-service";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

let isRefreshed = false;
let isRefreshing = false;
let failedQueue: any = [];

type OriginalRequest = AxiosRequestConfig & {
  retry?: boolean;
  queued?: boolean;
};

type ConnectedAppCredential = {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
};

const shouldIntercept = (error: AxiosError) => {
  try {
    return error.response?.status === 401;
  } catch (e) {
    return false;
  }
};

const attachTokenToRequest = (request: AxiosRequestConfig, token?: string) => {
  request.headers.Authorization = "Bearer " + token;
};

const fetchAppAccessToken = (
  connectedAppCredential: ConnectedAppCredential
): Promise<string> => {
  return TicketingService.instance().generateToken({
    grantType: "password",
    ...connectedAppCredential,
  });
};

export const createSFAppTokenApiClient = (
  baseURL: string,
  connectedAppCredential: ConnectedAppCredential
) => {
  const options = {
    attachTokenToRequest,
    fetchAppAccessToken,
    shouldIntercept,
  };
  let appToken = "";

  const instance = axios.create({
    baseURL,
  });

  const processQueue = (error: any, accessToken?: string) => {
    failedQueue.forEach((prom: any) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(accessToken);
      }
    });
    failedQueue = [];
  };

  const onRequest = async (request: AxiosRequestConfig) => {
    if (request.url === TOKEN_URL) {
      return request;
    } else if (!appToken) {
      appToken = await fetchAppAccessToken(connectedAppCredential);
    }
    request.headers.Authorization = `Bearer ${appToken}`;
    return request;
  };

  const onResponseSuccess = (response: AxiosResponse) => response.data;

  const onResponseError = async (axiosError: AxiosError) => {
    if (!options.shouldIntercept(axiosError)) {
      return Promise.reject(axiosError);
    }
    const originalRequest: OriginalRequest = { ...axiosError.config };
    if (originalRequest.retry || originalRequest.queued) {
      return Promise.reject(axiosError);
    }
    if (isRefreshing) {
      return new Promise<string>(function (resolve, reject) {
        failedQueue.push({ resolve, reject });
      })
        .then((accessToken) => {
          if (isRefreshed) {
            originalRequest.queued = true;
            options.attachTokenToRequest(originalRequest, accessToken);
            return axios.request(originalRequest);
          }
        })
        .catch((_) => {
          return Promise.reject(axiosError);
        });
    }
    isRefreshing = true;
    originalRequest.retry = true;
    return new Promise((resolve, reject) => {
      options
        .fetchAppAccessToken(connectedAppCredential)
        .then((accessToken) => {
          options.attachTokenToRequest(originalRequest, accessToken);
          isRefreshed = true;
          processQueue(null, accessToken);
          resolve(axios.request(originalRequest));
        })
        .catch(async (_) => {
          processQueue(axiosError);
          reject(axiosError);
        })
        .finally(() => {
          isRefreshing = false;
          isRefreshed = false;
        });
    });
  };

  instance.interceptors.request.use(onRequest);
  instance.interceptors.response.use(onResponseSuccess, onResponseError);

  return {
    instance,
    connectedAppCredential: {
      ...connectedAppCredential,
      grantType: "password",
    },
    baseURL,
  };
};
