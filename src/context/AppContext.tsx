import { createContext } from "react";
import { IUser, IPost, IPhoto, IComment } from "../types/Api";

interface IAppContext {
  userId: number;
  isLoggedIn: boolean;
  userData: IUser | null; // null if not changed
  addedPosts: IPost[];
  addedComments: IComment[];
  addedPhotos: IPhoto[];
  // ids only
  deletedPosts: number[];
  deletedComments: number[];
  deletedPhotos: number[];
}

type Props = {
  children: React.ReactNode;
};

const defaultAppContext: IAppContext = {
  userId: 1,
  isLoggedIn: false,
  userData: null,
  addedPosts: [],
  addedComments: [],
  addedPhotos: [],
  deletedPosts: [],
  deletedComments: [],
  deletedPhotos: [],
};

export const AppContext = createContext<IAppContext>(defaultAppContext);

export const AppContextProvider = ({ children }: Props) => {
  return (
    <AppContext.Provider value={defaultAppContext}>
      {children}
    </AppContext.Provider>
  );
};
