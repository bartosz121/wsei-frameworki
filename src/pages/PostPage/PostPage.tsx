import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Feed } from "../../components/Feed/Feed";
import Comment from "../../components/Comment/Comment";
import Post from "../../components/Post/Post";
import Spinner from "../../components/Spinner/Spinner";
import { AppContext } from "../../context/AppContext";
import { IComment, IPost } from "../../types/Api";
import TextForm from "../../components/TextForm/TextForm";

const PostPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [postData, setPostData] = useState<IPost | null>(null);
  const { postId } = useParams();
  const { addedPosts, addedComments, deletedComments } = useContext(AppContext);
  const addedPostsIds = addedPosts.map((item) => item.id);

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
        addedArray={addedComments} // filter this through postid
        deletedArray={deletedComments}
      />
    </>
  );
};

export default PostPage;
