import { useParams } from "react-router-dom";
import axios from "axios";

import { Feed } from "../../components/Feed/Feed";
import Photo from "../../components/Photo/Photo";
import Spinner from "../../components/Spinner/Spinner";
import { IAlbum, IPhoto } from "../../types/Api";
import PhotoForm from "../../components/PhotoForm/PhotoForm";
import { useAppDataStore } from "../../state/appData.state";
import { useQuery } from "@tanstack/react-query";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { addedPhotos, deletedPhotos } = useAppDataStore();

  const { isLoading, isError, data } = useQuery(
    ["album", albumId, "data"],
    () =>
      axios
        .get<IAlbum>(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
        .then((res) => res.data)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <div>
      <h3 className="text-2xl my-4 border-b">{data.title}</h3>
      <PhotoForm redirectPath="/" />
      <Feed<IPhoto>
        className="mx-auto flex flex-row gap-6 flex-wrap justify-center"
        component={Photo}
        apiEndpoint={`photos?_expand=album&albumId=${albumId}`}
        addedArray={addedPhotos}
        deletedArray={deletedPhotos}
      />
    </div>
  );
};

export default AlbumPage;
