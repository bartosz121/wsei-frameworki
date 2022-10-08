import React from "react";
import { Feed } from "../../components/Feed/Feed";
import UserInfo from "../../components/UserInfo/UserInfo";
import { IUser } from "../../types/Api";

type Props = {};

const UsersHome = (props: Props) => {
  return <Feed<IUser> component={UserInfo} apiEndpoint="users" />;
};

export default UsersHome;
