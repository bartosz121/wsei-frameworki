export interface IContainsId {
  id: any;
}

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  post: IPost;
}

export interface IPostRequest {
  userId: number;
  title: string;
  body: string;
}

export interface ICommentRequest {
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface IPhotoRequest {
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IAlbum {
  id: number;
  userId: number;
  title: string;
}

export interface IPhoto {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: IAlbum;
}

export interface IUserAddressCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUserAddressGeo {
  lat: string;
  lng: string;
}

export interface IUserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IUserAddressGeo;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: IUserAddress;
  company: IUserAddressCompany;
}
