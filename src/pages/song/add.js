import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// import img from "@/../public/photos/hod.jpg";
import DropDown from "@/components/DropDown";
import { getFromLocalStorage } from "@/helper/LocalStorage";
import AlbumDropDown from "@/components/AlbumDropDown";
import { genres, languages } from "@/constants/data";
import MultiDropDown from "@/components/MultiDropDown";

export default function Add({albumsid}) {
  albumsid && console.log(albumsid)
  const router = useRouter();
  const nameRef = useRef(null);
  const audioRef = useRef(null);
  const ulAlbumRef = useRef(null);
  const ulLangRef = useRef(null);
  const ulGenreRef = useRef(null);
  const [albums, setAlbums] = useState(null);
  const [genreSelected, setGenreSelected] = useState([])
  

  const handleSubmit = (e) => {
    if (nameRef.current.value == "") console.log("Name empty");
    else if (!ulAlbumRef.current.id) console.log("album empty");
    else if (ulLangRef.current.innerText =="EnglishHindiRussianTamil") console.log("language empty");
    else if (genreSelected.length==0) console.log("genres empty");
    else if (audioRef.current.files.length != 1) console.log("sound empty");
    else {
      let temp={
        songName: nameRef.current.value,
        language: ulLangRef.current.innerText,
        albumId: ulAlbumRef.current.id,
        genres: genreSelected
      }
      console.log(temp)
    }
  };

  useEffect(() => {
    let temp = getFromLocalStorage("albums");
    let arrays = [];
    temp.map((album) => arrays.push({album: album.albumName,albumId: album._id}));
    setAlbums(arrays);
  }, []);

  return (
    <>
      <Head>
        <title>Add song to album!</title>
      </Head>
      <div className="album_section">
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
        <button className="album_submit" onClick={handleSubmit}>
          Submit
        </button>
        <button className="album_submit" onClick={() => router.push("/")}>
          Go Back
        </button>
      </div>
    </>
  );
}
