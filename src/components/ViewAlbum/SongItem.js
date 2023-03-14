import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AiFillHeart,
  AiFillPlayCircle,
  AiFillPauseCircle,
} from "react-icons/ai";

const SongItem = ({ songName, songImage, songFile, totalLikes }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing) audioRef.current.play();
    else audioRef.current.pause();
  }, [playing]);

  return (
    <div
      className={`song_item_container ${playing ? "song_item_playing" : ""}`}
      onClick={() => setPlaying(!playing)}
    >
      <div className="song_item_image">
        <Image src={songImage} alt="Song Image" height={70} width={70} />
      </div>
      <div className="song_item_details">
        <h4 className="song_item_title"> {songName}</h4>
      </div>
      <div className="song_item_likes">
        {totalLikes}
        <AiFillHeart size={25} />
      </div>
      <div className="song_item_button">
        <audio ref={audioRef}>
          <source src={songFile}></source>
        </audio>
        {!playing ? (
          <AiFillPlayCircle size={35} />
        ) : (
          <AiFillPauseCircle size={35} />
        )}
      </div>
    </div>
  );
};

export default SongItem;
