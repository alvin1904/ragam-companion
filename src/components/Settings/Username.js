import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaRegSave, FaRegTrashAlt } from "react-icons/fa";

const Username = ({ userNameRef, name, changed }) => {
  const [editUserName, setEditUserName] = useState(false);
  const openU = () => setEditUserName(true);
  const saveU = () => setEditUserName(false);
  const closeU = () => {
    setEditUserName(false);
    userNameRef.current.value = name;
  };
  useEffect(() => {
    if (changed) {
      saveU();
      setEditUserName(false);
    }
  }, [changed]);

  return (
    <>
      <input
        className={`settings_input ${editUserName ? "settings_edit" : "sne"}`}
        placeholder="Enter your username"
        readOnly={!editUserName}
        defaultValue={name || ""}
        ref={userNameRef}
      ></input>
      {editUserName ? (
        <div>
          <FaRegSave size={20} onClick={saveU} />
          <FaRegTrashAlt size={20} onClick={closeU} /> 
          {/* fetch from ls and then */}
        </div>
      ) : (
        <FaPencilAlt size={18} onClick={openU} />
      )}
    </>
  );
};

export default Username;
