import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../../context/AppContext";
import { IPhotoRequest, IPhoto } from "../../types/Api";

type Props = {
  albumId?: number;
};

const PhotoForm = ({ albumId: propsAlbumId }: Props) => {
  const [title, setTitle] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { userId, userData, addedPhotos, deletedPhotos } =
    useContext(AppContext);
  const { albumId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      albumId: propsAlbumId ? propsAlbumId : albumId,
      title: title,
      url: photoUrl,
      thumbnailUrl: photoUrl,
    };
    const r = await axios.post(
      "https://jsonplaceholder.typicode.com/photos",
      payload
    );
    let photoData = r.data;
    photoData.id = 1000 + addedPhotos.length;
    addedPhotos.unshift(photoData);
    navigate(`/`);
  };

  return (
    <div className="flex items-center justify-center border-b">
      <div className="mx-auto w-full max-w-[550px]">
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
              placeholder="Title"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <input
              type="text"
              name="url"
              id="url"
              onChange={(e) => setPhotoUrl(e.target.value)}
              value={photoUrl}
              placeholder="Url"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          <div>
            <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhotoForm;
