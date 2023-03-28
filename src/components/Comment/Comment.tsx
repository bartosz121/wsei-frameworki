import React, { useContext, useState } from "react";

import { IComment } from "../../types/Api";
import ActionBtn from "../ActionBtn/ActionBtn";
import { trashIcon } from "../../icons";
import axios from "axios";
import { useAppDataStore } from "../../state/appData.state";
import { useUserStore } from "../../state/user.state";
import { useMutation } from "@tanstack/react-query";

type Props = {
  data: IComment;
};

const Comment = ({ data }: Props) => {
  const { id, name, body, email } = data;
  const [deleted, setDeleted] = useState(false);
  const { userData } = useUserStore();
  const { addDeletedComment } = useAppDataStore();

  const deleteCommentMutation = useMutation(async () => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/comments/${id}`
    );
    addDeletedComment(id);
    setDeleted(true);
  });

  return (
    <div
      className={`rounded-xl border p-5 shadow-md w-full bg-white ${
        deleteCommentMutation.isLoading ? "opacity-50" : ""
      } ${deleted ? "hidden" : ""}`}
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
            <ActionBtn
              icon={trashIcon}
              onClick={() => deleteCommentMutation.mutate()}
            />
          )}
        </div>
        <div className="text-sm text-neutral-600">{body}</div>
        <div className="text-xs opacity-50">{email}</div>
      </div>
    </div>
  );
};

export default Comment;
