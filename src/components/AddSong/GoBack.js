import { useRouter } from "next/router";
import React from "react";

export default function GoBack() {
  const router = useRouter();
  return (
    <button className="album_submit" onClick={() => router.push("/")}>
      Go Back
    </button>
  );
}
