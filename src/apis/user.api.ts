import http from "@/lib/http";

const userApi = {
  me: (sessionToken: string) =>
    http.get("/accounts/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  meClient: () => http.get("/accounts/me"),
};

export default userApi;
