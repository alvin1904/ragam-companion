import { uploadSongImageApi } from "@/pages/api/song";
import React, { useEffect, useRef, useState } from "react";
import { themes, types } from "../ErrorHandler/config";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import GoBack from "./GoBack";

export default function UploadSongImage({ songId }) {
  //ERROR HANDLER START
  const [show, setShow] = useState(false);
  const [messageProps, setMessageProps] = useState({});
  const showMessage = (text, theme, type) => {
    setMessageProps({ message: text, themes: theme, types: type });
    setShow(true);
  };
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [show]);
  //ERROR HANDLER END
  useEffect(() => {
    showMessage("Upload image for song", themes.light, types.info);
  }, []);
  const imageRef = useRef(null);
  const handleSubmit = async () => {
    if (imageRef.current.files.length > 0) {
      const formdata = new FormData();
      formdata.append("songImage", imageRef.current.files[0]);
      let res = await uploadSongImageApi(formdata, songId);
      if (res._id) showMessage("The song was added successfully", themes.light, types.success);
      else
        showMessage((res.response && res.response.data.error) || res.message);
    } else showMessage("Upload image for song", themes.light, types.warning);
  };
  return (
    <div>
      <ErrorHandler show={show} {...messageProps} />

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
