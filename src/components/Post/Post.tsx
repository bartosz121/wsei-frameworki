import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { IPost } from "../../types/Api";
import ActionBtn from "../ActionBtn/ActionBtn";
import AuthorBtn from "../AuthorBtn/AuthorBtn";
import { trashIcon, commentIcon } from "../../icons";
import { useAppDataStore } from "../../state/appData.state";
import { useUserStore } from "../../state/user.state";
import { useMutation } from "@tanstack/react-query";

type Props = {
  data: IPost;
};

const Post = ({ data }: Props) => {
  const { id, userId, title, body } = data;
  const { postId } = useParams();
  const [deleted, setDeleted] = useState(false);
  const { userId: loggedInUserId } = useUserStore();
  const { addDeletedPost } = useAppDataStore();
  const navigate = useNavigate();

  const deletePostMutation = useMutation(async () => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    addDeletedPost(id);
    setDeleted(true);
    navigate("/posts");
  });

  return (
    <>
      <div
        className={`rounded-xl border p-5 shadow-md w-full bg-white ${
          deletePostMutation.isLoading ? "opacity-50" : ""
        } ${deleted ? "hidden" : ""}`}
      >
        <div className="mt-4 mb-6">
          <div className="post-info">
            <div
              onClick={() => console.log(data)}
              className="mb-3 text-xl font-bold"
            >
              {title}
            </div>
            {loggedInUserId === userId && (
              <ActionBtn
                icon={trashIcon}
                onClick={() => deletePostMutation.mutate()}
              />
            )}
          </div>
          <div className="post-body">{body}</div>
        </div>

        <div className="post-button-wrapper">
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
