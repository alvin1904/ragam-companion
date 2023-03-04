import React from "react";
import AlbumItem from "./AlbumItem";

export default function Albums() {
  return (
    <div className="Albums">
      <h1 className="Albums_headline">Your Albums</h1>
      <div className="Albums_container">
        <AlbumItem name={'House of the dragon'} likes={230}/>
        <AlbumItem name={'Koode'} likes={250}/>
        <AlbumItem name={'House of the dragon'} likes={530}/>
        <AlbumItem name={'Loki'} likes={235}/>
        <AlbumItem name={'House of the dragon'} likes={230}/>
        <AlbumItem name={'Koode'} likes={530}/>
        <AlbumItem name={'House of the dragon'} likes={230}/>
        <AlbumItem name={'Loki'} likes={235}/>
      </div>
    </div>
  );
}
