import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Feed } from "../../components/Feed/Feed";
import Comment from "../../components/Comment/Comment";
import Post from "../../components/Post/Post";
import Spinner from "../../components/Spinner/Spinner";
import { IComment, IPost } from "../../types/Api";
import TextForm from "../../components/TextForm/TextForm";
import { useAppDataStore } from "../../state/appData.state";
import { useQuery } from "@tanstack/react-query";

const PostPage = () => {
  const { postId } = useParams();
  const { addedPosts, deletedPosts, addedComments, deletedComments } =
    useAppDataStore();
  const navigate = useNavigate();

  const addedPostsIds = addedPosts.map((item) => item.id);
  const filteredAddedComments = addedComments.filter(
    (item) => item.postId === parseInt(postId!)
  );

  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery(["post", postId], async () => {
    if (addedPostsIds.includes(parseInt(postId!))) {
      return addedPosts.find((post) => post.id === parseInt(postId!));
    } else {
      const res = await axios.get<IPost>(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      return res.data;
    }
  });

  useEffect(() => {
    if (deletedPosts.includes(parseInt(postId!))) {
      navigate("/posts");
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <>
      <Post data={postData!} />
      <h3 className="text-2xl my-4 border-b">Comments</h3>
      <TextForm type="comment" />
      <Feed<IComment>
        component={Comment}
        apiEndpoint={`comments?postId=${postData!.id}`}
        addedArray={filteredAddedComments}
        deletedArray={deletedComments}
      />
    </>
  );
};

export default PostPage;
