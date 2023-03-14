import GoBack from "@/components/AddSong/GoBack";
import AlbumItem from "@/components/Dashboard/AlbumItem";
import SongItem from "@/components/ViewAlbum/SongItem";
import { getAlbum } from "@/pages/api/album";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AlbumPage() {
  const router = useRouter();
  const [id, setId] = useState(router.query.slug);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getAlbum(id);
        res.data && setData(res.data);
        console.log(res);
      } catch (err) {
        console.log("error handle");
      }
    };

    if (id) fetchData();
    else router.push("/");
  }, [id]);

  const handleDelete = () => {
    alert("poda patti");
  };

  if (data) {
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
          {data.songsId.map(
            ({ songName, songImage, songFile, totalLikes, language }) => {
              return (
                <SongItem
                  songName={songName}
                  songImage={songImage}
                  songFile={songFile}
                  totalLikes={totalLikes}
                />
              );
            }
          )}
        </div>
        <br></br>
        <div className="center">
          <GoBack />
        </div>
      </div>
    );
  } else {
    return <div className="album_section album_view"> Loading...</div>;
  }
}
