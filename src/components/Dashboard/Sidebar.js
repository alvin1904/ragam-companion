import Image from "next/image";
import { IoIosAddCircle, IoMdSettings, IoIosExit } from "react-icons/io";
import { FaFolderPlus, FaListAlt } from "react-icons/fa";
import { getFromLocalStorage } from "@/helper/LocalStorage";
import { logoutAdminApi, setHead } from "@/pages/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [details, setDetails] = useState({});
  const handleLogOut = async () => {
    try {
      let temp = await getFromLocalStorage();
      const res = await logoutAdminApi();
      setHead("");
      if (res.status == 200) {
        localStorage.removeItem("details");
        localStorage.clear();
        console.log({ msg: res.data.message });
        router.push("/auth/login");
        return { msg: res.data.message };
      }
    } catch (err) {
      console.log(err);
      return { err: "signout error" };
    }
  };

  useEffect(() => {
    const dataLoader = async () => {
      const data = await getFromLocalStorage();
      setDetails({
        email: data.email,
        name: data.name,
        profilePic: data.profilePic,
      });
      console.log(details);
    };
    dataLoader();
  }, []);

  return (
    <div className="Sidebar">
      <Image src="/ragam.png" width={45} height={45} alt="Ragam"></Image>
      <div className="Sidebar_details">
        <div className="Sidebar_dp_hodler">
          <Image
            src={details.profilePic || "/photos/singan.jpg"}
            width={90}
            height={90}
            alt="profile-pic"
          ></Image>
        </div>
        {details && (
          <>
            <h1 className="Sidebar_name">{details.name}</h1>
            <p className="Sidebar_email">{details.email}</p>
          </>
        )}
      </div>
      <div className="Sidebar_options">
        <div className="Sidebar_list">
          <button className="Sidebar_button btn_focus">
            <FaListAlt size={27} />
            <span>Dashboard</span>
          </button>
          <button
            className="Sidebar_button"
            onClick={() => router.push("/song/add")}
          >
            <IoIosAddCircle size={27} />
            <span>Add song</span>
          </button>
          <button
            className="Sidebar_button"
            onClick={() => router.push("/album/create")}
          >
            <FaFolderPlus size={27} />
            <span>Create Album</span>
          </button>
          <button
            className="Sidebar_button"
            onClick={() => router.push("/settings")}
          >
            <IoMdSettings size={27} />
            <span>Settings</span>
          </button>
        </div>
      </div>
      <div className="Sidebar_signout">
        <button className="Sidebar_button" onClick={handleLogOut}>
          <IoIosExit size={27} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
