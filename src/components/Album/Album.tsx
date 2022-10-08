import React, { useState, useEffect } from "react";
import axios from "axios";

import { IAlbum, IPhoto } from "../../types/Api";
import Photo from "../Photo/Photo";

type Props = {
  data: IAlbum;
};

const Album = ({ data: { id, userId, title } }: Props) => {
  const [albumPhotos, setAlbumPhotos] = useState<IPhoto[]>([]);

  useEffect(() => {
    const getAlbumData = async () => {
      const response = await axios.get<IPhoto[]>(
        `https://jsonplaceholder.typicode.com/albums/${id}/photos`,
        { params: { _expand: "album", _limit: 5 } }
      );

      const data = response.data;
      setAlbumPhotos(data);
    };

    getAlbumData();
  }, []);

  return (
    <div className="">
      {albumPhotos.map((item) => (
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
