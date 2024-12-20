/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket, io } from "socket.io-client";

import envConfig from "@/config";

export class Websocket {
  private socketClient: Socket | null = null;
  private readonly namespace: string;
  private readonly socketServerUrl: string;

  constructor(
    namespace: string = "message-chat",
    url: string = envConfig.NEXT_PUBLIC_WEBSOCKET_URL
  ) {
    this.namespace = namespace;
    this.socketServerUrl = url;
  }

  private registerDefaultListeners(): void {
    if (!this.socketClient) return;

    this.socketClient.on("exception", (error) => {
      console.error({ error });
    });
  }

  public connect(jwtToken: string): void {
    this.socketClient = io(`${this.socketServerUrl}/${this.namespace}`, {
      withCredentials: true,
      extraHeaders: {
        Authorization: jwtToken,
      },
    });

    this.registerDefaultListeners();
  }

  public disconnect(): void {
    this.socketClient?.disconnect();
  }

  public on(event: string, callback: (...args: any[]) => void): void {
    this.socketClient?.on(event, callback);
  }

  public off(event: string): void {
    this.socketClient?.off(event);
  }

  public emit(event: string, ...args: any[]): void {
    this.socketClient?.emit(event, ...args);
  }
}
