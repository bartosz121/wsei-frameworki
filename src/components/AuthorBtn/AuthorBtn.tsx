import React from "react";
import { useNavigate } from "react-router-dom";

import ActionBtn from "../ActionBtn/ActionBtn";
import { authorIcon } from "../../icons";

type Props = {
  userId: number;
};

const AuthorBtn = ({ userId }: Props) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <ActionBtn icon={authorIcon} text="Author" onClick={navigateToProfile} />
  );
};

export default AuthorBtn;
