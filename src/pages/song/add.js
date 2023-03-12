import { useEffect, useRef, useState } from "react";
import { getFromLocalStorage } from "@/helper/LocalStorage";
import Head from "next/head";
import AddSong from "@/components/AddSong/AddSong";

export default function Add() {
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    let temp = getFromLocalStorage("albums");
    let arrays = [];
    temp.map((album) =>
      arrays.push({ album: album.albumName, albumId: album._id })
    );
    setAlbums(arrays);
  }, []);

  return (
    <>
      <Head>
        <title>Add song to album!</title>
      </Head>
      <div className="album_section">
        <AddSong albums={albums}/>
      </div>
    </>
  );
}
