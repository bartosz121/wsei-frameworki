import React, { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

import Spinner from "../../components/Spinner/Spinner";
import { IComment, IPhoto, IPost, IUser } from "../../types/Api";
import { Feed } from "../../components/Feed/Feed";
import Post from "../../components/Post/Post";
import Photo from "../../components/Photo/Photo";
import UserInfo from "../../components/UserInfo/UserInfo";
import Comment from "../../components/Comment/Comment";
import { useAppDataStore } from "../../state/appData.state";
import { useUserStore } from "../../state/user.state";
import { useQuery } from "@tanstack/react-query";

const UserPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams({ filter: "posts,photos,comments" })
  );
  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const { userId: loggedInUserId } = useUserStore();
  const { userId } = useParams();
  const {
    addedPosts,
    addedPhotos,
    addedComments,
    deletedPosts,
    deletedPhotos,
    deletedComments,
  } = useAppDataStore();

  const filteredAddedComments = addedComments.filter(
    (item) => !deletedPosts.includes(item.postId)
  );

  const isOwnProfile = () => {
    return parseInt(userId!) === loggedInUserId;
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let newFilter = searchParams.get("filter") || "";
    const filterArr = newFilter.split(",").filter((f) => f.trim() !== "");

    if (event.target.checked) {
      // Add the selected filter
      if (!filterArr.includes(value)) {
        filterArr.push(value);
      }
    } else {
      // Remove the unselected filter
      const index = filterArr.indexOf(value);
      if (index !== -1) {
        filterArr.splice(index, 1);
      }
    }
    newFilter = filterArr.join(",");
    setSearchParams({ filter: newFilter });
    setFilter(newFilter);
  };

  const {
    isLoading,
    isError,
    data: userData,
  } = useQuery(["userData", userId], () =>
    axios
      .get<IUser>(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.data)
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <UserInfo data={userData!} />
      <div className="flex flex-row justify-center">
        <input
          defaultChecked={filter.includes("photos")}
          value="photos"
          type="checkbox"
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="default-checkbox"
          className="ml-1 mr-4 text-sm font-medium text-gray-900"
        >
          Photos
        </label>
        <input
          defaultChecked={filter.includes("posts")}
          value="posts"
          type="checkbox"
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="checked-checkbox"
          className="ml-1 mr-4 text-sm font-medium text-gray-900"
        >
          Posts
        </label>
        <input
          defaultChecked={filter.includes("comments")}
          value="comments"
          type="checkbox"
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="checked-checkbox"
          className="ml-1 mr-4 text-sm font-medium text-gray-900"
        >
          Comments
        </label>
      </div>
      {filter.includes("photos") && (
        <>
          <h3 id="photos" className="user-page-feed-title">
            Photos
          </h3>
          <Feed<IPhoto>
            className="mx-auto feed-photos"
            component={Photo}
            apiEndpoint={`photos?userId=${userId}`}
            addedArray={isOwnProfile() ? addedPhotos : []}
            deletedArray={isOwnProfile() ? deletedPhotos : []}
          />
        </>
      )}
      {filter.includes("posts") && (
        <>
          <h3 id="posts" className="user-page-feed-title">
            Posts
          </h3>
          <Feed<IPost>
            component={Post}
            apiEndpoint={`posts?userId=${userId}`}
            addedArray={isOwnProfile() ? addedPosts : []}
            deletedArray={isOwnProfile() ? deletedPosts : []}
          />
        </>
      )}
      {filter.includes("comments") && (
        <>
          <h3 id="comments" className="user-page-feed-title">
            Comments
          </h3>
          <Feed<IComment>
            component={Comment}
            apiEndpoint={`comments?email=${userData!.email}`}
            addedArray={isOwnProfile() ? filteredAddedComments : []}
            deletedArray={isOwnProfile() ? deletedComments : []}
          />
        </>
      )}
    </>
  );
};

export default UserPage;
