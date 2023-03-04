import { setHead } from "@/pages/api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const TokenCheck = (props) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Wrap the following code inside a conditional block
        // to ensure that it only runs on the client-side
        if (typeof window === "undefined") return;
        if (typeof window !== "undefined") {
          let temp = localStorage.getItem("details");
          if (!temp) return router.push("/auth/login");
          else setHead(JSON.parse(temp).token); // set token to head each time the app refreshes
        }
        setAuthenticated(true);
      } catch (err) {
        console.log(err);
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (!authenticated) {
    return <>{props.fallback()}</>;
  }

  return <>{props.children}</>;
};

export default TokenCheck;
