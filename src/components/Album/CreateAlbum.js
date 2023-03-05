import { createAlbum } from "@/pages/api/album";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function CreateAlbum() {
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
    if (nameRef.current.value == "") console.log("Name empty");
    else if (imageRef.current.files.length != 1) console.log("image empty");
    else {
      const formdata = new FormData();
      let temp = { albumName: nameRef.current.value };
      formdata.append("data", JSON.stringify(temp));
      // The img state holds the base64 encoded data URL of the image, which can be used to display the image preview.
      // However, to upload the actual image file, you need to pass imageRef.current.files[0]
      // which is a File object that contains the binary data of the image.
      formdata.append("albumImage", imageRef.current.files[0]);
      let res = await createAlbum(formdata);
      if(res.albumName) console.log("success")
      else console.log("error handle")
    }
  };

  return (
    <div className="album_section">
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
      <button className="album_submit" onClick={handleSubmit}>
        SUBMIT
      </button>

      <button className="album_submit" onClick={() => router.push("/")}>
        Go Back
      </button>
      {img && (
        <div className="album_dp_display">
          <Image src={img} height={100} width={300} alt="Image Upload"></Image>
        </div>
      )}
    </div>
  );
}
