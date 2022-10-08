import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Spinner from "../../components/Spinner/Spinner";
import { IPhoto, IPost, IUser } from "../../types/Api";
import { Feed } from "../../components/Feed/Feed";
import Post from "../../components/Post/Post";
import Photo from "../../components/Photo/Photo";
import { AppContext } from "../../context/AppContext";

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
      <div className="right-0 my-2 w-full">
        <div className="bg-white rounded overflow-hidden shadow-lg">
          <div
            onClick={() => {
              console.log("Posts,Photos,Comments");
              console.log("Added:");
              console.log(addedPosts, addedPhotos, addedComments);
              console.log("Deleted:");
              console.log(deletedPosts, deletedPhotos, deletedComments);
            }}
            className="text-center p-6 bg-gray-800 border-b"
          >
            <svg
              aria-hidden="true"
              role="img"
              className="h-24 w-24 text-white rounded-full mx-auto"
              width="32"
              height="32"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"
              ></path>
            </svg>
            <p
              onClick={() => console.log(userData)}
              className="pt-2 text-lg font-semibold text-gray-50"
            >
              {userData!.name}
            </p>
            <p className="pb-2 text-xs text-gray-50 opacity-40">
              {userData!.username}
            </p>
            <p className="text-sm text-gray-100">{userData!.email}</p>
          </div>

          <div className="px-7 py-2 flex flex-row flex-wrap gap-4 justify-evenly">
            <div className="pt-2 pb-4">
              <p className="text-sm font-medium text-gray-800 leading-none">
                Phone
              </p>
              <p className="text-xs text-gray-500">{userData!.phone}</p>
            </div>
            <div className="pt-2 pb-4">
              <p className="text-sm font-medium text-gray-800 leading-none">
                Website
              </p>
              <p className="text-xs text-gray-500">{userData!.website}</p>
            </div>
            {Object.entries(userData!.address)
              .filter((item) => typeof item[1] === "string")
              .map((item) => (
                <div className="pt-2 pb-4">
                  <p className="text-sm font-medium text-gray-800 leading-none">
                    {item[0]}
                  </p>
                  <p className="text-xs text-gray-500">{item[1]}</p>
                </div>
              ))}
            {Object.entries(userData!.address.geo)
              .filter((item) => typeof item[1] === "string")
              .map((item) => (
                <div className="pt-2 pb-4">
                  <p className="text-sm font-medium text-gray-800 leading-none">
                    {item[0]}
                  </p>
                  <p className="text-xs text-gray-500">{item[1]}</p>
                </div>
              ))}
            {Object.entries(userData!.company)
              .filter((item) => typeof item[1] === "string")
              .map((item) => (
                <div className="pt-2 pb-4">
                  <p className="text-sm font-medium text-gray-800 leading-none">
                    {item[0]}
                  </p>
                  <p className="text-xs text-gray-500">{item[1]}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Feed<IPost>
        component={Post}
        apiEndpoint={`posts?userId=${userId}`}
        addedArray={addedPosts}
        deletedArray={deletedPosts}
      />
      <Feed<IPhoto>
        className="mx-auto"
        component={Photo}
        apiEndpoint={`photos?userId=${userId}`}
        addedArray={addedPhotos}
        deletedArray={deletedPhotos}
      />
    </>
  );
};

export default UserPage;
