import React, { useEffect, useRef } from "react";
import { getFromLocalStorage } from "@/helper/LocalStorage";
import Image from "next/image";
import defImage from "@/assets/artistdefault.webp";
import { useState } from "react";
import Username from "./Username";
import Desciption from "./Desciption";
import { FaCamera } from "react-icons/fa";
import { handleUpdateArtist } from "@/pages/api/auth";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { themes, types } from "../ErrorHandler/config";

const SettingsTop = () => {
  //ERROR HANDLER START
  const [show, setShow] = useState(false);
  const [messageProps, setMessageProps] = useState({});
  const showMessage = (text, theme, type) => {
    setMessageProps({ message: text, themes: theme, types: type });
    setShow(true);
  };
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [show]);
  //ERROR HANDLER END

  const [details, setDetails] = useState(getFromLocalStorage("details") || {});
  const [changed, setChanged] = useState(false);
  const userNameRef = useRef(null);
  const DescriptionRef = useRef(null);
  const imageRef = useRef(null);
  const [imgOld, setImgOld] = useState(details.profilePic || defImage);
  const [img, setImg] = useState(imgOld);

  const handleApply = async () => {
    if (
      userNameRef.current.value.trim() == details.name &&
      DescriptionRef.current.value.trim() == (details.description || "") &&
      imageRef.current.files.length == 0
    ) {
      showMessage("Enter new credentials");
      return;
    }

    let { value: name } = userNameRef.current;
    let { value: description } = DescriptionRef.current;
    let { name: oldName, description: oldDescription = "" } = details;
    let temp = {};
    if (name.trim() !== oldName) temp.name = name.trim();
    if (description.trim() !== oldDescription)
      temp.description = description.trim();

    let formData = new FormData();
    console.log(temp);
    formData.append("data", JSON.stringify(temp));

    let file = imageRef.current?.files[0];
    file && formData.append("profileImage", file);

    let res = await handleUpdateArtist(formData);
    console.log(res);
    if (res.status == 200) {
      setChanged(true);
      setImgOld(img);
      showMessage(
        "Profile details change success",
        themes.light,
        types.success
      );
    } else {
      showMessage((res.response && res.response.data.error) || res.message);
    }
  };
  const handleCancel = () => {
    userNameRef.current.value = details.name;
    DescriptionRef.current.value = details.description || "";
    setImg(imgOld);
    setChanged(true);
  };
  const handleChange = (event) => {
    const file = event.target.files[0];
    const url = file ? URL.createObjectURL(file) : defImage;
    setImg(url);
  };
  const handleGo = () => imageRef.current.click();

  return (
    <div className="settings_page">
      <ErrorHandler show={show} {...messageProps} />
      <div className="settings_top">
        <div className="settings_profile_pic">
          <Image src={img} width={200} height={200} alt="profile photo"></Image>
          <div className="settings_profile_change" onClick={handleGo}>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              ref={imageRef}
              onChange={handleChange}
              hidden
            ></input>
            <FaCamera />
          </div>
        </div>
        {details && (
          <div className="settings_profile_details">
            <div className="settings_rows">
              <Username
                userNameRef={userNameRef}
                name={details.name}
                changed={changed}
              />
            </div>
            <div className="settings_rows">
              <Desciption
                DescriptionRef={DescriptionRef}
                description={details.description}
                changed={changed}
              />
            </div>
            <div>
              <button className="settings_btn" onClick={handleApply}>
                Apply
              </button>
              <button className="settings_btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="settings_down"></div>
    </div>
  );
};

export default SettingsTop;
