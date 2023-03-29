import { useEffect, useRef, useState } from "react";
import DropDown from "@/components/DropDown";
import AlbumDropDown from "@/components/AlbumDropDown";
import MultiDropDown from "@/components/MultiDropDown";
import UploadSongImage from "./UploadSongImage";
import GoBack from "./GoBack";
import { uploadSongDetailsApi } from "@/pages/api/song";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { themes, types } from "../ErrorHandler/config";
import Loading from "../Loading";

export default function AddSong({ data }) {
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

  const nameRef = useRef(null);
  const audioRef = useRef(null);
  const ulAlbumRef = useRef(null);
  const ulLangRef = useRef(null);
  const [genreSelected, setGenreSelected] = useState([]);
  const [songId, setSongId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!songId) {
      if (
        nameRef.current.value == "" ||
        !ulAlbumRef.current.id ||
        ulLangRef.current.value !== 0 ||
        genreSelected.length == 0
      )
        showMessage(
          "Enter all details and try again",
          themes.light,
          types.warning
        );
      else if (audioRef.current.files.length != 1)
        showMessage(
          "Upload song file and try again",
          themes.light,
          types.warning
        );
      else {
        let temp = {
          songName: nameRef.current.value,
          language: ulLangRef.current.innerText,
          albumId: ulAlbumRef.current.id,
          genres: genreSelected,
        };
        const formdata = new FormData();
        formdata.append("data", JSON.stringify(temp));
        formdata.append("songFile", audioRef.current.files[0]);
        let res = await uploadSongDetailsApi(formdata);
        if (res._id) setSongId(res._id);
        else
          showMessage((res.response && res.response.data.error) || res.message);
      }
    }
  };
  if (data) {
    return (
      <>
        <ErrorHandler show={show} {...messageProps} />
        <form onSubmit={handleSubmit}>
          <input
            className="album_headline"
            placeholder="Enter the name of song"
            ref={nameRef}
          ></input>
          <br></br>
          <br></br>
          <AlbumDropDown
            array={data.albumList}
            defaultText="Select album"
            ulRef={ulAlbumRef}
          />
          <br></br>
          <DropDown
            array={data.languageList}
            defaultText="Select language"
            ulRef={ulLangRef}
          />
          <br></br>
          <MultiDropDown
            array={data.genreList}
            defaultText="Select genre"
            genreSelected={genreSelected}
            setGenreSelected={setGenreSelected}
          />
          <input
            name="album_upload"
            className="album_upload"
            type="file"
            accept=".mp3,audio/*"
            ref={audioRef}
          ></input>
          <button className="album_submit upload_song" type="submit">
            UPLOAD SONG
          </button>
          {!songId && <GoBack />}
        </form>
        {songId && <UploadSongImage songId={songId} />}
      </>
    );
  } else {
    return <Loading />;
  }
}
