import { useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// import img from "@/../public/photos/hod.jpg";

export default function Add() {
  const router = useRouter()
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImg(reader.result);
    };
  };
  const handleSubmit = (e) => {
    if (nameRef.current.value == "") console.log("Name empty");
    else if (imageRef.current.files.length != 1) console.log("image empty");
    else console.log("send to server");
  };
  return (
    <>
      <Head>
        <title>Add song to album!</title>
      </Head>
      <div className="album_section">
        <input
          className="album_headline"
          placeholder="Enter the name of song"
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
        <button className="album_submit" onClick={handleSubmit}>
          Submit
        </button>
        <button className="album_submit" onClick={()=>router.push('/')}>
          Go Back
        </button>
        {img && (
          <div className="album_dp_display">
            <Image
              src={img}
              height={100}
              width={300}
              alt="Image Upload"
            ></Image>
          </div>
        )}
      </div>
    </>
  );
}
