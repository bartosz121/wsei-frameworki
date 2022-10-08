import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../../context/AppContext";
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
  const { userId, userData, addedPosts, addedComments } =
    useContext(AppContext);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = getPayload();
    const r = await axios.post<IPost | IComment>(
      `https://jsonplaceholder.typicode.com/${type}s`,
      payload
    );
    let newResource = r.data;
    newResource.id = 1000 + addedPosts.length;

    if (isPost(newResource)) {
      addedPosts.unshift(newResource);
    } else {
      addedComments.unshift(newResource);
    }

    if (type === "post") {
      navigate(`/post/${newResource.id}`);
    } else {
      navigate("/posts");
    }
  };

  return (
    <div className="flex items-center justify-center my-2 border-b">
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
              placeholder="Title"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <textarea
              rows={4}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              name="postBody"
              id="postBody"
              placeholder="Type your message"
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            ></textarea>
          </div>
          <div>
            <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TextForm;
