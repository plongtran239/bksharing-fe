import { z } from "zod";

const Receiver = z.object({
  id: z.number(),
  name: z.string(),
  thumbnail: z
    .object({
      originalUrl: z.string(),
    })
    .nullable(),
});

const Room = z.object({
  id: z.number(),
  numOfUnreadMessage: z.number(),
  lastMessageContent: z.string(),
  lastMessageAt: z.string(), // miliseconds
  isSeen: z.boolean(),
  receiver: Receiver,
});

const Message = z.object({
  id: z.number(),
  content: z.string(),
  senderId: z.number(),
  isReceiver: z.boolean(),
  createdAt: z.string(), // miliseconds
  readAt: z.string(), // miliseconds
  chatRoomId: z.number(),
  isRead: z.boolean(),
});

const NewMessage = z.object({
  id: z.number(),
  content: z.string(),
  senderId: z.number(),
  name: z.string(),
  createdAt: z.string(),
  chatRoomId: z.number(),
  isRead: z.boolean(),
});

const DetailRoom = z.object({
  id: z.number(),
  receiver: Receiver,
  noOfMessages: z.number(),
  messages: z.array(Message),
});

type RoomType = z.infer<typeof Room>;

type DetailRoomType = z.infer<typeof DetailRoom>;

type MessageType = z.infer<typeof Message>;

type NewMessageType = z.infer<typeof NewMessage>;

export type { RoomType, DetailRoomType, MessageType, NewMessageType };
