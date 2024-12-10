import http from "@/lib/http";

const subcriptionApi = {
  subscribe: (body: {
    date: string;
    mentorScheduleId: number;
    message: string;
  }) => http.post("/client/subscriptions", body),
};

export default subcriptionApi;
