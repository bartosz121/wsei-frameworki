import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IComment } from "../../types/Api";
import ActionBtn from "../ActionBtn/ActionBtn";
import { AppContext } from "../../context/AppContext";
import { trashIcon } from "../../icons";
import axios from "axios";

type Props = {
  data: IComment;
};

const Comment = ({ data }: Props) => {
  const { id, name, body, email } = data;
  const [deleted, setDeleted] = useState(false);
  const { userData, deletedComments } = useContext(AppContext);

  const deleteComment = async () => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/comments/${id}`
    );
    deletedComments.push(id);
    setDeleted(true);
  };

  return (
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
            {name}
          </div>
          {userData!.email === email && (
            <ActionBtn icon={trashIcon} onClick={deleteComment} />
          )}
        </div>
        <div className="text-sm text-neutral-600">{body}</div>
        <div className="text-xs opacity-50">{email}</div>
      </div>
    </div>
  );
};

export default Comment;
