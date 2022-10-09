import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Feed } from "../../components/Feed/Feed";
import Photo from "../../components/Photo/Photo";
import Spinner from "../../components/Spinner/Spinner";
import { AppContext } from "../../context/AppContext";
import { IAlbum, IPhoto } from "../../types/Api";
import PhotoForm from "../../components/PhotoForm/PhotoForm";

const AlbumPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [albumData, setAlbumData] = useState<IAlbum | null>(null);
  const { albumId } = useParams();
  const { addedPhotos, deletedPhotos } = useContext(AppContext);

  useEffect(() => {
    const getAlbumData = async () => {
      setIsLoading(true);
      const res = await axios.get<IAlbum>(
        `https://jsonplaceholder.typicode.com/albums/${albumId}`
      );
      setAlbumData(res.data);
      setIsLoading(false);
    };

    getAlbumData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h3 className="text-2xl my-4 border-b">{albumData!.title}</h3>
      <PhotoForm redirectPath="/" />
      <Feed<IPhoto>
        className="mx-auto flex flex-row gap-6 flex-wrap justify-center"
        component={Photo}
        apiEndpoint={`photos?_expand=album&albumId=${albumId}`}
        addedArray={addedPhotos} // filter this through postid
        deletedArray={deletedPhotos}
      />
    </>
  );
};

export default AlbumPage;
