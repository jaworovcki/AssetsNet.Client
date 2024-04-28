export interface Message {
  id: string; // for message id
  content: string; // context of the message
  dateRead: Date | null;
  dateSent: Date;
  senderId: string;
  senderName: string;
  senderPhotoUrl: string;
  recipientId: string;
  recipientName: string;
  recipientPhotoUrl: string;
}