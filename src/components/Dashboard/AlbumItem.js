import Image from "next/image";
// import img from "@/../public/photos/koode.png";
import img from "@/../public/photos/hod.jpg";
export default function AlbumItem({name, likes}) {
  return (
    <div className="Album_card">
      <Image src={img} className="Album_bg" alt="bg"></Image>
      <div className="Album_details">
        <h1 className="Album_title">{name}</h1>
        <p className="Album_likes">liked by {likes} people...</p>
      </div>
    </div>
  );
}
