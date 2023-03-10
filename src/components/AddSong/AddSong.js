import React, { useRef, useState } from "react";
import DropDown from "@/components/DropDown";
import AlbumDropDown from "@/components/AlbumDropDown";
import MultiDropDown from "@/components/MultiDropDown";
import { genres, languages } from "@/constants/data";
import UploadSongImage from "./UploadSongImage";
import GoBack from "./GoBack";
import { uploadSongDetailsApi } from "@/pages/api/song";

export default function AddSong({ albums }) {
  const nameRef = useRef(null);
  const audioRef = useRef(null);
  const ulAlbumRef = useRef(null);
  const ulLangRef = useRef(null);
  const [genreSelected, setGenreSelected] = useState([]);
  const [songId, setSongId] = useState("");

  const handleSubmit = async (e) => {
    if (!songId) {
      if (nameRef.current.value == "") alert("Name empty");
      else if (!ulAlbumRef.current.id) alert("album empty");
      else if (ulLangRef.current.innerText == "EnglishHindiRussianTamil")
        alert("language empty");
      else if (genreSelected.length == 0) alert("genres empty");
      else if (audioRef.current.files.length != 1) alert("sound empty");
      else {
        let temp = {
          songName: nameRef.current.value,
          language: ulLangRef.current.innerText,
          albumId: ulAlbumRef.current.id,
          genres: genreSelected,
        };
        const formdata = new FormData();
        formdata.append("data", JSON.stringify(temp));
        console.log(temp)
        formdata.append("songFile", audioRef.current.files[0]);
        let res = await uploadSongDetailsApi(formdata);
        if (res._id) setSongId(res._id);
        else console.log("error handle");
      }
    }
  };

  return (
    <>
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
