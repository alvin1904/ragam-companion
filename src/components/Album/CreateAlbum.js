import { createAlbum } from "@/pages/api/album";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import GoBack from "../AddSong/GoBack";
import { themes, types } from "../ErrorHandler/config";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

export default function CreateAlbum() {
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

  const router = useRouter();
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files.length == 0) return setImg(null);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImg(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameRef.current.value == "")
      showMessage("Name field is empty", themes.light, types.warning);
    else if (imageRef.current.files.length != 1)
      showMessage("Upload album cover image", themes.light, types.warning);
    else {
      const formdata = new FormData();
      let temp = { albumName: nameRef.current.value };
      formdata.append("data", JSON.stringify(temp));
      // The img state holds the base64 encoded data URL of the image, which can be used to display the image preview.
      // However, to upload the actual image file, you need to pass imageRef.current.files[0]
      // which is a File object that contains the binary data of the image.
      formdata.append("albumImage", imageRef.current.files[0]);
      let res = await createAlbum(formdata);
      console.log(res);
      if (res.status == 201)
        showMessage(
          "The album was created successfully!",
          themes.light,
          types.success
        );
      else
        showMessage((res.response && res.response.data.error) || res.message);
    }
  };

  return (
    <div className="album_section">
      <ErrorHandler show={show} {...messageProps} />
      <form onSubmit={handleSubmit}>
        <input
          className="album_headline"
          placeholder="Enter the title of album"
          ref={nameRef}
        ></input>
        <br></br>

        <input
          name="album_upload"
          className="album_upload"
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={imageRef}
          onChange={handleChange}
        ></input>
        <button className="album_submit" type="submit">
          SUBMIT
        </button>
        <GoBack />
      </form>
      {img && (
        <div className="album_dp_display">
          <Image src={img} height={100} width={300} alt="Image Upload"></Image>
        </div>
      )}
    </div>
  );
}
