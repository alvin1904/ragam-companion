import React from "react";
import AlbumItem from "./AlbumItem";

export default function Albums() {
  return (
    <div className="Albums">
      <h1 className="Albums_headline">Your Albums</h1>
      <div className="Albums_container">
        <AlbumItem />
        <AlbumItem />
        <AlbumItem />
        <AlbumItem />
        <AlbumItem />
        <AlbumItem />
        <AlbumItem />
        <AlbumItem />
      </div>
    </div>
  );
}
