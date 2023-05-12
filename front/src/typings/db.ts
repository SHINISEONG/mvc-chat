export interface IUser {
  userId: string;
  userName: string;
  password: string;
  role: string;
  ssn: string;
  phone: string;
  addr: string;
  email: string;
  regDate: Date;
  cartTranNo: number;
}
export interface IProduct {
  prodNo: number;
  fileName: string;
  price: number;
  prodDetail: string;
  prodName: string;
  regDate: Date;
  stock: number;
  fileNames: string[];
  cartQuantity: number;
}
export interface IUserWithOnline extends IUser {
  online: boolean;
}

export interface IChannel {
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  __v: number;
}

export interface IChat {
  // 채널의 채팅
  _id: string;
  UserId: number;
  User: IUser; // 보낸 사람
  content: string;
  createdAt: Date;
  ChannelId: number;
  Channel: IChannel;
}

export interface IDM {
  // DM 채팅
  id: number;
  SenderId: number; // 보낸 사람 아이디
  Sender: IUser;
  ReceiverId: number; // 받는 사람 아이디
  Receiver: IUser;
  content: string;
  createdAt: Date;
}

export interface IWorkspace {
  id: number;
  name: string;
  url: string; // 주소 창에 보이는 주소
  OwnerId: number; // 워크스페이스 만든 사람 아이디
}
