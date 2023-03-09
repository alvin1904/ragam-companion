import React, { useState } from "react";

export default function AlbumDropDown({ array, defaultText, ulRef }) {
  const [optionSelected, setOptionSelected] = useState(defaultText);
  const [selected, setSelected] = useState(false);
  const handleSelect = () => setSelected(!selected);
  const handleOptionSelect = (op) => {
    setOptionSelected(op);
    setSelected(false);
  };
  return (
    <div className="dropdown">
      <div
        className={`select ${selected ? "select-clicked" : ""}`}
        onClick={handleSelect}
      >
        <span className="selected">{optionSelected}</span>
        <div className={`caret ${selected ? "caret-rotate" : ""}`}></div>
      </div>
      <ul className={`menu ${selected ? "menu-open" : ""}`} ref={ulRef}>
        {array &&
          array.map(({album, albumId}) => {
            return (
              <li
                key={albumId}
                id={albumId}
                onClick={() => handleOptionSelect(album)}
                className={album == optionSelected ? "active" : ""}
                ref={album == optionSelected ? ulRef : null}
              >
                {album}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
