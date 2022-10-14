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
  const [isFetching, setIsFetching] = useState(false);
  const isRef = useRef<InfiniteScroll | null>(null);
  const start = 0;

  useEffect(() => {
    setFeedData(addedArray);
    setHasMore(true);
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
        params: { _start: start + feedData.length, _limit: paginateBy },
      }
    );
    if (res.data.length < 1) {
      setHasMore(false);
    }
    setFeedData((state) => [...state, ...res.data]);

    setIsFetching(false);
  }, [feedData, hasMore, apiEndpoint, isFetching]);

  return (
    <InfiniteScroll
      ref={isRef}
      className={`${className} overflow-auto`}
      loadMore={getFeedData}
      initialLoad={true}
      hasMore={hasMore}
      loader={<Spinner key="spinner" />}
    >
      {feedData.map((item) => {
        const key = crypto.randomUUID();
        if (!deletedArray?.includes(item.id)) {
          return <Component data={item} key={key} />;
        }
      })}
    </InfiniteScroll>
  );
};
