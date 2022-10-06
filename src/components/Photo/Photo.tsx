import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IPhoto } from "../../types/Api";
import ActionBtn from "../ActionBtn/ActionBtn";
import { UserContext } from "../../context/AppContext";
import { albumIcon, trashIcon } from "../../icons";
import axios from "axios";

type Props = {
  data: IPhoto;
  albumTitle?: string;
  showAlbumBtn?: boolean;
};

const Photo = ({
  data: { id, albumId, title, url, thumbnailUrl, album },
  albumTitle,
  showAlbumBtn = true,
}: Props) => {
  const [deleted, setDeleted] = useState(false);
  const { userId: loggedInUserId, deletedPhotos } = useContext(UserContext);
  const navigate = useNavigate();

  const deletePhoto = async () => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    deletedPhotos.unshift(id);
    setDeleted(true);
  };

  const navigateToAlbum = () => {
    navigate(`/album/${albumId}`);
  };

  return (
    <div className={`flex justify-center ${deleted && "hidden"}`}>
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <a href={url}>
          <img className="rounded-t-lg" src={url} />
        </a>
        <div className="p-6">
          {albumTitle && (
            <div className="text-xs cursor-pointer text-gray-700 opacity-70 transition hover:opacity-100 hover:underline">
              {albumTitle}
            </div>
          )}
          <div className="flex flex-row justify-between">
            <p className="text-gray-700 text-base mb-4">{title}</p>
            {album
              ? loggedInUserId === album.userId && (
                  <ActionBtn icon={trashIcon} onClick={deletePhoto} />
                )
              : null}
          </div>
          {showAlbumBtn && (
            <ActionBtn
              icon={albumIcon}
              text="Album"
              onClick={navigateToAlbum}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Photo;
