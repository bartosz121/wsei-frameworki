import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Spinner from "../../components/Spinner/Spinner";
import { IPhoto, IPost, IUser } from "../../types/Api";
import { Feed } from "../../components/Feed/Feed";
import Post from "../../components/Post/Post";
import Photo from "../../components/Photo/Photo";
import { AppContext } from "../../context/AppContext";
import UserInfo from "../../components/UserInfo/UserInfo";

const UserPage = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const {
    addedPosts,
    addedPhotos,
    addedComments,
    deletedPosts,
    deletedPhotos,
    deletedComments,
  } = useContext(AppContext);

  const getUserData = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    setUserData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <UserInfo data={userData!} />
      <Feed<IPost>
        component={Post}
        apiEndpoint={`posts?userId=${userId}`}
        addedArray={addedPosts}
        deletedArray={deletedPosts}
      />
      <Feed<IPhoto>
        className="mx-auto flex flex-row gap-6 flex-wrap justify-center"
        component={Photo}
        apiEndpoint={`photos?userId=${userId}`}
        addedArray={addedPhotos}
        deletedArray={deletedPhotos}
      />
    </>
  );
};

export default UserPage;
