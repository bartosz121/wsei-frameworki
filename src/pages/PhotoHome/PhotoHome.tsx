import React, { useState, useContext, useMemo } from "react";
import { useDebounce } from "use-debounce";

import { AppContext } from "../../context/AppContext";
import { Feed } from "../../components/Feed/Feed";
import { IPhoto } from "../../types/Api";
import Photo from "../../components/Photo/Photo";
import PhotoForm from "../../components/PhotoForm/PhotoForm";

const PhotoHome = () => {
  const { addedPhotos, deletedPhotos } = useContext(AppContext);
  const [filterValueId, setFilterValueId] = useState("");
  const [debouncedFilterValueId] = useDebounce(filterValueId, 800);

  const [filterValueAlbumId, setFilterValueAlbumId] = useState("");
  const [debouncedFilterValueAlbumId] = useDebounce(filterValueAlbumId, 800);

  const apiEndpoint = useMemo<string>(() => {
    let parts = [];

    debouncedFilterValueId
      ? parts.push(`&id=${debouncedFilterValueId}`)
      : parts.push("");

    debouncedFilterValueAlbumId
      ? parts.push(`&albumId=${debouncedFilterValueAlbumId}`)
      : parts.push("");

    return `photos?_expand=album${parts.join("")}`;
  }, [debouncedFilterValueId, debouncedFilterValueAlbumId]);

  const filterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const m1 = e.target.value.match(/id:[0-9]+/g);
    const m2 = e.target.value.match(/albumId:[0-9]+/g);

    m1 ? setFilterValueId(m1[0].split(":")[1]) : setFilterValueId("");
    m2 ? setFilterValueAlbumId(m2[0].split(":")[1]) : setFilterValueAlbumId("");
  };

  return (
    <>
      <PhotoForm albumId={1} />
      <input
        type="text"
        name="title"
        id="title"
        onChange={filterInput}
        placeholder="Search by photo id or album id; e.g. 'id:number albumId: number'"
        className="my-2 w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
      <Feed<IPhoto>
        className="mx-auto feed-photos"
        component={Photo}
        apiEndpoint={apiEndpoint}
        addedArray={addedPhotos}
        deletedArray={deletedPhotos}
      />
    </>
  );
};

export default PhotoHome;
