import React, { useState, useEffect } from "react";
import axios from "axios";

import { IAlbum, IPhoto } from "../../types/Api";
import Photo from "../Photo/Photo";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";

type Props = {
  data: IAlbum;
};

const Album = ({ data: { id, userId, title } }: Props) => {
  const { isLoading, isError, data } = useQuery(["album", id, "photos"], () =>
    axios
      .get<IPhoto[]>(
        `https://jsonplaceholder.typicode.com/albums/${id}/photos`,
        { params: { _expand: "album", _limit: 5 } }
      )
      .then((res) => res.data)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div className="">
      {data.map((item) => (
        <Photo
          data={item}
          albumTitle={title}
          showAlbumBtn={false}
          key={`${item.id}-${item.albumId}`}
        />
      ))}
    </div>
  );
};

export default Album;
