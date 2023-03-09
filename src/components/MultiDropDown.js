import { useState } from "react";

export default function MultiDropDown({
  array,
  defaultText,
  genreSelected,
  setGenreSelected,
}) {
  const [selected, setSelected] = useState(false);
  const handleSelect = () => setSelected(!selected);
  const handleOptionSelect = (op) => {
    let temp = [...genreSelected];
    if (temp.includes(op)) temp.splice(temp.indexOf(op), 1);
    else temp.push(op);
    setGenreSelected(temp);
    console.log(temp);
    setSelected(false);
  };
  return (
    <div className="dropdown">
      <div
        className={`select ${selected ? "select-clicked" : ""}`}
        onClick={handleSelect}
      >
        <span className="selected">{defaultText}</span>
        <div className={`caret ${selected ? "caret-rotate" : ""}`}></div>
      </div>
      <ul className={`menu ${selected ? "menu-open" : ""}`}>
        {array &&
          array.map((option, id) => {
            return (
              <li
                key={id}
                onClick={() => handleOptionSelect(option)}
                className={genreSelected.includes(option) ? "active" : ""}
              >
                {option}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
