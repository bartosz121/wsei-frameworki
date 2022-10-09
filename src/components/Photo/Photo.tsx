import React, { useContext, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

import { IPhoto } from "../../types/Api";
import ActionBtn from "../ActionBtn/ActionBtn";
import { AppContext } from "../../context/AppContext";
import { albumIcon, trashIcon } from "../../icons";

type Props = {
  data: IPhoto;
  albumTitle?: string;
  showAlbumBtn?: boolean;
};

const Photo = ({ data, albumTitle, showAlbumBtn = true }: Props) => {
  const { id, albumId, title, url, thumbnailUrl, album } = data;
  const [deleted, setDeleted] = useState(false);
  const { userId: loggedInUserId, deletedPhotos } = useContext(AppContext);
  const { albumId: albumIdParams } = useParams();
  const navigate = useNavigate();

  const deletePhoto = async () => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    deletedPhotos.push(id);
    setDeleted(true);
  };

  return (
    <div className={`my-2 flex justify-center ${deleted && "hidden"}`}>
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
            <p
              onClick={() => console.log(data)}
              className="text-gray-700 text-base mb-4"
            >
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
