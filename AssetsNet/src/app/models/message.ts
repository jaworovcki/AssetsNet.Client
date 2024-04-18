export interface Message {
    id: string; // for message id
    content: string; // context of the message
    dateRead: Date | null;
    messageSend: Date;
    senderId: string;
    senderUsername: string;
    senderPhotoUrl: string;
    recipientId: string;
    recipientUsername: string;
    recipientPhotoUrl: string;
}