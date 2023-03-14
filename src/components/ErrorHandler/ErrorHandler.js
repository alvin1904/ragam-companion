/* CUSTOM ERROR HANDLER - Alvin Varghese */
/* https://github.com/alvin1904 */

import { useState } from "react";
import {
  MdAssignmentTurnedIn,
  MdError,
  MdWarning,
  MdInfo,
} from "react-icons/md";
import { defaultSettings } from "./config";

export default function ErrorHandler({
  show = defaultSettings.show,
  themes = defaultSettings.themes,
  types = defaultSettings.types,
  message = defaultSettings.message,
}) {
  const [messageState, setMessageState] = useState(message);
  const icons = {
    error: MdError,
    success: MdAssignmentTurnedIn,
    warning: MdWarning,
    info: MdInfo,
  };
  const Icon = icons[types];
  const display = <Icon size={25} className={`${types}1904`} />;

  const errorMiddleware = () => {
    if (message === "jwt expired") setMessageState("Please login again!");
  };

  errorMiddleware();
  
  return (
    <div
      className={`error_handler_1904 ${show && "show1904"} ${
        themes ? themes : ""
      }1904 ${types ? types : ""}1904border`}
    >
      <div className="error_img_1904">{display}</div>
      <div>{message && message}</div>
    </div>
  );
}
