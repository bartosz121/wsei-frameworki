import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { IPost } from "../../types/Api";
import ActionBtn from "../ActionBtn/ActionBtn";
import AuthorBtn from "../AuthorBtn/AuthorBtn";
import { AppContext } from "../../context/AppContext";
import { trashIcon, commentIcon } from "../../icons";

type Props = {
  data: IPost;
};

const Post = ({ data }: Props) => {
  const { id, userId, title, body } = data;
  const { postId } = useParams();
  const [deleted, setDeleted] = useState(false);
  const { userId: loggedInUserId, deletedPosts } = useContext(AppContext);
  const navigate = useNavigate();

  const deletePost = async () => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    deletedPosts.push(id);
    setDeleted(true);
    if (postId) {
      navigate("/posts");
    }
  };

  return (
    <>
      <div
        className={`rounded-xl border p-5 shadow-md w-full bg-white ${
          deleted && "hidden"
        }`}
      >
        <div className="mt-4 mb-6">
          <div className="flex flex-row justify-between">
            <div
              onClick={() => console.log(data)}
              className="mb-3 text-xl font-bold"
            >
              {title}
            </div>
            {loggedInUserId === userId && (
              <ActionBtn icon={trashIcon} onClick={deletePost} />
            )}
          </div>
          <div className="text-sm text-neutral-600">{body}</div>
        </div>

        <div className="flex flex-row justify-around">
          <Link to={`/post/${id}`}>
            <ActionBtn icon={commentIcon} text="Comments" />
          </Link>
          <Link to={`/user/${userId}`}>
            <AuthorBtn userId={userId} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Post;
