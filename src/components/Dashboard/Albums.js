import { getFromLocalStorage } from "@/helper/LocalStorage";
import { getAlbums } from "@/pages/api/album";
import { useEffect, useState } from "react";
import { themes, types } from "../ErrorHandler/config";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import AlbumItem from "./AlbumItem";

export default function Albums() {
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

  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAlbums();
      console.log("here");
      console.log(res);
      if (res.status == 200) setList(res.data);
      else if (res.data.length == 0)
        showMessage("No albums to display!", themes.light, types.info);
      else
        showMessage((res.response && res.response.data.error) || res.message);
    };
    const albumList = getFromLocalStorage("albums");
    if (albumList === list && list.length > 0) console.log(list);
    else if (albumList && albumList.length > 0) setList(albumList);
    else if (list.length == 0) fetchData();
  }, []);

  return (
    <>
      <ErrorHandler show={show} {...messageProps} />
      <div className="Albums">
        <h1 className="Albums_headline">Your Albums</h1>
        <div className="Albums_container">
          {list.map(({ _id, albumImage, albumName, totalLikes }) => {
            return (
              <AlbumItem
                key={_id}
                name={albumName}
                likes={totalLikes}
                image={albumImage}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
