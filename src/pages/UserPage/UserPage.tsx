import React, { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import Spinner from "../../components/Spinner/Spinner";
import { IComment, IPhoto, IPost, IUser } from "../../types/Api";
import { Feed } from "../../components/Feed/Feed";
import Post from "../../components/Post/Post";
import Photo from "../../components/Photo/Photo";
import { AppContext } from "../../context/AppContext";
import UserInfo from "../../components/UserInfo/UserInfo";
import Comment from "../../components/Comment/Comment";

const UserPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const [filter, setFilter] = useState(() => {
    const queryParam = searchParams.get("filter");
    if (queryParam) {
      return queryParam.split(",");
    }
    return ["photos", "posts", "comments"];
  });
  const {
    addedPosts,
    addedPhotos,
    addedComments,
    deletedPosts,
    deletedPhotos,
    deletedComments,
  } = useContext(AppContext);
  const filteredAddedComments = addedComments.filter(
    (item) => !deletedPosts.includes(item.postId)
  );

  const getUserData = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    setUserData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(searchParams);
    getUserData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <UserInfo data={userData!} />
      {filter.includes("photos") && (
        <>
          <h3 id="photos" className="text-2xl font-semibold border-b">
            Photos
          </h3>
          <Feed<IPhoto>
            className="mx-auto flex flex-row gap-6 flex-wrap justify-center"
            component={Photo}
            apiEndpoint={`photos?userId=${userId}`}
            addedArray={addedPhotos}
            deletedArray={deletedPhotos}
          />
        </>
      )}
      {filter.includes("posts") && (
        <>
          <h3 id="posts" className="text-2xl font-semibold border-b">
            Posts
          </h3>
          <Feed<IPost>
            component={Post}
            apiEndpoint={`posts?userId=${userId}`}
            addedArray={addedPosts}
            deletedArray={deletedPosts}
          />
        </>
      )}
      {filter.includes("comments") && (
        <>
          <h3 id="comments" className="text-2xl font-semibold border-b">
            Comments
          </h3>
          <Feed<IComment>
            component={Comment}
            apiEndpoint={`comments?email=${userData!.email}`}
            addedArray={filteredAddedComments}
            deletedArray={deletedComments}
          />
        </>
      )}
    </>
  );
};

export default UserPage;
