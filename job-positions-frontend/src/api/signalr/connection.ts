import * as signalR from "@microsoft/signalr";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/hub`;

export const createHubConnection = (hubUrl: string) =>
  new signalR.HubConnectionBuilder()
    .withUrl(`${baseURL}/${hubUrl}`, {
      withCredentials: false,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

export const HUBS = Object.freeze({
  POSITION: {
    NAME: "Position",
    MESSAGE: {
      REFRESH_DATA: "RefreshData",
    },
  },
});
