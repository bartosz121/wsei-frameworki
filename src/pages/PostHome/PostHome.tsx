import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";
import { Feed } from "../../components/Feed/Feed";
import { IPost } from "../../types/Api";
import Post from "../../components/Post/Post";
import TextForm from "../../components/TextForm/TextForm";

type Props = {};

const PostHome = (props: Props) => {
  const { addedPosts, deletedPosts } = useContext(AppContext);

  return (
    <>
      <TextForm type="post" />
      <Feed<IPost>
        component={Post}
        apiEndpoint="posts"
        addedArray={addedPosts}
        deletedArray={deletedPosts}
      />
    </>
  );
};

export default PostHome;
