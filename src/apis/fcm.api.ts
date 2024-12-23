import http from "@/lib/http";

const fcmApi = {
  registerToken: (body: { token: string }) =>
    http.post("/fcm/device-tokens", body),

  removeToken: (body: { token: string }) =>
    http.delete("/fcm/device-tokens", body),
};

export default fcmApi;
