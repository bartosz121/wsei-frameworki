import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { IPhoto } from "../../types/Api";
import ActionBtn from "../ActionBtn/ActionBtn";
import { albumIcon, trashIcon } from "../../icons";
import { useUserStore } from "../../state/user.state";
import { useAppDataStore } from "../../state/appData.state";

type Props = {
  data: IPhoto;
  albumTitle?: string;
  showAlbumBtn?: boolean;
};

const Photo = ({ data, albumTitle, showAlbumBtn = true }: Props) => {
  const { id, albumId, title, url, thumbnailUrl, album } = data;
  const [deleted, setDeleted] = useState(false);
  const { userId: loggedInUserId } = useUserStore();
  const { deletedPhotos } = useAppDataStore();
  const { albumId: albumIdParams } = useParams();

  const deletePhoto = async () => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    deletedPhotos.push(id);
    setDeleted(true);
  };

  return (
    <div className={`my-2 photo ${deleted && "hidden"}`}>
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <a href={url}>
          <img className="rounded-t-lg" src={url} />
        </a>
        <div className="p-6">
          {albumTitle && (
            <div className="album-title hover:opacity-100 hover:underline">
              {albumTitle}
            </div>
          )}
          <div className="photo-info">
            <p onClick={() => console.log(data)} className="photo-name">
              {title}
            </p>
            {album
              ? loggedInUserId === album.userId && (
                  <ActionBtn icon={trashIcon} onClick={deletePhoto} />
                )
              : null}
          </div>
          {!albumIdParams && (
            <Link to={`/album/${albumId}`}>
              <ActionBtn icon={albumIcon} text="Album" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Photo;
