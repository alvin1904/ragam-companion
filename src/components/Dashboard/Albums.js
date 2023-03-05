import { getAlbums, getAlbumsfrLS } from "@/pages/api/album";
import { useEffect, useState } from "react";
import AlbumItem from "./AlbumItem";

export default function Albums() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAlbums();
      console.log(res);
      console.log(typeof res)
      // if (typeof res=="Array") console.log("Arrya")
      if (res.message) console.log("Error handle")
      else setList(res);
    };
    const albumList = getAlbumsfrLS();
    if (albumList === list && list.length > 0) console.log(list);
    else if (albumList && albumList.length > 0) setList(albumList);
    else if (list.length == 0) fetchData();
  }, []);

  return (
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
  );
}
