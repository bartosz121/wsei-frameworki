import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { Feed } from "../../components/Feed/Feed";
import UserInfo from "../../components/UserInfo/UserInfo";
import { IUser } from "../../types/Api";

type Props = {};

const UsersHome = (props: Props) => {
  const [filterValue, setFilterValue] = useState("");
  const [debouncedFilterValue] = useDebounce(filterValue, 800);
  return (
    <>
      <input
        type="text"
        name="title"
        id="title"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Search by name"
        className="my-2 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
      <Feed<IUser>
        component={UserInfo}
        apiEndpoint={
          debouncedFilterValue
            ? `users?name_like=${debouncedFilterValue}`
            : "users"
        }
      />
    </>
  );
};

export default UsersHome;
