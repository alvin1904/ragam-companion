import { useEffect, useRef, useState } from "react";
import DropDown from "@/components/DropDown";
import AlbumDropDown from "@/components/AlbumDropDown";
import MultiDropDown from "@/components/MultiDropDown";
import { genres, languages } from "@/constants/data";
import UploadSongImage from "./UploadSongImage";
import GoBack from "./GoBack";
import { uploadSongDetailsApi } from "@/pages/api/song";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { themes, types } from "../ErrorHandler/config";

export default function AddSong({ albums }) {
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
    if (!songId) {
      if (nameRef.current.value == "")
        showMessage("Enter name of the song", themes.light, types.warning);
      else if (!ulAlbumRef.current.id)
        showMessage("Select album name", themes.light, types.warning);
      else if (ulLangRef.current.innerText == "EnglishHindiMalayalamTamil")
        showMessage("Select language of the song", themes.light, types.warning);
      else if (genreSelected.length == 0)
        showMessage("Select genre of the song", themes.light, types.warning);
      else if (audioRef.current.files.length != 1)
        showMessage("Upload song file", themes.light, types.warning);
      else {
        let temp = {
          songName: nameRef.current.value,
          language: ulLangRef.current.innerText,
          albumId: ulAlbumRef.current.id,
          genres: genreSelected,
        };
        const formdata = new FormData();
        formdata.append("data", JSON.stringify(temp));
        console.log(temp);
        formdata.append("songFile", audioRef.current.files[0]);
        let res = await uploadSongDetailsApi(formdata);
        if (res._id) setSongId(res._id);
        else
          showMessage((res.response && res.response.data.error) || res.message);
      }
    }
  };

  return (
    <>
      <ErrorHandler show={show} {...messageProps} />
      <input
        className="album_headline"
        placeholder="Enter the name of song"
        ref={nameRef}
      ></input>
      <br></br>
      <br></br>
      <AlbumDropDown
        array={albums}
        defaultText="Select album"
        ulRef={ulAlbumRef}
      />
      <br></br>
      <DropDown
        array={languages}
        defaultText="Select language"
        ulRef={ulLangRef}
      />
      <br></br>
      <MultiDropDown
        array={genres}
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
      <button className="album_submit upload_song" onClick={handleSubmit}>
        UPLOAD SONG
      </button>
      {!songId && <GoBack />}
      {songId && <UploadSongImage songId={songId} />}
    </>
  );
}
