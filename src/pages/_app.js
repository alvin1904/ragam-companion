import "@/styles/globals.css";
import "@/components/ErrorHandler/ErrorHandler.css";
import TokenCheck from "@/helper/TokenCheck";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const fallback = () => {
    return <div>Redirecting...</div>;
  };

  const fallbackComponent = <>{fallback}</>; // Remove the function call here

  const shouldAuthenticate = () => {
    const { pathname } = router;
    return (
      !pathname.startsWith("/auth/login") &&
      !pathname.startsWith("/auth/register")
    );
  };

  return (
    <>
      {shouldAuthenticate() ? (
        <TokenCheck fallback={fallback}>
          <Component {...pageProps} />
        </TokenCheck>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
