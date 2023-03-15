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
          array.map(({albumName, _id}) => {
            return (
              <li
                key={_id}
                id={_id}
                onClick={() => handleOptionSelect(albumName)}
                className={albumName == optionSelected ? "active" : ""}
                ref={albumName == optionSelected ? ulRef : null}
              >
                {albumName}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
