import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { getDetails, setHead } from "../api";
import { LoginAdmin } from "../api/auth";
import Head from "next/head";
import ErrorHandler from "@/components/ErrorHandler/ErrorHandler";
import { themes, types } from "@/components/ErrorHandler/config";

export default function Login() {
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
  const [forgotP, setForgotP] = useState(false);
  const emailRef = useRef(null);
  const passwdRef = useRef(null);

  useEffect(() => {
    let temp = localStorage.getItem("details");
    if (temp) {
      let token = JSON.parse(temp).token;
      setHead(token);
      getDetails()
        .then((res) => {
          if (res.status == 200 && res.data) router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //CHECKING IF THERE IS A TOKEN IN STORAGE
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const details = {
      email: emailRef.current.value,
      password: passwdRef.current.value,
    };
    if (details.email == 0 || details.password == "")
      showMessage(
        "Enter credentials and try again",
        themes.light,
        types.warning
      );
    else if (details.password.length < 6)
      showMessage(
        "Enter a valid password and try again",
        themes.light,
        types.warning
      );
    else {
      let res = await LoginAdmin(details);
      console.log(res);
      if (res.status && (res.status == 200 || res.status == 201))
        router.push("/");
      else
        showMessage((res.response && res.response.data.error) || res.message);
    }
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="login">
        <ErrorHandler show={show} {...messageProps} />
        <section className="login_section">
          {!forgotP && (
            <>
              <h1>Login</h1>
              <h6>Ragam-Companion</h6>
              <form className="login_form" onSubmit={handleLogin}>
                <input
                  type="text"
                  ref={emailRef}
                  placeholder="Enter your email"
                />
                <input
                  type="password"
                  ref={passwdRef}
                  placeholder="Enter your password"
                />
                <p
                  className="transition_1"
                  onClick={() => {
                    if (details.email) setForgotP(true);
                    else setForgotP(false);
                  }}
                >
                  Forgot password?
                </p>
              <button className="login_btn" type="submit">
                Login
              </button>
              </form>
              <div className="alternative_signup">
                <p>
                  Not a member?{` `}
                  <span
                    className="transition_1"
                    onClick={() => router.push("/auth/register")}
                  >
                    Register
                  </span>
                </p>
              </div>
            </>
          )}
          {forgotP && (
            <div className="forgotP">
              A mail has been sent to the email {details.email}. Check your
              inbox and follow the steps given in the link.
            </div>
          )}
        </section>
      </div>
    </>
  );
}
