/* eslint-disable react-hooks/exhaustive-deps */
import GoBack from "@/components/AddSong/GoBack";
import AlbumItem from "@/components/Dashboard/AlbumItem";
import ErrorHandler from "@/components/ErrorHandler/ErrorHandler";
import SongItem from "@/components/ViewAlbum/SongItem";
import { deleteAlbum, getAlbum } from "@/pages/api/album";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AlbumPage() {
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

  const router = useRouter();
  const [id, setId] = useState(router.query.slug);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getAlbum(id);
        res.data && setData(res.data);
      } catch (res) {
        setData({ error: res });
        showMessage("Please try logging in again");
      }
    };

    if (id) fetchData();
    else router.push("/");
  }, [id]);

  const handleDelete = async () => {
    const res = await deleteAlbum(id);
    if (res.status == 200) router.push("/");
    else
      showMessage(
        (res.response && res.response.data.error) || res.message,
        themes.light,
        types.error
      );
  };
  if (!data || data.error) {
    return (
      <div className="album_section album_view">
        Loading...
        <ErrorHandler show={show} {...messageProps} />
      </div>
    );
  } else if (data) {
    return (
      <div className="album_section album_view">
        <AlbumItem
          key={data._id}
          albumId={data._id}
          name={data.albumName}
          likes={data.totalLikes}
          image={data.albumImage}
          handleDelete={handleDelete}
        />
        <br></br>
        <div className="songs_list_container ">
          {data.songsId.map(({ songName, songImage, songFile, totalLikes }) => {
            return (
              <SongItem
                key={songName}
                songName={songName}
                songImage={songImage}
                songFile={songFile}
                totalLikes={totalLikes}
              />
            );
          })}
        </div>
        <br></br>
        <div className="center">
          <GoBack />
        </div>
      </div>
    );
  }
}
