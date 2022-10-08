import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import Spinner from "../Spinner/Spinner";
import { IContainsId } from "../../types/Api";

type Props<T> = {
  component: (props: any) => JSX.Element;
  apiEndpoint: string;
  addedArray?: T[];
  deletedArray?: number[];
  paginateBy?: number;
  className?: string;
};

export const Feed = <T extends IContainsId>({
  component: Component,
  apiEndpoint,
  addedArray = [],
  deletedArray = [],
  paginateBy = 10,
  className = "flex flex-row flex-wrap gap-6",
}: Props<T>) => {
  const [feedData, setFeedData] = useState<T[]>(addedArray);
  const [start, setStart] = useState(0);

  const getFeedData = () =>
    axios
      .get<T[]>(`https://jsonplaceholder.typicode.com/${apiEndpoint}`, {
        params: { _start: start, _limit: paginateBy },
      })
      .then((response) => {
        setFeedData((state) => [...state, ...response.data]);
        setStart((state) => state + paginateBy);
      });

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    <InfiniteScroll
      className={className}
      next={getFeedData}
      dataLength={feedData.length}
      hasMore={feedData.length < 200}
      loader={<Spinner />}
      scrollableTarget="scroll-div"
      endMessage={<span>End</span>}
    >
      {feedData.map((item) => {
        if (!deletedArray?.includes(item.id)) {
          return <Component data={item} key={item.id} />;
        }
      })}
    </InfiniteScroll>
  );
};
