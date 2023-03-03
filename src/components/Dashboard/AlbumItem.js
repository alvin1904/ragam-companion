import Image from "next/image";
import img from "../../../public/koode.png";
export default function AlbumItem() {
  return (
    <div className="Album_card">
      <Image src={img} className="Album_bg"></Image>
      <div className="Album_details">
        <h1 className="Album_title">Koode</h1>
        <p className="Album_likes">liked by exactly 2000 people...</p>
      </div>
    </div>
  );
}
