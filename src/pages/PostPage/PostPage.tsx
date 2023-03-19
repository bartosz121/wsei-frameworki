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

const PostPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState<IPost | null>(null);
  const { postId } = useParams();
  const { addedPosts, deletedPosts, addedComments, deletedComments } =
    useAppDataStore();
  const navigate = useNavigate();

  const addedPostsIds = addedPosts.map((item) => item.id);
  const filteredAddedComments = addedComments.filter(
    (item) => item.postId === parseInt(postId!)
  );

  useEffect(() => {
    const getPostData = async () => {
      setIsLoading(true);

      if (addedPostsIds.includes(parseInt(postId!))) {
        setPostData(addedPosts.find((post) => post.id === parseInt(postId!))!);
      } else {
        const res = await axios.get<IPost>(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        setPostData(res.data);
      }

      setIsLoading(false);
    };

    if (deletedPosts.includes(parseInt(postId!))) {
      navigate("/posts");
    }
    getPostData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Post data={postData!} />
      <h3 className="text-2xl my-4 border-b">Comments</h3>
      <TextForm type="comment" />
      <Feed<IComment>
        component={Comment}
        apiEndpoint={`comments?postId=${postData!.id}`}
        addedArray={filteredAddedComments} // TODO filter this through postid
        deletedArray={deletedComments}
      />
    </>
  );
};

export default PostPage;
