import { create } from "zustand";
import { IPost, IPhoto, IComment } from "../types/Api";

interface AppDataState {
  addedPosts: IPost[];
  addedComments: IComment[];
  addedPhotos: IPhoto[];
  // ids only
  deletedPosts: number[];
  deletedComments: number[];
  deletedPhotos: number[];
  addPost: (post: IPost) => void;
  addComment: (comment: IComment) => void;
  addPhoto: (photo: IPhoto) => void;
  addDeletedPost: (postId: number) => void;
  addDeletedComment: (postId: number) => void;
  addDeletedPhoto: (postId: number) => void;
}

export const useAppDataStore = create<AppDataState>()((set) => ({
  addedPosts: [],
  addedComments: [],
  addedPhotos: [],
  deletedPosts: [],
  deletedComments: [],
  deletedPhotos: [],
  addPost: (post: IPost) =>
    set((state) => ({ addedPosts: [...state.addedPosts, post] })),
  addComment: (comment: IComment) =>
    set((state) => ({ addedComments: [...state.addedComments, comment] })),
  addPhoto: (photo: IPhoto) =>
    set((state) => ({ addedPhotos: [...state.addedPhotos, photo] })),
  addDeletedPost: (postId: number) =>
    set((state) => ({ deletedPosts: [...state.deletedPosts, postId] })),
  addDeletedComment: (commentId: number) =>
    set((state) => ({
      deletedComments: [...state.deletedComments, commentId],
    })),
  addDeletedPhoto: (photoId: number) =>
    set((state) => ({ deletedPhotos: [...state.deletedPhotos, photoId] })),
}));
