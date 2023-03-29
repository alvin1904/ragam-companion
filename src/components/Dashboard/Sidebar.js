import Image from "next/image";
import { IoIosAddCircle, IoMdSettings, IoIosExit } from "react-icons/io";
import { FaFolderPlus, FaListAlt } from "react-icons/fa";
import { getFromLocalStorage } from "@/helper/LocalStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { handleLogOut } from "@/pages/api/auth";
import img from "@/../public/photos/defaultPic.png";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

export default function Sidebar() {
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
  const [details, setDetails] = useState({});
  useEffect(() => {
    const dataLoader = () => {
      const data = getFromLocalStorage("details");
      setDetails({
        email: data.email,
        name: data.name,
        profilePic: data.profilePic,
      });
    };
    dataLoader();
  }, []);

  return (
    <>
      <ErrorHandler show={show} {...messageProps} />
      <div className="Sidebar">
        <Image src="/ragam.png" width={45} height={45} alt="Ragam"></Image>
        <div className="Sidebar_details">
          <div className="Sidebar_dp_hodler">
            <Image
              src={details.profilePic || img}
              width={90}
              height={90}
              alt="profile-pic"
            ></Image>
          </div>
          {details ? (
            <>
              <h1 className="Sidebar_name">{details.name}</h1>
              <p className="Sidebar_email">{details.email}</p>
            </>
          ) : (
            <>Loading...</>
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
          <button
            className="Sidebar_button"
            onClick={async () => {
              const res = await handleLogOut();
              console.log(res);
              if (res.status == 200) router.push("/auth/login");
              else {
                showMessage(
                  (res.response && res.response.data.error) || res.message
                );
              }
            }}
          >
            <IoIosExit size={27} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
