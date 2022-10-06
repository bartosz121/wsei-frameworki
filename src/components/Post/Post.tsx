import React, { useContext, useState } from "react";

import { IPost } from "../../types/Api";
import ActionBtn from "../ActionBtn/ActionBtn";
import AuthorBtn from "../AuthorBtn/AuthorBtn";
import { UserContext } from "../../context/AppContext";
import { trashIcon, commentIcon } from "../../icons";
import axios from "axios";

type Props = {
  data: IPost;
};

const Post = ({ data: { id, userId, title, body } }: Props) => {
  const [deleted, setDeleted] = useState(false);
  const { userId: loggedInUserId, deletedPosts } = useContext(UserContext);

  const deletePost = async () => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    deletedPosts.push(id);
    setDeleted(true);
  };

  return (
    <div
      className={`my-8 rounded-xl border p-5 shadow-md w-full bg-white ${
        deleted && "hidden"
      }`}
    >
      <div className="mt-4 mb-6">
        <div className="flex flex-row justify-between">
          <div className="mb-3 text-xl font-bold">{title}</div>
          {loggedInUserId === userId && (
            <ActionBtn icon={trashIcon} onClick={deletePost} />
          )}
        </div>
        <div className="text-sm text-neutral-600">{body}</div>
      </div>

      <div className="flex flex-row justify-around">
        <AuthorBtn userId={userId} />
        <ActionBtn
          icon={commentIcon}
          text="Comments"
          onClick={() => console.log(id)}
        />
      </div>
    </div>
  );
};

export default Post;
