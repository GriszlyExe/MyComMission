import { Message, ChatRoom, User, Commission } from "@/common/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatState = {
    chatRooms: Array<ChatRoom>;
    activeRoom: ChatRoom | null;
    activeReceiver: User | null,
    messages: Array<Message>;
}

const initialState: ChatState = {
    chatRooms: [],
    activeRoom: null,
    activeReceiver: null,
    messages: [],
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatRooms(state, action: PayloadAction<Array<ChatRoom>>) {
            state.chatRooms = action.payload;
        },
        setActiveRoom(state, action: PayloadAction<ChatRoom>) {
            state.activeRoom = action.payload;
        },
        setMessages(state, action: PayloadAction<Array<Message>>) {
            state.messages = action.payload;
        },
        setReceiver(state, action: PayloadAction<User>) {
            state.activeReceiver = action.payload;
        },
        addMessage(state, action: PayloadAction<Message>) {
            state.messages.push(action.payload);
        },

        updateRoomState(state, action: PayloadAction<{ chatRoomId: string, commission: Commission, message: Message}>) {
            const { chatRoomId, commission, message } = action.payload;
            console.log(action.payload);
            state.chatRooms = state.chatRooms.map(room => {
                if (room.chatRoomId === chatRoomId) {
                    return {
                        ...room,
                        latestCommission: commission,
                        latestMessage: message.messageType === "MESSAGE" ? message.content : "Commission on going",
                        lastTimeStamp: message.createdAt,
                        latestMessageType: message.messageType,

                    }
                }
                return room;
            })
        },
        setActiveRoomCommission(state, action: PayloadAction<Commission>) {
            if (state.activeRoom) {
                state.activeRoom.latestCommission = action.payload;
            }
        }
    },
});

export const {
    setChatRooms,
    setActiveRoom,
    setMessages,
    addMessage,
    setReceiver,
    updateRoomState,
    setActiveRoomCommission,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;