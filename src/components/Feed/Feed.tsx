import React, { useRef, useCallback, useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

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
  const [hasMore, setHasMore] = useState(true);
  const [start, setStart] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const isRef = useRef<InfiniteScroll | null>(null);

  useEffect(() => {
    setFeedData(addedArray);
    setStart(0);
    // @ts-ignore
    isRef.current!.pageLoaded = 0;
  }, [apiEndpoint]);

  const getFeedData = useCallback(async () => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    const res = await axios.get<T[]>(
      `https://jsonplaceholder.typicode.com/${apiEndpoint}`,
      {
        params: { _start: start, _limit: paginateBy },
      }
    );
    if (res.data.length < 1) {
      setHasMore(false);
    }
    setFeedData((state) => [...state, ...res.data]);
    setStart((state) => state + paginateBy);

    setIsFetching(false);
  }, [apiEndpoint, isFetching]);

  return (
    <InfiniteScroll
      ref={isRef}
      className={`${className} overflow-auto`}
      loadMore={getFeedData}
      initialLoad={true}
      hasMore={hasMore}
      loader={<Spinner />}
    >
      {feedData.map((item) => {
        if (!deletedArray?.includes(item.id)) {
          return <Component data={item} key={item.id} />;
        }
      })}
    </InfiniteScroll>
  );
};
