import http from "@/lib/http";
import { DetailResponseType, ListResponseType } from "@/schemas";
import { DetailRoomType, RoomType } from "@/schemas/chat.schema";

const chatApi = {
  getChatList: () =>
    http.get<ListResponseType<RoomType>>("/chat-messages/rooms"),

  getChatDetail: (roomId: number) =>
    http.get<DetailResponseType<DetailRoomType>>(
      `/chat-messages/rooms/${roomId}`
    ),
};

export default chatApi;
