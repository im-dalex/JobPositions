import { createHubConnection } from "@/api/signalr/connection";
import { delay } from "@/lib/utils";
import { HubConnection } from "@microsoft/signalr";
import { useEffect, useMemo } from "react";

const startConnectionWithRetry = async (connection: HubConnection) => {
  if (connection.state == "Disconnecting") {
    await delay(500);
    return startConnectionWithRetry(connection);
  }

  try {
    if (connection.state == "Disconnected") {
      return connection.start();
    }
  } catch (error) {
    console.error("SignalR Connection Error: ", error);
  }
};
export const useSignalR = (hubUrl: string) => {
  const connection = useMemo(() => createHubConnection(hubUrl), [hubUrl]);

  useEffect(() => {
    startConnectionWithRetry(connection);
    return () => {
      connection.stop().catch((err) => {
        console.warn("Error stopping SignalR connection:", err);
      });
    };
  }, [connection, hubUrl]);

  return connection;
};
