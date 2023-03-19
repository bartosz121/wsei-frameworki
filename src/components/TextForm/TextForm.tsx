import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../../state/user.state";
import { useAppDataStore } from "../../state/appData.state";

import {
  IComment,
  ICommentRequest,
  IPost,
  IPostRequest,
} from "../../types/Api";

type Props = {
  type: "post" | "comment";
};

const TextForm = ({ type }: Props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addedPosts, addedComments } = useAppDataStore();
  const { userId, userData } = useUserStore();
  const navigate = useNavigate();
  const { postId } = useParams();

  const isPost = (data: IPost | IComment): data is IPost => {
    return (data as IPost).title !== undefined;
  };

  const getPayload = (): IPostRequest | ICommentRequest => {
    if (type === "post") {
      return {
        userId: userId,
        title: title,
        body: body,
      };
    } else {
      return {
        postId: parseInt(postId!),
        name: title,
        body: body,
        email: userData!.email,
      };
    }
  };

  const getId = () => {
    if (type === "post") {
      return 1000 + addedPosts.length;
    }
    return 1000 + addedComments.length;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = getPayload();
      const r = await axios.post<IPost | IComment>(
        `https://jsonplaceholder.typicode.com/${type}s`,
        payload
      );
      let newResource = r.data;
      newResource.id = getId();

      if (isPost(newResource)) {
        addedPosts.unshift(newResource);
      } else {
        addedComments.unshift(newResource);
      }

      if (type === "post") {
        navigate(`/post/${newResource.id}`);
      } else {
        navigate(`/user/${userId}?filter=comments`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center my-2 border-b ${
        isLoading && "opacity-50 transition-all"
      }`}
    >
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-5">
            <input
              type="text"
              name="title"
              id="title"
              onClick={() => console.log(addedComments, addedPosts)}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              disabled={isLoading}
              placeholder="Title"
              className="form-input border-[#e0e0e0] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <textarea
              rows={4}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              disabled={isLoading}
              name="postBody"
              id="postBody"
              placeholder="Type your message"
              className="post-form-textarea focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          </div>
          <button
            className="form-submit-btn hover:shadow-form hover:bg-violet-800"
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TextForm;
