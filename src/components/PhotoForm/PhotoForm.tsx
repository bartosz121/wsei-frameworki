import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../../state/user.state";
import { useAppDataStore } from "../../state/appData.state";

type Props = {
  albumId?: number;
  redirectPath?: string;
};

const PhotoForm = ({ albumId: propsAlbumId, redirectPath }: Props) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const { userId } = useUserStore();
  const { addedPhotos, deletedPhotos } = useAppDataStore();
  const { albumId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      albumId: propsAlbumId ? propsAlbumId : albumId,
      title: title,
      url: photoUrl,
      thumbnailUrl: photoUrl,
      album: { userId: userId },
    };

    const r = await axios.post(
      "https://jsonplaceholder.typicode.com/photos",
      payload
    );
    let photoData = r.data;
    photoData.id = 1000 + addedPhotos.length;
    addedPhotos.unshift(photoData);
    setIsLoading(false);
    navigate(redirectPath ? redirectPath : `/album/${photoData.albumId}`);
  };

  return (
    <div className={`photo-form ${isLoading && "opacity-50 transition-all"}`}>
      <div className="mx-auto photo-form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="text"
              name="title"
              id="title"
              onClick={() => {
                console.log(addedPhotos, deletedPhotos);
              }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              disabled={isLoading}
              placeholder="Title"
              className="form-input border-[#e0e0e0] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              name="url"
              id="url"
              onChange={(e) => setPhotoUrl(e.target.value)}
              value={photoUrl}
              disabled={isLoading}
              placeholder="Url"
              className="form-input border-[#e0e0e0] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <button
            className="form-submit-btn hover:shadow-form hover:bg-violet-800"
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhotoForm;
