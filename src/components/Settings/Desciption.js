import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaRegSave, FaRegTrashAlt } from "react-icons/fa";

const Desciption = ({ DescriptionRef, description, changed }) => {
  const [editDescription, setEditDescription] = useState(false);
  const openD = () => setEditDescription(true);
  const saveD = () => setEditDescription(false);
  const closeD = () => {
    setEditDescription(false);
    DescriptionRef.current.value = description || "";
  };
  useEffect(() => {
    if (changed) {
      saveD();
      setEditDescription(false);
    }
  }, [changed]);
  return (
    <>
      <textarea
        rows="6"
        cols="50"
        className={`${editDescription ? "settings_edit" : "sne"}`}
        placeholder="Enter a description"
        readOnly={!editDescription}
        defaultValue={description || ""}
        ref={DescriptionRef}
      ></textarea>
      {editDescription ? (
        <div>
          <FaRegSave size={20} onClick={saveD} />
          <FaRegTrashAlt size={20} onClick={closeD} />
        </div>
      ) : (
        <FaPencilAlt size={18} onClick={openD} />
      )}
    </>
  );
};

export default Desciption;
