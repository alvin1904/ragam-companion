import Image from "next/image";
import img from "@/../public/photos/hod.jpg";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useState } from "react";
import { useRouter } from "next/router";
export default function AlbumItem({
  name,
  albumId,
  likes,
  image,
  handleDelete,
}) {
  const router = useRouter();
  const [id, setId] = useState(albumId);

  return (
    <div className="Album_card">
      <div className="Album_delete" onClick={() => handleDelete(id)}>
        <BsFillTrash3Fill size={25} />
      </div>
      <Image
        src={image || img}
        className="Album_bg"
        alt="bg"
        width={300}
        height={200}
        onClick={() => {
          router.push(`/album/${id}`);
        }}
      ></Image>
      <div className="Album_details">
        <h1 className="Album_title">{name}</h1>
        <p className="Album_likes">liked by {likes} people...</p>
      </div>
    </div>
  );
}
