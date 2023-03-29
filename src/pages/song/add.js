import { useEffect, useState } from "react";
import Head from "next/head";
import AddSong from "@/components/AddSong/AddSong";
import { getAlbumDetails } from "../api/album";
import ErrorHandler from "@/components/ErrorHandler/ErrorHandler";

export default function Add() {
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
  const [data, setData] = useState({});

  useEffect(() => {
    const getNamesByKey = (data) => {
      const albumList = data.albumNameList;
      const genreList = data.genreList.map((genre) => genre["genreName"]);
      const languageList = data.languageList.map(
        (language) => language["languageName"]
      );
      return { albumList, genreList, languageList };
    };

    const fetchData = async () => {
      try {
        const res = await getAlbumDetails();
        if (res.status == 200) {
          const albumDetails = getNamesByKey(res.data);
          setData(albumDetails);
        } else {
          setData({});
          showMessage((res.response && res.response.data.error) || res.message);
        }
      } catch (res) {
        setData({});
        showMessage((res.response && res.response.data.error) || res.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Add song to album!</title>
      </Head>
      <div className="album_section">
        <ErrorHandler show={show} {...messageProps} />
        <AddSong data={data} />
      </div>
    </>
  );
}
