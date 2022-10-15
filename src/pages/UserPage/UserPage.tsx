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
  const [photosVisible, setPhotosVisible] = useState(true);
  const [postsVisible, setPostsVisible] = useState(true);
  const [commentsVisible, setCommentsVisible] = useState(true);
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
      <div className="flex flex-row justify-center">
        <input
          defaultChecked={photosVisible}
          type="checkbox"
          onChange={() => setPhotosVisible(!photosVisible)}
        />
        <label
          htmlFor="default-checkbox"
          className="ml-1 mr-4 text-sm font-medium text-gray-900"
        >
          Photos
        </label>
        <input
          defaultChecked={postsVisible}
          type="checkbox"
          onChange={() => setPostsVisible(!postsVisible)}
        />
        <label
          htmlFor="checked-checkbox"
          className="ml-1 mr-4 text-sm font-medium text-gray-900"
        >
          Posts
        </label>
        <input
          defaultChecked={commentsVisible}
          type="checkbox"
          onChange={() => setCommentsVisible(!commentsVisible)}
        />
        <label
          htmlFor="checked-checkbox"
          className="ml-1 mr-4 text-sm font-medium text-gray-900"
        >
          Comments
        </label>
      </div>
      {filter.includes("photos") && photosVisible && (
        <>
          <h3 id="photos" className="user-page-feed-title">
            Photos
          </h3>
          <Feed<IPhoto>
            className="mx-auto feed-photos"
            component={Photo}
            apiEndpoint={`photos?userId=${userId}`}
            addedArray={addedPhotos}
            deletedArray={deletedPhotos}
          />
        </>
      )}
      {filter.includes("posts") && postsVisible && (
        <>
          <h3 id="posts" className="user-page-feed-title">
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
      {filter.includes("comments") && commentsVisible && (
        <>
          <h3 id="comments" className="user-page-feed-title">
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
