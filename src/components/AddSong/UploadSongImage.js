import { uploadSongImageApi } from "@/pages/api/song";
import React, { useRef } from "react";
import GoBack from "./GoBack";

export default function UploadSongImage({songId}) {
  const imageRef = useRef(null);
  const handleSubmit = async () => {
    if (imageRef.current.files.length > 0) {
      const formdata = new FormData();
      formdata.append("songImage", imageRef.current.files[0]);
      let res = await uploadSongImageApi(formdata, songId);
      if (res._id) console.log("success");
      else console.log("error handle");
    } else console.log("No file selected");
  };
  return (
    <div>
      <input
        name="song_upload"
        className="album_upload"
        type="file"
        accept=".jpg, .jpeg, .png"
        ref={imageRef}
      ></input>
      <button className="album_submit" onClick={handleSubmit}>
        SUBMIT PHOTO
      </button>
      <GoBack />
    </div>
  );
}
